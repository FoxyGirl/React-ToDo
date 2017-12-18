import ReactDOM from 'react-dom';
import React from 'react';

import './Note.less';

class Note extends React.Component {

    render() {
        const entryClass = this.props.isDone ? 'note note--done' : 'note';

        return (
          <li className={entryClass}>
              <span className="note__del" onClick={this.props.onDelete}>x</span>
              <label>
                <input  type="checkbox" 
                        checked={this.props.isDone}
                        onChange={this.props.onDone} />
                {this.props.children}
              </label>
          </li>
        );
    }

}

export default Note;