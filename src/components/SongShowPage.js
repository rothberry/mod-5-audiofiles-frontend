/*eslint-disable */
import React, { Component } from "react"
import Waveform from "./Waveform"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header } from "semantic-ui-react"
import { findDisplaySong } from "../actions"

class SongShowPage extends Component {
  componentDidMount() {
    console.log("cdm")
    // this.props.findDisplaySong(this.props.allSongs, this.props.history)
  }

  // findSong = displaySongID => {
  //   if (this.props.allSongs.length > 0) {
  //     return this.props.allSongs.find(u => {
  //       return u.song.id === displaySongID
  //     })
  //   }
  // }

  goToUserProfile = (event, user_id) => {
    this.props.history.push(`/profile/${user_id}`)
  }

  render() {
    // TODO need current song
    this.props.findDisplaySong(this.props.allSongs, this.props.history)
    console.log("in soong page: ", this.props.displaySong)
    const { song, song_link } = this.props.displaySong
    const isLoaded = !!this.props.displaySong.song
    const mappedTags = isLoaded
      ? song.tags.map(tag => <span> #{tag.name} </span>)
      : null
    // const mappedTags = null
    return isLoaded ? (
      <div className={`song-show-${song.id}`}>
        <Grid.Row>
          <Grid.Column>
            <Header size="huge">{song.title}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="left">
            <Header
              as="span"
              size="large"
              onClick={(event, id) => this.goToUserProfile(event, song.user.id)}
              style={{
                fontStyle: "italic",
                cursor: "pointer"
              }}
            >
              {song.user.username}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <span style={{ fontStyle: "italic" }}>{mappedTags}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Waveform
            song={song}
            song_link={song_link}
            waveHeight={125}
            responsive={true}
            splitChannels={true}
            mediaControls={true}
            maxCanvasWidth={500}
          />
        </Grid.Row>
        <Grid.Row>
          <Header size="medium">{song.description}</Header>
          <Header size="medium">Comments:</Header>
        </Grid.Row>
      </div>
    ) : (
      <div>loading......</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    displaySong: state.displaySong,
    allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  { findDisplaySong }
)(withRouter(SongShowPage))
