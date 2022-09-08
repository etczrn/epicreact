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
