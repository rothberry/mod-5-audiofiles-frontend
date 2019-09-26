//! All Reducers here
import { combineReducers } from "redux"

export default combineReducers({
  user: user,
  allUsers: allUsers,
  allSongs: allSongs,
  displayUser: displayUser,
  displaySong: displaySong,
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
      return [...action.allUsers]
    default:
      return state
  }
}

function allSongs(state = [], action) {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return [...action.allSongs]
    case "ADD_SONG_TO_FEED":
      return [...state, action.newSong]
    default:
      return state
  }
}

function followeds(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWEDS":
      return [...action.followeds]
    default:
      return state
  }
}

function followers(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWERS":
      return [...action.followers]
    default:
      return state
  }
}

function displayUser(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_USER":
      return action.displayUser
    default:
      return state
  }
}

function displaySong(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_SONG":
      return action.displaySong
    default:
      return state
  }
}
