import React, {Component} from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import axios from "axios";
import api from "./../util/api";

class Tasks extends Component {
  state= {
    user: this.props.user,
    date: new moment((new Date()).toDateString()),
    entries: [],
    courses: [],
    selectedCourse: "0",
    formAir: 0,
    formNitrox: 0,
    formHours: 0,
    formCourseId: "",
    formCourseQuantity: 0,
    formCrewBp: 0,
    formCrewAv: 0,
    formCrewSd: 0,
    formCaptainBp: 0,
    formCaptainAv: 0,
    formCaptainSd: 0,
    showCaptain: false
  }

  previousDay = e=>{
    this.setState({date:this.state.date.subtract(1,"days")});
  }

  nextDay = e=>{
    this.setState({date:this.state.date.add(1,"days")});
  }

  getEntries = () =>{
    if(!this.state.user) {
      return this.setState({entries:[]});
    }
    //get tasks for current day and change inputs to reflect
    var tomorrow = new moment(this.state.date);
    tomorrow.add(1, "days");
    api.getUserEntriesRange(this.state.user._id, this.state.date.toDate().toDateString(), tomorrow.toDate().toDateString())
    .then(response=>{
      this.setState({entries:response.data});
    });
  }

  getCourses = () => {
    //get courses and populate
    api.getAllCourses()
    .then(response=>{
      this.setState({courses:response.data, selectedCourse: "0"});
    });
  }

  createEntry = entry => {
    api.createNewEntry(entry)
    .then(this.getEntries());
  }

  handleTankChange = e => {
    e.target.name==="air" ? 
      this.setState({formAir:e.target.value}, ()=>{
        this.createEntry({
          task: "Air Tanks",
          quantity: e.target.value,
          date: this.state.date.toDate(),
          user: this.state.user._id
        })
      })
      :
      this.setState({formNitrox:e.target.value}, ()=>{
        this.createEntry({
          task: "Eanx Tanks",
          quantity: e.target.value,
          date: this.state.date.toDate(),
          user: this.state.user._id
        })
      })
  }

  handleCrewChange = e=>{
    e.target.name==="formCrewAv" ?
      this.setState({formCrewAv:e.target.value}) :
    e.target.name==="formCrewBp" ?
      this.setState({formCrewBp:e.target.value}) :
    this.setState({formCrewSd:e.target.value});
  }

  handleCaptainChange = e=>{
    e.target.name==="formCaptainAv" ?
      this.setState({formCaptainAv:e.target.value}) :
    e.target.name==="formCaptainBp" ?
      this.setState({formCaptainBp:e.target.value}) :
    this.setState({formCaptainSd:e.target.value});
  }

  handleHoursChange = e=>{
    this.setState({formHours:e.target.value});
  }

  componentDidMount() {
    api.getCurrentUser()
    .then(response=>{
      this.setState({
        user: response.data,
        showCaptain: response.data.isCaptain
      });
    });
    //get courses and populate
    this.getCourses();
    //populate tasks
    this.getEntries();
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.previousDay}>Previous Day</button>
          <span>{this.state.date.format("ddd MMM DD YYYY")}</span>
          <button onClick={this.nextDay}>Next Day</button>
        </div>
        <div>
          <h3>Tanks</h3>
          <label>Air:</label>
          <input type="number" name="air" value={this.state.formAir} min="0" onChange={this.handleTankChange}/>
          <label>Nitrox:</label>
          <input type="number" name="nitrox" value={this.state.formNitrox} min="0" onChange={this.handleTankChange}/>
          <h3>Crew</h3>
          <div className="row">
            <div className="col-md-4 col-12">
              <label>Aquaview: </label>
              <input type="number" name="formCrewAv" min={0} onChange={this.handleCrewChange} value={this.state.formCrewAv}/>
            </div>
            <div className="col-md-4 col-12">
              <label>Black Pearl: </label>
              <input type="number" name="formCrewBp" min={0} onChange={this.handleCrewChange} value={this.state.formCrewBp}/>
            </div>
            <div className="col-md-4 col-12">
              <label>Safari: </label>
              <input type="number" name="formCrewSd" min={0} onChange={this.handleCrewChange} value={this.state.formCrewSd}/>
            </div>
          </div>
          {this.state.showCaptain ? (<h3>Captain</h3>) : null}
          {this.state.showCaptain ? 
            (<div className="row">
              <div className="col-md-4 col-12">
                <label>Aquaview: </label>
                <input type="number" name="formCaptainAv" min={0} onChange={this.handleCaptainChange} value={this.state.formCaptainAv}/>
              </div>
              <div className="col-md-4 col-12">
                 <label>Black Pearl: </label>
                 <input type="number" name="formCaptainBp" min={0} onChange={this.handleCaptainChange} value={this.state.formCaptainBp}/>
              </div>
              <div className="col-md-4 col-12">
                <label>Safari: </label>
                <input type="number" name="formCaptainSd" min={0} onChange={this.handleCaptainChange} value={this.state.formCaptainSd}/>
              </div>
            </div>) : null
          }
          <h3>Classes</h3>
          <select name="courseId" value={this.state.formCourseId} onChange={e=>{this.setState({formCourseId:e.target.value})}}>
            {this.state.courses.map(course=>(<option key={course._id} value={course._id}>{course.name}</option>))}
          </select>
          <label>Quantity: </label>
          <input type="number" min={0} name="courseQuantity" value={this.state.formCourseQuantity} onChange={e=>{this.setState({formCourseQuantity:e.target.value})}}/>
          <h3>Hours</h3>
          <input type="number" min={0} name="hours" value={this.state.formHours} onChange={this.handleHoursChange}/>
        </div>
      </div>
    );
  }
}

export default Tasks;