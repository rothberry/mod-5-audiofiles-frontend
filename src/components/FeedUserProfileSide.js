/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Image, Header, Segment } from "semantic-ui-react"
import { currentUser } from "../actions"
const defImg = "https://plus.unsplash.com/premium_photo-1682125819437-82a7212ee928?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

class FeedUserProfileSide extends Component {
  render() {
    const { isLoggedIn, username, img_url } = this.props.user
    console.log(this.props.user)

    // TODO Modular Stylin
    const imgStyle = { height: 300, width: 300 }
    return !!isLoggedIn ? (
      <Segment className='feed-profile-side'>
        <Image
          src={img_url}
          circular
          alt={img_url}
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
