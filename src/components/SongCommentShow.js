/*eslint-disable */
import React, { Component } from "react"
import { Segment, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  findDisplayComments,
  fetchAllComments,
  deleteCommentFromBackend,
  goToUserProfile
} from "../actions"
import _ from "lodash"

class SongCommentShow extends Component {
  componentDidMount() {
    // TODO This works, but it sucks
    this.commentGrabber()
  }

  // commentGrabber = async () => {
  commentGrabber = () => {
    this.props.findDisplayComments(
      this.props.allComments,
      this.props.displaySong
    )
  }

  showTime = ts => {
    const date = ts.getDate()
    const month = ts.getMonth()
    const year = ts.getYear()
    const hours = ts.getHours()
    const minutes = "0" + ts.getMinutes()
    const monthDateYear = month + 1 + "/" + date + "/" + (year - 100)
    const hoursMinutes = hours + ":" + minutes.substr(-2)
    const formattedTime = monthDateYear + "," + hoursMinutes
    return formattedTime
  }

  mappedComments = () => {
    const commentStyle = { backgroundColor: "#0C0536", color: "#C0BDCA" }
    return this.props.displayComments.map(comment => {
      let ts = new Date(comment.created_at)
      const isCurrentUser = this.props.user.id === comment.user.id
      return (
        <Segment as='ol' size="tiny" style={commentStyle}>
          {isCurrentUser ? (
            <Button
              icon="delete"
              size="mini"
              onClick={(comment_id) =>
                this.props.deleteCommentFromBackend(comment.id)
              }
            />
          ) : (
            <Button
              icon="user"
              size="mini"
              onClick={(user_id, history) =>
                this.props.goToUserProfile(comment.user.id, this.props.history)
              }
            />
          )}
          <span
            style={{ fontWeight: "bold", cursor: 'pointer' }}
            onClick={(user_id, history) =>
              this.props.goToUserProfile(comment.user.id, this.props.history)
            }
          >
            {comment.user.username}:{" "}
          </span>
          {comment.content}{" "}
          <span style={{ fontStyle: "italic" }}>{this.showTime(ts)}</span>
        </Segment>
      )
    })
  }

  render() {
    const commentStyleBox = { overflow: "auto", maxHeight: '30vh', margin: '0% 1%' }
    // console.log(this.props.allComments)
    return (
      <Segment.Group raised style={commentStyleBox}>
        {this.props.allComments.length > 0
          ? _.reverse(this.mappedComments())
          : "loading..."}
      </Segment.Group>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allComments: state.allComments,
    displaySong: state.displaySong,
    displayComments: state.displayComments
  }
}

export default connect(
  mapStateToProps,
  {
    findDisplayComments,
    fetchAllComments,
    deleteCommentFromBackend,
    goToUserProfile
  }
)(withRouter(SongCommentShow))
