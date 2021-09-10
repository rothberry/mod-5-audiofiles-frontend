export default function allSongs(state = [], action) {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return [...action.allSongs]
    case "ADD_SONG_TO_FEED":
      return [...state, action.newSong]
    case "REMOVE_SONG_FROM_FEED":
      const newSongArray = state.filter((so) => so.song.id !== action.song_id)
      return newSongArray
    case "REMOVE_SONGS_FROM_DELETED_USER":
      const newSongArrayFromUser = state.filter(
        (so) => so.song.user_id !== action.user_id
      )
      return newSongArrayFromUser
    default:
      return state
  }
}
