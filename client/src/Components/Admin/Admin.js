import React, {Component} from "react";
import Modal from "react-responsive-modal";
import api from "./../util/api";

class Admin extends Component {
  state={
    userModalOpen: false,
    classesModalOpen: false,
    messageModalOpen: false,
    users: [
      {firstName:"Sam", lastName:"Falcon", _id:"12345"},
      {firstName:"Chris", lastName:"Marek", _id:"11111"},
      {firstName:"Zoli", lastName:"Varju", _id:"22222"}
    ],
    courses: [ 
      {name:"E-Learning Open Water", price:[350,300,275,200], commission:[170,150,130,110], requiresInstructor:true},
      {name:"Classroom Open Water", price:[395,350,300,275], commission:[195,175,150,150], requiresInstructor:true},
      {name:"Advanced Open Water", price:[360,310,310,310], commission:[175,150,150,150], requiresInstructor:true}
    ],
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    phone: "",
    isInstructor: false,
    isCaptain: false,
    isPayroll: false,
    isAdmin: false,
    captainRate: 70,
    crewRate: 40,
    hourlyRate: 15,
    selectedUser: "0",
    courseName: "",
    coursePrice0: 0,
    coursePrice1: 0,
    coursePrice2: 0,
    coursePrice3: 0,
    courseCommission0: 0,
    courseCommission1: 0,
    courseCommission2: 0,
    courseCommission3: 0,
    requiresInstructor: true,
    selectedCourse: "0"
  }

  openUserModal = e=>{
    this.setState({userModalOpen: true});
  }

  closeUserModal = e=>{
    this.setState({userModalOpen: false});
  }

  openClassesModal = e=>{
    this.setState({classesModalOpen: true});
  }

  closeClassesModal = e=>{
    this.setState({classesModalOpen: false});
  }

  openMessageModal = e=>{
    this.setState({messageModalOpen: true});
  }

  closeMessageModal = e=>{
    this.setState({messageModalOpen: false});
  }

  getUsers = ()=>{
    //get users and set to state
    api.getAllUsers().then(response=>{
      this.setState({users:response.data, selectedUser: "0"}, ()=>{
        this.populateUserForm({target:{value:"0"}});
      });
    });
  }

  populateUserForm = e=>{
    this.setState({selectedUser:e.target.value}, ()=>{
      var selUser = this.state.users.find(user=>user._id===this.state.selectedUser);

      this.setState(!selUser ? {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        isAdmin: false,
        isPayroll: false,
        isCaptain: false,
        isInstructor: false,
        crewRate: 40,
        captainRate: 70,
        hourlyRate: 15
      }:{
        firstName: selUser.firstName,
        lastName: selUser.lastName,
        username: selUser.username,
        email: selUser.email,
        phone: selUser.phone,
        isAdmin: selUser.isAdmin,
        isPayroll: selUser.isPayroll,
        isCaptain: selUser.isCaptain,
        isInstructor: selUser.isInstructor,
        crewRate: selUser.crewRate,
        captainRate: selUser.captainRate,
        hourlyRate: selUser.hourlyRate
      });
    });
  }

  populateCourseForm = e=>{
    this.setState({selectedCourse:e.target.value}, ()=>{
      var selCourse = this.state.courses.find(course=>course._id===this.state.selectedCourse);

      this.setState(!selCourse ? {
        courseName: "",
        coursePrice0: 0,
        coursePrice1: 0,
        coursePrice2: 0,
        coursePrice3: 0,
        courseCommission0: 0,
        courseCommission1: 0,
        courseCommission2: 0,
        courseCommission3: 0,
        requiresInstructor: true
      }:{
        courseName: selCourse.name,
        coursePrice0: selCourse.price[0],
        coursePrice1: selCourse.price[1],
        coursePrice2: selCourse.price[2],
        coursePrice3: selCourse.price[3],
        courseCommission0: selCourse.commission[0],
        courseCommission1: selCourse.commission[1],
        courseCommission2: selCourse.commission[2],
        courseCommission3: selCourse.commission[3],
        requiresInstructor: selCourse.requiresInstructor
      })
    });
  }

  getCourses = () => {
    //get courses and set to state
    api.getAllCourses().then(response=>{
      this.setState({courses:response.data, selectedCourse: "0"}, ()=>{
        this.populateCourseForm({target:{value:"0"}});
      });
    });
  }

