import { faEdit } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import React from 'react'
import { useState, useEffect, useCallback } from "react";

const Update = ({show,item,onClose}) => {
    const [readType,setRead]=useState(false);
    const [startDate1,setDate1]=useState(item.sDate);
    const [endDate1,setDate2]=useState(item.eDate);  
    const [seek,setSeek]=useState(item.rating);
    const [user1,setUser]=useState(0);

    // useEffect(() => {
    //     console.log(startDate1)   
    //     console.log(endDate1)
    // } )

    function edit(id){
        if(readType===false){
         console.log(startDate1)
         console.log(endDate1)
        axios.put('http://localhost:3000/update',{
            id: id,
            read: readType,
            sDate:startDate1,
            eDate:endDate1,
            rating:seek,    
        });
        }
        else{
            axios.put('http://localhost:3000/update',{
                id: id,
                read: readType,
                sDate:"",
                eDate:"",
                rating:"",    
            });
        }
    }
        if(!show)
        {   
            return null;
        }
        else{
        // let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        return(
            <>
                <div className="overlay">
                    <div className="overlay-inner">
                        <button className="close" onClick={onClose}><i class="fas fa-times"></i></button>
                        <div className="inner-box">
                            {/* <img src={thumbnail} alt="" /> */}
                            <form onSubmit={(e)=>edit(item._id)}>
                            <div className="info">
                                {/* <h1>{item.volumeInfo.title}</h1>
                                <h3>{item.volumeInfo.authors}</h3> */}
                                <div className="read-type">
                                    <select name="read-type" id="rstatus" onChange={(e)=>setRead(e.target.value)}>
                                        <option value={false}>Completed</option>
                                        <option value={true}>Want to read</option>
                                    </select>                         
                                </div>
                                <br/>
                                <div className="start-date" >
                                <lable> Started on &ensp;: </lable> <input className="date1" type="date" id="sdate" defaultValue={startDate1} onChange={(e)=>{setDate1(e.target.value);}}  disabled={readType==='true'?true:false} />   
                                </div>
                                <br/>
                                <div className="end-date" >
                                <lable> Finished on : </lable>     <input className="date2" type="date" min={startDate1}  defaultValue={endDate1} id="enddate" onChange={(e)=>{setDate2(e.target.value);}} disabled={readType==='true'?true:false}/>  
                                </div>
                                <br/>
                                <div className="seek-bar">
                                <lable>Rating : </lable> <input type="range" className="seekbar" min="1" max="5" step= "1" defaultValue={item.rating} class="slider" id="myRange" onChange={(e)=>setSeek(e.target.value)} disabled={readType==='true'?true:false}/> {seek}
    
                                </div>
                                <br/>
                                <div className="sub">
                                    <button type="submit" className="sub1" >Submit</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
   
}

export default Update;