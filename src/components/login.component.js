import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './log.css'
import {Alert} from 'react-bootstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user:"",
          email: "",
          password: "",
          status1:"",
          EmailErr:false,
          UserError:false,
           validEmail : new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'),
            validUser : new RegExp('.'),
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
      }
     
        validate(e){
          e.preventDefault();
        if (!this.state.validEmail.test(this.state.email)) {
           this.setState({EmailErr:true});
          return
        }
        if (!this.state.validUser.test(this.state.user)) {
          this.setState({UserError:true});
          return
        }
        if (this.state.validEmail.test(this.state.email)) {
          this.setState({EmailErr:false});
         
       }
       if (this.state.validUser.test(this.state.user)) {
         this.setState({UserError:false});
         
       }
        this.handleSubmit()
          
     }

      handleSubmit(e) {
        // this.validate();
       
        const {  email, password } = this.state;
        console.log(email, password);
        fetch("http://localhost:3000/login-user", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
              // alert("login successful");
              this.setState({status1:"ok"});
              window.localStorage.setItem("token", data.data);

              localStorage.setItem("user", this.state.user)

              setTimeout(function g() {window.location.href="./search"}, 1000); 
              return true;
            }
            else
            this.setState({status1:"notok"});
          });
      }
  render() {
    
    return <>
     {this.state.status1==="ok" &&<Alert>Login successful</Alert>}
     {this.state.status1==="notok" &&<Alert variant="danger">Login unsuccessful</Alert>}

     
      <div className="big-man">
      <div className="title-main"><div className="title-text">MyBookList</div></div>
      <form> 
      <div className="box">
        <div className="su"><h3>Sign In</h3></div>

        <div className="userl">
          <label>Username</label>
        <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => this.setState({ user: e.target.value })}
          />
          
     {this.state.UserError=== true &&<Alert variant="danger">Username invalid</Alert>}
          <div className="emailL">
          <label>Email address</label>
         
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
            
          />
          {this.state.EmailErr=== true &&<Alert variant="danger">Email invalid</Alert>}
    
          </div>
        </div>
        <div className="passl">
          <label>Password</label>
          <div>
            
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
          
           
          </div>
        </div>
        <div>
       
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
        </div>
        <div className="d-grid">
          
          <button type="submit" onClick={e=>this.validate(e)}   className="button-27">
            Submit
          </button>
        </div>
        </div>
      </form>
      </div>
    </>
  }
}