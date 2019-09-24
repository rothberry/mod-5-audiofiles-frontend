import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import { postNewSong } from "../actions"
import ActiveStorageComponent from "./ActiveStorageComponent"

class NewSongForm extends Component {
  constructor(props) {
    super()
    this.audioInput = React.createRef()
    this.state = {
      title: "",
      genre: "",
      description: "",
      // user_id: "",
      song_link: ""
    }
  }

  handleNewSongSubmit = e => {
    e.preventDefault()
    // const { title, genre, description, song_link } = this.state
    // this.setState({user_id: this.props.currentUser.id})
    const user_id = this.props.currentUser.id
    console.log(user_id)
    this.props.postNewSong(this.state, user_id, this.props.history)
  }

  handleNewSongChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFilesAdded = e => {
    const targetSongLink = e.target.files[0]
    this.setState({ song_link: targetSongLink })    
    // const songData = {...this.state, song_link: newAudio, user_id: this.props.currentUser.id}
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <div className="new-song-form">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column>
            <Form
              size="large"
              onSubmit={this.handleNewSongSubmit}
              encType="multipart/form-data"
            >
              <Segment stacked>
                <Header as="h1">New Song</Header>
                <Form.Input
                  onChange={this.handleNewSongChange}
                  placeholder="Title"
                  type="text"
                  name="title"
                />
                <Form.Input
                  onChange={this.handleNewSongChange}
                  placeholder="Genre"
                  type="text"
                  name="genre"
                />
                <Form.Input
                  onChange={this.handleNewSongChange}
                  placeholder="Description"
                  type="text"
                  name="description"
                />
                {/* <input
                  type="file"
                  // ref={this.audioInput}
                  onChange={this.onFilesAdded}
                /> */}
                <ActiveStorageComponent />
                <Button type="submit" primary fluid size="large">
                  Submit New Song
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
  { postNewSong }
)(withRouter(NewSongForm))