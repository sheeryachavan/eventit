export const UserDetails = (acceptParams) => {
    return async (dispatch) => {
        let obj = {
            id : acceptParams
        }

        dispatch({ type: "AUTHENTICATING_USER", payload: obj });

    }
}