const INITIAL_STATE = {
    modalDisplay: false
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'MODAL_OPEN':
            return{
                ...state,
                modalDisplay: true
            }
        case 'MODAL_CLOSE':
            return{
                ...state,
                modalDisplay: false
            }
        default:
            return state;
    }
}

export default modalReducer;