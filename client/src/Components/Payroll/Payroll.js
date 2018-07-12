import React, {Component} from "react";
import moment from "moment";
import PayrollTable from "./../PayrollTable/PayrollTable";
import Modal from "react-responsive-modal";
import axios from "axios";

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

class Payroll extends Component {
  state = {
    selectedUser: null,
    //users: [],
    users: [{firstName:"Sam", lastName:"Falcon", _id:"12345"},
            {firstName:"Chris", lastName:"Marek", _id:"11111"},
            {firstName:"Zoli", lastName:"Varju", _id:"22222"}],
    week: {start:moment(), end:moment()},
    weekDiff: 0,
    entries: [{task:"Air Tanks", date: new Date(), unitPrice: 0.5, quantity: 5, _id:"abc"},
      {task:"Eanx Tanks", date: new Date(), unitPrice: 1, quantity: 4, _id:"def"},
      {task:"Discover Scuba", date: new Date(), unitPrice: 50, quantity: 5, overridden:true,_id:"bcd"}
    ],
    modalOpen: false,
    modalEntry: {task:"Air Tanks", date: new Date(), unitPrice: 0.5, quantity: 5, _id:"abc"}
  }

  openModal = _id => {
    this.setState({modalEntry:this.state.entries.find(entry=>entry._id===_id)}, ()=>{this.setState({modalOpen:true})});
  }

  getWorkWeek = weekDiff => {
    if(!weekDiff) weekDiff=0;
    var date = new moment();
    var startMoment = moment(date).subtract(((date.day()+6) % 7) - (7*weekDiff), "days"); //gets the latest monday + the week differential
    var endMoment = moment(startMoment).add(6,"days");
    return {start:startMoment,end:endMoment};
  }

  changeWeek = diff => {
    this.setState({
      weekDiff:this.state.weekDiff + diff,
      week: this.getWorkWeek(this.state.weekDiff + diff) 
    });
  }

  processUserChange = e => {
    var where = {
      user:e.target.value,
      start: this.state.week.start.format("ddd MMM DD YYYY"),
      end: this.state.week.end.format("ddd MMM DD YYYY")
    };
    console.log(where);
    axios.post("/api/entries/user", {where}, axiosConfig)
    .then(entries=>{
      console.log(entries);
      this.setState({selectedUser: e.target.value, entries:entries});
    });
  }

  componentDidMount() {
    this.setState({week: this.getWorkWeek(this.state.weekDiff)});
    axios.get("/api/users")
    .then(response=>{
      console.log(response.data);
      this.setState({users:response.data});
    });
  }

  //"Wed Jul 11 2018""ddd MMM DD YYYY"

  render() {
    return (
      <div>
        <button onClick={e=>axios.post("/api/users", {user:{username: "test"}}, axiosConfig).then(res=>console.log(res))}>Test</button>
        <select name="user" onChange={this.processUserChange}>
          {this.state.users.map(user=>(
            <option value={user._id}>{`${user.firstName} ${user.lastName}`}</option>
          ))}
        </select>
        <button onClick={e=>{this.changeWeek(-1)}}>Previous Week</button>
        <span>{this.state.week.start.format("MMM Do YY")}</span>
        through
        <span>{this.state.week.end.format("MMM Do YY")}</span>
        <button onClick={e=>{this.changeWeek(1)}}>Next Week</button>

        <PayrollTable entries={this.state.entries} openModal={this.openModal}/>

        <Modal open={this.state.modalOpen} onClose={e=>this.setState({modalOpen: false})}center>
          <h3>{this.state.modalEntry.task}{this.state.modalEntry.overridden ? "*" : ""}</h3>
          <h5>{this.state.modalEntry.date.toDateString()}</h5>
          <span>Unit Price: ${this.state.modalEntry.unitPrice.toFixed(2)}</span>
          <span>Quantity: {this.state.modalEntry.quantity}</span>
          <h5>Total: ${(this.state.modalEntry.quantity*this.state.modalEntry.unitPrice).toFixed(2)}</h5>
          <p>Note: {this.state.modalEntry.note}</p>
        </Modal>
      </div>
    );
  }
}

export default Payroll;