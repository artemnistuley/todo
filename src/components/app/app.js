import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    handleDeleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        });
    };

    handleAddItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            };
        });
    }

    handleToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    handleToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]}

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    handleSearchChange = (term) => {
        this.setState({ term });
    };

    search(items, term) {
        if ( term.length === 0 ) {
            return items;
        }

        return items.filter((item) => {
            const label = item.label.toLowerCase();
            return label.includes( term.toLowerCase() );
        });
    }

    handleFilterClick = (filter) => {
        this.setState({ filter });
    };

    filterItems(items, filter) {
        if ( filter === 'all' ) {
            return items;
        }

        if ( filter === 'active' ) {
            return items.filter((item) => !item.done);
        }

        if ( filter === 'done' ) {
            return items.filter((item) => item.done);
        }
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filterItems( this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
    
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={ this.handleSearchChange } />
                    <ItemStatusFilter filter={filter} onFilterClick={ this.handleFilterClick } />
                </div>
      
                <TodoList 
                    todos={visibleItems} 
                    onDeleted={ this.handleDeleteItem }
                    onToggleImportant={ this.handleToggleImportant }
                    onToggleDone={ this.handleToggleDone }
                />

                <ItemAddForm
                    onItemAdded={ this.handleAddItem }
                />
            </div>
        );
    }
}
