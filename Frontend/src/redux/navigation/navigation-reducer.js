import {loginHandler, signupHandler} from './navigation-utils';

const INITIAL_STATE = {
    formDisplay: {
        login: false,
        signup: true
    },
    recFormDisplay: {
        login: false,
        signup: true
    }
}

const navigationReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case "LOGIN_FORM":
            return{
                ...state,
                formDisplay: loginHandler(state.formDisplay)
            }
        case "SIGNUP_FORM":
            return{
                ...state,
                formDisplay: signupHandler(state.formDisplay)
            }
        case "REC_SIGNUP_FORM":
            return{
                ...state,
                recFormDisplay: signupHandler(state.recFormDisplay)
            }
        case "REC_LOGIN_FORM":
            return{
                ...state,
                recFormDisplay: loginHandler(state.recFormDisplay)
            }
        default:
            return state
    }
}

export default navigationReducer;