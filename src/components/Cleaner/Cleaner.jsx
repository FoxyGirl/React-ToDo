import ReactDOM from 'react-dom';
import React from 'react';

import './Cleaner.less';

class Cleaner extends React.Component {
    constructor(props) {
        super(props);

      //  this.handleFilter = this.handleFilter.bind(this);
  }

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