/*eslint-disable */
import React, { Component } from "react"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import { registerUser } from "../actions"
import { withRouter } from "react-router-dom"

class NewUserForm extends Component {
  state = {
    username: "",
    name: "",
    password: "",
    location: "",
    bio: "",
    img_url: "",
    facebook_url: "",
    twitter_url: "",
    soundcloud_url: ""
  }

  handleCreateNewUser = e => {
    e.preventDefault()
    this.props.registerUser(this.state, this.props.history)
  }

  handleNewUserChange = e => {
    const targetValue = e.target.value
    const targetName = e.target.name
    this.setState({ [targetName]: targetValue })
  }

  render() {
    // console.log(this.state)
    const newUserStyle = { margin: "15%" }
    return (
      <div className="new-user-container">
        <Segment size="medium" style={newUserStyle}>
          <Form className="new-user-form" onSubmit={this.handleCreateNewUser}>
            <Form.Field>
              <Header as="h1">Create Profile</Header>
              <br />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Name"
                type="text"
                name="name"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Username"
                type="text"
                name="username"
              />

              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Password"
                type="password"
                name="password"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Location"
                type="text"
                name="location"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Bio"
                type="textArea"
                name="bio"
              />
            </Form.Field>
            {/* TODO Add Socials & Images */}
            <Form.Field>
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Image Url"
                type="text"
                name="img_url"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Facebook"
                type="text"
                name="facebook_url"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="Twitter"
                type="text"
                name="twitter_url"
              />
              <Form.Input
                onChange={this.handleNewUserChange}
                placeholder="SoundCloud"
                type="text"
                name="soundcloud_url"
              />
            </Form.Field>
            <Button type="submit" primary fluid size="large">
              SignUp!
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

export default connect(
  null,
  { registerUser }
)(withRouter(NewUserForm))
