import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'jotai'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Suspense fallback={<span>loading...</span>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
