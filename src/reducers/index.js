//! All Reducers here
import { combineReducers } from "redux"
import user from "./user"
import allUsers from "./allUsers"
import allTags from "./allTags"
import allSongs from "./allSongs"
import displayUser from "./displayUser"
import displayComments from "./displayComments"
import displaySong from "./displaySong"
import followeds from "./followeds"
import followers from "./followers"
import currentRelationship from "./currentRelationship"

// TODO Separate into respective files

export default combineReducers({
  // * current user w/ relationships related to user
  user: user,
  followeds: followeds,
  followers: followers,
  // * gathers as much data on mount
  allUsers: allUsers,
  allSongs: allSongs,
  // allComments: allComments,
  // * Sets displayed user/song/comments for show pages
  displayUser: displayUser,
  displaySong: displaySong,
  displayComments: displayComments,
  allTags: allTags,
  currentRelationship: currentRelationship,
})

// TODO Remove allComments, and only have display ones
// function allComments(state = [], action) {
//   switch (action.type) {
//     case "SET_ALL_COMMENTS":
//       return [...action.allComments]
//     case "ADD_NEW_COMMENT":
//       return [...state, action.comment]
//     case "DELETE_COMMENT":
//       const newDisplayComments = state.filter(
//         (comment) => comment.id !== action.comment_id
//       )
//       return newDisplayComments
//     default:
//       return state
//   }
// }
