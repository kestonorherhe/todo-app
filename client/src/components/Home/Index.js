import React, { Component } from 'react';
import axios from 'axios'
import update from 'react-addons-update'
import _ from 'lodash'

import SearchForm from '../SearchForm/Index';
import TaskList from '../Task/TaskList/Index';
import Navbar from '../Navbar/Index';
import Footer from '../Footer/Index';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todo: {},
            myTask: [],
            allTodos: []
        };
        this.handleCheck = this.handleCheck.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    route = (url, param) => {
        if (url.path === '/todos/:param', param === 'starred') {
            return `${ url.url }/filter/?starred=${ param }`
        } else if ( url.path === '/todo/:param',param === 'priority' ) {
            return `/todos/filter/?priority=${ param }`
        } else if (url.path === '/todo/:param', param === 'completed') {
            return `/todos/filter/?status=${ param }`
        } else if ( url.path === '/todo/:param',param === 'deleted') {
            return `/todos/filter/?deleted=${ param }`
        } else if (url.path === '/todos/tag/:param') {
            return `/todos/filter/?tag=${ param }`
        } else {
            return `/todos`
        }
    }

    callApi = async (route) => {
        console.log(route);
        const response = await fetch(`/api/v1${ route }`);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        
        return this.setState({ todos: body.todos })
    };

    myTask = async () => {
        const response = await fetch(`/api/v1/myTask`);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json()
        this.setState({ myTask: json.todos })
    }

    allTodos = async () => {
        const response = await fetch(`/api/v1/todos`)
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json()
        this.setState({ allTodos: json.todos })
    }

    //  fetch todos in DidMount lifecycle
    async componentDidMount() {
        const url = this.props.match;
        const param = this.props.match.params.param
        
        this.callApi(this.route(url,param))

        this.myTask()
        this.allTodos()
    }

    //  handle checkbox
    handleCheck = async e => {
        const filter = _.find(this.state.todos, { '_id': e._id })
        const url = this.props.match;
        const param = this.props.match.params.param
        if (filter.status === 'completed') {
            const prevState = this.state
            const newState = update(prevState, {
                todo: {
                    $merge: {
                        status: 'uncompleted',
                        checked: 'unchecked'
                    }
                }
            })

            const newTodo = this.state.todos.map(todo => {
                if(todo._id === e._id) {
                    return Object.assign({}, todo, {
                        status: 'uncompleted',
                        checked: 'unchecked'
                    })
                } else {
                    return todo
                }
            })
            this.setState({ todos: newTodo })

            const response = await fetch(`/api/v1/todo-id/${ e._id }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo: newState.todo })
            })
            const body = await response.text()
            this.callApi(this.route(url, param));
        }else {
            const prevState = this.state
            const newState = update(prevState, {
                todo: {
                    $merge: {
                        status: 'completed',
                        checked: 'checked'
                    }
                }
            })
            
            const newTodo = this.state.todos.map(todo => {
                if(todo._id === e._id) {
                    return Object.assign({}, todo, {
                        status: 'completed',
                        checked: 'checked'
                    })
                } else {
                    return todo
                }
            })
            this.setState({ todos: newTodo })

            const response = await fetch(`/api/v1/todo-id/${ e._id }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo: newState.todo })
            })
            const body = await response.text()                
            this.callApi(this.route(url,param));
        }
    }

    // handle delete
    handleDelete = async todo => {
        const originalState = this.state.todos

        this.setState({ todos: this.state.todos.filter(t => t._id !== todo._id, {}) })

        const response = await fetch(`/api/v1/todo-id/${ todo._id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: todo._id })
        })
        const res = await response
        if (res.status !== 200) {
            this.setState({ todos: originalState })
        }

    }
    render() {
        console.log(this.state.todos);
        const { todos, myTask, allTodos } = this.state
        const { handleMouseEnter, handleCheck, handleDelete } = this
        return <div>
            <div class="app-content content">
                <Navbar 
                    todos = { todos }
                    myTask = { myTask }
                    allTodos = { allTodos }
                />
                <div class="content-right">
                    <div class="content-wrapper">
                        <div class="content-header row">
                        </div>
                        <div class="content-body"><div class="card todo-details rounded-0">
                            <SearchForm />
                            <TaskList 
                            todos = { todos }
                            onCheck = { handleCheck }
                            onDelete = { handleDelete }
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    }
}