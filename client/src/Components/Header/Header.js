import React from 'react';
import './Header.css';
import HeaderLink from "./../HeaderLink/HeaderLink";

const Header = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={require("./sfdhq-logo.png")} width="50" height="50" alt="South Florida Diving Headquarters Logo"></img>
        <span className="welcome-text">Welcome, {props.user}</span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.isAdmin ? (<HeaderLink href="/admin" text="Admin"/>) : null}
          {props.isPayroll ? (<HeaderLink href="/payroll" text="Payroll"/>) : null}
          <HeaderLink href="/tasks" text="Log Tasks"/>
          <HeaderLink href="/week" text="My Week"/>
        </ul>
      </div>
    </nav>
  )
}

export default Header;