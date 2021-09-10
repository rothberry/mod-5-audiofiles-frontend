export default function displaySong(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_SONG":
      return action.displaySong
    case "REMOVE_DISPLAY_SONG":
      return {}
    default:
      return state
  }
}
