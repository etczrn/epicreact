# Render a React App

## 📝 Your Notes

### Exercise

```js
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
```

### 1. 💯 Use @reach/dialog

```js
import '@reach/dialog/styles.css'
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import Dialog from '@reach/dialog'
import {Logo} from 'components/logo'

const App = () => {
  const [openModal, setOpenModal] = useState('none')

  const handleModalClose = () => setOpenModal('none')

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog
        aria-label="Login form"
        isOpen={openModal === 'login'}
        onDismiss={handleModalClose}
      >
        <button onClick={handleModalClose}>close</button>
        <h3>Login</h3>
      </Dialog>
      <Dialog
        aria-label="Registration form"
        isOpen={openModal === 'register'}
        onDismiss={handleModalClose}
      >
        <button onClick={handleModalClose}>close</button>
        <h3>Register</h3>
      </Dialog>
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
```

### 2. 💯 Create a LoginForm component

```js
import '@reach/dialog/styles.css'
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import Dialog from '@reach/dialog'
import {Logo} from 'components/logo'

const LoginForm = ({onSubmit, buttonText}) => {
  const handleSubmit = e => {
    e.preventDefault()
    // * Form event target elements shows all elements it has
    // * You can destructure those elements by their ID (<input id='something' />)
    const {username, password} = e.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

const App = () => {
  const [openModal, setOpenModal] = useState('none')

  const handleModalClose = () => setOpenModal('none')

  // * FormData object: https://developer.mozilla.org/ko/docs/Web/API/FormData/FormData
  const login = formData => console.log('login', formData)
  const register = formData => console.log('register', formData)

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog
        aria-label="Login form"
        isOpen={openModal === 'login'}
        onDismiss={handleModalClose}
      >
        <button onClick={handleModalClose}>close</button>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog
        aria-label="Registration form"
        isOpen={openModal === 'register'}
        onDismiss={handleModalClose}
      >
        <button onClick={handleModalClose}>close</button>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
```

## Background

The first step to any React app is to create a component and render it to the
page. In modern applications with modern tools, this means you'll import React
and ReactDOM and use them to create React elements, and render those to a `div`.

## Exercise

Production deploys:

- [Exercise](https://exercises-01-bootstrap.bookshelf.lol/exercise)
- [Final](https://exercises-01-bootstrap.bookshelf.lol/)

👨‍💼 I'm excited to get started with you! Let's start out by rendering our awesome
logo and the title of our app. We'll eventually want to allow people to login so
let's also render Login and Register buttons.

### Files

- `src/index.js`

## Extra Credit

### 1. 💯 Use `@reach/dialog`

[Production deploy](https://exercises-01-bootstrap.bookshelf.lol/extra-1)

👨‍💼 When the user clicks "Login" or "Register", we should open a modal with a
form for them to provide their username and password.

In this extra credit, get the `Dialog` component from `@reach/dialog` and make
it open when the user clicks the Login or Register button. It's a fantastic
component with a great API and fantastic accessibility characteristics.

📜 https://reacttraining.com/reach-ui/dialog

💰 as with everything, there are many ways to do this. For me, I actually render
two individual dialogs and toggle which is open based on a `openModal` state
which can be set to `none`, `login`, or `register`.

💰 Don't forget to include the styles: `import '@reach/dialog/styles.css'`

**Files:**

- `src/index.js`

### 2. 💯 Create a LoginForm component

[Production deploy](https://exercises-01-bootstrap.bookshelf.lol/extra-2)

👨‍💼 The user should be able to login or register by providing a username and
password.

For this one, create a `LoginForm` component which renders a form accepting a
username and password. When the user submits the form, it should call an
`onSubmit` prop with the `username` and `password`. Here's how it will be used:

```javascript
function Example() {
  function handleSubmit(formData) {
    console.log('login', formData)
  }
  return <LoginForm onSubmit={handleSubmit} buttonText="Login" />
}
```

That should render a form where the submit button says "Login" and when the user
clicks it, you'll get a console.log with the form's data.

**Files:**

- `src/index.js`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Build%20React%20Apps&e=01%3A%20Render%20a%20React%20App&em=
