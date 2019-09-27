/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SongFeedComponent from "./SongFeedComponent"
import { Grid } from "semantic-ui-react"
import _ from "lodash"

class FeedContainer extends Component {
  render() {
    const { allSongs, followeds, followers } = this.props
    const filteredWithSongLink = allSongs.filter(song => song.song_link)
    const mappedFeed = filteredWithSongLink.map(songData => {
      return (
        <div className={`waveform-${songData.id}`}>
          <SongFeedComponent songData={songData} />
        </div>
      )
    })

    // return allSongs.length > 0 ? (
    return (
      <div className="feed-container">
        da Feed
        <Grid columns={2}>
          <Grid.Column>{_.reverse(mappedFeed)}</Grid.Column>
          <Grid.Column>
            <h1>some crap on the right ride</h1>
          </Grid.Column>
        </Grid>
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
    followeds: state.followeds,
    followers: state.followers,
    // allUsers: state.allUsers,
    allSongs: state.allSongs
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(FeedContainer))
