export const loginHandler = (prevState) => {
    const newState = prevState;
    newState["login"] = true,
    newState["signup"] = false

    return {...newState}
}

export const signupHandler = (prevState) => {
    const newState = prevState;
    newState["login"] = false,
    newState["signup"] = true

    return {...newState}
}