const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case "FETCH_SLIDER_DATA":
        return action.payload.data
        default:
            return state;
    }
}
