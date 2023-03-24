import * as React from 'react';
import Image from 'next/image'
class Stats extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column stats justify-content-center">
        <h2> {this.props.text}</h2>
        <div className="d-flex justify-content-between">
          <div className="stats-number"> {this.props.number}</div>
          <div>
            <Image
              src={this.props.icon}
              alt="icon"
              width={40}
              height={20}
              priority
            />

          </div>
        </div>
      </div>
    );
  }
}
export default Stats;
