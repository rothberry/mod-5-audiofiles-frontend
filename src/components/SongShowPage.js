/*eslint-disable */
import React, { Component } from "react"
import Waveform from "./Waveform"
import SongCommentForm from './SongCommentForm'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header } from "semantic-ui-react"
import { findDisplaySong } from "../actions"
import SongCommentShow from "./SongCommentShow"

class SongShowPage extends Component {
  componentDidMount() {
    // console.log("cdm songsongspage", this.props)
    // this.props.findDisplaySong(this.props.allSongs, this.props.history)
  }

  goToUserProfile = (event, user_id) => {
    this.props.history.push(`/profile/${user_id}`)
  }

  render() {
    // TODO need current song
    // TODO Give User ability to see Split channels
    this.props.findDisplaySong(this.props.allSongs, this.props.history)
    const { song, song_link } = this.props.displaySong
    const isLoaded = !!this.props.displaySong.song
    const mappedTags = isLoaded
      ? song.tags.map(tag => <span> #{tag.name} </span>)
      : null
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
            waveHeight={250}
            responsive={true}
            splitChannels={false}
            mediaControls={true}
            maxCanvasWidth={500}
          />
        </Grid.Row>
        <br />
        <Grid.Row>
          <Header size="medium">{song.description}</Header>
          <SongCommentForm />
          <SongCommentShow />
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
    allComments: state.allComments,
    displaySong: state.displaySong,
    allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  { findDisplaySong }
)(withRouter(SongShowPage))
