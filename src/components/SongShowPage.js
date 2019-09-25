/*eslint-disable */
import React, { Component } from "react"
import Waveform from "./Waveform"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header } from "semantic-ui-react"

class SongShowPage extends Component {
  findSong = displaySongID => {
    if (this.props.allSongs.length > 0) {
      return this.props.allSongs.find(u => {
        return u.song.id === displaySongID
      })
    }
  }

  goToUserProfile = (event, user_id) => {
    this.props.history.push(`/profile/${user_id}`)
  }

  render() {
    // TODO need current song
    const displaySongID = Number(this.props.history.location.pathname.slice(7))
    const displaySong = this.findSong(displaySongID)
    const { song, song_link } = displaySong
    // const isCurrentUser = id === this.props.user.id
    // const isFollowing = this.props.user.id === this.props.followeds.find(f => f.id === id )
    // console.log('current user? ', isCurrentUser)
    // console.log('following? ', isFollowing)
    console.log(song.tags[0])
    const mappedTags = song.tags ? song.tags.map(tag => <span> #{tag.name} </span>) : null
    return (
      <div className={`song-show-${song.id}`}>
        <Grid.Row columns={4}>
          <Grid.Column>
            <span style={{ fontWeight: "bold", fontSize: "large" }}>
              {song.title}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="left">
            <span
              onClick={(event, id) => this.goToUserProfile(event, song.user.id)}
              style={{
                fontStyle: "italic",
                cursor: "pointer",
                fontSize: "large"
              }}
            >
              {song.user.username}
            </span>
            <span style={{ fontStyle: "italic" }} >
              {mappedTags}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Waveform
          song={song}
          song_link={song_link}
          waveHeight={125}
          responsive={true}
          splitChannels={true}
          mediaControls={true}
          maxCanvasWidth={500}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  null
  // { currentSong }
)(withRouter(SongShowPage))
