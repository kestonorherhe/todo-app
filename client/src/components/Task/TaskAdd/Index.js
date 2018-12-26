import React, { Component } from 'react'
import axios from 'axios'

export default class TaskAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: {
                title: '',
                tag: '',
                priority: '',
                status: 'uncomplete',
                desc: ''
            }
        }
        this.handleFormInput = this.handleFormInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    //  handle form input
    handleFormInput =( e ) => {
        const newProps = this.state.todo;
        newProps[ e.target.name ] = e.target.value;
        this.setState({ todo: newProps })
    }

    // handle form submit
    handleFormSubmit = async e  => {
        e.preventDefault();
        const response = await fetch('/api/v1/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: this.state.todo }),
        });
        const body = await response.text();

    }
    render() {
        return <div>
            <div class="form-group form-group-compose text-center">
                <button type="button" class="btn btn-info btn-block" data-toggle="modal" data-target="#AddTaskModal">
                    Add Task
                </button>
                {/* <!-- Modal --> */}
                <div class="modal fade" id="AddTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <section class="todo-form">
                                <form id="form-add-todo" class="todo-input">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <fieldset class="form-group col-12">
                                            <input type="text" id="new-todo-item" name="title"  class="new-todo-item form-control" placeholder="Todo Title"
                                            onChange={ this.handleFormInput } />
                                        </fieldset>
                                        <fieldset class="form-group col-12">
                                            <select class="custom-select" id="todo-select" name="tag"
                                            onChange={ this.handleFormInput }>
                                                {/* this is meant to be selected */}
                                                <option defaultValue>Select Tag</option>
                                                <option value="Project">Project</option>
                                                <option value="Product">Product</option>
                                                <option value="Bug">Bug</option>
                                                <option value="Api">API</option>
                                                <option value="UI">UI</option>
                                            </select>
                                        </fieldset>
                                        <fieldset class="form-group col-12">
                                            <select class="custom-select" id="todo-select" name="priority"
                                            onChange={ this.handleFormInput }>
                                                {/* this is meant to be selected */}
                                                <option defaultValue>Select Priority</option>
                                                <option value="primary">Low</option>
                                                <option value="warning">Middle</option>
                                                <option value="danger">High</option>
                                            </select>
                                        </fieldset>
                                        <fieldset class="form-group position-relative has-icon-left col-12">
                                            <div class="form-control-position">
                                                <i class="icon-emoticon-smile"></i>
                                            </div>
                                            <textarea name="desc" id="new-todo-desc" class="new-todo-desc form-control" placeholder="Todo Description" cols="30" rows="10"
                                            onChange={ this.handleFormInput }></textarea>
                                            <div class="form-control-position control-position-right">
                                                <i class="ft-image"></i>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="modal-footer">
                                        <fieldset class="form-group position-relative has-icon-left mb-0">
                                            <button type="submit" id="add-todo-item" class="btn btn-info add-todo-item" data-dismiss="modal" onClick={ this.handleFormSubmit }><i class="la la-paper-plane-o d-lg-none"></i>
                                                <span class="d-none d-lg-block">Add New</span></button>
                                        </fieldset>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}