import ReactDOM from 'react-dom';
import React from 'react';

import './Cleaner.less';

class Cleaner extends React.Component {

  render() {
      return (
        <div className="cleaner">
            <button 
                className="cleaner__btn"
                onClick={this.props.onDoneClean}>Clear Done</button>
        </div>
      );
  }
}

export default Cleaner;