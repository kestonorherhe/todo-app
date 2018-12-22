import React, { Component } from 'react';
import update from 'react-addons-update'
import SearchForm from '../SearchForm/Index';
import TaskList from '../Task/TaskList/Index';
import Navbar from '../Navbar/Index';
import Footer from '../Footer/Index';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todo: {}
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
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

    //  fetch todos in DidMount lifecycle
    componentDidMount = () => {
        const url = this.props.match;
        const param = this.props.match.params.param
        
        this.callApi(this.route(url,param))
    }

    // handle mouse enter event
    handleMouseEnter = e => {
        // this filters the needed todo item from the array
        const todo = this.state.todos.filter(t => t._id === e.target.value)

        todo.map(t => {
            const prevState = this.state
            const newState = update(prevState, {
                todo: {
                    $set:
                    {
                        '_id': t._id,
                        title: t.title,
                        tag: t.tag,
                        priority: t.priority,
                        'status': t.status,
                        'desc': t.desc,
                        'checked': t.checked
                    }
                }
            })
            this.setState({ todo: newState.todo })
            // console.log(this.state.todo)
        })
    }

    //  handle checkbox
    handleCheck = async e => {
        const url = this.props.match;
        const param = this.props.match.params.param
        if (this.state.todo.status === 'completed') {
            const prevState = this.state
            const newState = update(prevState, {
                todo: {
                    $merge: {
                        status: 'uncompleted',
                        checked: 'unchecked'
                    }
                }
            })

            const response = await fetch(`/api/v1/todo-id/${ e.target.value }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo: newState.todo })
            })
            const body = await response.text()
            console.log(body)
            this.callApi(this.route(url, param));
        } else {
            const prevState = this.state
            const newState = update(prevState, {
                todo: {
                    $merge: {
                        status: 'completed',
                        checked: 'checked'
                    }
                }
            })
            // this.setState({ todo: newState.todo })
            // console.log(this.state.todo)

            const response = await fetch(`/api/v1/todo-id/${ e.target.value }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo: newState.todo })
            })
            const body = await response.text()
            console.log(body)
                
            this.callApi(this.route(url,param));
        }
    }
    render() {
        console.log(this.state.todos);
        // console.log(this.state.todos);
        const { todos } = this.state
        const { handleMouseEnter, handleCheck } = this
        return <div>
            <div class="app-content content">
                <Navbar todos = { todos } />
                <div class="content-right">
                    <div class="content-wrapper">
                        <div class="content-header row">
                        </div>
                        <div class="content-body"><div class="card todo-details rounded-0">
                            <SearchForm />
                            <TaskList 
                            todos = { todos }
                            onMouseEnter = { handleMouseEnter }
                            onCheck = { handleCheck }
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