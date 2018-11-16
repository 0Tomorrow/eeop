import React from 'react';
import { Button, Input, DatePicker, Select } from 'antd';
import { sendType, status, notifyType } from '../../enums/enum.js';
import OptionSelect from '../OptionSelect.js';

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

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
    this.props.onSearch(this.state.body);
  };
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知对象</span>
            <Select
              mode="tags"
              onChange={this.onchange}
              tokenSeparators={[' ']}
              style={{ width: '220px' }}
              placeholder="请输入关键字，用空格分开"
            />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知对象</span>
            <OptionSelect option={notifyType} onChange={e => this.onNotifyType(e)} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知类型</span>
            <OptionSelect option={sendType} onChange={e => this.onSendType(e)} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >发送状态</span>
            <OptionSelect option={status} onChange={e => this.onStatus(e)} />
          </InputGroup>
        </div>
        <div style={{ marginBottom: 16, marginRight: 10, display: 'inline-block' }}>
          <InputGroup compact>
            <RangePicker onChange={this.onTimes} />
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

