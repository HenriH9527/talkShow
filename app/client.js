import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import Routes from '@configs/router.config'
// import configure from '@middleware/configureStore'


const HotRoutes = hot(Routes)
// const store = configure({ })

ReactDOM.render(
    <Provider>
        <HotRoutes />
    </Provider>,
    document.getElementById('root')
)