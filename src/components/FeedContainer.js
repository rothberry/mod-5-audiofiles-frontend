/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SongFeedComponent from "./SongFeedComponent"
import { Grid, Button, Dropdown, Icon, Header } from "semantic-ui-react"
import _ from "lodash"
import { fetchAllTags } from "../actions"
import FeedUserProfileSide from "./FeedUserProfileSide"

class FeedContainer extends Component {
  state = {
    tagFilter: "",
  }

  handleFilter = (e, { value }) => {
    this.setState({ tagFilter: value })
  }

  removeFilter = () => {
    this.setState({ tagFilter: "" })
  }

  tagOptions = (allTags) => {
    const sortTags = allTags.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })
    const tagArr = sortTags.map((tag) => {
      return {
        key: tag.name,
        text: tag.name,
        value: tag.name,
      }
    })
    return tagArr
  }

  render() {
    const { allSongs, followeds, followers, allTags } = this.props
    const tagOptions = this.tagOptions(allTags)
    const filteredSongsByTag = allSongs.filter((song) => {
      return song.song.tags.find((tag) => {
        if (this.state.tagFilter !== "") {
          return tag.name === this.state.tagFilter
        } else {
          return tag
        }
      })
    })
    const mappedFeed = filteredSongsByTag.map((songData) => {
      console.log(songData)
      return (
        <div className={`waveform-${songData.id}`} key={songData.id}>
          <SongFeedComponent
            key={songData.id}
            songData={songData}
            filtered={this.state.tagFilter}
          />
        </div>
      )
    })
    const feedStyle = { margin: "2%" }
    const feedCompStyle = { overflow: "auto", maxHeight: "50%" }
    // return allSongs.length > 0 ? (
    // TODO Check logic of Feed
    return (
      <div className='feed-container'>
        <Grid columns={3} style={feedStyle}>
          <Grid.Column width='10'>
            {!!this.props.user.username ? (
              <Header as='h2'>
                Welcome to the AudioPhiles {this.props.user.username}!!!
              </Header>
            ) : (
              <Header as='h2'>Welcome to the AudioPhiles!!!</Header>
            )}
            <h3>
              Filter by tag: <Icon name='hashtag' />
              {"  "}
              <Dropdown
                header='Filter by Tag'
                onChange={this.handleFilter}
                options={tagOptions}
                search
                value={this.state.tagFilter}
              />
              {"  "}
              {this.state.tagFilter !== "" ? (
                <Button onClick={this.removeFilter}>Remove Filter</Button>
              ) : null}
            </h3>
            {_.reverse(mappedFeed)}
          </Grid.Column>
          <Grid.Column style={{ marginTop: "1%" }}>
            <FeedUserProfileSide />
          </Grid.Column>
        </Grid>
      </div>
    )
    // : (
    //   <div>loading...</div>
    // )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    followeds: state.followeds,
    followers: state.followers,
    allSongs: state.allSongs,
    allTags: state.allTags,
  }
}

export default connect(mapStateToProps, { fetchAllTags })(
  withRouter(FeedContainer)
)
