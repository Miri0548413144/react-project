import * as Actions from './action'
const initalseState = {
    user: null,
    recipes: [],
    categories: [],
    toShopping: []
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case Actions.GET_TO_SHOPPING:
            return { ...state, toShopping: action.payload }
        case Actions.EDIT_TO_SHOPPING:
            {
                const toShopping = [...state.toShopping];
                const findIndex = toShopping.findIndex(x => x.Id == action.payload.Id);
                if (findIndex >= 0)
                    toShopping[findIndex] = action.payload;
                else toShopping.push(action.payload);
                return { ...state, toShopping }
            }
        case Actions.SET_RECIPE:
            return { ...state, recipes: action.data }
        case Actions.ADD_RECIPE:
            const recipes = [...state.recipes];
            recipes.push(action.payload);
            return { ...state, recipes }
        case Actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id == action.payload.Id);
            recipes[findIndex] = action.payload;
            return { ...state, recipes }
        }
        case Actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.Id != action.payload.Id);
            return { ...state, recipes }
        }
        case Actions.DELETE_PRODUCT: {
            const toShopping = state.toShopping.filter(x => x.Id != action.payload.Id);
            return { ...state, toShopping }
        }
        case Actions.SET_USER:
            return { ...state, user: action.payload }
        case Actions.GET_CATEGORIES:
            return { ...state, categories: action.payload }
        case Actions.ADD_CATEGORY:
            const categories = [...state.categories];
            categories.push(action.payload);
            return { ...state, categories }
        case Actions.GET_RECIPES:
            return { ...state, recipes: action.payload }
        default: return { ...state }
    }
}

export default reducer;