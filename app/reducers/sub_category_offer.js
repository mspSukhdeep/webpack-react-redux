const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case "FETCH_SUB_CATEGORY_OFFERS":
        return action.payload.data.offers
        default:
            return state;
    }
}
