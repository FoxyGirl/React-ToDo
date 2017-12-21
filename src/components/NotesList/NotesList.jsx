import ReactDOM from 'react-dom';
import React from 'react';

import './NotesList.less';
import Note from './Note.jsx';

class NotesList extends React.Component {

    render() {
        const onNoteDelete = this.props.onNoteDelete;
        const onNoteDone = this.props.onNoteDone;
        const onNoteChange = this.props.onNoteChange;

        
        return (
            <ul className="notes-list" >
                {
                    this.props.notes.map(note => {
                        return <Note
                            key={note.id}
                            onDelete={onNoteDelete.bind(null, note)}
                            onDone={onNoteDone.bind(null, note)}
                            onNoteChange={onNoteChange.bind(null, note)}
                            isDone={note.isDone}
                            noteId={note.id} >
                            {note.text}
                        </Note>;
                    })
                }
            </ul>
        );
    }
}

export default NotesList;