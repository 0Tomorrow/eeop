import React from 'react';
import { Button, Input, Cascader, DatePicker, Select } from 'antd';
import Option from 'antd/lib/select';
import { sendType, status } from '../../enums/enum.js';

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

export default class Search extends React.Component {
  state = {
    body: {},
  };
  onchange = (e) => {
    const stateBody = this.state.body;
    stateBody.content = e.target.value;
  };
  onNotifyType = (e) => {
    const stateBody = this.state.body;
    stateBody.notifyType = (typeof (e[0]) === 'undefined' ? '' : e[0].toString());
  };
  onSendType = (e) => {
    const stateBody = this.state.body;
    stateBody.sendType = (typeof (e[0]) === 'undefined' ? '' : e[0].toString());
  };
  onStatus = (e) => {
    const stateBody = this.state.body;
    stateBody.status = (typeof (e[0]) === 'undefined' ? '' : e[0].toString());
  };
  onTimes = (e) => {
    const startYear = e[0].year();
    const startMonth = e[0].month();
    const startDate = e[0].date();
    const startTime = new Date(`${startYear}/${startMonth}/${startDate}`).getTime();
    const endYear = e[0].year();
    const endMonth = e[0].month();
    const endDate = e[0].date();
    const endTime = new Date(`${endYear}/${endMonth}/${endDate}`).getTime();
    const stateBody = this.state.body;
    stateBody.startTime = startTime.toString();
    stateBody.endTime = endTime.toString();
  };
  onSearch = () => {
    console.log(this.props);
    this.props.onSearch(this.state.body);
  }
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <Input addonBefore="通知内容" onChange={this.onchange} defaultValue="" />
        </div>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知对象</span>
            <Select style={{ width: '140px' }} defaultValue="" >
              <Option value="10">10</Option>
              <Option value="25">25</Option>
              <Option value="50">50</Option>
            </Select>
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知类型</span>
            <Cascader onChange={this.onSendType} options={sendType} placeholder="Select" style={{ width: '140px' }} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >发送状态</span>
            <Cascader onChange={this.onStatus} options={status} placeholder="Select" style={{ width: '140px' }} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <RangePicker onChange={this.onTimes} />
        </div>
        <Button type="primary" icon="search" onClick={this.onSearch} style={{ backgroundColor: 'green', borderColor: 'green' }}>查询</Button>
      </div>
    );
  }
}

