import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCategoryOfferList } from '../actions';

import OfferCard from '../components/cards/offer_card';
import SubCategoryOffers from './sub_category_offers';
import style from '../../style/offer_page.css';


class CategoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: props.match.params.category_name,
            subCategor: props.match.params.sub_category_name
        }
    }
    componentDidMount(){
        this.props.fetchCategoryOfferList(this.state.category);
    }
    changeSubCategory(subCategory){
        this.setState({
            subCategory: subCategory
        });
    }
    renderOffers() {
        if(this.state.subCategory){
            return <SubCategoryOffers data={
                    {
                        category: this.state.category,
                        subCategory: this.state.subCategory
                    }
                } />
        }else{
            return (
                <div className="sctn card-list-wrpr">
                {
                    this.props.category.offers.map((offer, currentIndex)=>{
                        return <OfferCard key={currentIndex} offer={offer} />
                    })
                }
                </div>
            )
        }
    }
    render() {
        let _this = this;

        return (
                <div>
                    <Link to="/" className="sctn ctgry-hdr">
                        {this.state.category} Offers
                    </Link>
                    <div className="ctgry-fltr__wrpr">
                        {
                            this.props.category.subcategory.data.map((category, currentIndex)=>{
                                return (
                                    <Link
                                        className={this.state.subCategory==category.code?"ctgry-fltr__item ctgry-fltr__item--actv":"ctgry-fltr__item"}
                                        key={currentIndex}
                                        to={`/category/${_this.state.category}/${category.code}`}
                                        onClick={()=>_this.changeSubCategory(category.code)}>
                                        {category.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                    {
                        this.renderOffers()
                    }
                </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        category: state.category
    }
}
export default connect(mapStateToProps, { fetchCategoryOfferList })(CategoryPage);
