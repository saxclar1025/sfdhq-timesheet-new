import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Payroll from "./Components/Payroll/Payroll";
import Admin from "./Components/Admin/Admin";
import Week from "./Components/Week/Week";
import Tasks from "./Components/Tasks/Tasks";
import axios from "axios";
import api from "./Components/util/api";
import LoginModal from "./Components/LoginModal/LoginModal";
import Modal from "react-responsive-modal";

class App extends Component {
  state = {
    page: "tasks",
    user: {},
    loginModalOpen: false,
    loginUsername: "",
    loginPassword: ""
  }

  openTasks = e=>{
    this.setState({page:"tasks"});
  }

  openAdmin = e=>{
    this.setState({page:"admin"});
  }

  openPayroll = e=>{
    this.setState({page:"payroll"});
  }

  openWeek = e=>{
    this.setState({page:"week"});
  }

  setUser = user=>{
    this.setState({user:user});
  }

  login = e=>{
    e.preventDefault();
    api.login(this.state.loginUsername, this.state.loginPassword)
    .then(response=>{
      api.getCurrentUser()
      .then(response=>{
        this.setUser(response.data);
        console.log(response.data)
        this.setState({loginModalOpen:false});
      });
    })
    .catch(err=>{
      alert("Incorrect username or password!");
      this.setState({username:"", password:""});
    })
  }

  logout = e=>{
    api.logout()
    .then(()=>{
      this.setState({user:{}, loginModalOpen:true});
    });
  }

  componentDidMount() {
    api.getCurrentUser().then(response=>{
      console.log(response.data);
      if(response.data.username) {
        this.setState({loginModalOpen:false, user:response.data}, function(){console.log(this.state.loginModalOpen)});
      }
      else {
        this.setState({loginModalOpen:true, user:{}});
      }
    })
  }

  render() {
    return (
      <div>
        <Header user={this.state.user.firstName}
          isPayroll={this.state.user.isPayroll}
          isAdmin={this.state.user.isAdmin}
          openTasks={this.openTasks}
          openAdmin={this.openAdmin}
          openPayroll={this.openPayroll}
          openWeek={this.openWeek}
          logout = {this.logout}/>
        {this.state.page === "tasks" ? <Tasks /> :
         this.state.page === "admin" ? <Admin /> :
         this.state.page === "payroll" ? <Payroll /> :
         this.state.page === "week" ? <Week /> : null}
        <Modal open={this.state.loginModalOpen} onClose={e=>null}>
          <form onSubmit={this.login}>
            <div className="row mx-auto">
              <div className="col-md-6 col-12">
                <label>Username:</label>
                <input type="text" name="username" onChange={e=>this.setState({loginUsername:e.target.value})} placeholder="jdoe" value={this.state.loginUsername}/>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col-md-6 col-12">
                <label>Password:</label>
                <input type="password" name="password" onChange={e=>this.setState({loginPassword:e.target.value})} placeholder="password" value={this.state.loginPassword}/>
              </div>
            </div>
            <button className="btn btn-success" onClick={this.login}>Login</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
