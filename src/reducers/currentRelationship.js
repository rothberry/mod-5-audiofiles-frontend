export default function currentRelationship(state = {}, action) {
  switch (action.type) {
    case "CURRENT_RELATIONSHIP":
      return { ...action.relationship }
    default:
      return state
  }
}
