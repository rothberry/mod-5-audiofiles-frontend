// ! All actions go in here
const fetchUsersUrl = "http://localhost:3000/users"
const fetchSongsUrl = "http://localhost:3000/songs"

export function loginUser(user) {
  console.log("login")
  return {
    type: "LOGIN_USER",
    user
  }
}

export function logoutUser() {
  console.log("logout")
  return {
    type: "LOGOUT_USER"
  }
}

export function loginCurrentUser(formData, history) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }
    return fetch("http://localhost:3000/api/v1/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          console.log(data)
        } else {
          localStorage.token = data.jwt
          dispatch(loginUser(data.user))
          history.push("/profile")
        }
      })
      .catch(err => console.log(err))
  }
}

export function currentUser(history) {
  return dispatch => {
    const token = localStorage.token
    const reqObj = {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        // "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    return fetch("http://localhost:3000/api/v1/current_user", reqObj)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // Handle Error
          console.log('currentUser error: ', data)
        } else {
          dispatch(loginUser(data.user))
          history.push("/profile")
        }
      })
      .catch(err => console.log(err))
  }
}

export function registerUser(formData, history) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }
    return fetch(fetchUsersUrl, reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          //handle Error
          console.log(data.error)
        } else {
          localStorage.token = data.jwt
          dispatch(loginUser(data.user))
          history.push("/profile")
        }
      })
      .catch(err => console.log(err))
  }
}

export function setAllUsers(allUsers) {
  return {
    type: "SET_ALL_USERS",
    allUsers
  }
}

export function fetchAllUsers() {
  // TODO To fetch all the users from the database
  return dispatch => {
    return fetch(fetchUsersUrl)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllUsers(data))
        }
      })
      .catch(err => console.log(err))
  }
}