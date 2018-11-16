import React from 'react';
import { Button, Input } from 'antd';

const InputGroup = Input.Group;

export default class Search extends React.Component {
  state = {
    body: {},
  };
  onchange = (e) => {
    const stateBody = this.state.body;
    stateBody.content = e;
  };
  onNotifyType = (e) => {
    const stateBody = this.state.body;
    stateBody.notifyType = e;
  };
  onSendType = (e) => {
    const stateBody = this.state.body;
    stateBody.sendType = e;
  };
  onStatus = (e) => {
    const stateBody = this.state.body;
    stateBody.status = e;
  };
  onSearch = () => {
    this.props.onSearch(this.state.body);
  };
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >组织名称</span>
            <Input style={{ width: '220px' }} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >主管理员</span>
            <Input style={{ width: '220px' }} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >电话号码</span>
            <Input style={{ width: '220px' }} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <InputGroup compact>
            <Button type="primary" icon="search" onClick={this.onSearch} style={{ backgroundColor: 'green', borderColor: 'green' }}>查询</Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}

