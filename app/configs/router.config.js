import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'

import * as base from '../pages/base/app'

export default () => {
    <Router history={hashHistory}>
        <Route path="/" component={base.app}>
    
        </Route>
    </Router>
}