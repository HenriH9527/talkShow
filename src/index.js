import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Routes from './configs/router.config'

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
)
