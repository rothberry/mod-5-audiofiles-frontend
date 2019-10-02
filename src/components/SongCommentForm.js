/*eslint-disable */
import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { postNewComment } from "../actions"

class SongCommentForm extends Component {
  state = {
    content: ""
  }

  handleCommentSubmit = e => {
    e.preventDefault()
    if (!!this.state.content) {
      this.props.postNewComment(
        this.state.content,
        this.props.user.id,
        this.props.displaySong.song.id
      )
      this.setState({ content: "" })
    }
  }

  handleCommentInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    // console.log(this.state)
    return (
      <div className="show-comment-form">
        <Form onSubmit={this.handleCommentSubmit}>
          <Form.Group fluid >
            <Form.Input
              onChange={this.handleCommentInputChange}
              placeholder="Leave A Comment"
              icon="comment"
              iconPosition="left"
              value={this.state.content}
              name="content"
              type="textArea"
            />
            <Button type="submit" primary size="large" icon="check" />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    displaySong: state.displaySong
  }
}

export default connect(
  mapStateToProps,
  { postNewComment }
)(withRouter(SongCommentForm))
