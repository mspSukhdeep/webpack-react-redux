import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStoreList } from '../actions';

import SearchBar from '../components/search_bar';
import SearchFilter from '../components/search_filter';
import StoreCard from '../components/cards/store_card';

class StoreList extends Component {
    constructor(props){
        super(props);

    }
    componentWillReceiveProps(newProps){
        if(newProps.category != this.props.category){
            this.props.fetchStoreList(newProps.category);
        }
    }
    componentDidMount() {
            this.props.fetchStoreList();
            this.props.category && this.props.fetchStoreList(this.props.category);
    }
    renderStoreList(){
        if(this.props.stores.data.length>0){
            return this.props.stores.data.reduce((filtered, store)=>{
                if(store.store_name.toLowerCase().indexOf(this.props.stores.meta.searchTerm) > -1){
                    filtered.push(<StoreCard key={store.store_name} store={store} />);
                }
                return filtered;
            }, [])
        } else{
            return <StoreCard store={{isEmpty: true}} />
        }
    }
    render() {
        return(
            <div>
                <SearchBar />
                <SearchFilter categories={this.props.stores.categories} type="stores" active={this.props.category} />

                <div className="sctn card-list-wrpr">
                    {
                        this.renderStoreList()
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stores: state.stores
    }
}
export default connect(mapStateToProps, { fetchStoreList })(StoreList);
