/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Image, Header, Segment } from "semantic-ui-react"
import { currentUser } from "../actions"
const defImg =
  "https://thespinoff.co.nz/wp-content/uploads/2019/09/Goose-game-header-850x510.jpg"

class FeedUserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
  render() {
    const { isCurrentUser, isLoggedIn } = this.props.user
    const { username, img_url } = this.props.feedUser
    // console.log("cur", this.props.showCurrentUser)
    // console.log("dis", this.props.displayUser)
    // console.log("feed", feedUser.username)
    const isImg = !!img_url

    let newImgUrl
    if (!!isImg) {
      newImgUrl = img_url
    } else {
      newImgUrl = defImg
    }

    let isFollowing
    if (!!this.props.user.id) {
      isFollowing = this.props.followers.find((user) => {
        return user.id === this.props.user.id
      })
    }

    const imgStyle = { height: 300, width: 300 }

    return !!isLoggedIn ? (
      <Segment className='feed-profile-side' style={{ marginTop: "5%" }}>
        <Image
          src={newImgUrl}
          circular
          alt=''
          style={imgStyle}
          centered
          size='medium'
        />
        <Header size='large'>{username}</Header>
      </Segment>
    ) : (
      <Segment>
        <Image
          src={defImg}
          circular
          alt=''
          style={imgStyle}
          centered
          size='medium'
        />
        {/* <Header size="tiny"></Header> */}
        <Header size='large' as={Link} to='/login'>
          Please sign in
        </Header>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    displayUser: state.displayUser,
    followeds: state.followeds,
    followers: state.followers,
  }
}

export default connect(mapStateToProps, {
  currentUser,
})(withRouter(FeedUserProfileSide))
