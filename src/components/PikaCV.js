import React from 'react'

export function PikaCV ({layout, information}) {
  return (
    <div style={layout.base}>
      <div style={{...layout.header, height: '30%', minHeight: '300px', display: 'flex'}}>
        <img src={information.photoImage} style={{height: '300px'}} />
        <div>
          <h1>{information.name}</h1>
          <p>{information.contact}</p>
        </div>
      </div>
      <div>
        <div style={{...layout.title, paddingTop: '0.5em'}}>Information</div>
        <p>{information.summary} blah blah</p>
      </div>
      <div>
        <div style={{...layout.title, paddingTop: '0.5em'}}>Experience</div>
        <p>{information.summary}</p>
      </div>

    </div>
  )
}
