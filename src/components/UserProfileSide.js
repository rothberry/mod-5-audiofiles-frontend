/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { Button, Grid, Image, Icon, Segment, Header } from "semantic-ui-react"
import {
  findDisplayUser,
  followUser,
  currentRelationship,
  setCurrentUser,
  deleteUser,
} from "../actions"
const defImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

class UserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
  handleFollowUser = (followed, follower_id) => {
    // console.log("followed: ", followed.id)
    // console.log("follower: ", follower_id)
    this.props.followUser(followed, follower_id)
  }

  handleUnfollowUser = () => {
    // TODO Send DELETE fetch to backend
    // TODO Need the relationshipID
  }
  // forceReload = () => {

  // }
  // mapFollowers = (followArray) => {
  //   return followArray.map(fol => {
  //     return (
  //       <Label widths="equals">
  //         <Icon src={fol.img_url}/>
  //         <Link
  //           // onClick={(allUsers, history) =>
  //           //   this.props.findDisplayUser(
  //           //     this.props.allUsers,
  //           //     this.props.history
  //           //   )
  //           // }
  //           to={`/profile/${fol.id}`}
  //         >
  //           {fol.username}
  //         </Link>
  //       </Label>
  //     )
  //   })
  // }

  render() {
    const { isCurrentUser } = this.props.user
    const {
      username,
      name,
      location,
      bio,
      img_url,
      facebook_url,
      twitter_url,
      soundcloud_url,
    } = this.props.displayUser
    const isFace = !facebook_url
    const isTwit = !twitter_url
    const isSound = !soundcloud_url
    const isImg = !!img_url
    let isFollowing
    if (!!this.props.user.id) {
      isFollowing = this.props.followers.find((user) => {
        return user.id === this.props.user.id
      })
    }
    const editAccountButton = (
      <Button as={Link} to='/editaccount' icon='edit' label='Edit Account' />
    )
    const deleteAccountButton = (
      <Button
        onClick={(user_id, history) =>
          this.props.deleteUser(this.props.user.id, this.props.history)
        }
        label='Delete Account'
        icon='delete'
      />
    )
    // const mappedFollowers = this.mapFollowers(this.props.followers)
    // let isFollowers = !!mappedFollowers

    // const mappedFolloweds = this.mapFollowers(this.props.followeds)
    // let isFolloweds = !!mappedFolloweds

    // const eachButtonStyle = { }
    const eachButtonStyle = { width: "20%", margin: "0 1%" }
    const imgStyle = { height: 300, width: 300 }
    // console.log('displayuser: ', this.displayUser)
    // console.log(this.props.user)
    return (
      <Grid.Column>
        <Segment className='feed-profile-side'>
          {isImg ? (
            <Image
              src={img_url}
              circular
              alt={img_url}
              centered
              style={imgStyle}
            />
          ) : (
            <Image src={defImg} circular alt='' centered style={imgStyle} />
          )}
          <Header as='h1' icon='user secret' content={username} />
          <Header as='h4' icon='user' content={name} />
          <Header as='h4' icon='location arrow' content={location} />
          <Header as='h4' icon='book' content={bio} />
          <Button.Group fluid>
            <Button
              color='facebook'
              as='a'
              href={facebook_url}
              disabled={isFace}
              style={eachButtonStyle}
            >
              <Icon name='facebook' />
            </Button>
            <Button
              style={eachButtonStyle}
              color='twitter'
              as='a'
              href={twitter_url}
              disabled={isTwit}
            >
              <Icon name='twitter' />
            </Button>
            <Button
              color='orange'
              style={eachButtonStyle}
              as='a'
              href={soundcloud_url}
              disabled={isSound}
            >
              <Icon name='soundcloud' />
            </Button>
          </Button.Group>
        </Segment>
        <br />
        {/* <Segment widths="equal">
          <h4>Followers: </h4>
          { isFollowers ? (
            <ul>{mappedFollowers}</ul>
          ) : (
            <p>No Followers Yet!</p>
          )}
        </Segment> */}
        {isCurrentUser ? (
          <Button.Group>
            {editAccountButton}
            {deleteAccountButton}
          </Button.Group>
        ) : null}

        {/* {!!isFollowing || isCurrentUser ? null : (
          <Button
            onClick={(followed, follower_id) =>
              this.handleFollowUser(this.props.displayUser, this.props.user.id)
            }
          >
            Follow Me!
          </Button>
        )} */}
      </Grid.Column>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    displayUser: state.displayUser,
    followeds: state.followeds,
    followers: state.followers,
  }
}

export default connect(mapStateToProps, {
  findDisplayUser,
  followUser,
  currentRelationship,
  setCurrentUser,
  deleteUser,
})(withRouter(UserProfileSide))
