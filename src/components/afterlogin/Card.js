import react from "react";
import { useState } from "react";
import Modal from "./Modal";
import './style.css'

const Card = ({book}) => {
    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    return (
        <>
            {
                book.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    // let amount=item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    let subtitle1="";
                    let title1=item.volumeInfo.title;
                     subtitle1=item.volumeInfo.subtitle;
                    if(subtitle1!==undefined) 
                        if(subtitle1.length>30)
                        subtitle1=" ";
                        else{
                            if(title1.length<16)
                                title1+=" :";
                            else
                                subtitle1=": "+subtitle1;
                        }
                    if(thumbnail!== undefined)
                    {
                        return (
                                <>
                            <div className="book-card" onClick={()=>{setShow(true);setItem(item)}}>
                               <div className="book-img"> <img src={thumbnail} alt="" /></div>
                                <div className="bottom">
                                    <h3 className="title">{title1}</h3>
                                    <h3 className="subtitle">{subtitle1}</h3>
                                </div>
                            </div>
                              <Modal show={show} item={bookItem} onClose={()=>setShow(false)}/>
                            </>
                        )
                    }
                    
                })
            }

        </>
    )
}
export default Card;