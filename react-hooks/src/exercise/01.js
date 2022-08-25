// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// * One thing to keep in mind here is if we don't pass that prop,
// * now the initial name is going to be undefined and you're going to see a warning.
// * The warning is that the component is changing an uncontrolled input of type undefined to be controlled.
// * Input elements should not switch between these two. That can cause bugs and unexpected things.
// * We need to make sure that this inputs value is not undefined at any time.
// * What we're going to do is default that to an empty string.
// * If the initial name is not provided, then we'll have the default empty string
// * as the initial state for our name that we're going to pass to our input.
function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    const name = event.target.value
    setName(name)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Alex" />
}

export default App
