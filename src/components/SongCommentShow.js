/*eslint-disable */
import React, { Component } from "react"
import { Segment, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  findDisplayComments,
  deleteCommentFromBackend,
  goToUserProfile,
} from "../actions"
import _ from "lodash"

class SongCommentShow extends Component {
  showTime = (ts) => {
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
    return this.props.displayComments.map((comment) => {
      let ts = new Date(comment.created_at)
      const isCurrentUser = this.props.user.id === comment.user_id
      // TODO Maybe move to backend (add username to songs#show response?)
      const commentUser = this.props.allUsers.find(
        (u) => u.id === comment.user_id
      )
      return (
        <Segment as='ol' size='tiny'>
          {isCurrentUser ? (
            <Button
              icon='delete'
              size='mini'
              onClick={() => this.props.deleteCommentFromBackend(comment.id)}
            />
          ) : (
            <Button
              icon='user'
              size='mini'
              onClick={() =>
                this.props.goToUserProfile(comment.user_id, this.props.history)
              }
            />
          )}
          <span
            style={{
              fontStyle: "italic",
              cursor: "pointer",
              paddingRight: "1%",
            }}
            onClick={() =>
              this.props.goToUserProfile(comment.user_id, this.props.history)
            }
          >
            {commentUser.username}:{" "}
          </span>
          <span style={{ fontWeight: "bold", paddingRight: "1%" }}>
            {comment.content}{" "}
          </span>
          <span style={{ fontStyle: "italic", float: "right" }}>
            {this.showTime(ts)}
          </span>
        </Segment>
      )
    })
  }

  render() {
    const commentStyleBox = {
      overflow: "auto",
      maxHeight: "30vh",
      margin: "0% 1%",
    }
    // console.log(this.props.allComments)
    return (
      <Segment.Group raised style={commentStyleBox}>
        {this.props.displayComments.length > 0
          ? _.reverse(this.mappedComments())
          : "Nupe"}
      </Segment.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    displayComments: state.displayComments,
  }
}

export default connect(mapStateToProps, {
  findDisplayComments,
  deleteCommentFromBackend,
  goToUserProfile,
})(withRouter(SongCommentShow))
