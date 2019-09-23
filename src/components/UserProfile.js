/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { user } from "../reducers"

class UserProfile extends Component {
  render() {
    console.log(this.props)
    const { username, name, location, bio, img_url } = this.props.user
    const isCurrentUser = this.props.user.length > 0
    console.log(isCurrentUser)
    return isCurrentUser ? (
      <div className="user-profile">
        Profile Page
        <h1>{username}</h1>
        <Link onClick={this.props.handleLogout}>Logout</Link>
      </div>
    ) : (
      <div>
        No User Profile
        <Link onClick={this.props.handleLogout}>Logout</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(UserProfile)
