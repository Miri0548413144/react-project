import * as Actions from './action'

const initalseState = {
    user: null,
    recipes:null
}

const userReducer = (state = initalseState, action) => {
    switch (action.type) {
        case Actions.SET_USER:
            return { ...state, user: action.payload}
        default: return { ...state }
    }
}
export default userReducer;