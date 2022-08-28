import react from 'react';
import { useState, useEffect, useCallback } from "react";
import './styles.css';

import axios from 'axios';

//  const ReadChange= (readType) =>{
//     const date1 = document.getElementById("sdate");
//     console.log(date1);
//    if(date1!=undefined){
//      date1.style="display:none;";   
//     date1.disabled=false;
//    }
// };






const Modal=({show,item,onClose})=>{
   
    const [readType,setRead]=useState(false);
    const [startDate,setDate1]=useState();
    const [endDate,setDate2]=useState();  
    const [seek,setSeek]=useState(1);
    const [user1,setUser]=useState(0);
    const [thumb,setThumb]=useState();  
    
    function onSubmit(e){
        e.preventDefault();
        if(readType===false){
        const newBook = { 

            title:item.volumeInfo.title,
            username:localStorage.getItem("user"),
            author:item.volumeInfo.authors,
            uid: item.id,
            read: readType,
            sDate: startDate,
            eDate: endDate,
            rating: seek,
            thumbnail: item.volumeInfo.imageLinks.smallThumbnail
        }
        axios.post('http://localhost:3000/create', newBook)
        alert("submitted");
    }
    else{
        const newBook = { 

            title:item.volumeInfo.title,
            username:localStorage.getItem("user"),
            author:item.volumeInfo.authors,
            uid: item.id,
            read: readType,
            thumbnail: item.volumeInfo.imageLinks.smallThumbnail
        }
        axios.post('http://localhost:3000/create', newBook)
        alert("submitted");
    }
}
    

    if(!show)
    {
        console.log(startDate)
        return null;
    }
    else{
    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    return(
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><i class="fas fa-times"></i></button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <form onSubmit={onSubmit}>
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <h3>{item.volumeInfo.authors}</h3>
                            <br/>
                            <div className="read-type">
                                <select name="read-type" id="rstatus" onChange={(e)=>setRead(e.target.value)}>
                                    <option value={false}>Completed</option>
                                    <option value={true}>Want to read</option>
                                </select>                         
                            </div>
                            <br/>
                            <div className="start-date" >
                               <lable> Started on &ensp;: </lable><input className="date1" type="date" id="sdate" onChange={(e)=>setDate1(e.target.value)}  disabled={readType==='true'?true:false} />   
                            </div>
                            <br/>
                            <div className="end-date" >
                            <lable> Finished on : </lable>   <input className="date2" type="date" min={startDate} id="enddate" onChange={(e)=>setDate2(e.target.value)} disabled={readType==='true'?true:false}/>  
                            </div>
                            <br/>
                            <div className="seek-bar">
                            <lable>Rating : </lable><input type="range" className="seekbar" min="1" max="5" step= "1" defaultValue="1" class="slider" id="myRange" onChange={(e)=>setSeek(e.target.value)} disabled={readType==='true'?true:false}/> {seek}

                            </div>
                            <br/>
                            <div className="sub">
                                <button type="submit" className="sub1">Submit</button>
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

export default Modal;