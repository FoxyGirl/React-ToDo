import ReactDOM from 'react-dom';
import React from 'react';


class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(e) {
      const filter = e.target.innerText.toLowerCase();
    
      console.log('Filter ' + filter);
      this.props.onNoteFilter(filter);      
  }

    render() {
        const filterClass = this.props.isActive ? "filter filter--active" : "filter";

        return (
            <span className={filterClass}
                    onClick={this.handleFilter}>
                    {this.props.children}
            </span>
        );
    }
}

export default Filter;