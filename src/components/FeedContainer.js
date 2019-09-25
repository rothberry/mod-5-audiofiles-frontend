/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Waveform from "./Waveform"
import SongFeedComponent from "./SongFeedComponent"
import { Grid } from "semantic-ui-react"

class FeedContainer extends Component {
  render() {
    const { allSongs, followeds, followers } = this.props
    const filteredWithSongLink = allSongs
      .filter(song => song.song_link)
      // .slice(0, 3)
    // console.log('filter: ', filteredWithSongLink)
    const mappedFeed = filteredWithSongLink.map(songData => {
      // console.log(songData)
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
          <Grid.Column>
            {mappedFeed}
          </Grid.Column>
          <Grid.Column>
            <h1>some crap on the right ride</h1>
          </Grid.Column>
        </Grid>
        {/* <SongFeedComponent songData={allSongs[14]}/> */}
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
  // null,
  null
)(withRouter(FeedContainer))
