/*eslint-disable */
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import {
  Button,
  Grid,
  Container,
  Header,
  Label,
  Item,
  Sticky,
  Search,
  Icon
} from "semantic-ui-react"
import {
  logoutUser,
  findDisplayUser,
  isCurrentUser,
  goDirectlyToUserProfile,
  goToUserProfile
} from "../actions"
import _ from "lodash"
import { async } from "q"

const initialState = {
  isLoading: false,
  value: "",
  results: []
}

const resultRenderer = ({ username, img_url }) => {
  return <Item content={username} />
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
    const navButtonStyle = { padding: "1% 2% 1% 1%" }
    const eachButtonStyle = { margin: "0% 1%" }
    // console.log(this.props.user)
    // TODO Add Seach Function
    // TODO Add Play/Pause to NavBar

    return (
      <Sticky className='nav-bar-container'>
        {!!isLoggedIn ? (
          <Grid columns={8}>
            <Grid.Column width={1}>
              <Label content='Search For Artist' />
            </Grid.Column>
            <Grid.Column>
              <Search
                style={navButtonStyle}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                minCharacters={1}
              />
            </Grid.Column>
            <Grid.Column>
              <Button.Group style={navButtonStyle}>
                <Button
                  as={Link}
                  to='/'
                  icon='music'
                  label='Feed'
                  floated='left'
                  style={eachButtonStyle}
                />
                <Button
                  as={Link}
                  onClick={user_id =>
                    this.goToCurrentUserProfile(this.props.user.id)
                  }
                  style={eachButtonStyle}
                  label='Prof'
                  icon='user'
                />
                <Button
                  as={Link}
                  to='/newsong'
                  icon='upload'
                  style={eachButtonStyle}
                  label='Upload Song'
                />
                <Button
                  as={Link}
                  to='/editaccount'
                  style={eachButtonStyle}
                  icon='edit'
                  label='Edit Profile'
                />
                <Button
                  style={eachButtonStyle}
                  as={Link}
                  onClick={this.handleLogout}
                  icon='log out'
                  label='Logout'
                />
              </Button.Group>
            </Grid.Column>
          </Grid>
        ) : (
          <Grid columns={8}>
            <Grid.Column width={1}>
              <Label content='Search For Artist' />
            </Grid.Column>
            <Grid.Column>
              <Search
                style={navButtonStyle}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                minCharacters={1}
              />
            </Grid.Column>
            <Grid.Column>
              <Button.Group style={navButtonStyle}>
                <Button
                  as={Link}
                  to='/'
                  icon='music'
                  label='Feed'
                  floated='left'
                  style={eachButtonStyle}
                />
                <Button
                  as={Link}
                  to='/login'
                  icon='sign-in'
                  style={eachButtonStyle}
                  label='Login'
                />
              </Button.Group>
            </Grid.Column>
          </Grid>
        )}
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

export default connect(mapStateToProps, {
  logoutUser,
  findDisplayUser,
  isCurrentUser,
  goDirectlyToUserProfile,
  goToUserProfile
})(withRouter(Nav))
