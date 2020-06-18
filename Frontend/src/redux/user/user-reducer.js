const INITIAL_STATE = {
    designation: '',
    portfolio: '',
    userdata: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'USER_DESIGNATION':
            return{
                ...state,
                designation: action.payload
            }
        case 'USER_PORTFOLIO':
            return{
                ...state,
                portfolio: action.payload
            }
        default:
            return state
    }
}

export default userReducer;