import React from 'react';
import ReactDom from 'react-dom';
import style from '../../../style/popup.css';

const handleClickEvent = (e) => {
    if(e.target.className==="popup"){
        ReactDom.render(
            <div></div>
            ,document.querySelector('.popup-wrpr'));
    }
}
export default function(params){
    ReactDom.render(
            <div className="popup" onClick={(e)=>handleClickEvent(e)}>
                <div className="popup__inr">
                    <div className="popup__ttl">
                        What are you looking for?
                    </div>
                        {
                            params.map((category, index)=>{
                                return <a target="_blank" href={category.gts_url} className="btn btn--full" key={index}>{category.subcategory}</a>
                            })
                        }
                </div>
            </div>,
            document.querySelector('.popup-wrpr')
    );
}
