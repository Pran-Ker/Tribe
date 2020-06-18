const INITIAL_STATE = {
    auth: ""
}

const authReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case "AUTH_DETAILS":
            return{
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;