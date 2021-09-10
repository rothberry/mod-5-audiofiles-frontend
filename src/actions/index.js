/*eslint-disable */

// TODO Separate all actions into respective files

// ! All actions go in here

export function loginUser(user) {
  return {
    type: "LOGIN_USER",
    user,
  }
}

export function logoutUser() {
  console.log("logout")
  return {
    type: "LOGOUT_USER",
  }
}

// ! Log's in user and issues token
export function loginCurrentUser(formData, history) {
  return (dispatch) => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
    return fetch("/api/v1/auth", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Login:", data)
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.token = data.jwt
          dispatch(loginUser(data.user))
          dispatch(isCurrentUser(true))
          history.push(`/profile/${data.user.id}`)
        }
      })
      .catch((err) => console.log(err))
  }
}

// ! Finds the current user using token
// * Can occasionally not load image because of the persisting state not updating to the new img_url, need to logout and back in to reload image
export function currentUser() {
  return (dispatch) => {
    const token = localStorage.token
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return fetch("/api/v1/current_user", reqObj)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("currentUser error: ", data)
        } else {
          dispatch(loginUser(data.user))
        }
      })
      .catch((err) => console.log(err))
  }
}

export function addNewUser(newUser) {
  return {
    type: "ADD_NEW_USER",
    newUser,
  }
}

// ! Creates a new User
export function registerUser(formData, history) {
  return (dispatch) => {
    // TODO Send Image file to AWS
    console.log("makin' da user broh")
    const {
      username,
      name,
      password,
      location,
      bio,
      facebook_url,
      twitter_url,
      soundcloud_url,
      image_link,
    } = formData
    let userData = new FormData()
    userData.append("user[username]", username)
    userData.append("user[name]", name)
    userData.append("user[password]", password)
    userData.append("user[location]", location)
    userData.append("user[bio]", bio)
    userData.append("user[facebook_url]", facebook_url)
    userData.append("user[twitter_url]", twitter_url)
    userData.append("user[soundcloud_url]", soundcloud_url)
    userData.append("user[image_link]", image_link)

    const reqObj = {
      method: "POST",
      headers: { Accepts: "application/json" },
      body: userData,
    }
    return fetch("/users", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error[0])
        } else {
          localStorage.token = data.jwt
          dispatch(loginUser(data.user))
          dispatch(addNewUser(data.user))
          dispatch(setDisplayUser(data.user))
          history.push(`/profile/${data.user.id}`)
          // ! Quick fix
          // history.push(`/feed`)
        }
      })
      .catch((err) => console.log(err))
  }
}

export function updateUser(user) {
  return {
    type: "UPDATE_USER",
    user,
  }
}

// ! Updates CurrentUser
export function updateCurrentUser(user, formData, history) {
  return (dispatch) => {
    const token = localStorage.token
    const fetchUpdateUserUrl = "/users/" + user.id
    // TODO Have update user update the image on AWS
    const reqUpdObj = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
    console.log(formData)
    const result = confirm("Are you sure you want to edit?")
    if (result) {
      return fetch(fetchUpdateUserUrl, reqUpdObj)
        .then((res) => res.json())
        .then((user) => {
          console.log(user)
          if (!user.error) {
            dispatch(updateUser(user))
            history.push(`/profile/${user.id}`)
          } else {
            alert("Invalid Shiz")
          }
        })
    }
  }
}

// ! Get and Set all USERS
export function setAllUsers(allUsers) {
  return {
    type: "SET_ALL_USERS",
    allUsers,
  }
}

export function fetchAllUsers() {
  return (dispatch) => {
    return fetch("/users")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllUsers(data))
        }
      })
      .catch((err) => console.log(err))
  }
}

// ! Get and Set all SONGS
export function setAllSongs(allSongs) {
  return {
    type: "SET_ALL_SONGS",
    allSongs,
  }
}

export function fetchAllSongs() {
  return (dispatch) => {
    return fetch("/songs")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllSongs(data))
        }
      })
      .catch((err) => console.log(err))
  }
}

// ! Adds new song to allSongs Array
export function addNewSongToFeed(newSong) {
  return {
    type: "ADD_SONG_TO_FEED",
    newSong,
  }
}

// ! POST New Song
export function postNewSong(formData, user_id, history) {
  return (dispatch) => {
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
        Accepts: "application/json",
      },
      body: songData,
    }
    return fetch("/songs", reqObjPostSong)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("error: ", data.error)
        } else {
          dispatch(addNewSongToFeed(data))
          dispatch(setDisplaySong(data))
          history.push(`/songs/${data.song.id}`)
        }
      })
      .catch((err) => console.log(err))
  }
}

