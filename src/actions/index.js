/*eslint-disable */
// ! All actions go in here
const fetchUsersUrl = "http://localhost:3000/users"
const fetchSongsUrl = "http://localhost:3000/songs"
const fetchCommentsUrl = "http://localhost:3000/comments"

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

// ! Log's in user and issues token
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
          console.log(data)
          history.push(`/profile/${data.user.id}`)
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Finds the current user using token
export function currentUser() {
  return dispatch => {
    const token = localStorage.token
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return fetch("http://localhost:3000/api/v1/current_user", reqObj)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log("currentUser error: ", data)
        } else {
          dispatch(loginUser(data.user))
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Sets all following relationships
export function setAllFolloweds(followeds) {
  return {
    type: "SET_ALL_FOLLOWEDS",
    followeds
  }
}

export function setAllFollowers(followers) {
  return {
    type: "SET_ALL_FOLLOWERS",
    followers
  }
}

// ! Creates a new User
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
          // TODO Will go to user profile page
          // dispatch(setDisplayUser(data.user))
          // history.push(`/profile/${data.user.id}`)
          // ! Quick fix
          history.push(`/feed`)
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Get and Set all USERS
export function setAllUsers(allUsers) {
  return {
    type: "SET_ALL_USERS",
    allUsers
  }
}

export function fetchAllUsers() {
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

// ! Get and Set all SONGS
export function setAllSongs(allSongs) {
  return {
    type: "SET_ALL_SONGS",
    allSongs
  }
}

export function fetchAllSongs() {
  return dispatch => {
    return fetch(fetchSongsUrl)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllSongs(data))
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Adds new song to allSongs Array
export function addNewSongToFeed(newSong) {
  return {
    type: "ADD_SONG_TO_FEED",
    newSong
  }
}

// ! POST New Song
export function postNewSong(formData, user_id, history) {
  return dispatch => {
    console.log("post da new song bruh", formData)
    const { title, genre, description, song_link, selectedTags } = formData
    let songData = new FormData()
    songData.append("song[song_link]", song_link)
    songData.append("song[title]", title)
    songData.append("song[genre]", genre)
    songData.append("song[description]", description)
    songData.append("song[user_id]", user_id)
    songData.append("tags[tags]", selectedTags)
    const reqObjPostSong = {
      method: "POST",
      headers: {
        Accepts: "application/json"
      },
      body: songData
    }
    return fetch(fetchSongsUrl, reqObjPostSong)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log("error: ", data.error)
        } else {
          dispatch(addNewSongToFeed(data))
          history.push(`/songs/${data.song.id}`)
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Find and Set Display User
export function setDisplayUser(displayUser) {
  return {
    type: "SET_DISPLAY_USER",
    displayUser
  }
}

export function findDisplayUser(allUsers, history) {
  return dispatch => {
    const displayUserID = Number(history.location.pathname.slice(9))
    const displayUser = allUsers.find(u => {
      return u.id === displayUserID
    })
    dispatch(setDisplayUser(displayUser))
  }
}

// ! Find and Set Display Song
export function setDisplaySong(displaySong) {
  return {
    type: "SET_DISPLAY_SONG",
    displaySong
  }
}

export function findDisplaySong(allSongs, history) {
  return dispatch => {
    const displaySongID = Number(history.location.pathname.slice(7))
    const displaySong = allSongs.find(song => {
      return song.song.id === displaySongID
    })
    // console.log("displaySong: ", displaySong)
    dispatch(setDisplaySong(displaySong))
  }
}

// ! Set All comments
export function setAllComments(allComments) {
  return {
    type: "SET_ALL_COMMENTS",
    allComments
  }
}

// ! GET fetchs all Comments
export function fetchAllComments() {
  return dispatch => {
    return fetch(fetchCommentsUrl)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllComments(data))
        }
      })
      .catch(err => console.log(err))
  }
}

// ! GET All display Comments
export function findDisplayComments(allComments, displaySong) {
  return dispatch => {
    const displayComments = allComments.filter(comment => {
      return comment.song_id === displaySong.song.id
    })
    dispatch(setDisplayComments(displayComments))
  }
}

// ! Set all display comments
export function setDisplayComments(displayComments) {
  return {
    type: "SET_DISPLAY_COMMENTS",
    displayComments
  }
}

// ! Add New Comment to displayComments Array in store
export function addNewComment(comment) {
  return {
    type: "ADD_NEW_COMMENT",
    comment
  }
}

// ! POST New Comment
export function postNewComment(content, user_id, song_id) {
  return dispatch => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        user_id,
        song_id
      })
    }
    return fetch(fetchCommentsUrl, reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data)
          dispatch(addNewComment(data))
        }
      })
      .catch(err => console.log(err))
  }
}

// ! GET all Tags
// ! SET all Tags
// ? Some sort of filter songs by tag?
