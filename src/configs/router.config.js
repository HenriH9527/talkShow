import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'


import loginPage from '../pages/login'

export default () => {
    <Router>
        <Route path="/" component={loginPage}></Route>
    </Router>
}