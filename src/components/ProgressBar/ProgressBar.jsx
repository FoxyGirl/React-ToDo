import ReactDOM from 'react-dom';
import React from 'react';

import './ProgressBar.less';

class ProgressBar extends React.Component {
    render() {
        const barStyle = {width: `${this.props.percent}%`};

        return (
            <div className="progress-bar">
              <h2 className="progress-bar__title">Current progress {this.props.percent}%</h2>
              <div className="progress-bar__container">
                <span className="progress-bar__bar" style={barStyle}></span>
              </div>

          </div>
        );
    }
}

export default ProgressBar;