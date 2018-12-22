import React, { Component } from 'react'

export default class SearchForm extends Component {
    render() {
        return <div>
            <div class="search">
                <input id="basic-search" type="text" placeholder="Search here..." class="basic-search" style={ { width: 89 + '%', border: 1 + 'px' + 'solid #E4E7ED', padding: 1.25 + 'rem', borderRadius: 4 + 'px', marginTop: 25 + 'px', marginLeft: 30 + 'px', marginRight: 20 + 'px' } } />
                <i class="ficon ft-search"></i>
            </div>
        </div>
    }
}