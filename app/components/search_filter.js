import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../../style/filter.css';

export default class SearchFilter extends Component{

    constructor(props){
        super(props);
        this.state = {
             categories:props.categories,
             collapsedCategories: [],
             isCollapsed: true
        }
    }

    getCategoryStyle(category) {

        if(this.props.active == category.code) {
            return {
                color: "#fff",
                background: category.color,
                borderColor: category.color
            }
        }else{
            return {
                color: category.color,
                background: `#fff`,
                borderColor: category.color
            }
        }
    }

    componentWillReceiveProps(props){
        const isToggleAppended = (category) => {
            return category.code === "collapse"
        }
        !props.categories.some(isToggleAppended) && props.categories.splice(4, 0, {code:"collapse",color:"#444",icon:""});

        if(this.state.categories.length===0){
            this.setState({
                categories: props.categories
            });
        }
    }

    toggleCategories() {
        if(this.state.isCollapsed){
            let collapseItem = this.state.categories.splice(4, 1)[0];
            this.setState({
                isCollapsed:!this.state.isCollapsed,
                categories: [...this.state.categories, collapseItem]
            });
        }else{
            let arrayLen = this.state.categories.length,
                collapseItem = this.state.categories[arrayLen-1];
                this.state.categories.splice(4, 0, collapseItem);
            this.setState({
                isCollapsed:!this.state.isCollapsed,
                categories:this.state.categories.slice(0, -1)
            });
        }

    }

    renderFilterList(categories){
        if(categories.length>0){
            return (
                categories.map(function(category){
                    if(category.code==="collapse"){
                        let buttonType = this.state.isCollapsed?"more":"less";

                            return (
                                <div key="collapse" className={`srch-fltr-item srch-fltr-item--${buttonType}`} onClick={()=>{
                                        this.toggleCategories();
                                    }}>

                                    {buttonType}
                                </div>
                            );
                    }
                    else{
                        return (
                                <Link to={`/${this.props.type}/${category.code}/`} key={category.code} className="srch-fltr-item" style={this.getCategoryStyle(category)}>
                                    <img src={category.icon} className={this.props.active==category.code?"srch-fltr-item__img srch-fltr-item__img--inv":"srch-fltr-item__img"} />
                                    {category.name}
                                </Link>
                        )
                    }
                }, this)
            )
        } else{
            return(
                Array.from(Array(3)).map((value, index)=>{
                    return <div className="srch-fltr-item srch-fltr-item--empty" key={index}></div>
                })
            )
        }
    }

    render(){
        return (
            <div className={this.state.isCollapsed?"srch-fltr-wrpr clearfix":"srch-fltr-wrpr srch-fltr-wrpr--expnd clearfix"} ref={ (divElement) => this.divElement = divElement}>
            {
                this.renderFilterList(this.state.categories)
            }
            </div>
        )
    };
}
