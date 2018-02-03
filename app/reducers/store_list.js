const initialState = {
    data: [],
    categories: [],
    meta: {
        searchTerm: ''
    }
};

export default function (state = initialState, action) {

    switch (action.type) {
        case "FETCH_STORE_LIST":
            return {
                data: action.payload.data.stores,
                categories: action.payload.data.categories,
                meta: {
                    searchTerm: ''
                }
            }
        case "FILTER_STORE_LIST":
            return {
                data: state.data,
                categories: state.categories,
                meta: {
                    searchTerm: action.payload
                }
            }
        case "FETCH_CATEGORY_STORE_LIST":
            return {
                data: action.payload.data.stores,
                categories: state.categories,
                meta: {
                    searchTerm: ''
                }
            }
        default:
            return state;
    }
}
