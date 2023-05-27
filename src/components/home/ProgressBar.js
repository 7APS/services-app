import * as React from 'react';
import { Progress } from 'antd';

export default function ProgressBar({number, color, width}) {
  return (
    <Progress
      type="circle"
      percent={number}
      format={percent => `${percent}%   `}
      strokeColor={color}
      strokeWidth={width}
    />
  );
}
