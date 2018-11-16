import React from 'react';
import { Table, Select } from 'antd';
import Option from 'antd/lib/select';
import Search from './Search.js';
import { Check } from './Check.js';
import { ChangeAdmin } from './ChangeAdmin.js';
import { doFetch } from '../../utils/request.js';

function getOperation() {
  return (
    <span>
      <Check />&nbsp;&nbsp;
      <ChangeAdmin />
    </span>);
}

class Org extends React.Component {
  state = {
    data: [],
    body: {},
    pagination: {},
    loading: false,
  };
  componentDidMount() {
    this.setPageState({
      limit: 10,
      offset: 1,
    });
    this.fetch();
  }
  onSearch = (props) => {
    this.state.body = props;
    this.fetch();
  }

  setPageState = (params) => {
    const pager = this.state.pagination;
    pager.current = params.offset;
    pager.pageSize = params.limit;
  }

  fetch = () => {
    this.setState({ loading: true });
    const page = this.state.pagination;
    const stateBody = this.state.body;
    doFetch('http://192.168.0.9:9003/org', 'post', stateBody, page, this.finishFetch);
  };
  finishFetch = (data) => {
    console.log(data);
    const pagination = { ...this.state.pagination };
    pagination.total = data.data.total;
    this.setState({
      loading: false,
      data: data.data.rows,
      pagination,
    });
  }
  handleTableChange = (pagination) => {
    this.setPageState({
      limit: pagination.pageSize,
      offset: pagination.current,
    });
    this.fetch();
  };
  endPage = () => {
    const page = this.state.pagination;
    if (page.pageSize * page.current > page.total) {
      return page.total;
    }
    return page.pageSize * page.current;
  };
  changLimit = (e) => {
    this.setPageState({
      limit: e,
      offset: 1,
    });
    this.fetch();
  };

  render() {
    const columns = [{
      title: '组织名称',
      key: 'content',
      dataIndex: 'name',
    }, {
      title: '主管理员',
      key: 'notifyType',
      dataIndex: 'admin',
    }, {
      title: '电话号码',
      key: 'sendType',
      dataIndex: 'mobile',
    }, {
      title: '操作',
      align: 'center',
      width: '240px',
      render: (text, record) => (
        getOperation(record)
      ),
    }];
    const page = this.state.pagination;
    return (
      <div>
        <div style={{ height: '20px' }} />
        <Search onSearch={props => this.onSearch(props)} />
        <Table
          scroll={{ x: 600 }}
          columns={columns}
          bordered
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          footer={() => {
            if (page.total === 0) {
              return '';
            }
            return (
              <div>显示第&nbsp;
                <span>
                  { (page.pageSize * (page.current - 1)) + 1 }
                </span> 到第&nbsp;
                <span>
                  { this.endPage() }
                </span> 条记录，总共&nbsp;
                <span>
                  { page.total }
                </span> 条记录  每页显示
                <Select style={{ width: '60px' }} onChange={this.changLimit} defaultValue="10">
                  <Option value="10">10</Option>
                  <Option value="25">25</Option>
                  <Option value="50">50</Option>
                </Select>条记录
              </div>);
          }}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Org;
