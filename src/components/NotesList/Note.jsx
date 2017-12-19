import ReactDOM from 'react-dom';
import React from 'react';

import './Note.less';

class Note extends React.Component {

    render() {

        return (
          <li className={this.props.isDone ? 'note note--done' : 'note'}>
              <span className="note__del" onClick={this.props.onDelete}>×</span>
              <label onDoubleClick={() =>  console.log(this.props.isDone)}>
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