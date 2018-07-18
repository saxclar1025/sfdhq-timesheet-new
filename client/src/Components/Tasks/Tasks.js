import React, {Component} from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import axios from "axios";
import api from "./../util/api";

class Tasks extends Component {
  state= {
    user: {
      "isAdmin": true,
      "isCaptain": false,
      "isInstructor": true,
      "isPayroll": true,
      "_id": "5b43abdb77d037140ce3b6e6",
      "username": "sfalcon",
      "password": "$2a$10$qF7vTs0kYeZ17/Z6raZt5.PIrV4bFquGb28DZMOCJ0T8gQC9oiC0y",
      "firstName": "Sam",
      "lastName": "Falcon",
      "email": "saxclar1025@gmail.com",
      "phone": "9546147815",
      "hourlyRate": 15,
      "crewRate": 40,
      "__v": 0
    },
    date: new moment((new Date()).toDateString()),
    entries: [
      {task:"Air Tanks", date: new Date(), unitPrice: 0.5, quantity: 5, _id:"abc"},
      {task:"Eanx Tanks", date: new Date(), unitPrice: 1, quantity: 4, _id:"def"},
      {task:"Discover Scuba", date: new Date(), unitPrice: 50, quantity: 5, overridden:true,_id:"bcd"}
    ],
    courses: [ 
      {name:"E-Learning Open Water", price:[350,300,275,200], commission:[170,150,130,110], requiresInstructor:true, _id: "123"},
      {name:"Classroom Open Water", price:[395,350,300,275], commission:[195,175,150,150], requiresInstructor:true, _id:"124"},
      {name:"Advanced Open Water", price:[360,310,310,310], commission:[175,150,150,150], requiresInstructor:true, _id: "125"}
    ],
    selectedCourse: "0",
    formAir: 0,
    formNitrox: 0,
    formHours: 0,
    formCourseId: null,
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
    //get tasks for current day and change inputs to reflect
    var tomorrow = new moment(this.state.date);
    tomorrow.add("days", 1);
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

  handleTankChange = e => {
    e.target.name==="air" ? 
      this.setState({formAir:e.target.value})
      :
      this.setState({formNitrox:e.target.value})
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
            {this.state.courses.map(course=>(<option value={course._id}>{course.name}</option>))}
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