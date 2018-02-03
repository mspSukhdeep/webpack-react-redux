import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

import { fetchSliderData } from '../actions';
import { connect } from 'react-redux';

import style from '../../style/slider.css';
const NEXT = 'show-next';

const springSettings = {stiffness: 170, damping: 26};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [[340, 170], [340, 170], [340, 170], [340, 170], [340, 170]],
      currPhoto: 0,
      slides: [
          "https://res.cloudinary.com/mspassets/f_auto,q_auto/Z320x180_msp_cashback_isnow_bonusapp_vk9rix.png",
          "https://res.cloudinary.com/mspassets/f_auto,q_auto/A640x320_amazon_great_indian_sale_qmhhlg.png",
          "https://res.cloudinary.com/mspassets/f_auto,q_auto/Ff640x320_1_laufoe.png",
          "https://res.cloudinary.com/mspassets/f_auto,q_auto/Medlife320x180_medlife_banner_02_lb9rpx.png",
          "https://res.cloudinary.com/mspassets/f_auto,q_auto/TT640x320_tatacliq_epictronic_sale_jparks.png"
      ]
    };
    let _this = this;
    this.sliderInterval = setInterval(function(){
                        let photoIndex = _this.state.currPhoto+1;
                        photoIndex = photoIndex >= _this.state.photos.length ? 0 : photoIndex;
                        _this.setState({
                          currPhoto: photoIndex
                        });
                    },5000);
  };
  componentDidMount(){
      this.props.fetchSliderData();
  }
  componentWillReceiveProps(props){
      // this.props.slider.data.map
  }
  componentWillUnmount() {
      clearInterval(this.sliderInterval);
  }
  handleChange = ({target: {value}}) => {
    this.setState({currPhoto: value});
  };

  clickHandler = (btn) => {
    let photoIndex = btn === NEXT ? this.state.currPhoto+1 : this.state.currPhoto-1;

    photoIndex = photoIndex >= 0 ? photoIndex : this.state.photos.length - 1;
    photoIndex = photoIndex >= this.state.photos.length ? 0 : photoIndex;

    this.setState({
      currPhoto: photoIndex
    })
  };

  render() {
    const {photos, currPhoto} = this.state;
    const [currWidth, currHeight] = photos[currPhoto];

    const widths = photos.map(([origW, origH]) => currHeight / origH * origW);

    const leftStartCoords = widths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0);

    let configs = [];
    photos.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings),
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

    return (
      <div>
        <div className="demo4">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {container =>
              <div className="demo4-inner" style={container}>
                {configs.map((style, i) =>
                  <Motion key={i} style={style}>
                    {style =>
                      <img className="demo4-photo" src={this.state.slides[i]} style={style} />
                    }
                  </Motion>
                )}
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        slider: state.slider
    }
}
export default connect(mapStateToProps, { fetchSliderData })(Slider);
