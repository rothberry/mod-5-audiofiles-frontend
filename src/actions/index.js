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
          console.log(data)
          history.push(`/profile/${data.user.id}`)
        }
      })
      .catch(err => console.log(err))
  }
}

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
          history.push(`/profile/${data.user.id}`)
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

export function setAllSongs(allSongs) {
  return {
    type: "SET_ALL_SONGS",
    allSongs
  }
}

export function fetchAllSongs() {
  // TODO To fetch all the songs from the database
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

export function addNewSongToFeed(newSong) {
  return {
    type: "ADD_SONG_TO_FEED",
    newSong
  }
}

export function postNewSong(formData, user_id, history) {
  // TODO Send POST fetch request to activestorage with attached audio file
  return dispatch => {
    console.log("post da new song bruh", formData)
    const { title, genre, description, song_link, selectedTags } = formData
    let songData = new FormData()
    // let songAudio = new FormData()
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
          // TODO Redirect to the created song page
          console.log("success: ", data)
          dispatch(addNewSongToFeed(data))
          history.push(`/songs/${data.song.id}`)
        }
      })
      .catch(err => console.log(err))
  }
}

// ! Find Display User
export function setDisplayUser(displayUser) {
  return {
    type: "SET_DISPLAY_USER",
    displayUser
  }
}

// ? Using the HISTORY path to get user-id
// ? send id through finduser func and set the store of display user to the result
export function findDisplayUser(allUsers, history) {
  return dispatch => {
    const displayUserID = Number(history.location.pathname.slice(9))
    console.log(displayUserID)
    const displayUser = allUsers.find(u => {
      return u.id === displayUserID
    })
    console.log("displayUser: ", displayUser)
    dispatch(setDisplayUser(displayUser))
  }
}

// ! Find Display Song
export function setDisplaySong(displaySong) {
  return {
    type: "SET_DISPLAY_SONG",
    displaySong
  }
}

export function findDisplaySong(allSongs, history) {
  console.log("finding da song")
  return dispatch => {
    const displaySongID = Number(history.location.pathname.slice(7))
    const displaySong = allSongs.find(song => {
      return song.song.id === displaySongID
    })
    // console.log("displaySong: ", displaySong)
    dispatch(setDisplaySong(displaySong))
  }
}

// ! Add allTags
