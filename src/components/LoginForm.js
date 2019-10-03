import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { loginCurrentUser } from "../actions"

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  }

  handleLoginSubmit = e => {
    e.preventDefault()
    this.props.loginCurrentUser(this.state, this.props.history)
  }

  handleLoginChange = e => {
    const targetValue = e.target.value
    const targetName = e.target.name
    this.setState({ [targetName]: targetValue })
  }

  render() {
    const loginStyle = {margin: '30%'}
    return (
      <div className="login-form">
        <Grid textAlign="center" verticalAlign="middle" style={loginStyle}>
          <Grid.Column>
            <Form size="medium" onSubmit={this.handleLoginSubmit}>
              <Segment stacked>
                <Header as="h1">Login</Header>
                <Form.Input
                  onChange={this.handleLoginChange}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="text"
                  name="username"
                />
                <Form.Input
                  onChange={this.handleLoginChange}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                <Button type="submit" primary fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              <Link to="/createaccount">Create Account</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(
  null,
  { loginCurrentUser }
)(withRouter(LoginForm))
