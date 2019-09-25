/*eslint-disable */
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header, Label } from "semantic-ui-react"
import { logoutUser } from "../actions"

class Nav extends Component {
  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  render() {
    console.log(this.props)
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-passive">
          <Button as={Link} to="/feed">
            Feed
          </Button>
        </div>
        {this.props.user.isLoggedIn ? (
          <div className="nav-bar-active-in">
            <Button as={Link} onClick={this.handleLogout}>
              Logout
            </Button>
            <Button as={Link} to={`/profile/${this.props.user.id}`}>
              Prof
            </Button>
            <Button as={Link} to="/newsong">
              Upload Song
            </Button>
          </div>
        ) : (
          <div className="nav-bar-active-in">
            <Button as={Link} to="/login">
              Login
            </Button>
          </div>
        )}
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
  // null,
  { logoutUser }
)(withRouter(Nav))
