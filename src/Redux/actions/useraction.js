import * as types from '../constants/actionTypes'
import firebase from '../constants/appconfig';

export function AddData(params) {
    var userarr = params.users;
    var Apparr = params.accounts;
    return (dispatch) => {
        Object.keys(userarr).forEach(function (key) {
            firebase.database().ref('users/' + key).set({
                name: userarr[key].name,
                account: userarr[key].account,
            }).then(function () {
                console.log('Data added succesfully');
            }).catch(function (error) {
                console.log('Synchronization failed', error);
            });
        });
        Object.keys(Apparr).forEach(function (key) {
            firebase.database().ref('accounts/' + key).set({
                apps: Apparr[key].apps
            }).then(function () {
                console.log('Data added succesfully');
            }).catch(function (error) {
                console.log('Synchronization failed', error);
            });
        });
    }
}
export function fetchData(params) {
    return (dispatch) => {
        const db = firebase.database().ref('users');
        const db1 = firebase.database().ref('accounts');
        db.on('value', function (snapshot) {
            if (snapshot.val() !== null) {
                var newUserState = [];
                snapshot.forEach((data) => {
                    const dataVal = data.val()
                    const userId = data.key;
                    db1.child(dataVal.account).once('value', function (accountsnap) {
                        Object.keys(accountsnap.val()).forEach(function (key) {
                            Object.keys(accountsnap.val()[key]).forEach(function (data) {
                                newUserState.push({
                                    id: userId,
                                    name: dataVal.name,
                                    title: accountsnap.val()[key][data].title
                                })
                                dispatch({ type: types.RESPONSE_FETCH_USER, data: newUserState });
                            })
                        })
                    });
                })
            }
            else {
                dispatch({ type: types.RESPONSE_FETCH_USER, data: [] });
            }
        })
    }
}

export function fetchAccounts(params) {
    return async (dispatch) => {
        const db1 = firebase.database().ref('accounts');
        await db1.on('value', function (snapshot) {
            if (snapshot.val() !== null) {
                var newAccountState = [];
                snapshot.forEach((data) => {
                    const AppId = data.key;
                    data.forEach(async (accountdata) => {
                        Object.keys(accountdata.val()).forEach(function (key) {
                            newAccountState.push({
                                id: AppId,
                                name: key,
                                title: accountdata.val()[key].title,
                                ratings: data.val().ratings ? data.val().ratings : 0
                            })
                            dispatch({ type: types.RESPONSE_FETCH_ACCOUNTS, data: newAccountState });
                        })
                    })
                })
            }
        })
    }
}


export function AddRatings(params) {
    return (dispatch) => {
        const db1 = firebase.database().ref('accounts');
         
        db1.child(params.id).update({'ratings': params.rate }).then(function (snapshot) {
            console.log("updated")
        }).catch(function (e) {
            console.log("err", e)
        });
    }
}
