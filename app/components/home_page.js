import React, { Component } from 'react';

import InfoCard from './cards/info_card';
import StoreList from '../containers/store_list';
import OfferList from '../containers/offer_list';
import Slider from './slider';

import style from '../../style/store_list.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "store",
            cardDetails: {
                title: "Earn on every purchase!",
                description: "See How Cashback Works",
                url: "/",
                image: "https://assets.mspcdn.net/f_auto/bonus_in/icon/cb-round.png"
            }
        };
    }
    render(){
        return(
            <div>
                <Slider />
                <div className="str-lst__wrpr">
                    <InfoCard data={this.state.cardDetails} />
                    <div className="sctn str-lst__optn-wrpr clearfix">
                        <div className={this.state.view=='store'?'optn-lnk--actv optn-lnk':'optn-lnk'} onClick={()=>this.selectView("store")}>STORES</div>
                        <div className={this.state.view=='offer'?'optn-lnk--actv optn-lnk':'optn-lnk'}  onClick={()=>this.selectView("offer")}>OFFERS</div>
                    </div>
                    { this.renderView() }
                </div>
            </div>
        );
    }
    selectView(viewType){
        this.setState({
            view:viewType
        });
    }
    renderView(){
        if(this.state.view=="store"){
            return <StoreList category={this.props.match.params.category_name} />;
        }else if(this.state.view=="offer"){
            return <OfferList />;
        }
    }
}
