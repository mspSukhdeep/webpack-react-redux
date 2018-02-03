import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStoreDetails } from '../actions';
import { Link, Redirect } from 'react-router-dom';

import _utils from '../utils';
import OfferCard from '../components/cards/offer_card';
import style from '../../style/store_page.css';
import history from '../utils/history';

class StorePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            CBSlabExpanded: false
        }
    }
    componentDidMount(){
        this.props.fetchStoreDetails(this.props.match.params.store_name, this.state.subCategory);
    }
    changeCategory(category){
        if(category === this.state.category){
            this.setState({
                category: null
            });
        } else {
            this.props.fetchStoreDetails(this.props.match.params.store_name, category, this.state.children);

            this.setState({
                category: category
            });
            history.push(`/store/${this.props.match.params.store_name}/${category}`);
        }
    }
    getSubCategories(props) {
        let categoryState = {};
        if (Object.keys(props.storeDetails.categories).length === 0){
            categoryState.children = "subcategory";
            categoryState.categories = props.storeDetails.subcategories;
        }else{
            categoryState.children = "category";
            categoryState.categories = props.storeDetails.categories;
        }
        return categoryState;
    }
    componentWillReceiveProps(props){
        let categoryState = this.getSubCategories(props);

        this.setState({
            children: categoryState.children,
            categories: categoryState.categories
        });
    }
    componentWillUnmount(){
        this.props.fetchStoreDetails();
    }
    renderOffers(){
        let offerArray = this.state.category?this.state.categories[this.state.category].offers:this.props.storeDetails.offers;

        return (
            <div className="sctn card-list-wrpr">
                {
                    offerArray.map((offer, currentIndex)=>{
                        return <OfferCard key={currentIndex} offer={offer} />
                    })
                }
            </div>
        )
    }
    renderCategoryFilters(category) {
        return Object.keys(category).map(function(name, currentIndex){
            return (
                <div
                    className={this.state.category==name?"ctgry-fltr__item ctgry-fltr__item--actv":"ctgry-fltr__item"}
                    key={currentIndex}
                    onClick={()=>this.changeCategory(name)}>
                    {category[name].name}
                </div>
            )
        }, this);
    }

    storeGTS(){
        if(this.props.storeDetails.meta.gts_info && this.props.storeDetails.meta.gts_info.length>0) {
            _utils.openPopup("multi-gts",this.props.storeDetails.meta.gts_info);
        } else {
            window.open(this.props.storeDetails.meta.landing_url, "_blank");
        }
    }
    toggleCBSlab(){
        this.setState({
            CBSlabExpanded: !this.state.CBSlabExpanded
        });
    }
    renderCBSlab(rawSlab){
        if(rawSlab){
            return rawSlab.split("##").reduce(function(accumulator, item, index){
                    item = item.split("&&");
                    accumulator.push(
                        <div className="str-hdr__cb-row" key={index}>
                            <div className="str-hdr__cb-prop">
                                    {item[0]}
                            </div>
                            <div className="str-hdr__cb-val">
                                    {item[1]}
                            </div>
                        </div>
                    )
                    return accumulator;
                },[]);
        }

    }
    render() {
        return(
            <div>
                <div className="sctn str-hdr">
                    <div className="str-hdr__inr">
                        <img className="str-hdr__img" src={this.props.storeDetails.meta.image_url} />
                        <div className="str-hdr__info clearfix">
                            <div className="str-hdr__cb">
                                {this.props.storeDetails.meta.generic_text}
                            </div>
                            <a onClick={()=>this.storeGTS()} className="btn str-hdr__btn">
                                SHOP NOW
                            </a>
                        </div>
                    </div>
                    <div className="str-hdr__view-cb" onClick={()=>{this.toggleCBSlab()}}>
                        {this.state.CBSlabExpanded?"Cashback rates":"View Cashback rates"}
                    </div>
                    <div className={this.state.CBSlabExpanded?"str-hdr__cb-dtls str-hdr__cb-dtls--expnd":"str-hdr__cb-dtls"}>
                        <div className="str-hdr__cb-slab">
                            {
                                this.renderCBSlab(this.props.storeDetails.meta.slab)
                            }
                        </div>
                    </div>
                </div>
                {
                    Object.keys(this.state.categories).length>0 && (
                        <div className="str-fltr-wrpr">
                            <div className="str-fltr-wrpr__ttl">{this.props.match.params.store_name} Offers</div>
                            {
                                this.renderCategoryFilters(this.state.categories)
                            }
                        </div>
                    )
                }
                {
                    this.renderOffers()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        storeDetails: state.storeDetails
    }
}
export default connect(mapStateToProps, { fetchStoreDetails })(StorePage);
