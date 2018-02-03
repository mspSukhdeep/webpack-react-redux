import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSubCategoryOffers } from '../actions';

import OfferCard from '../components/cards/offer_card';


class SubCategoryOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            category:props.data.category,
            subCategory: props.data.subCategory
        }
        this.fetchSubCategoryData();
    }
    fetchSubCategoryData() {
        this.props.fetchSubCategoryOffers(this.state.subCategory);
    }
    componentWillReceiveProps(props){
        if(this.state.subCategory!=props.data.subCategory){

            this.setState({
                category:props.data.category,
                subCategory:props.data.subCategory,
                isRendering: true
            }, ()=>{
                this.props.fetchSubCategoryOffers(this.state.subCategory);
            })
        }
        this.setState({
            isRendering: false
        });
    }
    render() {
        return (
                <div className="sctn card-list-wrpr">
                {
                    !this.state.isRendering && this.props.offers.map((offer, currentIndex)=>{
                        return <OfferCard key={currentIndex} offer={offer} />
                    })
                }
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        offers: state.category.subcategory.offers
    }
}
export default connect(mapStateToProps, { fetchSubCategoryOffers })(SubCategoryOffers);
