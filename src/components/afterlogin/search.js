import React, { Component } from 'react'
import  './styles.css'
import axios from "axios";
import Card from './Card'
import  './style.css'
import photo from '../../images/mag.svg'
import Test from './test.js'
import Displaybooks from "./displaybooks"
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userData: "",
          search: "",
          me:"",
          imgElement:"",
          bookData: [],
          user1:"",
        };
      }
      anim(x){
        this.setState({ search: x });
        // const me = document.getElementById("inp");
      
        
        
      }
      componentDidMount() {
        
        this.state.me=document.getElementById("inp");
        this.state.imgElement=document.getElementById("magni")
        fetch("http://localhost:3000/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data, "userData");
            this.setState({ userData: data.data });
          });
          this.setState({ user1: this.state.userData.uname });
      }
      
      view(){
        window.location.href = "./viewlist";
      }
      binfo(e){
        // e.preventDefault();
        // if(e.key==="Enter")
        // {
          axios.get('https://www.googleapis.com/books/v1/volumes?q='+this.state.search+'&key=AIzaSyDh_CrbOBjbmneGiGD1m_AIU4SEMKraBgk')
          .then(res=>this.setState({bookData:res.data.items}))
          .catch(err=>console.log(err.message))
          

       // }
      }
      logout(){
        localStorage.clear();
        window.location.href="./sign-in";
      }
    render() {
      
      if(this.state.me!==""){
      if(this.state.search===""){
        this.state.me.classList.remove("kopen");
        this.state.me.classList.add("kclose");
        // this.state.imgElement.classList.add("iclose");
         this.state.imgElement.classList.remove("iopen");
        }
    else{
      // this.state.imgElement.classList.remove("iclose");
       this.state.imgElement.classList.add("iopen");
      this.state.me.classList.add("kopen");
      this.state.me.classList.remove("kclose");
    }
  }
  console.log(this.state.bookData);

        return (
          <>
         
          <div className="parent-search">
            <div className="destiny">
              <div className ="w">
                  <h1 >Welcome {this.state.userData.uname}! </h1>
              </div>
             <div className ="btns">
               <button className="btn-vieww" onClick={e=>this.view(e)}>View List</button>
               <button className="btn-vieww" onClick={e=>this.logout(e)}>Logout</button>
             </div>
              <div className="box1">
            
                  <input type="text" className="input" name="txt" id="inp"  onChange={(e) =>  this.anim(e.target.value)}  />

                  <button onClick={e=>this.binfo(e)} className="btni" id="magni"> <img  className="img1" src={photo} height="30" width="30" alt=""></img></button>
              </div>
              </div>
              <div className="container-card" >
                  <Card  book={this.state.bookData} />
              </div>
              
          </div>
          
        </>
        )
    }
}