// ! Find and Set Display User
export function setDisplayUser(displayUser) {
  return {
    type: "SET_DISPLAY_USER",
    displayUser,
  }
}

export function findDisplayUser(allUsers, history) {
  return (dispatch) => {
    const displayUserID = Number(history.location.pathname.slice(9))
    fetch("/users/" + displayUserID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!!data.user) {
          dispatch(setDisplayUser(data.user))
        }
      })
  }
}

// TODO REMOVE
export function findDisplayUserThroughSong(allUsers, displaySong) {
  return (dispatch) => {
    const displayUserID = Number(displaySong.song.user.id)
    const displayUser = allUsers.find((u) => {
      return u.id === displayUserID
    })
    dispatch(setDisplayUser(displayUser))
  }
}

// ! Find and Set Display Song
export function setDisplaySong(displaySong) {
  return {
    type: "SET_DISPLAY_SONG",
    displaySong,
  }
}

export function findDisplaySong(history) {
  return (dispatch) => {
    const displaySongID = Number(history.location.pathname.slice(7))
    fetch("/songs/" + displaySongID)
      .then((res) => res.json())
      .then((song) => {
        console.log(song)
        // debugger
        dispatch(setDisplaySong(song))
        dispatch(setDisplayComments(song["song"]["comments"]))
        dispatch(setDisplayUser(song["song"]["user"]))
      })

    // const displaySong = allSongs.find((song) => {
    //   return song.song.id === displaySongID
    // })
    // console.log("displaySong: ", displaySong)
    // if (!!displaySong) {
    //   dispatch(setDisplaySong(displaySong))
    // }
  }
}
/* REMOVED ALL COMMENTS 
// ! Set All comments
export function setAllComments(allComments) {
  return {
    type: "SET_ALL_COMMENTS",
    allComments,
  }
}

// ! GET fetchs all Comments
// REMOVED
export function fetchAllComments() {
  return (dispatch) => {
    return fetch(fetchCommentsUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        dispatch(setAllComments(data))
      }
    })
    .catch((err) => console.log(err))
  }
}
*/

// ! GET All display Comments
export function findDisplayComments(songId) {
  return (dispatch) => {
    // const displayComments = allComments.filter((comment) => {
    //   return comment.song_id === displaySong.song.id
    // })
    fetch("/songs/" + songId)
      .then((res) => res.json())
      .then((song) => {
        console.log(song)
        dispatch(setDisplayComments(song["song"].comments))
      })
  }
}

// ! Set all display comments
export function setDisplayComments(displayComments) {
  return {
    type: "SET_DISPLAY_COMMENTS",
    displayComments,
  }
}

// ! Add New Comment to displayComments Array in store
export function addNewComment(comment) {
  return {
    type: "ADD_NEW_COMMENT",
    comment,
  }
}

// ! POST New Comment
export function postNewComment(content, user_id, song_id) {
  return (dispatch) => {
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        user_id,
        song_id,
      }),
    }
    return fetch("/comments", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data)
          dispatch(addNewComment(data))
        }
      })
      .catch((err) => console.log(err))
  }
}

export function deleteComment(comment_id) {
  return {
    type: "DELETE_COMMENT",
    comment_id,
  }
}

// ! Delete Comment
export function deleteCommentFromBackend(comment_id) {
  return (dispatch) => {
    const reqDelObj = {
      method: "DELETE",
    }
    let result = confirm("Do you want to delete this comment?")
    if (result) {
      return fetch("/comments/" + comment_id, reqDelObj)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            // handle error
          } else {
            alert(data.message)
            dispatch(deleteComment(comment_id))
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

// ! SET all Tags
export function setAllTags(allTags) {
  return {
    type: "SET_ALL_TAGS",
    allTags,
  }
}

// ! GET all Tags
export function fetchAllTags() {
  return (dispatch) => {
    return fetch("/tags")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          dispatch(setAllTags(data))
        }
      })
      .catch((err) => console.log(err))
  }
}
// ? Some sort of filter songs by tag?

// ! Goes to userProfile
export function goToUserProfile(user_id, history) {
  return (dispatch) => {
    return history.push(`/profile/${user_id}`)
  }
}

export function goDirectlyToUserProfile(user) {
  return (dispatch) => {
    dispatch(setDisplayUser(user))
  }
}

