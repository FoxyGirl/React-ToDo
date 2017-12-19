import ReactDOM from 'react-dom';
import React from 'react';

import './ProgressBar.less';

class ProgressBar extends React.Component {
    render() {
        const percent = Math.round(this.props.itemsDoneCount / this.props.itemsCount * 100)
        const barStyle = {width: `${percent}%`};
        const notDoneItem = this.props.itemsCount - this.props.itemsDoneCount;
        const activeWord = notDoneItem!== 1 ? 'tasks' : 'task';

        return (
            <div className="progress-bar">
                 <h2 className="progress-bar__title">Current progress {percent}%</h2>
                 <div className="progress-bar__container">
                    <span className="progress-bar__bar" style={barStyle}></span>
                </div>
                <div className="progress-bar__footer"> 
                    {
                        notDoneItem !== 0 
                        ? <p className="progress-bar__text">You need to do {notDoneItem} {activeWord}</p>
                        : <p className="progress-bar__text  progress-bar__text--success">Congratulations! You have done all!</p>
                    }                     
                </div>
          </div>
        );
    }
}

export default ProgressBar;