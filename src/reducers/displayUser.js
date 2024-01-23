export default function displayUser(state = {}, action) {
  switch (action.type) {
    case "SET_DISPLAY_USER":
      return action.displayUser
    case "REMOVE_DISPLAY_USER":
      return {}
    default:
      return state
  }
}
