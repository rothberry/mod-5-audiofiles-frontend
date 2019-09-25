/*eslint-disable */
import React from "react"
import ReactDOM from "react-dom"
import WaveSurfer from "wavesurfer.js"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Icon, Label } from "semantic-ui-react"

class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      favorites: 0,
      isFavorite: false,
      pos: 0
    }
  }
  componentDidMount() {
    const { waveHeight, responsive, splitChannels, mediaControls, maxCanvasWidth, song } = this.props
    // console.log(this.props.user)
    let setIsFavorite = song.favorites.filter(fav => {
      return fav.user_id === this.props.user.id
    })
    // console.log(setIsFavorite)
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector(".wave")
    if (this.$waveform) {
      this.wavesurfer = WaveSurfer.create({
        container: this.$waveform,
        mediaType: "audio",
        waveColor: "red",
        progressColor: "blue",
        partialRender: true,
        // barWidth: 1,
        height: waveHeight,
        maxCanvasWidth: maxCanvasWidth,
        splitChannels: splitChannels,
        mediaControls: mediaControls,
        responsive: responsive
      })
      // this.$waveform.style.backgroundColor = "black"
      this.wavesurfer.load(this.props.song_link)
      this.wavesurfer.setVolume(.2)
      this.setState({favorites: this.props.song.favorites.length})
    } else {
      console.log('waveform loading...')
    }
  }

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

  handleFavorite = (e) => {
    e.preventDefault()
    console.log(this.props.user.id)
    const fetchFavoritesURL = 'http://localhost:3000/favorites'
    const reqObj = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
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

  render() {
    // return this.props.src ? (
    const buttonStyle = {width: '20%'}
    // const favColor = this.state.isFavorite ? 
    // console.log(this.state)
    return (
      <div className="waveform" style={{cursor: 'text'}}>
        <div className="wave"></div>
        {!this.state.isPlaying ? 
        <Button name="play-pause" style={buttonStyle} onClick={this.handleTogglePlay} circular icon='play' /> :
        <Button name="play-pause" style={buttonStyle} onClick={this.handleTogglePlay} circular icon='pause' />
        }
        <Button name="stop" style={buttonStyle} onClick={this.handleStop} circular icon='stop' />
        {/* <Button name="stop" onClick={this.handleFavorite} icon='heart'> */}
        <Button as='div' toggle labelPosition='right' >
          <Button icon onClick={this.handleFavorite} circular >
            <Icon name='heart' />
          </Button>
          <Label basic pointing='left' circular >
            {this.state.favorites}
          </Label>
        </Button>

        {/* </Button> */}
      </div>
    ) 
    // : ( 
    //   <div className='waveform'>da feeed is loadin..................</div>
    // )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
    // allUsers: state.allUsers
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(Waveform))