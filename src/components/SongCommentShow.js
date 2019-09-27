/*eslint-disable */
import React, { Component } from "react"
import { Segment, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { findDisplayComments, fetchAllComments } from "../actions"
import _ from "lodash"

class SongCommentShow extends Component {
  componentDidMount() {
    // TODO This works, but it sucks
    this.commentGrabber()
  }

  commentGrabber = async () => {
    await this.props.fetchAllComments()
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
    return this.props.displayComments.map(comment => {
      let ts = new Date(comment.created_at)
      return (
        <Segment piled raised size="tiny" style={{
          backgroundColor: '#0C0536', color: '#C0BDCA', overflow: 'auto'
          }}>
          <Button icon="delete" size="mini" onClick={null} />
          <span style={{ fontWeight: "bold" }}>{comment.user.username}: </span>
          {comment.content}{" "}
          <span style={{ fontStyle: "italic" }}>{this.showTime(ts)}</span>
        </Segment>
      )
    })
  }

  render() {
    // console.log(this.props.allComments)
    return (
      <Segment.Group>
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
  { findDisplayComments, fetchAllComments }
)(withRouter(SongCommentShow))
