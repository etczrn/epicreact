/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useState, useEffect} from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client.exercise'

async function getUser() {
  let user = null
  const token = await auth.getToken()

  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])

  const login = form => auth.login(form).then(user => setUser(user))

  const register = form => auth.register(form).then(user => setUser(user))

  const logout = () => {
    auth.logout()
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
