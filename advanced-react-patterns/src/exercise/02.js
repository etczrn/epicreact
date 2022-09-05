// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(on => !on)

  return React.Children.map(children, child => {
    if (typeof child.type === 'string') {
      return child
    }

    const newChild = React.cloneElement(child, {on, toggle})
    console.log(newChild.type)
    return newChild
  })

  /* or do this
  return React.Children.map(children, child => {
    if (allowedTypes.includes(child.type)) {
      const newChild = React.cloneElement(child, {on, toggle})
      return newChild
    }
    return child
  })
   */
}

const ToggleOn = ({on, children}) => (on ? children : null)

const ToggleOff = ({on, children}) => (on ? null : children)

const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

function MyToggleButton({on, toggle}) {
  return on ? 'the buton is on yo.' : 'the button is off sooo...'
}

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
        <MyToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
