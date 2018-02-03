const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {
        case "FETCH_CATEGORY_OFFER_LIST":
        return action.payload.data.offers
        case "FILTER_CATEGORY_OFFER_LIST":
        return action.payload.data.offers
        default:
            return state;
    }
}
