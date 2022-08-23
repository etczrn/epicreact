// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

function Box({style, size, className, ...otherProps}) {
  const sizeClassName = size ? `box--${size}` : ''

  return (
    <div
      className={`box ${className} ${sizeClassName}`}
      style={{fontStyle: 'italic', ...style}}
      {...otherProps}
    />
  )
}

const smallBox = (
  <Box id="small-box" size="small" style={{backgroundColor: 'lightBlue'}}>
    small lightblue box
  </Box>
)

const mediumBox = (
  <Box size="medium" style={{backgroundColor: 'pink'}}>
    medium pink box
  </Box>
)

const largeBox = (
  <Box size="large" style={{backgroundColor: 'orange'}}>
    large orange box
  </Box>
)

function App() {
  return (
    <>
      {smallBox}
      {mediumBox}
      {largeBox}
      <Box>sizeless box</Box>
    </>
  )
}

export default App
