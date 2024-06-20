import { combineReducers } from 'redux'
import auth from './authReducer'
import resume from './resumeReducer'



export default combineReducers({
    auth,
    resume,
})