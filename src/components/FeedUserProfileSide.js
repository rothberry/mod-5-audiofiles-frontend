/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  Grid,
  Image,
  Icon,
  Label,
  Header,
  Sticky,
  Segment
} from "semantic-ui-react"
import {
  findDisplayUser,
  followUser,
  currentUser,
  currentRelationship,
  setCurrentUser,
  deleteUser
} from "../actions"
const defImg = "https://plus.unsplash.com/premium_photo-1682125819437-82a7212ee928?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

class FeedUserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
  render() {
    const { isCurrentUser, isLoggedIn } = this.props.user
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
    } = this.props.feedUser
    // console.log("cur", this.props.showCurrentUser)
    // console.log("dis", this.props.displayUser)
    // console.log("feed", feedUser.username)
    const isFace = !facebook_url
    const isTwit = !twitter_url
    const isSound = !soundcloud_url
    const isImg = !!img_url
    
    let newImgUrl
    if(!!isImg) {
      newImgUrl = img_url
    } else {
      newImgUrl = defImg
    }

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
    const imgStyle = { height: 300, width: 300 }

    return !!isLoggedIn ? (
      <Segment className="feed-profile-side" style={{ marginTop: "5%" }}>
        <Image
          src={newImgUrl}
          circular
          alt=""
          style={imgStyle}
          centered
          size="medium"
        />
        <Header size="large">{username}</Header>
      </Segment>
    ) : (
      <Segment>
        <Image
          src={defImg}
          circular
          alt=""
          style={imgStyle}
          centered
          size="medium"
        />
        {/* <Header size="tiny"></Header> */}
        <Header size="large" as={Link} to='/login'>Please sign in</Header>        
      </Segment>
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
)(withRouter(FeedUserProfileSide))
