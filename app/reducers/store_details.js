const initialState = {
    meta: {},
    categories: {},
    subcategories: {},
    offers: []
};

const ConvertToObject = (arr) =>{
    if(!arr){
        return {};
    }
    return arr.reduce((acc, item, index)=>{
	       acc[item.code] = {
               name: item.name,
               offers: []
           }
	   return acc;
    },{});
}

const appendCategoryOffers = (currentCategoryState, newCategoryObject, categoryName)=>{
    let newState =  Object.assign({}, currentCategoryState);
    newState[categoryName]['offers'] = Object.assign([],newCategoryObject);

    return newState;
}

export default function (state = initialState, action) {

    switch (action.type) {
        case "FETCH_STORE_DETAILS":
            return {
                meta: action.payload.data.store_info,
                categories: ConvertToObject(action.payload.data.categories),
                subcategories: ConvertToObject(action.payload.data.subcategories),
                offers: action.payload.data.offers
            }
        case "FETCH_STORE_CATEGORY_OFFERS":
            return {
                meta: state.meta,
                categories: appendCategoryOffers(state.categories, action.payload.data.offers, action.meta.category),
                subcategories: state.subcategories,
                offers: state.offers
            }
        case "FETCH_STORE_SUB_CATEGORY_OFFERS":
            return {
                meta: state.meta,
                categories: state.categories,
                subcategories: appendCategoryOffers(state.subcategories, action.payload.data.offers, action.meta.category),
                offers: state.offers
            }
        case "REMOVE_STORE_DETAILS":
            return initialState;
        default:
            return state;
    }
}
