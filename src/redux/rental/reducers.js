import * as type from "./types";

const INITIAL_STATE = {
    forRent: [],
    rentIn: [],
    rentOut: [],
    myRental: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case type.FETCH_RENTAL:
            return { ...state, ...action.payload };
        
            default:
                return state;
    }
}