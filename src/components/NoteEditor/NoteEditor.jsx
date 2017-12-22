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
        if (this.state.text.trim() === '') {
            this.setState({ text: '' });
            return;
        }

        const newNote = {
            text: this.state.text,
            isDone: false,
            id: Date.now()
        }

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    }

    handleKeyDown(e) {
        if (e.keyCode === 27) {
            this.setState({ text: '' });
            return;
        }

        if (e.keyCode == 13) {
            this.handleNoteAdd();
        }
    }

    componentDidMount() {
        const inputEdit = ReactDOM.findDOMNode(this.refs.textarea);
        
        setTimeout(() =>  inputEdit.focus(), 0);
    }

    render() {
        return (
            <div className="note-editor">
                <input type="text"
                    placeholder="Enter your new task here..."
                    className="note-editor__textarea"
                    ref="textarea"
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