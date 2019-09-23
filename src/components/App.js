/*eslint-disable */
import React from "react"
import "../App.css"
import LoginForm from "./LoginForm"
import NewUserForm from "./NewUserForm"
import UserProfile from "./UserProfile"
import { connect } from "react-redux"
import { Router, Route, withRouter, Switch, Redirect } from "react-router-dom"
import { currentUser, logoutUser, fetchAllUsers } from "../actions"
import { reducer } from '../reducers'


class App extends React.Component {
  // ! FOR TESTING OUT REDUX
  // state = { 
  //   allUsers: []
  // }
  componentDidMount() {
    this.props.fetchAllUsers()
    this.props.currentUser(this.props.history)
  }

  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  render() {
    console.log(localStorage.token)
    // console.log('daddadadad', this.props)
    return (
      <div className="app-container">
        {/* <Switch> */}
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/createaccount" render={() => <NewUserForm />} />
          {localStorage.token ?
            <Route
              path="/profile"
              render={() => <UserProfile handleLogout={this.handleLogout}/>}
            /> : <Redirect to='/login' />
          }
        {/* </Switch> */}
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

const mapDispatchToProps = dispatch => {
  return {
    currentUser: history => dispatch(currentUser(history)),
    logoutUser: () => dispatch(logoutUser()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
