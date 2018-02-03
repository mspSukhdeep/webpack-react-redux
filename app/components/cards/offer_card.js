import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from '../../../style/card.css';
import _utils from '../../utils';

export default class OfferCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            meta: {
                isCollapsed: true
            }
        }
    }
    renderDetails(pointData){
        return (
            <div className={this.state.meta.isCollapsed?"card__dtls":"card__dtls card__dtls--expnd"}>
                <div className="card__dtls-inr">
                    <div className="card__dtls-ttl">Offer details:</div>
                    <ul className="card__list-wrpr">
                        {
                            pointData.map((point, index)=>{
                                return <li key={index} className="card__list-item">{point}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
    toggleDetails(){
        this.setState({
            meta: {
                isCollapsed: !this.state.meta.isCollapsed
            }
        })
    }
    handleClickEvent(offer) {
        if(_utils.isLoggedin){
            window.open.href(offer.gts,"_blank")
        } else{
            let gtsData = {
                url: offer.gts,
                cb: offer.cashback_text,
                store: offer.store_name
            }
            _utils.openPopup("gts",gtsData);
        }
    }
    render(){
        let {offer} = this.props;
        return (
            <div className="card card--ofr">
                <div className="card__str-info clearfix">
                    <img className="card__icn" src={offer.store_icon} />
                    <span className="card__icn-txt">{offer.store_name}</span>
                </div>
                <div className="card__ttl">
                    {offer.title}
                </div>
                {
                    offer.coupon_code && <div className="card__cpn" onClick={()=>{_utils.copyText(offer.coupon_code)}}>{offer.coupon_code}</div>
                }
                <div className="card__sctn-2 clearfix">
                    <div className="card__cb">{offer.cashback_text}</div>
                    <div className="card__tgl" onClick={()=>this.toggleDetails()}>
                        {
                            this.state.meta.isCollapsed?"Show Details":"Hide Details"
                        }
                    </div>
                </div>
                {
                    this.renderDetails(offer.details)
                }
                <div onClick={()=>this.handleClickEvent(offer)} className="btn btn--full">{offer.cta_text}</div>
            </div>
        );
    }
}
