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

class App extends Component {
  state = {
    page: "tasks",
    user: {
      username: "sfalcon",
      firstName:"Sam",
      lastName:"Falcon",
      _id:"12345",
      isPayroll:true,
      isAdmin:true},
    loginModalOpen: true
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

  componentDidMount() {
    api.getCurrentUser().then(response=>{
      console.log(response.data);
      if(!!response.data) {
        this.setState({loginModalOpen:false});
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
          openWeek={this.openWeek}/>
        {this.state.page === "tasks" ? <Tasks /> :
         this.state.page === "admin" ? <Admin /> :
         this.state.page === "payroll" ? <Payroll /> :
         this.state.page === "week" ? <Week /> : null}
         <LoginModal isOpen={this.state.loginModalOpen} setUser={this.setUser}/>
      </div>
    );
  }
}

export default App;
