import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Payroll from "./Components/Payroll/Payroll";

const pages = ["tasks", "admin", "payroll", "week"];

class App extends Component {
  state = {
    page: pages[0]
  }

  render() {
    return (
      <div>
        <Header user="Sam" isPayroll="true"/>
        <Payroll />
      </div>
    );
  }
}

export default App;
