import ReactDOM from 'react-dom';
import React from 'react';

import './ProgressBar.less';

class ProgressBar extends React.Component {
    render() {
        const percent = Math.round(this.props.itemsDoneCount / this.props.itemsCount * 100)
        const barStyle = {width: `${percent}%`};
        const notDoneItem = this.props.itemsCount - this.props.itemsDoneCount;

        return (
            <div className="progress-bar">
                 <h2 className="progress-bar__title">Current progress {percent}%</h2>
                 <div className="progress-bar__container">
                    <span className="progress-bar__bar" style={barStyle}></span>
                </div>
                <div className="progress-bar__footer"> 
                    {
                         notDoneItem !== 0 ? (
                             <p>You need to do {notDoneItem} items</p>
                         ) : (
                             <p>You have done all</p>
                             )
                    }
                     
                </div>
          </div>
        );
    }
}

export default ProgressBar;