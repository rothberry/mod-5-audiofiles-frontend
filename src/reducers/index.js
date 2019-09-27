//! All Reducers here
import { combineReducers } from "redux"

export default combineReducers({
  // * current user w/ relationships related to user
  user: user,
  followeds: followeds,
  followers: followers,
  // * gathers as much data on mount
  allUsers: allUsers,
  allSongs: allSongs,
  allComments: allComments,
  // * Sets displayed user/song/comments for show pages
  displayUser: displayUser,
  displaySong: displaySong,
  displayComments: displayComments
  // TODO
  // ? add allTags
  // ? add isCurrentUser to store
  // ? add waveColor
  // ? add progressColor
})

// ! Need to reset store on LOGOUT
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
    // ! Will remove displayUser on logout or next page?
    default:
      return state
  }
}

function displaySong(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_SONG":
      return action.displaySong
    // ! Will remove displaySong on logout or next page?
    default:
      return state
  }
}

function allComments(state = [], action) {
  switch (action.type) {
    case "SET_ALL_COMMENTS":
      return [...action.allComments]
    default:
      return state
  }
}

function displayComments(state=[], action){
  switch (action.type) {
    case "SET_DISPLAY_COMMENTS":
      return action.displayComments
    case "ADD_NEW_COMMENT":
      return [...state, action.comment]
    // case "REMOVE_COMMENT":
    //   return 
    default:
      return state
  }
}
