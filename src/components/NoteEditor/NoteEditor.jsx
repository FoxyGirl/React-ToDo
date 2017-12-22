import ReactDOM from 'react-dom';
import React from 'react';

import './NoteEditor.less';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleNoteAdd() {
        if (this.state.text === '') {
            return;
        }

        const newNote = {
            text: this.state.text,
            isDone: false,
            id: Date.now()
        }

        console.log('newNote = ' + newNote.text);

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    }

    handleKeyDown(e) {
        console.log('handleKeyDown !');
        if (e.keyCode === 27) {
            console.log('Escape !');
            this.setState({ text: '' });
            return;
        }

        if (e.keyCode == 13) {
            this.handleNoteAdd();
        }
    }

    render() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your new task here..."
                    rows={2}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyDown}
                />
                <button 
                    className="add-button" 
                    onClick={this.handleNoteAdd}>
                    Add
                </button>
            </div>
        );
    }
}

export default NoteEditor;