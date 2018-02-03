import React from 'react';
import ReactDom from 'react-dom';
import style from '../../../style/popup.css';

const popupWrapper = ".popup-wrpr";

const closePopup = () => {
    ReactDom.render(
        <div></div>
        ,document.querySelector(popupWrapper));
}
const handleClickEvent = (e) => {
    if(e.target.className==="popup"){
        closePopup();
    }
}

export default function(params){
    ReactDom.render(
            <div className="popup" onClick={(e)=>handleClickEvent(e)}>
                <div className="popup__inr">
                    <div className="popup__cb-txt">
                        Login to get <span className="popup__gold">{params.cb}</span> from {params.store}
                    </div>
                    <center>
                        <div className="btn js-lgn" data-href={params.url}>LOGIN</div>
                        <div className="popup__sprtr">OR</div>
                        <a className="popup__link" target="_blank" href={params.url}>Take me directly to store &rsaquo;</a>
                    </center>
                </div>
            </div>,
            document.querySelector(popupWrapper)
    );
}
