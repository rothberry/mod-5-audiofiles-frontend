/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button, Grid, Header } from "semantic-ui-react"

import Waveform from "./Waveform"

class SongFeedComponent extends Component {
  goToUserProfile = e => {
    const user_id = this.props.songData.song.user.id
    this.props.history.push(`/profile/${user_id}`)
  }

  goToSongPage = e => {
    // const song_id = this.props.songData.song.user.id
    // this.props.history.push(`/profile/${song_id}`)
  }

  render() {
    const { songData } = this.props
    const {
      songData: { song }
    } = this.props
    const {
      songData: {
        song: { user }
      }
    } = this.props
    // console.log(song)
    // TODO ADD the SongTags to Component
    return (
      <div className={`song-comp-${song.id}`}>
        <Grid.Row columns={4}>
          <Grid.Column>
            <span
              onClick={this.goToSongPage}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              {song.title}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row celled>
          <Grid.Column floated="left">
            <span
              onClick={this.goToUserProfile}
              style={{ fontStyle: "italic", cursor: "pointer" }}
            >
              {user.username}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Waveform
            // numOfFavorites={song.favorites}
            // song_id={song.id}
            song={song}
            song_link={songData.song_link}
            waveHeight={100}
            responsive={true}
            splitChannels={false}
            mediaControls={true}
            maxCanvasWidth={500}
          />
        </Grid.Row>
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
    // allUsers: state.allUsers,
    // allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  // null,
  null
)(withRouter(SongFeedComponent))
