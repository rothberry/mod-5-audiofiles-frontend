//! All Reducers here
import { combineReducers } from "redux"

// TODO Separate into respective files

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
  displayComments: displayComments,
  allTags: allTags,
  currentRelationship: currentRelationship,
})

// ! Need to reset store on LOGOUT
function user(state = {}, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...action.user,
        isLoggedIn: true,
        ...state,
      }
    case "LOGOUT_USER":
      return {
        user: {},
      }
    case "UPDATE_USER":
      return {
        ...action.user,
        ...state,
      }
    case "IS_CURRENT_USER":
      return {
        ...state,
        isCurrentUser: action.isCurrentUser,
      }
    default:
      return state
  }
}

function allUsers(state = [], action) {
  switch (action.type) {
    case "SET_ALL_USERS":
      return [...action.allUsers]
    case "ADD_NEW_USER":
      return [...state, action.newUser]
    case "REMOVE_USER":
      const newUserArray = state.filter((user) => user.id !== action.user_id)
      return newUserArray
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
    case "REMOVE_SONG_FROM_FEED":
      const newSongArray = state.filter((so) => so.song.id !== action.song_id)
      return newSongArray
    case "REMOVE_SONGS_FROM_DELETED_USER":
      const newSongArrayFromUser = state.filter(
        (so) => so.song.user_id !== action.user_id
      )
      return newSongArrayFromUser
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
    case "REMOVE_DISPLAY_USER":
      return {}
    default:
      return state
  }
}

function displaySong(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_SONG":
      return action.displaySong
    case "REMOVE_DISPLAY_SONG":
      return {}
    default:
      return state
  }
}

function allComments(state = [], action) {
  switch (action.type) {
    case "SET_ALL_COMMENTS":
      return [...action.allComments]
    case "ADD_NEW_COMMENT":
      return [...state, action.comment]
    case "DELETE_COMMENT":
      const newDisplayComments = state.filter(
        (comment) => comment.id !== action.comment_id
      )
      return newDisplayComments
    default:
      return state
  }
}

function displayComments(state = [], action) {
  switch (action.type) {
    case "SET_DISPLAY_COMMENTS":
      return action.displayComments
    case "ADD_NEW_COMMENT":
      return [...state, action.comment]
    case "DELETE_COMMENT":
      const newDisplayComments = state.filter(
        (comment) => comment.id !== action.comment_id
      )
      return newDisplayComments
    default:
      return state
  }
}

function allTags(state = [], action) {
  switch (action.type) {
    case "SET_ALL_TAGS":
      return [...action.allTags]
    // TODO Add new tags when created
    default:
      return state
  }
}

function currentRelationship(state = {}, action) {
  switch (action.type) {
    case "CURRENT_RELATIONSHIP":
      return { ...action.relationship }
    default:
      return state
  }
}
