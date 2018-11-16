import React from 'react';
import { Select } from 'antd';
import Option from 'antd/lib/select';

export default class OptionSelect extends React.Component {
  onChange = (e) => {
    this.props.onChange(e);
  }
  getOption = (options) => {
    const selectOption = options.map((option) => {
      return (<Option value={option.value}>{option.label}</Option>);
    });
    return (
      selectOption
    );
  };

  render() {
    const options = this.props.option;
    return (
      <Select placeholder="请选择" style={{ width: '140px' }} onChange={this.onChange}>
        { this.getOption(options) }
      </Select>
    );
  }
}