  saveUser = () => {
    if(this.state.selectedUser === "0") {
      api.createNewUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        isAdmin: this.state.isAdmin,
        isPayroll: this.state.isPayroll,
        isCaptain: this.state.isCaptain,
        isInstructor: this.state.isInstructor,
        crewRate: this.state.crewRate,
        captainRate: this.state.captainRate,
        hourlyRate: this.state.hourlyRate,
      }).then(response=>{
        this.setState({userModalOpen: false});
        alert("User Saved");
        this.getUsers();
        return;
      });
    }
    var update = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      isAdmin: this.state.isAdmin,
      isPayroll: this.state.isPayroll,
      isCaptain: this.state.isCaptain,
      isInstructor: this.state.isInstructor,
      crewRate: this.state.crewRate,
      captainRate: this.state.captainRate,
      hourlyRate: this.state.hourlyRate,
    };
    if(!!this.state.password) {
      update.password = this.state.password;
    }

    api.updateUser(this.state.selectedUser, {update:update})
    .then(response=>{
      this.setState({userModalOpen: false});
      alert("User Saved");
      this.getUsers();
    });
  }

  saveCourse = () => {
    if(this.state.selectedCourse === "0") {
      api.createNewCourse({
        name: this.state.courseName,
        requiresInstructor: this.state.requiresInstructor,
        price: [
          this.state.coursePrice0,
          this.state.coursePrice1,
          this.state.coursePrice2,
          this.state.coursePrice3
        ],
        commission: [
          this.state.courseCommission0,
          this.state.courseCommission1,
          this.state.courseCommission2,
          this.state.courseCommission3
        ]
      }).then(response=>{
        this.setState({classesModalOpen: false});
        alert("Course Saved");
        this.getCourses();
        return;
      });
    }
    var update = {
      name: this.state.courseName,
      requiresInstructor: this.state.requiresInstructor,
      price: [
        this.state.coursePrice0,
        this.state.coursePrice1,
        this.state.coursePrice2,
        this.state.coursePrice3
      ],
      commission: [
        this.state.courseCommission0,
        this.state.courseCommission1,
        this.state.courseCommission2,
        this.state.courseCommission3
      ]
    };

    api.updateCourse(this.state.selectedCourse, {update:update})
    .then(response=>{
      this.setState({classesModalOpen: false});
      alert("Course Saved");
      this.getCourses();
    });
  }

  deleteUser = () => {
    api.deleteUser(this.state.selectedUser)
    .then(response=>{
      this.setState({userModalOpen: false});
      alert("User Deleted");
    });
    this.getUsers();
  }

  deleteCourse = () => {
    api.deleteCourse(this.state.selectedCourse)
    .then(response=>{
      this.setState({classesModalOpen: false});
      alert("Course Deleted");
    });
    this.getCourses();
  }

  componentDidMount() {
    this.getCourses();
    this.getUsers();
  }

  render() {
    return (
      <div>
        <button onClick={this.openUserModal}>Manage Users</button>
        <button onClick={this.openClassesModal}>Manage Classes</button>
        <button onClick={this.openMessageModal}>Message Users</button>

        <Modal open={this.state.userModalOpen} onClose={this.closeUserModal} center>
          <div>  
            <select onChange={this.populateUserForm}>
              <option value="0">New User</option>
              {this.state.users.map(user=>(<option value={user._id}>{`${user.firstName} ${user.lastName}`}</option>))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <label>First Name</label>
              <input type="text" value={this.state.firstName} name="firstName" placeholder="John" onChange={e=>this.setState({firstName:e.target.value})}/>
              </div>
            <div className="col-md-6 col-12">
              <label>Last Name</label>
              <input type="text" value={this.state.lastName} name="lastName" placeholder="Doe" onChange={e=>this.setState({lastName:e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <label>Username</label>
              <input type="text" value={this.state.username} name="username" placeholder="jdoe" onChange={e=>this.setState({username:e.target.value})}/>
            </div>
            <div className="col-md-6 col-12">
              <label>Email</label>
              <input type="email" value={this.state.email} name="email" placeholder="jdoe@domain.com" onChange={e=>this.setState({email:e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <label>Password</label>
              <input type="text" value={this.state.password} name="password" placeholder="scuba12345" onChange={e=>this.setState({password:e.target.value})}/>
            </div>
            <div className="col-md-6 col-12">
              <label>Phone</label>
              <input type="text" value={this.state.phone} name="phone" placeholder="9876543210" onChange={e=>this.setState({phone:e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-6">
              <label>Admin:</label>
              <input type="checkbox" checked={this.state.isAdmin}name="isAdmin" onChange={e=>this.setState({isAdmin:e.target.checked})}/>
            </div>
            <div className="col-md-3 col-6">
              <label>Payroll:</label>
              <input type="checkbox" checked={this.state.isPayroll}name="isPayroll" onChange={e=>this.setState({isPayroll:e.target.checked})}/>
            </div>
            <div className="col-md-3 col-6">
              <label>Captain:</label>
              <input type="checkbox" checked={this.state.isCaptain}name="isCaptain" onChange={e=>this.setState({isCaptain:e.target.checked})}/>
            </div>
            <div className="col-md-3 col-6">
              <label>Instructor:</label>
              <input type="checkbox" checked={this.state.isInstructor}name="isInstructor" onChange={e=>this.setState({isInstructor:e.target.checked})}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-6">
              <label>Crew Rate:</label>
              <input type="number" value={this.state.crewRate} name="crewRate" placeholder="40" onChange={e=>this.setState({crewRate:e.target.value})}/>
            </div>
              {this.state.isCaptain?(
                <div className="col-md-4 col-6">
                  <label>Captain Rate:</label>
                  <input type="number" value={this.state.captainRate} name="captainRate" placeholder="70" onChange={e=>this.setState({captainRate:e.target.value})}/>
                </div>
                ): 
                null
              }
            <div className="col-md-4 col-6">
              <label>Hourly Rate:</label>
              <input type="number" value={this.state.hourlyRate} name="hourlyRate" placeholder="15" onChange={e=>this.setState({hourlyRate:e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success col-md-6 col-12" onClick={this.saveUser}>Save</button>
            <button className="btn btn-danger col-md-6 col-12" onClick={this.deleteUser}>Delete</button>
          </div>
        </Modal>

        <Modal open={this.state.classesModalOpen} onClose={this.closeClassesModal} center>
          <div>  
            <select onChange={this.populateCourseForm}>
              <option value="0">New Course</option>
              {this.state.courses.map(course=>(<option value={course._id}>{course.name}</option>))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <label>Course Name</label>
              <input type="text" value={this.state.courseName} name="courseName" placeholder="Open Water" onChange={e=>this.setState({courseName:e.target.value})}/>
            </div>
            <div className="col-md-6 col-12">
              <label>Instructor Needed:</label>
              <input type="checkbox" checked={this.state.instructorNeeded}name="instructorNeeded" onChange={e=>this.setState({instructorNeeded:e.target.checked})}/>
            </div>
          </div>
          <h5>Price:</h5>
          <div className="row">
            <div className="col-md-3 col-6">
              <label>1: $</label>
              <input type="number" min={0} value={this.state.coursePrice0} onChange={e=>this.setState({coursePrice0:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>2: $</label>
              <input type="number" min={0} value={this.state.coursePrice1} onChange={e=>this.setState({coursePrice1:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>3: $</label>
              <input type="number" min={0} value={this.state.coursePrice2} onChange={e=>this.setState({coursePrice2:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>4: $</label>
              <input type="number" min={0} value={this.state.coursePrice3} onChange={e=>this.setState({coursePrice3:e.target.value})}/> 
            </div>
          </div>
          <h5>Commission:</h5>
          <div className="row">
            <div className="col-md-3 col-6">
              <label>1: $</label>
              <input type="number" min={0} value={this.state.courseCommission0} onChange={e=>this.setState({courseCommission0:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>2: $</label>
              <input type="number" min={0} value={this.state.courseCommission1} onChange={e=>this.setState({courseCommission1:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>3: $</label>
              <input type="number" min={0} value={this.state.courseCommission2} onChange={e=>this.setState({courseCommission2:e.target.value})}/> 
            </div>
            <div className="col-md-3 col-6">
              <label>4: $</label>
              <input type="number" min={0} value={this.state.courseCommission3} onChange={e=>this.setState({courseCommission3:e.target.value})}/> 
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success col-md-6 col-12" onClick={this.saveCourse}>Save</button>
            <button className="btn btn-danger col-md-6 col-12" onClick={this.deleteCourse}>Delete</button>
          </div>
        </Modal>

        <Modal open={this.state.messageModalOpen} onClose={this.closeMessageModal} center>
        </Modal>
      </div>
    );
  }
}

export default Admin;