import React from 'react';
import { Alert } from 'antd';

export class Warning extends React.Component {
  state = {
    visible: false,
  };
  componentDidMount() {
    this.setVisible();
  }
  setVisible = () => {
    this.setState({ visible: this.props.visible });
  };
  handleClose = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div>
        {
          this.state.visible ? (
            <Alert
              message={this.props.msg}
              type="warning"
              closable
              afterClose={this.handleClose}
            />
          ) : null
        }
      </div>
    );
  }
}
