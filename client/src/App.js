import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Payroll from "./Components/Payroll/Payroll";
import Admin from "./Components/Admin/Admin";
import Week from "./Components/Week/Week";
import Tasks from "./Components/Tasks/Tasks";

class App extends Component {
  state = {
    page: "tasks",
    user: {
      username: "sfalcon",
      firstName:"Sam",
      lastName:"Falcon",
      _id:"12345",
      isPayroll:true,
      isAdmin:true}
  }

  openTasks = e=>{
    console.log("clicked");
    this.setState({page:"tasks"});
  }

  openAdmin = e=>{
    console.log("clicked");
    this.setState({page:"admin"});
  }

  openPayroll = e=>{
    console.log("clicked");
    this.setState({page:"payroll"});
  }

  openWeek = e=>{
    console.log("clicked");
    this.setState({page:"week"});
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
      </div>
    );
  }
}

export default App;
