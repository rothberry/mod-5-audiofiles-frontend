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
  setCurrentUser,
  deleteSong,
} from "../actions"
import SongCommentShow from "./SongCommentShow"

class SongShowPage extends Component {
  componentDidMount() {
    this.setDisplay()
  }
  setDisplay = async () => {
    await this.props.findDisplaySong(this.props.history)
    // await this.props.setCurrentUser(this.props.displayUser, this.props.user)
  }

  gotToEditSong = () => {
    this.props.history.push("/editsong")
  }

  render() {
    const { song, song_link } = this.props.displaySong
    const isLoaded = !!this.props.displaySong.song
    const mappedTags = isLoaded
      ? song.tags.map((tag) => <span key={tag.id}> #{tag.name} </span>)
      : null
    const { isLoggedIn } = this.props.user

    const waveformStyle = { padding: "3%", maxHeight: "50vh" }
    // const waveformStyle = { height: "40%" }
    return isLoaded ? (
      <div className={`song-show-${song.id}`}>
        <Segment style={waveformStyle}>
          <Grid.Row>
            <Grid.Column>
              <Header size='huge'>{song.title}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header
                as='span'
                size='large'
                onClick={(id, history) =>
                  this.props.goToUserProfile(song.user.id, this.props.history)
                }
                style={{
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
              >
                By: {song.user.username}
              </Header>
              {this.props.user.isCurrentUser ? (
                <Button
                  icon='delete'
                  content='Delete Track'
                  floated='right'
                  onClick={(song_id, history) =>
                    this.props.deleteSong(song.id, this.props.history)
                  }
                />
              ) : null}
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
        </Segment>
        <Segment style={{ margin: "0 20%" }}>
          <Header size='medium' style={{ margin: "0 1%" }}>
            {song.description}
          </Header>
          {isLoggedIn ? <SongCommentForm /> : null}
          <SongCommentShow />
        </Segment>
      </div>
    ) : (
      <div>loading......</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    allSongs: state.allSongs,
    displaySong: state.displaySong,
    displayUser: state.displayUser,
  }
}

export default connect(mapStateToProps, {
  findDisplaySong,
  goToUserProfile,
  setCurrentUser,
  deleteSong,
})(withRouter(SongShowPage))
