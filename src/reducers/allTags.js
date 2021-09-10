export default function allTags(state = [], action) {
  switch (action.type) {
    case "SET_ALL_TAGS":
      return [...action.allTags]
    // TODO Add new tags when created
    default:
      return state
  }
}
