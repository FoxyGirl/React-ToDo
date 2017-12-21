import ReactDOM from 'react-dom';
import React from 'react';

import './Note.less';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false, editText: this.props.children };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditNode = this.handleEditNode.bind(this);
        this.handleNoteChanget = this.handleNoteChanget.bind(this);        
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

    handleNoteChanget(e) {       

        const newIsEdit = !this.state.isEdit;
        this.setState({ isEdit: newIsEdit });
        
        const noteId = this.props.noteId;
        const newText = e.target.value;

        this.props.onNoteChange(noteId, newText);
    }

    render() {
        const noteClass = `${this.props.isDone ? 'note note--done' : 'note'} 
        ${this.state.isEdit && 'note--edit'}`;

        return (
          <li className={noteClass}>
              <span className="note__del"
                    onClick={this.props.onDelete}>×</span>
              <span className="note__edit" ref="edit"
                    onClick={this.handleEdit}>edit</span>
              <label>
                <input  type="checkbox" 
                        checked={this.props.isDone}
                        onChange={this.props.onDone} />
                {this.props.children}
              </label>
              <input 
                className="note__editing" 
                ref="editing" 
                type="text" 
                value={this.state.editText}
                onChange={this.handleEditNode}
                onBlur={this.handleNoteChanget}
                />
          </li>
        );
    }

}

export default Note;