import React from 'react';
import { Link } from 'react-router-dom';

import style from '../../../style/card.css';

export default ({store}) => {
    if(store.isEmpty){
        return (
            <div className="card card--ofr card--ofr--blank">

            </div>
            );
    }else{
        let url_path = '/store/'+store.store_name.toLowerCase();

        return (
            <Link className="card card--ofr" to={url_path}>
                <img className="card__img" src={store.image_url} />
                <a href={store.gts_url} target="_blank" className="btn card__btn" onClick={(e)=>e.stopPropagation()}>SHOP NOW</a>
                <div className="card__sctn clearfix">
                <div className="card__cb">{store.generic_text}</div>
                <div className="card__cnt">{store.offers_count} Offers</div>
                </div>
            </Link>
        );
    }
}
