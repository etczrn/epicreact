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
