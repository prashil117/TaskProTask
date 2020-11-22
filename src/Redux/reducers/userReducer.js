import * as types from '../constants/actionTypes'

const initialSettings = {
    userList: [],
    AccountList: [],
    msg: ''
};


const settings = (state = initialSettings, action) => {

    switch (action.type) {
        case types.RESPONSE_FETCH_USER:
            const data = action.data ? action.data : null;
            const mssg = action.data && action.data.length > 0 ? 'Data found' : 'No Data'
            return {
                ...state,
                userList: data,
                msg: mssg
            }
        case types.RESPONSE_FETCH_ACCOUNTS:
            const dataAccounts = action.data ? action.data : null;
            const msg = action.data && action.data.length > 0 ? 'Data found' : 'No Data'
            return {
                ...state,
                AccountList: dataAccounts,
                msg: msg
            }
        default:
            return {
                ...state
            }
    }

}

export default settings
