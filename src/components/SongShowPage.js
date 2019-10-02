/*eslint-disable */
import React, { Component } from "react"
import Waveform from "./Waveform"
import SongCommentForm from "./SongCommentForm"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header, Segment } from "semantic-ui-react"
import {
  findDisplaySong,
  goToUserProfile,
  findDisplayUserThroughSong,
  setCurrentUser,
  deleteSong
} from "../actions"
import SongCommentShow from "./SongCommentShow"

class SongShowPage extends Component {
  componentDidMount() {
    this.setDisplay()
  }
  setDisplay = async () => {
    await this.props.findDisplaySong(this.props.allSongs, this.props.history)
    await this.props.findDisplayUserThroughSong(
      this.props.allUsers,
      this.props.displaySong
    )
    await this.props.setCurrentUser(this.props.displayUser, this.props.user)
  }

  gotToEditSong = () => {
    this.props.history.push("/editsong")
  }

  render() {
    // TODO Give User ability to see Split channels
    const { song, song_link } = this.props.displaySong
    const isLoaded = !!this.props.displaySong.song
    const mappedTags = isLoaded
      ? song.tags.map(tag => <span> #{tag.name} </span>)
      : null
    return isLoaded ? (
      <div className={`song-show-${song.id}`}>
        <Segment style={{ overflow: "auto", height: 400 }}>
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
                onClick={(id, history) =>
                  this.props.goToUserProfile(song.user.id, this.props.history)
                }
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
              {this.props.user.isCurrentUser ? (
                <Button
                  icon="delete"
                  // floated='right'
                  onClick={(song_id, history) => this.props.deleteSong(song.id, this.props.history)}
                />
              ) : null}
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
        </Segment>
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
    allUsers: state.allUsers,
    allSongs: state.allSongs,
    displaySong: state.displaySong,
    displayUser: state.displayUser,
    allComments: state.allComments
  }
}

export default connect(
  mapStateToProps,
  {
    findDisplaySong,
    goToUserProfile,
    findDisplayUserThroughSong,
    setCurrentUser,
    deleteSong
  }
)(withRouter(SongShowPage))
