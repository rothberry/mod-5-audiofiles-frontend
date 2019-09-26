/*eslint-disable */
import React, { Component } from "react"
import { Link, withRouter, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header, Label, Sticky } from "semantic-ui-react"
import { logoutUser, findDisplayUser } from "../actions"

class Nav extends Component {
  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  goToCurrentUserProfile = (user_id) => {
    this.props.history.push(`/profile/${user_id}`)
    this.props.findDisplayUser(this.props.allUsers, this.props.history)
  }

  render() {
    return (
      // <Sticky>
      <div className="nav-bar-container">
        <Button as={Link} to="/feed" content="Feed" />
        {/* {this.props.user.isLoggedIn ? ( */}
        <Button
          as={Link}
          onClick={(user_id) => this.goToCurrentUserProfile(this.props.user.id)}
          content="Prof"
        />
        <Button as={Link} to="/newsong" content="Upload Song" />
        <Button as={Link} onClick={this.handleLogout} content="Logout" />
        {/* ) : ( */}
        <Button as={Link} to="/login" content="Login" />
        {/* )} */}
      </div>
      // </Sticky>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers
  }
}

export default connect(
  mapStateToProps,
  { logoutUser, findDisplayUser }
)(withRouter(Nav))
