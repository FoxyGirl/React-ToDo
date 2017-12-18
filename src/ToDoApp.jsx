import ReactDOM from 'react-dom';
import React from 'react';

import NoteEditor from './components/NoteEditor/NoteEditor.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar.jsx';
import NotesList from './components/NotesList/NotesList.jsx';
import FilterList from './components/FilterList/FilterList.jsx';

import './ToDoApp.less';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [], 
            displayedNotes: [], 
            filters: [
                {idF: 101, name: 'all', isActive: true},
                {idF: 102, name: 'new', isActive: false},
                {idF: 103, name: 'done', isActive: false}
            ],
            percent: 0
        };
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.hadleNoteDone = this.hadleNoteDone.bind(this);
        this.handleNoteFilter = this.handleNoteFilter.bind(this);
    }

    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('toDoNotes'));
        console.log('localNotes = ' + localNotes);

        if (localNotes) {
        const percent = this.updatePercentProgress(localNotes);
        this.setState({notes: localNotes, displayedNotes: localNotes, percent: percent});
        }

        console.log('displayedNotes.length = ' + this.state.displayedNotes.length);
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteAdd(newNote) {
        console.log('handleNoteAdd in APP ' + newNote.text);
        const newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        const percent = this.updatePercentProgress(newNotes);
        this.setState({ notes: newNotes, displayedNotes: newNotes, percent});
    }

    handleNoteDelete(note) {
        const noteId = note.id;
        const newNotes = this.state.notes.filter( note =>
        note.id != noteId);
        const percent = this.updatePercentProgress(newNotes);
        this.setState({notes: newNotes, displayedNotes: newNotes, percent});
    }

    hadleNoteDone(note) {
        const noteId = note.id;
        const newNotes = this.state.notes.slice();
        newNotes.map( note => {
        if (note.id === noteId) {
            note.isDone = !note.isDone;
        }
        });
        const percent = this.updatePercentProgress(newNotes);
        this.setState({notes: newNotes, displayedNotes: newNotes, percent});
    }

    handleNoteFilter(filter) {
    const newNotes = this.state.notes.slice();
    let newFilters = this.state.filters.slice();
    let displayedNotes = [];
    
    switch(filter) {
      case 'new':
        displayedNotes = newNotes.filter( note =>
          note.isDone === false
        );
        break;
      case 'done':
        displayedNotes = newNotes.filter ( note =>
          note.isDone === true
        );
        break;
      default:
        displayedNotes = newNotes;
    }
    
    newFilters.forEach(item => {
        item.isActive = (item.name === filter) ? true : false;
        });

        console.log(`newFilters = ${JSON.stringify(newFilters)}`);

        this.setState({displayedNotes: displayedNotes});
    }

    _updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('toDoNotes', notes);
    }

    updatePercentProgress(notes) {
        const doneNotes = notes.filter( note => note.isDone);

    return Math.round(doneNotes.length / notes.length * 100);
    }

    render()  {
        console.log('Render displayedNotes.length = ' + this.state.displayedNotes.length);

        return (
            <div className="notes-app">
                <h2 className="app-header">ToDoApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>

                { this.state.displayedNotes.length > 0 ? (
                    <div>
                        <ProgressBar percent={this.state.percent} />
                        <NotesList 
                            notes={this.state.displayedNotes}
                            onNoteDelete={this.handleNoteDelete} 
                            onNoteDone={this.hadleNoteDone} />
                        <FilterList 
                          filters={this.state.filters}
                          onNoteFilter={this.handleNoteFilter} /> 
                    </div>
                ) : (
                    <div className="not-found">Nothing is here!</div>
                )}
            </div>
        );
    }
};