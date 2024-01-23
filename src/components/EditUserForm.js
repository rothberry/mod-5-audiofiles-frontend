/*eslint-disable */
import React, { Component } from "react"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import { updateCurrentUser } from "../actions"
import { withRouter } from "react-router-dom"

class EditUserForm extends Component {
  state = {
    username: "",
    name: "",
    location: "",
    bio: "",
    img_url: "",
    facebook_url: "",
    twitter_url: "",
    soundcloud_url: "",
  }

  componentDidMount() {
    this.setState(this.props.user)
  }

  handleUpdateUser = (e) => {
    e.preventDefault()
    this.props.updateCurrentUser(
      this.props.user,
      this.state,
      this.props.history
    )
  }
  // TODO check use of this lifecycle method
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.user.id !== prevProps.user.id) {
      this.setState(this.props.user)
    }
  }

  handleEditUserChange = (e) => {
    const targetValue = e.target.value
    const targetName = e.target.name
    this.setState({ [targetName]: targetValue })
  }

  render() {
    if (!this.props.user.id) {
      return <div>Loading...</div>
    }
    // console.log(this.state)
    const {
      username,
      name,
      location,
      bio,
      img_url,
      facebook_url,
      soundcloud_url,
      twitter_url,
    } = this.props.user
    const editUserStyle = { margin: "5% 30%" }
    // TODO Abstract repeated Form.Inputs

    return (
      <div className='edit-user-container'>
        <Segment size='medium' style={editUserStyle}>
          <Form className='edit-user-form' onSubmit={this.handleUpdateUser}>
            <Form.Field>
              <Header as='h1'>Edit Profile</Header>
              <Form.Input
                label='Name: '
                onChange={this.handleEditUserChange}
                defaultValue={name}
                placeholder='Name'
                type='text'
                name='name'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                label='Username: '
                defaultValue={username}
                placeholder='Username'
                type='text'
                name='username'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                label='Location: '
                defaultValue={location}
                placeholder='Location'
                type='text'
                name='location'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                label='Bio: '
                defaultValue={bio}
                placeholder='Bio'
                type='textArea'
                name='bio'
              />
            </Form.Field>
            <Form.Field>
              {/* TODO ADD AWS UPLOAD FEATURE */}
              {/* <Label>Upload your image</Label>
              <input
                type='file'
                accept='image/*'
                onChange={this.onImageAdded}
              /> */}

              <Form.Input
                onChange={this.handleEditUserChange}
                placeholder='Image Url'
                defaultValue={img_url}
                label='Image Url: '
                type='text'
                name='img_url'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                placeholder='Facebook'
                defaultValue={facebook_url}
                label='Facebook: '
                type='text'
                name='facebook_url'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                placeholder='Twitter'
                defaultValue={twitter_url}
                label='Twitter: '
                type='text'
                name='twitter_url'
              />
              <Form.Input
                onChange={this.handleEditUserChange}
                placeholder='SoundCloud'
                defaultValue={soundcloud_url}
                label='SoundCloud: '
                type='text'
                name='soundcloud_url'
              />
            </Form.Field>
            <Button type='submit' primary size='medium'>
              Edit Profile
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { updateCurrentUser })(
  withRouter(EditUserForm)
)
