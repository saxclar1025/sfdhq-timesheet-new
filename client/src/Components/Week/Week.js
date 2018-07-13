import React, {Component} from "react";
import moment from "moment";
import PayrollTable from "./../PayrollTable/PayrollTable";
import Modal from "react-responsive-modal";
import axios from "axios";

class Week extends Component {
  state = {
    user: this.props.user,
    week: {start:moment(), end:moment()},
    weekDiff: 0,
    entries: [
      {task:"Air Tanks", date: new Date(), unitPrice: 0.5, quantity: 5, _id:"abc"},
      {task:"Eanx Tanks", date: new Date(), unitPrice: 1, quantity: 4, _id:"def"},
      {task:"Discover Scuba", date: new Date(), unitPrice: 50, quantity: 5, overridden:true,_id:"bcd"}
    ],
    modalOpen: false,
    modalEntry: {task:"Air Tanks", date: new Date(), unitPrice: 0.5, quantity: 5, _id:"abc"}
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

  render() {
    return (
      <div>
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

export default Week;