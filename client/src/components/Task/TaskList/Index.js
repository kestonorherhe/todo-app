import React, { Component } from 'react'
import './style.css'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
                count: 1,
                list : []
            },
            todo: {},
        };
        this.handleCheck = this.handleCheck.bind(this)
    }

    //  handle checkbox
    handleCheck =  async e  => {
        // e.preventDefault()
        this.props.onCheck(e)
    }
    render() {
        // console.log(this.props)
        if ( this.props.todos.length !== 0 ) {
            return <div>
                <div class="card-content">
                    <div class="card-body">
                        <form id="form-todo-list">
                            <div id="todo-list" class="todo-list media-list media-bordered">
                                { (this.props.todos || []).map(todo => <div key={ todo._id }>
                                    <div class={ `todo-item media ${ todo.status }` }>
                                        <div class="media-left pr-1">
                                            <span class="dragme ft-more-vertical"></span>
                                            <div class={ `icheckbox_square-blue ${ todo.checked } ` } style={ { position: 'relative' } }>
                                                <input type='checkbox'              name='todo-item-done'           class='todo-item-done           icheckbox_square-blue' 
                                                    value={ todo._id } 
                                                    onClick={ e =>  this.handleCheck(todo) }
                                                    style={ { position: 'absolute', opacity: 0 } }
                                                />
                                            </div>
                                        </div>
                                        <div class="media-body">
                                            <div class="todo-title">
                                                {todo.title}
                                                <div class="float-right">
                                                    <span class={ `mr-2 badge badge-${ todo.priority }` }>{todo.tag}</span>
                                                    <a class='todo-item-delete'><i class="icon-trash"></i></a>
                                                </div>
                                            </div>
                                            <span class="todo-desc">{todo.desc}</span>
                                        </div>
                                    </div>
                                </div>) }
                                <div class="todo-item no-result text-center media no-items">
                                    <div class="media-body">
                                        <div class="todo-title">
                                            Load more
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        } else {
            return <div>
                <div class="card-content">
                    <div class="card-body">
                        <form id="form-todo-list">
                            <div id="todo-list" class="todo-list media-list media-bordered">
                                <div class="todo-item no-result text-center media no-items">
                                    <div class="media-body">
                                        <div class="todo-title">
                                        No items found
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    }
}

export default TaskList