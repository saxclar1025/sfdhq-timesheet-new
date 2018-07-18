import React, {Component} from "react";
import Modal from "react-responsive-modal";
import api from "./../util/api";

class LoginModal extends Component {
  state = {
    username: "",
    password: "",
    isOpen: this.props.isOpen
  }

  login = ()=>{
    api.login(this.state.username, this.state.password)
    .then(response=>{
      api.getCurrentUser()
      .then(response=>{
        this.props.setUser(response.data);
        console.log(response.data)
        this.setState({isOpen:false});
      });
    })
    .catch(err=>{
      alert("Incorrect username or password!");
      this.setState({username:"", password:""});
    })
  }

  render() {
    return (
      <Modal open={this.state.isOpen}>
        <div className="row mx-auto">
          <div className="col-md-6 col-12">
            <label>Username:</label>
            <input type="text" name="username" onChange={e=>this.setState({username:e.target.value})} placeholder="jdoe" value={this.state.username}/>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-md-6 col-12">
            <label>Password:</label>
            <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})} placeholder="password" value={this.state.password}/>
          </div>
        </div>
        <button className="btn btn-success" onClick={this.login}>Login</button>
      </Modal>
    );
  }
}

export default LoginModal;