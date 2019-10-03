import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment, Image } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { loginCurrentUser } from "../actions"
const audioWaveImg = 'https://library.kissclipart.com/20180919/pww/kissclipart-sound-wave-vector-clipart-sound-wave-79091298684b3993.png'
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
    const loginStyle = {margin: '5% 30%'}
    const buttonStyle = {marginTop: '2%' }
    return (
      <div className="login-form">
        <Grid textAlign="center" verticalAlign="middle" style={loginStyle}>
          <Grid.Column>
            <Form size="medium" onSubmit={this.handleLoginSubmit}>
              <Segment stacked>
                <Image centered src={audioWaveImg} style={{width: 200, height: 200}}/>
                <Header as="h1">Welcome to SoundClone!</Header>
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
                <Button type="submit" color='blue' fluid size="large" style={buttonStyle}>
                  Login
                </Button>
                <Button  as={Link} to='/createaccount' color='grey' fluid size="large" style={buttonStyle}>
                  Sign Up!
                </Button>
              </Segment>
            </Form>
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
