export default function allUsers(state = [], action) {
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
