/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SongFeedComponent from "./SongFeedComponent"
import { Grid, Button, Dropdown } from "semantic-ui-react"
import _ from "lodash"

class FeedContainer extends Component {
  state = {
    tagFilter: ''
  }

  handleFilter = (e, {value}) => {
    console.log(e)
    this.setState({tagFilter: value})
    // TODO Change the state
  }

  // TODO Move tagOptions up to App and pass down
  tagOptions = (allTags) => {
    return allTags.map(tag => {
      return {
        key: tag.name,
        text: tag.name,
        value: tag.name
      }
    })
  }
  
  render() {
    const { allSongs, followeds, followers, allTags } = this.props
    const tagOptions = this.tagOptions(allTags)
    const filteredSongsByTag = allSongs.filter(song => {
      return song.song.tags.find(tag => {
        if (this.state.tagFilter !== '') {
          return tag.name === this.state.tagFilter
        } else {
          return tag
        }
      })
    })
    // console.log(filteredSongsByTag)
    const mappedFeed = filteredSongsByTag.map(songData => {
      return (
        <div className={`waveform-${songData.id}`}>
          <SongFeedComponent songData={songData} />
        </div>
      )
    })
    // console.log(tagOptions)
    // return allSongs.length > 0 ? (
    return (
      <div className="feed-container">
        da Feed
        <Grid columns={2}>
          <Grid.Column>{_.reverse(mappedFeed)}</Grid.Column>
          <Grid.Column>
            <h1>some crap on the right ride</h1>

            <Dropdown 
              onChange={this.handleFilter}
              options={tagOptions}
              search
              icon='hashtag'
            />
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
    allSongs: state.allSongs,
    allTags: state.allTags
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(FeedContainer))
