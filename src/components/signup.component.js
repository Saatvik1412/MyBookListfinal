import React, { Component } from 'react'
import './log.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {Alert} from 'react-bootstrap';
export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            uname:"",
            email:"",
            password:"",
            status1:"",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const {uname, email, password } = this.state;
        console.log(uname,email,password);
        fetch("http://localhost:3000/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            uname:uname,
            email:email,
            password:password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
              this.setState({status1:data.status});
              // console.log(data.status)
              if(data.status==="ok")
                setTimeout(() => {window.location.href="sign-in"}, 1000);
          });
          
      }
  render() {
    return (
      <>
        {this.state.status1==="ok" &&<Alert>Registration successful</Alert>}
        {this.state.status1==="User Exists" &&<Alert variant="danger">User already exists</Alert>}
      <div className="big-man2">
      <div className="title-main"><div className="title-text">MyBookList</div></div>
      <div className="box">
      <form onSubmit={this.handleSubmit}>
        <div className="su"> <h3>Sign Up</h3></div>

        {/* <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"

          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div> */}
        
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Username" onChange={e=>this.setState({ uname: e.target.value })}/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e=>this.setState({ email: e.target.value })}
          />
        </div>
        <div className="w">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e=>this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
        <Link className="nav-link2" to={'/sign-in'}>
                    Login
                  </Link>
        </div>
          <button type="submit" className="button-27">
            Sign Up
          </button>
      </form>
      </div>
      </div>
      </>
    )
  }
}