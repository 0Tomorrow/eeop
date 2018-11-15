import React from 'react';
import { Table, Popconfirm, Icon, Button, Select } from 'antd';
import Option from 'antd/lib/select';
import reqwest from 'reqwest';
import { Create } from './Create.js';
import Search from './Search.js';
import { Check } from './Check.js';
import { Edit } from './Edit.js';

function getOperation(data) {
  if (data.status === '已发送') {
    return (
      <span >
        <Check />
      </span>);
  }
  return (
    <span>
      <Edit />&nbsp;&nbsp;
      <Popconfirm title="Are you sure？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
        <Button type="primary" size="small" style={{ backgroundColor: 'red', borderColor: 'red' }}>
          删除
        </Button>
      </Popconfirm>,
    </span>);
}

class Notify extends React.Component {
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
    const state = { ...this.state };
    state.body = props;
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
    console.log(page);
    const stateBody = this.state.body;
    stateBody.limit = page.pageSize;
    stateBody.offset = page.current;
    reqwest({
      url: 'http://localhost:9003/org',
      method: 'post',
      data: JSON.stringify(this.state.body),
      contentType: 'application/json',
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      pagination.total = data.data.total;
      this.setState({
        loading: false,
        data: data.data.rows,
        pagination,
      });
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
      dataIndex: 'content',
    }, {
      title: '主管理员',
      key: 'notifyType',
      dataIndex: 'notifyType',
    }, {
      title: '手机号码',
      key: 'sendType',
      dataIndex: 'sendType',
    }, {
      title: '操作',
      width: '140px',
      align: 'center',
      render: (text, record) => (
        getOperation(record)
      ),
    }];
    const page = this.state.pagination;
    return (
      <div>
        <div style={{ height: '30px' }} />
        <Search onSearch={props => this.onSearch(props)} />
        &nbsp;
        <Create style={{ float: 'right' }} />
        <Table
          columns={columns}
          bordered
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          footer={(currentPageData) => {
            console.log(currentPageData);
            return (
              <div>显示第&nbsp;
                <span>
                  { (page.pageSize * (page.current - 1)) + 1 }
                </span> 到第&nbsp;
                <span>
                  { this.endPage() }
                </span> 条记录，总共&nbsp;
                <span>
                  { this.state.pagination.total }
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

export default Notify;
