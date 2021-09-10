export default function displayComments(state = [], action) {
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
