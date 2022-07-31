// Packages
import React from 'react'
import ReactDOM from 'react-dom'
// Root component
import App from './App'
// Redux
import { Provider } from 'react-redux'
import store from './app/store'
import { fetchUsers } from './features/users/usersSlice'
// Mock API server
import { worker } from './api/server'
// Stylesheet
import './index.css'

// Wrap app rendering so we can wait for the mock API to initialize.
async function start() {
  // Start our mock API server.
  await worker.start({ onUnhandledRequest: 'bypass' })

  // Users only need to be fetched once, so this should be performed on start.
  store.dispatch(fetchUsers())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
