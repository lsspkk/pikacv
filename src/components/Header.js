import React from 'react'

export function Header (props) {
  return (
    <span style={{fontSize: '1.5rem', fontWeight: 'bold', paddingRight: '2em'}}>
      {props.children}
    </span>
  )
}
