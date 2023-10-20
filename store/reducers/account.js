import {SET_DATA_USER} from '../actions/account'
const initState = {
    "id": 1,
    "name": "Sample",
    "email": "user@test.com",
    "phone": '',
    "verified": 0,
    "email_verified_at": "2021-06-07T12:59:55.000000Z",
    "balance": "516.30",
    "avatar": '',
    "created_at": "2021-07-16T09:27:03.000000Z",
    "updated_at": "2021-07-16T09:27:05.000000Z"
}

export const account = (state = initState, action) => {
        const {type, value, index, id} = action
        switch (type) {
            case SET_DATA_USER: return value;
        
            default: return state;
        }
}