// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  // * What if the user of this hook didn't want to use JSON.stringify and JSON.parse,
  // * and they wanted to serialize and deserialize this a different way themselves?
  // * That's actually pretty straightforward to accomplish with some options here.
  // * If they don't want to provide options, then we'll default that to an empty object.
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalstorage = window.localStorage.getItem(key)
    if (valueInLocalstorage) {
      // * We don't want it to be in quotes as it is here.
      // * I'm going to go ahead and clear that.
      // * We're going to fix that problem here by doing a JSON.parse.
      return deserialize(valueInLocalstorage)
    }

    // * The next thing that I want to add here is what if the default value
    // * that they want to provide to me is computationally expensive for them to create?
    // * If it's computationally expensive, then I don't want to have them have to pass that every single time.
    // * We're going to do basically the same thing that useState does,
    // * and that is make the default value optionally a function.
    // * We can say, "If the type of default value is a function, then we'll call default value.
    // * Otherwise, we'll just return the default value."
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // * What we need to do is we want to remove the old value
  // * from the previous key and set the new one.
  // * To keep track of that previous value, what I'm going to do is have a prev key ref.
  // * That'll be React.useRef. We'll pass as the initial value the key.
  // * What this is going to do is this gives me an object that I can mutate
  // * without triggering rerenders.
  // * That differs from useState, because if I wanted to change this value,
  // * then I have to call setState to make a change to that value, and that'll trigger a rerender.
  // * For this particular thing, I don't want to trigger a rerender if I want to change that previous key.
  // * What we're going to do now is I'm going to get my previous key.
  // * That's going to be the previouskeyref.current. On the first render,
  // * that previouskeyref.current is going to be whatever that key was.
  // * Then I can say if the previous key is not equal to the current key,
  // * that may or may not have triggered this useEffect to get recalled.
  // * If those things have changed, then I'm going to say,
  // * "Hey, window, localStorage, I want to remove the previous item key."
  // * Let's get rid of the old one, I'm going to change it to a new one.
  // * Now we can say previous key ref.current = the new key.
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key

    // * If that value is a number, then that value is going to get coerced into a string
    // * when we set that item into localStorage. Then when we try to get it out,
    // * it's going to be a string as well. We need to parse this somehow out and serialize it,
    // * stringify it maybe using JSON.stringify.
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="George" />
}

export default App
