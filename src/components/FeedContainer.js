import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Waveform from "./Waveform"
// import { fetchAllSongs } from "../actions"

class FeedContainer extends Component {

  render() {
    const { allSongs } = this.props
    // console.log("allsongs: ", allSongs)
    // const mario = require('../mario.mp3') //? For testing
    const filteredWithSongLink = allSongs.filter(song => song.song_link).slice(0,3)
    console.log('filter: ', filteredWithSongLink)
    const mappedFeed = filteredWithSongLink.map(songData => {
      console.log(songData)
      return (
        <div className={`waveform-${songData.id}`}>
          {/* <Waveform songData={songData.song_link} /> */}
          <h1>{songData.song.title}</h1>
          <h1>{songData.song.user.username}</h1>
          <h2>{songData.song.genre}</h2>
          <h3>{songData.song.description}</h3>
          <audio controls src={songData.song_link} />
        </div>
      )
    })

    // return allSongs.length > 0 ? (
    return (
      <div className="feed-container">
        da Feed
        {mappedFeed}
        {/* <audio controls='controls' src={allSongs[14].song_link} /> */}
        {/* <Waveform songData={allSongs[14]}/> */}
      </div>
    ) 
    // : (
    //   <div>loading...</div>
    // )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    // allUsers: state.allUsers,
    allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  // null,
  null
)(withRouter(FeedContainer))
