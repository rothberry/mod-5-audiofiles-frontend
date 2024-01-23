export default function user(state = {}, action) {
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
