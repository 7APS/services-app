'use client'

import Image from 'next/image';

export default function Stats({props}) {
  return (
    <div className="d-flex flex-column stats justify-content-center">
      <h2> {props?.text}</h2>
      <div className="d-flex justify-content-between">
        <div className="stats-number"> {props?.number}</div>
        <div>
          {props?.icon}
        </div>
      </div>
    </div>
  );
}