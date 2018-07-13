import React, {Component} from "react";
import moment from "moment";
import Modal from "react-responsive-modal";
import axios from "axios";

class Tasks extends Component {
  state= {
    user: this.props.user,
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
    formCaptainSd: 0
  }

  previousDay = e=>{
    this.setState({date:this.state.date.subtract(1,"days")});
  }

  nextDay = e=>{
    this.setState({date:this.state.date.add(1,"days")});
  }

  getTasks = () =>{
    //get tasks for current day and change inputs to reflect
    axios.get("/api/entries")
    .then(response=>{
      console.log(response);
    });
  }

  getCourses = () => {
    //get courses and populate
    axios.get("/api/courses")
    .then(response=>{
      console.log(response);
    });
  }

  componentDidMount() {
    //get courses and populate
    this.getCourses();
    //populate tasks
    this.getTasks();
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
          <input type="number" name="air" value={this.state.formAir} min="0" onChange={e=>{this.setState({formAir:e.target.value})}}/>
          <label>Nitrox:</label>
          <input type="number" name="nitrox" value={this.state.formNitrox} min="0" onChange={e=>{this.setState({formNitrox:e.target.value})}}/>
          <h3>Crew</h3>

          <h3>Classes</h3>
          <select name="courseId" value={this.state.formCourseId} onChange={e=>{this.setState({formCourseId:e.target.value})}}>
            {this.state.courses.map(course=>(<option value={course._id}>{course.name}</option>))}
          </select>
          <label>Quantity: </label>
          <input type="number" min={0} name="courseQuantity" value={this.state.formCourseQuantity} onChange={e=>{this.setState({formCourseQuantity:e.target.value})}}/>
          <h3>Hours</h3>
          <input type="number" min={0} name="hours" value={this.state.formHours}/>
        </div>
      </div>
    );
  }
}

export default Tasks;