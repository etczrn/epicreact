// 🐨 you'll need to import react and createRoot from react-dom up here
import React from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from 'components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
const App = () => {
  const handleBtnClick = e => {
    const btnName = e.target.textContent
    alert(`${btnName} clicked!`)
  }

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={handleBtnClick}>Login</button>
      </div>
      <div>
        <button onClick={handleBtnClick}>Register</button>
      </div>
    </>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
