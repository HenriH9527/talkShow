// project's entry script
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import Routes from './configs/router.config'


const title = 'My Minimal React Webpack Babel Setup'
const HotRoutes = hot(Routes)

ReactDOM.render(
    <Provider>
        <HotRoutes />
    </Provider>,
    document.getElementById('root')
)
