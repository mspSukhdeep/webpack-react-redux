import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _utils from '../utils';
import style from '../../style/header.css';

export default class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            isDropdownShown: false,
            userData: {
                isLoggedIn: _utils.getCookie("msp_login"),
                email: _utils.getCookie("msp_login_email"),
                name: _utils.getCookie("msp_login_name"),
                cashback: _utils.getCookie("msp_loyalty_points"),
                image: _utils.getCookie("msp_user_image")
            }
        }
        console.log(this.state);
    }
    toggleDropdown(){
        console.log("Called");
        this.setState({
            isDropdownShown: !this.state.isDropdownShown
        });
    }
    logout(){
        _utils.deleteCookie('msp_loyalty_points');
        _utils.deleteCookie('msp_login_email');
        _utils.deleteCookie('msp_login_name');
        _utils.deleteCookie('msp_user_image');
        _utils.deleteCookie('msp_login');

        this.setState({
            userData: {}
        })
    }
    render() {
        return (
            <header className="clearfix">
                <Link to="/" className="logo">
                    <img className="logo__img" src="https://assets.mspcdn.net/f_auto,c_scale,w_540/bonus_in/logo/bonus-by-msp_white.png" alt="bonusapp" />
                </Link>
                <div className="usr_sctn" onClick={()=>this.toggleDropdown()}>
                    <img className="usr_img" src={this.state.userData.image?this.state.userData.image:"https://assets.mspcdn.net/msp-ui/icons/account-circle@2x.png"} alt="User Image" />
                    <div className={this.state.isDropdownShown?"usr_drpdwn usr_drpdwn--vsbl":"usr_drpdwn"}>
                            {
                                !this.state.userData.isLoggedIn && (
                                    <div className="usr_drpdwn_inr">
                                        <div className="btn js-lgn" data-page="login">Login</div>
                                        <div className="usr_drpdwn__txt">New User? <a className="link js-lgn" data-page="signup" href="#">Sign up</a></div>
                                    </div>
                                )
                            }
                            {
                                this.state.userData.isLoggedIn && (
                                    <div className="usr_drpdwn_inr usr_drpdwn_inr--info">
                                        <div  className="usr_drpdwn__sctn">
                                            <div className="usr_drpdwn__name">Hi {this.state.userData.name}</div>
                                            <div className="usr_drpdwn__email">{this.state.userData.email}</div>
                                        </div>
                                        <a className="usr_drpdwn__sctn" href="/me/">
                                            <div className="usr_drpdwn__my-cb">My Cashback</div>
                                        </a>
                                        <div  className="usr_drpdwn__sctn" onClick={()=>this.logout()}>Logout</div>
                                    </div>
                                )
                            }
                    </div>
                </div>
            </header>
        );
    }
}
