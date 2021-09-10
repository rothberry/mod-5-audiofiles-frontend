/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Image, Header, Segment } from "semantic-ui-react"
import { currentUser } from "../actions"
const defImg =
  "https://thespinoff.co.nz/wp-content/uploads/2019/09/Goose-game-header-850x510.jpg"

class FeedUserProfileSide extends Component {
  render() {
    const { isLoggedIn, username, img_url } = this.props.user

    const imgStyle = { height: 300, width: 300 }

    return !!isLoggedIn ? (
      <Segment className='feed-profile-side' style={{ marginTop: "5%" }}>
        <Image
          src={img_url}
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
