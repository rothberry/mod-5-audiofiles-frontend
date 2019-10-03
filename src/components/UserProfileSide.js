/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter, Redirect } from "react-router-dom"
import {
  Button,
  Grid,
  Modal,
  Image,
  Icon,
  Label,
  Segment,
  Sticky,
  Header
} from "semantic-ui-react"
import {
  findDisplayUser,
  followUser,
  currentUser,
  currentRelationship,
  setCurrentUser,
  deleteUser
} from "../actions"

class UserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
  handleFollowUser = (followed, follower_id) => {
    // console.log("followed: ", followed.id)
    // console.log("follower: ", follower_id)
    this.props.followUser(followed, follower_id)
  }

  handleUnfollowUser = () => {
    // TODO Send DELETE fetch to backend
    // TODO Need the relationshipID
  }

  render() {
    const { isCurrentUser } = this.props.user
    const {
      username,
      name,
      location,
      bio,
      id,
      img_url,
      facebook_url,
      twitter_url,
      soundcloud_url
    } = this.props.displayUser
    const isFace = !facebook_url
    const isTwit = !twitter_url
    const isSound = !soundcloud_url
    const isImg = !!img_url
    console.log(img_url)
    let isFollowing
    if (!!this.props.user.id) {
      isFollowing = this.props.followers.find(user => {
        return user.id === this.props.user.id
      })
    }

    const mapFollowers = this.props.followers.map(fol => {
      return (
        <Label widths="equals">
          <Link
            onClick={(allUsers, history) =>
              this.props.findDisplayUser(
                this.props.allUsers,
                this.props.history
              )
            }
            to={`/profile/${fol.id}`}
          >
            {fol.username}
          </Link>
        </Label>
      )
    })
    const buttonStyle = { width: "50%" }
    // console.log('displayuser: ', this.displayUser)
    // console.log(this.props)
    // TODO Need correct img urls cause i can't edit shit..
    return (
      <Grid.Column>
        <Sticky>
          <Segment>
            {isImg ? <Image src={img_url} circular alt=""  centered/> : null}
            <Header as='h1' icon='user secret' content={username} />
            <Header as='h2' icon='user' content={name} />
            <Header as='h3' icon='location arrow' content={location} />
            <Header as='h4' icon='book' content={bio} />
            <Button.Group centered circular style={buttonStyle}>
              <Button
                color="facebook"
                as="a"
                href={facebook_url}
                disabled={isFace}
              >
                <Icon name="facebook" /> Facebook
              </Button>
              <Button
                color="twitter"
                as="a"
                href={twitter_url}
                disabled={isTwit}
              >
                <Icon name="twitter" /> Twitter
              </Button>
              <Button
                color="orange"
                as="a"
                href={soundcloud_url}
                disabled={isSound}
              >
                <Icon name="soundcloud" /> Soundcloud
              </Button>
            </Button.Group>
          </Segment>
        </Sticky>
        <br />
        {/* <Segment widths="equal">
          <h4>Followers: </h4>
          {mapFollowers.length > 0 ? (
            <ul>{mapFollowers}</ul>
          ) : (
            <p>No Followers Yet!</p>
          )}
        </Segment> */}
        {isCurrentUser ? (
          <Button
            onClick={(user_id, history) =>
              this.props.deleteUser(this.props.user.id, this.props.history)
            }
          >
            Delete Account
          </Button>
        ) : null}

        {/* {!!isFollowing || isCurrentUser ? null : (
          <Button
            onClick={(followed, follower_id) =>
              this.handleFollowUser(this.props.displayUser, this.props.user.id)
            }
          >
            Follow Me!
          </Button>
        )} */}
      </Grid.Column>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    displayUser: state.displayUser,
    followeds: state.followeds,
    followers: state.followers
  }
}

export default connect(
  mapStateToProps,
  {
    findDisplayUser,
    followUser,
    currentUser,
    currentRelationship,
    setCurrentUser,
    deleteUser
  }
)(withRouter(UserProfileSide))
