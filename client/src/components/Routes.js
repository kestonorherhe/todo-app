import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './Home/Index'

const Routes = () => (
    <Switch>
        <Route exact path='/' component={ Index } />
        <Route exact path='/todos' component={ Index } />
        <Route exact path='/myTask' component={ Index } />
        <Route exact path='/dashboard' component={ Index } />
        <Route exact path='/todos/:param' component={ Index } />
        <Route exact path='/todos/tag/:param' component={ Index } />
    </Switch>
)

export default Routes