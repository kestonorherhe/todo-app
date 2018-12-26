import React, { Component } from 'react'
import TaskAdd from '../Task/TaskAdd/Index';

export default class Navbar extends Component {
    render() {
        // this filters the needed todo item from the array
        const MyTaskCount = this.props.myTask.length
        const ProjectCount = this.props.allTodos.filter(t => t.tag === 'project').length
        const ProductCount = this.props.allTodos.filter(t => t.tag === 'product').length
        const BugCount = this.props.allTodos.filter(t => t.tag === 'bug').length
        const APICount = this.props.allTodos.filter(t => t.tag === 'API').length
        const UICount = this.props.allTodos.filter(t => t.tag === 'UI').length
        return <div>
            <div class="sidebar-left">
                <div class="sidebar"><div class="sidebar-content d-none d-lg-block sidebar-shop">
                    <div class="card">
                        <div class="card-body">
                            <TaskAdd />
                            <h6 class="text-muted text-bold-500 my-1">Messages</h6>
                            <div class="list-group list-group-messages">
                                <a href="/todos" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-home mr-1"></i>
                                    <span>Home</span>
                                </a>
                                <a href="/myTask" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-list mr-1"></i>
                                    <span>My Tasks</span><span class="badge badge-secondary badge-pill float-right">{ MyTaskCount }</span>
                                </a>
                                <a href="/dashboard" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-screen-desktop mr-1"></i>
                                    <span>Dashboard</span>
                                </a>
                            </div>
                            <h6 class="text-muted text-bold-500 my-1">Filters</h6>
                            <div class="list-group list-group-messages">
                                <a href="/todos/starred" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-star mr-1"></i>
                                    <span>Starred</span>
                                </a>
                                <a href="/todos/priority" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-energy mr-1"></i>
                                    <span>Priority</span>
                                </a>
                                <a href="/todos/completed" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-check mr-1"></i>
                                    <span>Completed</span>
                                </a>
                                <a href="/todos/deleted" class="list-group-item list-group-item-action border-0">
                                    <i class="icon-close mr-1"></i>
                                    <span>Deleted</span>
                                </a>
                            </div>
                            <h6 class="text-muted text-bold-500 my-1">Tags</h6>
                            <div class="list-group list-group-messages">
                                <a href="/todos/tag/project" class="list-group-item list-group-item-action border-0">
                                    <i class="ft-circle mr-1 warning"></i>
                                    <span> Project </span> <span class="badge badge-warning badge-pill float-right">{ ProjectCount }</span>
                                </a>
                                <a href="/todos/tag/product" class="list-group-item list-group-item-action border-0">
                                    <i class="ft-circle mr-1 secondary"></i>
                                    <span> Product </span> <span class="badge badge-secondary badge-pill float-right">{ ProductCount }</span>
                                </a>
                                <a href="/todos/tag/bug" class="list-group-item list-group-item-action border-0">
                                    <i class="ft-circle mr-1 primary"></i>
                                    <span> Bug </span> <span class="badge badge-primary badge-pill float-right">{ BugCount }</span>
                                </a>
                                <a href="/todos/tag/api" class="list-group-item list-group-item-action border-0">
                                    <i class="ft-circle mr-1 success"></i>
                                    <span> API </span> <span class="badge badge-success badge-pill float-right">{ APICount }</span>
                                </a>
                                <a href="/todos/tag/ui" class="list-group-item list-group-item-action border-0">
                                    <i class="ft-circle mr-1 danger"></i>
                                    <span> UI </span> <span class="badge badge-danger badge-pill float-right">{ UICount }</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    }
}