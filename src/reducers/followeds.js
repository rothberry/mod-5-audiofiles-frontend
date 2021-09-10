export default function followeds(state = [], action) {
  switch (action.type) {
    case "SET_ALL_FOLLOWEDS":
      return [...action.followeds]
    default:
      return state
  }
}
