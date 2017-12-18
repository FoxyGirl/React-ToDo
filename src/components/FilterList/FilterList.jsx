import ReactDOM from 'react-dom';
import React from 'react';

import './FilterList.less';
import Filter from './Filter.jsx';

class FilterList extends React.Component {

  render() {
      const onNoteFilter = this.props.onNoteFilter;

      return (
        <div className="filters">
            {
                this.props.filters.map(filter => {
                    return (
                        <Filter
                            key={filter.idF}
                            isActive={filter.isActive}
                            onNoteFilter={onNoteFilter}>
                            {filter.name}
                        </Filter>
                    );
                })
            }
        </div>
      );
  }
}

export default FilterList;