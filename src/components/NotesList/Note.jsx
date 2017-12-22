import ReactDOM from 'react-dom';
import React from 'react';

import './Note.less';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false, editText: this.props.children };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditNode = this.handleEditNode.bind(this);
        this.handleNoteChanged = this.handleNoteChanged.bind(this);        
        this.handleKeyDown = this.handleKeyDown.bind(this);        
    }

    handleEdit() {
        if (this.props.isDone) return;

        const newIsEdit = !this.state.isEdit;
        this.setState({ isEdit: newIsEdit });

        const inputEdit = ReactDOM.findDOMNode(this.refs.editing);
        
        setTimeout(() =>  inputEdit.focus(), 0);
    }

    handleEditNode(e) {
        this.setState({ editText: e.target.value });
    }

    handleNoteChanged(e) {       

        const newIsEdit = !this.state.isEdit;
        this.setState({ isEdit: newIsEdit });
        
        const noteId = this.props.noteId;
        const newText = e.target.value;

        this.props.onNoteChange(noteId, newText);
    }

    handleKeyDown(e) {
        const inputEdit = e.target;

        if (e.keyCode === 27) {
            this.setState((prevState, props) => {
                return {editText: props.children};
            });

            setTimeout(() =>  inputEdit.blur(), 0);
            return;
        }

        if (e.keyCode == 13) {           
            setTimeout(() =>  inputEdit.blur(), 0);
        }
    }

    render() {
        const noteClass = `${this.props.isDone ? 'note note--done' : 'note'} 
        ${this.state.isEdit ? 'note--edit' : ''}`;

        return (
          <li className={noteClass}>
              <input  type="checkbox" 
                    id={this.props.noteId}
                    checked={this.props.isDone}
                    onChange={this.props.onDone} />      
              <label className="note__label" 
                    htmlFor={this.props.noteId}>{this.props.children}</label>
              <input 
                className="note__editing" 
                ref="editing" 
                type="text"                 
                value={this.state.editText}
                onChange={this.handleEditNode}
                onBlur={this.handleNoteChanged}
                onKeyDown={this.handleKeyDown}
                />
              <span className="note__del"
                    onClick={this.props.onDelete}>×</span>
              { this.props.isDone  || <span className="note__edit" ref="edit"
                    onClick={this.handleEdit}>edit</span>}
          </li>
        );
    }

}

export default Note;