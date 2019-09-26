/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"
import { postNewSong } from "../actions"
import ActiveStorageComponent from "./ActiveStorageComponent"


class NewSongForm extends Component {
  state = {
    title: "",
    genre: "",
    description: "",
    // user_id: "",
    song_link: "",
    selectedTags: [],
    allTags: []
  }
  
  componentDidMount() {
    const fetchTagUrl = "http://localhost:3000/tags"
    // const banana = document.getElementById('tag-dropdown')
    fetch(fetchTagUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({ allTags: data })
      })
  }

  handleNewSongSubmit = e => {
    e.preventDefault()
    const user_id = this.props.user.id
    this.props.postNewSong(this.state, user_id, this.props.history)
  }

  handleNewSongChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectedTags = (e, {value}) => {
    this.setState({selectedTags: value})
  }

  onFilesAdded = e => {
    const targetSongLink = e.target.files[0]
    const titleValue = targetSongLink.name.slice(0,-4)
    this.setState({ song_link: targetSongLink, title: titleValue })
  }

  goBackToProfile = () => {
    this.props.history(`/profile/${this.props.user.id}`)
  }

  setTitleOnFileLoad = () => {
    
  }

  render() {
    // console.log(this.props)
    const tagOptions = this.state.allTags
      ? this.state.allTags.map(tag => {
          return {
            key: tag.name,
            text: tag.name,
            value: tag.name
          }
        })
      : null
    console.log(this.state)
    // console.log(tagOptions)
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
                  value={this.state.title}
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
                {/* NEED TO ADD INPUT ABILITY */}
                <Form.Dropdown
                  onChange={this.handleSelectedTags}
                  search
                  selection
                  multiple
                  input
                  id='tag-dropdown'
                  // options={testObj}
                  options={tagOptions}
                  placeholder="Select Tags"
                  name="selectedTags"
                />
                <input
                  type="file"
                  accept='audio/*'
                  onChange={this.onFilesAdded}
                />
                {/* <ActiveStorageComponent /> */}
                <Button type="submit" primary fluid size="large">
                  Submit New Song
                </Button>
                {/* <Button as={Link} onClick={this.goBackToProfile}>Go Back</Button> */}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
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
  { postNewSong }
)(withRouter(NewSongForm))
