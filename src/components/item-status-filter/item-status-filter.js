import React, { Component } from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {

    handleFilterClick = (event) => {
        const { filter } = event.target.dataset;
        this.props.onFilterClick(filter);
    };

    render() {
        const { filter } = this.props;

        const buttonClasses = (filter, dataFilter) => {
            if ( filter === dataFilter ) {
                return 'btn btn-info';
            }
            return 'btn btn-outline-secondary';
        };

        return (
            <div className="btn-group">
                <button 
                    type="button"
                    className={buttonClasses(filter, 'all')}
                    onClick={this.handleFilterClick}
                    data-filter="all">
                    All
                </button>

                <button 
                    type="button"
                    className={buttonClasses(filter, 'active')}
                    onClick={this.handleFilterClick}
                    data-filter="active">
                    Active
                </button>

                <button 
                    type="button"
                    className={buttonClasses(filter, 'done')}
                    onClick={this.handleFilterClick}
                    data-filter="done">
                    Done
                </button>
            </div>
        );
    }
}

export default ItemStatusFilter;
