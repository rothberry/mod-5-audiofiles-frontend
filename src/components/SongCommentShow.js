/*eslint-disable */
import React, { Component } from "react"
import { Segment, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { findDisplayComments } from "../actions"
import _ from 'lodash'

class SongCommentShow extends Component {

  componentDidMount() {
    this.props.findDisplayComments(this.props.displaySong)
  }

  showTime = (ts) => {
    const date = ts.getDate()
    const month = ts.getMonth()
    const year = ts.getYear()
    const hours = ts.getHours()
    const minutes = ts.getMinutes()
    // const hours = ts.getHours()
    const monthDateYear  = (month+1) + "/" + date + "/" + (year-100);
    console.log(monthDateYear)
    // const formattedDate = 
  }

  render() {
    // console.log(this.props)
    const mappedComments = this.props.displayComments.map(comment => {
      let ts = new Date(comment.created_at)
      this.showTime(ts)
      
      return(
        <Segment piled raised size='tiny'>
          <Button icon='delete' size='mini' onClick={null} />
          {ts.toDateString()}: {comment.content}
        </Segment>
      )
    })
    return (
      <Segment.Group>
        {_.reverse(mappedComments)}  
      </Segment.Group>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    displaySong: state.displaySong,
    displayComments: state.displayComments
  }
}

export default connect(
  mapStateToProps,
  { findDisplayComments }
)(withRouter(SongCommentShow))
