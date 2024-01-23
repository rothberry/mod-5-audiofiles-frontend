export default function followers(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWERS":
      return [...action.followers]
    default:
      return state
  }
}
