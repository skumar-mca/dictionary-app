import * as type from '../action-types';
const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case type.SET_LOADER: return { ...state, loading: action.flag };
        default:
            return state;
    }
}