// ! Sets all passive relationships
export function createFollowersArray(allUsers, currentUser) {
  return (dispatch) => {
    let followersIDArray = []
    let followersArray = []
    // console.log(allUsers, currentUser)
    if (!!currentUser.passive_relationships) {
      followersIDArray = currentUser.passive_relationships.map(
        (rel) => rel.follower_id
      )
      followersArray = followersIDArray.map((followersID) => {
        return allUsers.find((user) => {
          return user.id === followersID
        })
      })
      // console.log("followers: ", followersIDArray, followersArray)
      dispatch(setAllFollowers(followersArray))
    }
  }
}

export function setAllFollowers(followers) {
  return {
    type: "SET_ALL_FOLLOWERS",
    followers,
  }
}

// ! Sets all active relationships
export function createFollowedsArray(allUsers, currentUser) {
  return (dispatch) => {
    let followedsIDArray = []
    let followedsArray = []
    if (!!currentUser.passive_relationships) {
      followedsIDArray = currentUser.active_relationships.map(
        (rel) => rel.followed_id
      )
      followedsArray = followedsIDArray.map((followedsID) => {
        return allUsers.find((user) => {
          return user.id === followedsID
        })
      })
      // console.log("followed: ", followedsIDArray, followedsArray)
      dispatch(setAllFolloweds(followedsArray))
    }
  }
}

// ! Sets all following relationships
export function setAllFolloweds(followeds) {
  return {
    type: "SET_ALL_FOLLOWEDS",
    followeds,
  }
}

// ! Add new relationship to array
export function addFollowedUser() {}

// ! Should update the followeds array in the store
export function followUser(followed, follower_id) {
  return (dispatch) => {
    const token = localStorage.token
    const reqPostObj = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        follower_id: follower_id,
        followed_id: followed.id,
      }),
    }
    return fetch("/follwings", reqPostObj)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          // console.log(data.error)
        } else {
          alert(`You've followed ${followed.username}`)
          // dispatch(addFollowedUser(data))
        }
      })
      .catch((err) => console.log(err))
  }
}

// ! Remove active relationship
export function unfollowUser(relationship_id, displayUser) {
  return (dispatch) => {
    const token = localStorage.token
    const reqDelObj = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
    let result = confirm(
      `Are you sure you want to unfollow ${displayUser.username}?`
    )
    if (result) {
      return fetch("/follwings/" + relationship_id, reqDelObj)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            dispatch(removeFollowedUser())
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

export function removeFollowedUser() {}

export function currentRelationship(relationship) {
  return {
    type: "CURRENT_RELATIONSHIP",
    relationship,
  }
}

export function isCurrentUser(isCurrentUser) {
  return {
    type: "IS_CURRENT_USER",
    isCurrentUser,
  }
}

export function setCurrentUser(displayUser, user) {
  return (dispatch) => {
    const userCheck = displayUser.id === user.id
    if (userCheck) {
      dispatch(isCurrentUser(true))
    } else {
      dispatch(isCurrentUser(false))
    }
  }
}

// ! DELETE Song
export function removeSong(song_id) {
  return {
    type: "REMOVE_SONG_FROM_FEED",
    song_id,
  }
}

export function deleteSong(song_id, history) {
  return (dispatch) => {
    const reqDelObj = {
      method: "DELETE",
    }
    let result = confirm("Do you want to delete this song?")
    if (result) {
      return fetch("/songs/" + song_id, reqDelObj)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            // handle error
          } else {
            alert(data.message)
            dispatch(removeSong(song_id))
            history.push("/")
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

// ! DELETE User
export function removeUser(user_id) {
  return {
    type: "REMOVE_USER",
    user_id,
  }
}

export function deleteUser(user_id, history) {
  return (dispatch) => {
    const token = localStorage.token
    const reqDelObj = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
    let result = confirm("Are you sure you want to delete your account??")
    if (result) {
      return fetch("/users/" + user_id, reqDelObj)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            alert(data.error)
          } else {
            alert(data.message)
            dispatch(removeUser(user_id))
            dispatch(removeSongsFromFeed(user_id))
            dispatch(logoutUser())
            dispatch(removeDisplayUser())
            dispatch(removeDisplaySong())
            history.push("/login")
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

export function removeDisplayUser() {
  return {
    type: "REMOVE_DISPLAY_USER",
  }
}
export function removeDisplaySong() {
  return {
    type: "REMOVE_DISPLAY_SONG",
  }
}

export function removeSongsFromFeed(user_id) {
  return {
    type: "REMOVE_SONGS_FROM_DELETED_USER",
    user_id,
  }
}
