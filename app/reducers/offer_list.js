const initialState = {
    data: [],
    categories: [],
    meta: {
        searchTerm: ''
    }
};

export default function (state = initialState, action) {

    switch (action.type) {
        case "FETCH_OFFER_LIST":
            return {
                data: action.payload.data.offers,
                categories: action.payload.data.categories,
                meta: {
                    searchTerm: ''
                }
            }
        case "FILTER_OFFER_LIST":
            return {
                data: state.data,
                categories: state.categories,
                meta: {
                    searchTerm: action.payload
                }
            }
        default:
            return state;
    }
}
