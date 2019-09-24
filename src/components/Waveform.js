import React from "react"
import ReactDOM from "react-dom"
import WaveSurfer from "wavesurfer.js"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      pos: 0
    }
  }
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector(".wave")
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      mediaType: "audio",
      waveColor: "red",
      progressColor: "blue",
      height: 200,
      mediaControls: true,
      responsive: true
    })
    // debugger
    this.$waveform.style.backgroundColor = "black"
    this.wavesurfer.load(this.props.songData.song_link)
  }

  handleTogglePlay = () => {
    if (this.state.playing) {
      this.wavesurfer.pause()
      this.setState({ playing: !this.state.playing })
    } else {
      this.wavesurfer.play()
      this.setState({ playing: !this.state.playing })
    }
  }

  handleStop = () => {
    this.setState(prevState => {
      this.wavesurfer.stop()
      return { playing: false, pos: 0 }
    })
  }

  render() {
    console.log(this.props)
    if (this.props.src) {
      this.wavesurfer.load(this.props.src)
    }
    return this.props.src ? (
      <div className="waveform">
        <div className="wave"></div>
        <button name="play-pause" onClick={this.handleTogglePlay}>
          Play/Pause
        </button>
        <button name="stop" onClick={this.handleStop}>
          Stop
        </button>
      </div>
    ) : ( 
      <div>da feeed is loadin..................</div>
    )
  }
}

export default connect(
  null,
  null
)(withRouter(Waveform))

// Waveform.defaultProps = {
//   src: ""
// }
