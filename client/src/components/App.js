import React from 'react';
import Routes from '../components/Routes';

import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = window.$ = $;

export default class App extends React.Component {
  render() {

  $(document).ready(function () {

  })
    return (
        <div>
            <Routes />
        </div>
    );
  }
}  
