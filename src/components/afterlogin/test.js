import React from 'react'
import {useState}from "react";
import Card from "./Card";
import axios from "axios";
export default function Test() {
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDh_CrbOBjbmneGiGD1m_AIU4SEMKraBgk')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
        }
    }
    return (
        <div>
           <Card />
        </div>
    )
}
