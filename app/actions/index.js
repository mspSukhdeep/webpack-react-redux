import axios from 'axios';

const API_URL = "https://sukhd.com/proxy/?url=";
const RESOURCE_URL = "http://api.mysmartprice.com/v3/cashback/";

export function fetchStoreList(category) {
    let url = API_URL+encodeURIComponent(`${RESOURCE_URL}get_stores.php`),
        type = "FETCH_STORE_LIST";

    if(category){
        url += `?category=${category}`;
        type = "FETCH_CATEGORY_STORE_LIST";
    }
    const request = axios.get(url);

    return {
        type: type,
        payload: request
    }
}

export function filterStoreList(term) {
    return {
        type: "FILTER_STORE_LIST",
        payload: term
    }
}

export function fetchOfferList() {
    const request = axios.get(API_URL+encodeURIComponent(`${RESOURCE_URL}get_offers.php`));

    return {
        type: "FETCH_OFFER_LIST",
        payload: request
    }
}

export function fetchCategoryOfferList(category) {

    const request = axios.get(API_URL+encodeURIComponent(`${RESOURCE_URL}get_offers.php?category=${category}`));

    return {
        type: "FETCH_CATEGORY_OFFER_LIST",
        payload: request
    }
}

export function fetchStoreDetails(store, category, type) {

    let url = `${RESOURCE_URL}get_offers.php?store=${store}`,
        action = "FETCH_STORE_DETAILS",
        meta = {};
    if(!store){
        action = "REMOVE_STORE_DETAILS";
    }
    else if(category){
            if(type=="subcategory"){
                url += `&subcategory=${category}`;
                action = "FETCH_STORE_SUB_CATEGORY_OFFERS";
            }else{
                url += `&category=${category}`;
                action = "FETCH_STORE_CATEGORY_OFFERS";
            }
            meta.category = category;
    }

    const request = axios.get(API_URL+encodeURIComponent(url));

    return {
        type: action,
        payload: request,
        meta: meta
    }
}

export function fetchSubCategoryOffers(subcategory){
    subcategory = encodeURIComponent(subcategory);

    const request = axios.get(API_URL+encodeURIComponent(`${RESOURCE_URL}get_offers.php?subcategory=${subcategory}`));

    return {
        type: "FETCH_SUB_CATEGORY_OFFERS",
        payload: request,
        meta: {
            category: subcategory
        }
    }
}


export function fetchSliderData(){
    const request = axios.get(API_URL+encodeURIComponent(`${RESOURCE_URL}get_carousel.php`));

    return {
        type: "FETCH_SLIDER_DATA",
        payload: request
    }
}
