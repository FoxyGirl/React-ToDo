import ReactDOM from 'react-dom';
import React from 'react';

import NoteEditor from './components/NoteEditor/NoteEditor.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar.jsx';
import NotesList from './components/NotesList/NotesList.jsx';
import FilterList from './components/FilterList/FilterList.jsx';
import Cleaner from './components/Cleaner/Cleaner.jsx';

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
            ]
        };
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.hadleNoteDone = this.hadleNoteDone.bind(this);
        this.handleNoteFilter = this.handleNoteFilter.bind(this);
        this.hadleDoneClean = this.hadleDoneClean.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    componentWillMount() {
        const localNotes = JSON.parse(localStorage.getItem('toDoNotes'));

        if (localNotes) {
            this.setState({notes: localNotes, displayedNotes: localNotes});
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteAdd(newNote) {
        const newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes, displayedNotes: newNotes});
    }

    handleNoteDelete(note) {
        const noteId = note.id;
        const newNotes = this.state.notes.filter( note =>
        note.id != noteId);
        this.setState({notes: newNotes, displayedNotes: newNotes});
    }

    handleNoteChange(note, noteId, newText) {
      /* console.log(`handleNoteChange text = ${newText}
       noteId = ${JSON.stringify(noteId)}`); */

        const changedNotes = this.state.notes.slice();
        changedNotes.map( note => {
            if ( note.id === noteId ) {
                note.text = newText;
            }
        })

        this.setState({notes: changedNotes, displayedNotes: changedNotes});
    }

    hadleNoteDone(note) {
        const noteId = note.id;
        const newNotes = this.state.notes.slice();
        newNotes.map( note => {
            if (note.id === noteId) {
                note.isDone = !note.isDone;
            }
        });
        this.setState({notes: newNotes, displayedNotes: newNotes});
    }

    hadleDoneClean() {
        const newNotes = this.state.notes.slice();
        const notesNotDone = newNotes.filter(note => note.isDone === false);
        this.setState({ notes: notesNotDone, displayedNotes: notesNotDone }, 
        () => {
            this.handleNoteFilter('all');
        });
        
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

        this.setState({displayedNotes: displayedNotes});
    }

    _updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('toDoNotes', notes);
    }

    render()  {
        console.log('Render displayedNotes.length = ' + this.state.displayedNotes.length);
        const newNotes = this.state.notes.slice();
        const doneItems = newNotes.filter(note => note.isDone);

        return (
            <div className="notes-app">
                <h2 className="app-header">ToDoApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                 { this.state.notes.length > 0 
                    && <ProgressBar  
                            itemsCount={this.state.notes.length} 
                            itemsDoneCount={doneItems.length}/>}
                { this.state.displayedNotes.length > 0 ? (                        
                    <NotesList 
                        notes={this.state.displayedNotes}
                        onNoteDelete={this.handleNoteDelete} 
                        onNoteChange={this.handleNoteChange}
                        onNoteDone={this.hadleNoteDone} />                         
                ) : (
                    <div className="not-found">Nothing is here!</div>
                )}
                <footer className="app-footer"> 
                    <FilterList 
                        filters={this.state.filters}
                        onNoteFilter={this.handleNoteFilter} />
                        { doneItems.length > 0 
                            && <Cleaner onDoneClean={this.hadleDoneClean}/> }   
                </footer>     
            </div>
        );
    }
};