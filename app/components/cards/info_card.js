import React, { Component } from 'react';
import style from '../../../style/card.css';

export default class InfoCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true
        }
    }
    closeCard() {
        this.setState({
            isVisible: false
        })
    }
    render(){

        return (
            this.state.isVisible && (
                <div className="sctn card-info clearfix">
                    <img className="card-info__img" src={this.props.data.image} />
                    <div className="card-info__dsc">
                        <div className="card-info__ttl">{this.props.data.title}</div>
                        <a href={this.props.data.url} className="card-info__txt">{this.props.data.description}</a>
                    </div>
                    <div className="card-info__cls" onClick={()=>this.closeCard()}>&times;</div>
                </div>
            )
        )
    }
}
