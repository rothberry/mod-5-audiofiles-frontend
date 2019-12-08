/*eslint-disable */
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Button, Search, Menu, Image, Container } from "semantic-ui-react"
import {
  logoutUser,
  findDisplayUser,
  isCurrentUser,
  goDirectlyToUserProfile,
  goToUserProfile
} from "../actions"
import _ from "lodash"

const initialState = {
  isLoading: false,
  value: "",
  results: []
}

const resultRenderer = ({ username, img_url }) => {
  return (
    <Container>
      <span>
        <Image src={img_url} circular inline alt='' size='tiny' />
        {username}
      </span>
    </Container>
  )
}

class Nav extends Component {
  state = initialState

  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.username })
    this.props.goDirectlyToUserProfile(result)
    this.props.goToUserProfile(result.id, this.props.history)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)
      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.username)
      this.setState({
        isLoading: false,
        results: _.filter(this.props.allUsers, isMatch)
      })
    }, 300)
  }

  goToCurrentUserProfile = user_id => {
    this.props.history.push(`/profile/${user_id}`)
    this.props.findDisplayUser(this.props.allUsers, this.props.history)
    // this.props.isCurrentUser(true)
  }

  render() {
    // console.log(this.state)
    const { isLoading, value, results } = this.state
    const { isLoggedIn } = this.props.user
    const searchItem = (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        fluid
        placeholder='Search For Artist'
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        minCharacters={1}
      />
    )
    const feedButton = (
      <Button as={Link} to='/' icon='music' label='Feed' floated='left' />
    )
    const profButton = (
      <Button
        onClick={user_id => this.goToCurrentUserProfile(this.props.user.id)}
        label='Prof'
        icon='user'
      />
    )
    const newSongButton = (
      <Button as={Link} to='/newsong' icon='upload' label='Upload' />
    )

    const logoutButton = (
      <Button onClick={this.handleLogout} icon='log out' label='Logout' />
    )
    const loginButton = (
      <Button as={Link} to='/login' icon='sign-in' label='Login' />
    )

    // Styling
    const navButtonStyle = {}
    // const navButtonStyle = { padding: "0% 1%" }
    // const eachButtonStyle = { margin: "0% 1% 0% 0%" }

    return (
      <div className='nav-bar-container'>
        {!!isLoggedIn ? (
          <Menu fixed='top' inverted style={navButtonStyle}>
            <Menu.Item>{searchItem}</Menu.Item>
            <Menu.Item>{feedButton}</Menu.Item>
            <Menu.Item>{profButton}</Menu.Item>
            <Menu.Item>{newSongButton}</Menu.Item>
            {/* <Menu.Item>{editAccountButton}</Menu.Item> */}
            <Menu.Menu position='right'>
              <Menu.Item>{logoutButton}</Menu.Item>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu fixed='top' inverted fluid style={navButtonStyle}>
            <Menu.Item>{searchItem}</Menu.Item>
            <Menu.Item>{feedButton}</Menu.Item>
            <Menu.Item>{loginButton}</Menu.Item>
          </Menu>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers
  }
}

export default connect(mapStateToProps, {
  logoutUser,
  findDisplayUser,
  isCurrentUser,
  goDirectlyToUserProfile,
  goToUserProfile
})(withRouter(Nav))
