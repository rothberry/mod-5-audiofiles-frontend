/*eslint-disable */
import React from "react"
import ReactDOM from "react-dom"
import WaveSurfer from "wavesurfer.js"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Icon, Label } from "semantic-ui-react"

class Waveform extends React.Component {
  
  state = {
    isPlaying: false,
    favorites: 0,
    isFavorite: false,
    pos: 0,
    duration: 0
  }

  componentDidMount() {
    const {
      waveHeight,
      responsive,
      splitChannels,
      mediaControls,
      maxCanvasWidth,
      song_link
    } = this.props
    // TODO Move waveColor and progress color to store
    // ? let randColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    let waveColor = "#0C0536"
    let progressColor = "#C0BDCA"
    // let waveColor = "#C0BDCA"
    // let progressColor = "#0C0536"
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector(".wave")
    if (this.$waveform) {
      this.wavesurfer = WaveSurfer.create({
        container: this.$waveform,
        mediaType: "audio",
        waveColor: waveColor,
        progressColor: progressColor,
        partialRender: true,
        height: waveHeight,
        maxCanvasWidth: maxCanvasWidth,
        splitChannels: splitChannels,
        mediaControls: mediaControls,
        responsive: responsive
      })
      // this.$waveform.style.backgroundColor = "black"
      this.wavesurfer.load(song_link)
      this.wavesurfer.setVolume(0.2)
      // TODO Add duration to waveform
      this.setState({
        favorites: this.props.song.favorites.length,
        duration: this.wavesurfer.getDuration()
        // isFavorite: !!setIsFavorite
      })
    } else {
      console.log("waveform loading...")
    }
  }

  // TODO Fix the 'isFavorite' for state
  // setIsFavorite = () => {
  //   if (!!Object.keys(this.props.user).length) {
  //     const setIsFavorite = this.props.song.favorites.find(fav => {
  //       return fav.user_id === this.props.user.id
  //     })
  //   }
  //   console.log(setIsFavorite)
  //   return !!setIsFavorite
  // }

  handleTogglePlay = () => {
    if (this.state.isPlaying) {
      this.wavesurfer.pause()
      this.setState({ isPlaying: !this.state.isPlaying })
    } else {
      this.wavesurfer.play()
      this.setState({ isPlaying: !this.state.isPlaying })
    }
  }

  handleStop = () => {
    this.setState(prevState => {
      this.wavesurfer.stop()
      return { isPlaying: false, pos: 0 }
    })
  }

  handleFavorite = e => {
    e.preventDefault()
    const fetchFavoritesURL = "http://localhost:3000/favorites"
    const reqObj = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: this.props.user.id,
        song_id: this.props.song.id
      })
    }
    fetch(fetchFavoritesURL, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        if (!data.errors) {
          this.setState({
            favorites: this.state.favorites + 1,
            isFavorite: !this.state.isFavorite
          })
        }
      })
      .catch(err => console.log(err))
  }

  handleUnfavorite = () => {
    // TODO can unfavorite with a DELETE request
  }

  render() {
    // TODO Make it so only one audio track can play at a time
    const buttonStyle = { width: "20%" }
    let setIsFavorite
    if (!!Object.keys(this.props.user).length) {
      setIsFavorite = this.props.song.favorites.find(fav => {
        return fav.user_id === this.props.user.id
      })
    }
    // console.log(this.state.isFavorite)
    const favColor = !!setIsFavorite ? "red" : "black"
    // const favColor = !!this.state.isFavorite ? 'red' : 'black'
    return (
      <div className="waveform" style={{ cursor: "text" }}>
        <div className="wave"></div>
        {!this.state.isPlaying ? (
          <Button
            name="play-pause"
            style={buttonStyle}
            onClick={this.handleTogglePlay}
            circular
            icon="play"
          />
        ) : (
          <Button
            name="play-pause"
            style={buttonStyle}
            onClick={this.handleTogglePlay}
            circular
            icon="pause"
          />
        )}
        <Button
          name="stop"
          style={buttonStyle}
          onClick={this.handleStop}
          circular
          icon="stop"
        />
        {/* <Button name="stop" onClick={this.handleFavorite} icon='heart'> */}
        <Button as="div" toggle labelPosition="right">
          <Button icon onClick={this.handleFavorite} circular>
            <Icon color={favColor} name="heart" />
          </Button>
          <Label basic pointing="left" circular>
            {this.state.favorites}
          </Label>
        </Button>
        <Label>{this.state.duration}</Label>
        {/* </Button> */}
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
  null
)(withRouter(Waveform))
