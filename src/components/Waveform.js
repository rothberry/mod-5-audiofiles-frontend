/*eslint-disable */
import React from "react"
import ReactDOM from "react-dom"
import WaveSurfer from "wavesurfer.js"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Icon, Label, Segment, Loader } from "semantic-ui-react"

const fetchFavoritesURL = "http://localhost:3000/favorites"

class Waveform extends React.Component {
  // TODO Add Loading animation on Waveform
  state = {
    isPlaying: false,
    // isLoading: true,
    pos: 0,
    duration: 0,
    favorites: [],
    isFavorite: false,
    favoriteID: ""
  }

  componentDidMount() {
    this.buildWaveForm()
    this.setIsFavorite(this.props.song.user.id)
  }

  buildWaveForm = () => {
    const {
      waveHeight,
      responsive,
      splitChannels,
      mediaControls,
      maxCanvasWidth,
      song_link,
      song
    } = this.props
    // TODO Move waveColor and progress color to store
    let randWaveColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    let randProgColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    let waveColor = "#0C0536"
    let progressColor = "#C0BDCA"
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector(`.wave-${song.id}`)
    if (this.$waveform) {
      this.wavesurfer = WaveSurfer.create({
        container: this.$waveform,
        mediaType: "audio",
        waveColor: randWaveColor,
        progressColor: randProgColor,
        partialRender: true,
        height: waveHeight,
        maxCanvasWidth: maxCanvasWidth,
        splitChannels: splitChannels,
        mediaControls: mediaControls,
        responsive: responsive
      })

      // this.$waveform.style.backgroundColor = "black"
      this.wavesurfer.load(song_link)
      // this.setState({ isLoading: false })
      this.wavesurfer.setVolume(1)
      // TODO Add duration to waveform
    } else {
      console.log("waveform loading...")
    }
  }

  componentWillUnmount() {
    this.wavesurfer.empty()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filtered !== this.props.filtered) {
      this.wavesurfer.empty()
      this.wavesurfer.load(this.props.song_link)
      // this.$waveform.firstChild.remove()
      // this.buildWaveForm()
    }
    if (!!this.props.user.id && this.props.user.id !== prevProps.user.id) {
      this.setIsFavorite(this.props.user.id)
    }
  }

  setIsFavorite = user_id => {
    const setIsFavorite = this.props.song.favorites.find(fav => {
      return fav.user_id === user_id
    })
    if (setIsFavorite !== undefined) {
      this.setState({
        favorites: this.props.song.favorites,
        isFavorite: !!setIsFavorite,
        favoriteID: setIsFavorite.id
      })
    }
  }

  handleTogglePlay = () => {
    if (this.state.isPlaying) {
      this.wavesurfer.pause()
      this.setState({
        isPlaying: !this.state.isPlaying,
        pos: this.wavesurfer.getCurrentTime()
      })
    } else {
      this.wavesurfer.play()
      this.setState({
        isPlaying: !this.state.isPlaying,
        pos: this.wavesurfer.getCurrentTime()
      })
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
    if (!this.state.isFavorite) {
      const reqPostObj = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user_id: this.props.user.id,
          song_id: this.props.song.id
        })
      }
      fetch(fetchFavoritesURL, reqPostObj)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          if (!data.errors) {
            this.setState({
              favorites: [...this.state.favorites, data],
              isFavorite: true,
              favoriteID: data.id
            })
          }
        })
        .catch(err => console.log(err))
    } else {
      this.handleUnfavorite()
    }
  }

  handleUnfavorite = () => {
    const reqDelObj = {
      method: "DELETE"
    }
    fetch(`${fetchFavoritesURL}/${this.state.favoriteID}`, reqDelObj)
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          let newFavArray = this.state.favorites.filter(
            fav => fav.id !== this.state.favoriteID
          )
          this.setState({
            favorites: newFavArray,
            isFavorite: false
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    // TODO Make it so only one audio track can play at a time
    const { isLoading } = this.state
    const { isLoggedIn } = this.props.user
    const buttonStyle = { width: "20%" }
    const waveStyle = { backgroundColor: 'aluminum' }
    const favColor = this.state.isFavorite ? "red" : "black"
    return (
      <Segment className="waveform" style={{ cursor: "text" }} raised style={waveStyle} >
        <div className={`wave-${this.props.song.id}`}></div>
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
        <Button as="div" toggle labelPosition="right" disabled={!isLoggedIn}>
          <Button icon onClick={this.handleFavorite} circular>
            <Icon color={favColor} name="heart" />
          </Button>
          <Label basic pointing="left" circular>
            {this.state.favorites.length}
          </Label>
        </Button>
        {this.props.showCommentCount ? (
          <Label icon="comments" iconPosition="left">
            {" "}
            {this.props.song.comments.length}
          </Label>
        ) : null}
      </Segment>
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
