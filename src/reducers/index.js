//! All Reducers here
import { combineReducers } from "redux"

export default combineReducers({
  user: user,
  allUsers: allUsers,
  allSongs: allSongs,
  currentSong: currentSong,
  followeds: followeds,
  followers: followers
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
      return  [...action.allUsers ]
    default:
      return state
  }
}

function allSongs(state = [], action) {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return [...action.allSongs]
    default:
      return state
  }
}

function currentSong(state = {},action){
  switch (action.type) {
    case "SET_CURRENT_SONG":
      return { ...action.currentSong }
    default:
      return state
  }
}

function followeds(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWEDS":
      return  [...action.followeds ]
    default:
      return state
  }
}

function followers(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWERS":
      return  [...action.followers ]
    default:
      return state
  }
}
