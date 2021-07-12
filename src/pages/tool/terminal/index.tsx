import React, { Component } from 'react';
import { Button } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { ipcRenderer } = window;

class Terminal extends Component {
  openTerminal = () => {
    ipcRenderer.send('open_terminal');
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            this.openTerminal();
          }}
        >
          打开
        </Button>
      </div>
    );
  }
}

export default Terminal;
