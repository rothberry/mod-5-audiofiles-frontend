import React, { Component } from "react"
import ActiveStorageProvider from "react-activestorage-provider"

class ActiveStorageComponent extends Component {
  state = { 
    song_link: ''
   }

  render() {
    return (
      <ActiveStorageProvider
        endpoint={{
          path: "/songs",
          model: "Song",
          attribute: "song_link",
          method: "PUT"
        }}
        onSubmit={song => this.setState({ song_link: song.song_link })}
        render={({ handleUpload, uploads, ready }) => (
          <div>
            <input
              type="file"
              disabled={!ready}
              onChange={e => handleUpload(e.currentTarget.files)}
            />

            {uploads.map(upload => {
              switch (upload.state) {
                case "waiting":
                  return (
                    <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                  )
                case "uploading":
                  return (
                    <p key={upload.id}>
                      Uploading {upload.file.name}: {upload.progress}%
                    </p>
                  )
                case "error":
                  return (
                    <p key={upload.id}>
                      Error uploading {upload.file.name}: {upload.error}
                    </p>
                  )
                case "finished":
                  return (
                    <p key={upload.id}>Finished uploading {upload.file.name}</p>
                  )
              }
            })}
          </div>
        )}
      />
    )
  }
}

export default ActiveStorageComponent
