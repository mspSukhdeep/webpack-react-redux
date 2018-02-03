import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOfferList } from '../actions';

import SearchFilter from '../components/search_filter';
import OfferCard from '../components/cards/offer_card';

class OfferList extends Component {
    componentDidMount() {
        if(this.props.offers.data.length==0){
            this.props.fetchOfferList();
        }
    }
    render() {
        return(
            <div className="clearfix">
                <SearchFilter categories={this.props.offers.categories} type="offer" />
                <div className="sctn card-list-wrpr">
                {
                    this.props.offers.data.reduce((filtered, offer, currentIndex)=>{
                        if(offer.store_name.toLowerCase().indexOf(this.props.offers.meta.searchTerm) > -1){
                            filtered.push(<OfferCard key={currentIndex} offer={offer} />);
                        }
                        return filtered;
                    }, [])
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        offers: state.offers
    }
}
export default connect(mapStateToProps, { fetchOfferList })(OfferList);
