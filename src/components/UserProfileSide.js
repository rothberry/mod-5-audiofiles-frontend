/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  Button,
  Grid,
  Image,
  Icon,
  Segment,
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
const defImg =
  "https://thespinoff.co.nz/wp-content/uploads/2019/09/Goose-game-header-850x510.jpg"

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
  // forceReload = () => {

  // }
  // mapFollowers = (followArray) => {
  //   return followArray.map(fol => {
  //     return (
  //       <Label widths="equals">
  //         <Icon src={fol.img_url}/>
  //         <Link
  //           // onClick={(allUsers, history) =>
  //           //   this.props.findDisplayUser(
  //           //     this.props.allUsers,
  //           //     this.props.history
  //           //   )
  //           // }
  //           to={`/profile/${fol.id}`}
  //         >
  //           {fol.username}
  //         </Link>
  //       </Label>
  //     )
  //   })
  // }

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
    let isFollowing
    if (!!this.props.user.id) {
      isFollowing = this.props.followers.find(user => {
        return user.id === this.props.user.id
      })
    }

    // const mappedFollowers = this.mapFollowers(this.props.followers)
    // let isFollowers = !!mappedFollowers

    // const mappedFolloweds = this.mapFollowers(this.props.followeds)
    // let isFolloweds = !!mappedFolloweds

    const eachButtonStyle = { width: "40%", margin: "0 1%" }
    const imgStyle = { height: 300, width: 300 }
    // console.log('displayuser: ', this.displayUser)
    // console.log(this.props.user)
    return (
      <Grid.Column>
        {/* <Grid.Column > */}
        {/* <Sticky> */}
        <Segment className="feed-profile-side" style={{ marginTop: "5%" }}>
          {isImg ? (
            <Image src={img_url} circular alt="" centered style={imgStyle} />
          ) : (
            <Image src={defImg} circular alt="" centered style={imgStyle} />
          )}
          <Header as="h1" icon="user secret" content={username} />
          <Header as="h4" icon="user" content={name} />
          <Header as="h4" icon="location arrow" content={location} />
          <Header as="h4" icon="book" content={bio} />
          <Button.Group centered circular>
            <Button
              color="facebook"
              as="a"
              href={facebook_url}
              disabled={isFace}
              style={eachButtonStyle}
            >
              <Icon name="facebook" /> Facebook
            </Button>
            <Button
              style={eachButtonStyle}
              color="twitter"
              as="a"
              href={twitter_url}
              disabled={isTwit}
            >
              <Icon name="twitter" /> Twitter
            </Button>
            <Button
              color="orange"
              style={eachButtonStyle}
              as="a"
              href={soundcloud_url}
              disabled={isSound}
            >
              <Icon name="soundcloud" /> Soundcloud
            </Button>
          </Button.Group>
        </Segment>
        {/* </Sticky> */}
        <br />
        {/* <Segment widths="equal">
          <h4>Followers: </h4>
          { isFollowers ? (
            <ul>{mappedFollowers}</ul>
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
