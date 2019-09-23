//! All Reducers here
import { combineReducers } from "redux"

export default combineReducers({
  user: user,
  allUsers: allUsers
})

function user(state = {}, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...action.user,
        isLoggedIn: true
      }
    case "LOGOUT_USER":
      return {
        user: {},
        isLoggedIn: false
      }
    default:
      return state
  }
}

function allUsers(state = [], action) {
  switch (action.type) {
    case "SET_ALL_USERS":
      return { ...action.allUsers }
    default:
      return state
  }
}
