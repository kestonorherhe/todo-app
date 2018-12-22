import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App'

// Get app from the document
var contentNode = document.getElementById('root');

ReactDOM.render(
    <Router>            
        <Switch>
            <Route path='/' component={ App } />
        </Switch>
    </Router>,
    contentNode
);  