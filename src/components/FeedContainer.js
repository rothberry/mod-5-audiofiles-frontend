import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
// import { fetchAllSongs } from "../actions"

class FeedContainer extends Component {

  // componentDidMount() {
  //   this.props.fetchAllSongs()
  // }
  render() { 
    // const {} = this.props
    console.log('feed props: ', this.props)
    return ( 
      <div className='feed-container'>
        da Feed
        {/* Map song components */}
      </div>
     );
  }
}
 
const mapStateToProps = state => {
  return {
    user: state.user,
    // allUsers: state.allUsers,
    allSongs: state.allSongs
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FeedContainer))