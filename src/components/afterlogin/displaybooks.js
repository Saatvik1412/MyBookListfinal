import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import "./styles.css"
import Toast from "./Toast"
import Update from "./update"

export default function Displaybooks() {
    const [show,setShow]=useState(false);
    const [bookData,setData]=useState();
    const [change,setChange]=useState(false);
    // const [bookItem,setItem]=useState();
    const [books, setBooks]=useState([{
        title:"",
        username:"",
        uid:"",
        read: "",
        sDate: "",
        eDate: "",
        rating: "",
        thumbnail: ""
    }])

    const [uname1, setUname]=useState();


    useEffect(() => {
        fetch("http://localhost:3000/viewbooks")
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(jsonRes => setBooks(jsonRes));

        setUname(localStorage.getItem("user"));
        
        // books.map(book => {
        //     const title1=book.title;
        //     console.log(book.title)
        //     if(title1!==""){
        //     axios.get('https://www.googleapis.com/books/v1/volumes?q='+book.title+'&key=AIzaSyDh_CrbOBjbmneGiGD1m_AIU4SEMKraBgk')
        //     .then(
        //         res=>{
        //             res.data.items.map( item=>{
        //                     if(item._id===book._id)
        //                         book.thumbnail=item.volumeInfo.imageLinks.smallThumbnail;
        //                 }
        //             )
        //         }
        //     )
        //     .catch(err=>console.log(err.message))
        //     console.log(bookData)
        //     }           
        //     })
        

       
        

        
    }, [])

   function Delete(id){
                setBooks(books.filter(function (w){
                    if(w._id!==id)
                        return w;
                }));
                axios.delete(`http://localhost:3000/deletebook/${id}`)
                .then(res=>
                    console.log(res)
                    
                )
        
    }
    function back(){
        window.location.href = "search"
    }
    return(
        <>
        <div className="viewlist-element" >
        {/* <div className="view"><button>Go Back</button></div> */}
        <div className="view"><button id="eeee" className="btn-vieww" onClick={back}>Go Back</button></div>
        <div className="view"> <h1>Title</h1></div> 
        <div className="view"><h1>Author</h1></div>
        <div className="view"><h1>Status</h1></div>
        <div className="view"><h1>Started on</h1></div>
        <div className="view"><h1>Ended on</h1></div>
        <div className="view"><h1>Rating</h1></div>
        
        </div>
        {
    books.map((book) =>{



        
        let thumbnail = book.uid;
        let title=book.title;
        let readt="Completed";
        if(book.read==="false"){
            readt="Completed";
        }
        if(book.read==="true"){  
            readt="Want to read"
        }
        if(book.username===uname1){
        return(
            <>
            <br/>
        <div className="viewlist-element" >
                 <div className="view"><img height="170" src={book.thumbnail}></img></div>
                 <div className="view"> <h1>{title}</h1></div> 
                 <div className="view"><h1>{book.author}</h1></div>
                 <div className="view"><h1>{readt}</h1></div>
                 <div className="view"><h1>{book.sDate}</h1></div>
                 <div className="view"><h1>{book.eDate}</h1></div>
                 <div className="view"><h1>{book.rating}</h1></div>
                 <div className="view"><button className="btn-view" onClick={()=>{setShow(true)}}><i class="fas fa-edit fa-lg"></i></button></div>
                 <div className="view"><button className="btn-view1" onClick={() => { Delete(book._id)}}><i height="30" width="30" class="fa fa-trash" aria-hidden="true"></i></button></div>
        </div>
                 <br/>
                 
            <Update show={show} item={book} onClose={()=>setShow(false)}/>
            </>
    )
        }
    })

    }
    </>
    )
}

