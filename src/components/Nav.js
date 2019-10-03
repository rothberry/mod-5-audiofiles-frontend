/*eslint-disable */
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Grid, Header, Label, Sticky, Search, Icon } from "semantic-ui-react"
import { logoutUser, findDisplayUser, isCurrentUser } from "../actions"
import _ from "lodash"

class Nav extends Component {
  // state = {
  //   searchInput: "",
  //   results: []
  // }

  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  // handleChange = async (e, value) => {
  //   await this.setState({ searchInput: value })
  //   this.filterSearchResults()
  // }

  // filterSearchResults = () => {
  //   let filteredResults = this.props.allUsers.filter(user => {
  //     console.log(user.username.includes(this.state.searchInput))
  //     return user.username.includes(this.state.searchInput)
  //   })
  //   this.setState({results: filteredResults.slice(3)})
  // }

  goToCurrentUserProfile = user_id => {
    this.props.history.push(`/profile/${user_id}`)
    this.props.findDisplayUser(this.props.allUsers, this.props.history)
    // this.props.isCurrentUser(true)
  }

  render() {
    // console.log(this.state)
    const { isLoggedIn } = this.props.user
    // console.log(this.props.user)
    // TODO Add Seach Function
    // TODO Add Play/Pause to NavBar

    return (
      <Sticky className="nav-bar-container">
        {!!isLoggedIn ? (
          <Button.Group floated='left'>
            <Button as={Link} to="/" icon='music' label="Feed" />
            <Button
              as={Link}
              onClick={user_id =>
                this.goToCurrentUserProfile(this.props.user.id)
              }
              label="Prof"
              icon='user'
            />
            <Button as={Link} to="/newsong" icon='upload' label="Upload Song" />
            {/* <Button as={Link} to="/editaccount" icon='edit' label="Edit Profile" /> */}
            <Button as={Link} onClick={this.handleLogout} icon='log out'label="Logout" />
          </Button.Group>
        ) : (
          <Button.Group>
            <Button as={Link} to="/" icon='music' label="Feed" />
            <Button as={Link} to="/login" icon='sign-in' label="Login" />
          </Button.Group>
        )}
        {/* <Button name="play-pause" onClick={null} circular icon="play" /> */}
        {/* <Button name="play-pause" onClick={null} circular icon="pause" /> */}
        {/* <Search
          results={this.state.results}
          onSearchChange={_.debounce(
            (event, { value }) => this.handleChange(event, value),
            500
          )}
          showNoResults={false}
        /> */}
      </Sticky>
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
  { logoutUser, findDisplayUser, isCurrentUser }
)(withRouter(Nav))
