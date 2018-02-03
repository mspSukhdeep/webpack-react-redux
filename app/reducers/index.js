import { combineReducers } from 'redux';

import StoreListReducer from './store_list';
import OfferListReducer from './offer_list';
import CategoryOfferListReducer from './category_offer_list';
import StoreDetailReducer from './store_details';
import SubCategoryReducer from './sub_category';
import SubCategoyListReducer from './sub_category_offer';
import SliderReducer from './slider';

const rootReducer = combineReducers({
    stores: StoreListReducer,
    offers: OfferListReducer,
    category: combineReducers({
        offers: CategoryOfferListReducer,
        subcategory: combineReducers({
            data: SubCategoryReducer,
            offers: SubCategoyListReducer
        })
    }),
    storeDetails: StoreDetailReducer,
    slider: SliderReducer
});

export default rootReducer;
