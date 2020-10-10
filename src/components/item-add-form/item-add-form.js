import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: '',
    };

    handleLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onItemAdded(this.state.label);

        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form 
                className="item-add-form d-flex"
                onSubmit={this.handleSubmit}>

                <input 
                    type="text" 
                    value={this.state.label}
                    className="form-control" 
                    onChange={this.handleLabelChange}
                    placeholder="What needs to be done"
                />

                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        );
    }
}
