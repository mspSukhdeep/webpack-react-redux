import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { filterStoreList } from '../actions';
import style from '../../style/search_bar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            categories: this.props
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event) {
        this.setState({
            term: event.target.value.toLowerCase()
        },()=>{
            this.props.filterStoreList(this.state.term);
        });
    }
    onFormSubmit(event) {
        event.preventDefault();
        this.props.filterStoreList(this.state.term);
    }

    render() {
        return (
            <div className="sctn srch-wrpr clearfix">
                    <form onSubmit={this.onFormSubmit}>
                        <input className="inpt inpt--srch" placeholder="Search for stores" value={this.state.term} onInput={this.onInputChange} />
                    </form>
            </div>
        );
    }
}

export default connect(null, { filterStoreList })(SearchBar);
