import React from 'react';
import { Modal, Button, Table, Input } from 'antd';
import reqwest from 'reqwest';

const InputGroup = Input.Group;

export class ChangeAdmin extends React.Component {
  state = {
    data: [],
    body: {},
    pagination: {},
    loading: false,
    visible: false,
  };
  componentDidMount() {
    this.setPageState({
      limit: 10,
      offset: 1,
    });
    this.fetch();
  }
  setPageState = (params) => {
    const pager = this.state.pagination;
    pager.current = params.offset;
    pager.pageSize = params.limit;
  };
  handleTableChange = (pagination) => {
    this.setPageState({
      limit: pagination.pageSize,
      offset: pagination.current,
    });
    this.fetch();
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  fetch = () => {
    this.setState({ loading: true });
    const page = this.state.pagination;
    const stateBody = this.state.body;
    stateBody.limit = page.pageSize;
    stateBody.offset = page.current;
    reqwest({
      url: 'http://192.168.0.9:9003/org',
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

  render() {
    const columns = [{
      title: '姓名',
      key: 'name',
      dataIndex: 'admin',
    }, {
      title: '手机号',
      key: 'mobile',
      width: '180px',
      dataIndex: 'mobile',
    }];
    const { visible, loading } = this.state;
    return (
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        <Button type="primary" size="small" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={this.showModal}>
          更换主管理员
        </Button>
        <Modal
          visible={visible}
          title="当前主管理员"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} >关闭</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>设为主管理员</Button>,
          ]}
        >
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <InputGroup compact>
              <Input placeholder="搜索" style={{ width: '35%', float: 'right' }} />
            </InputGroup>
          </div>
          <Table
            scroll={{ y: 450 }}
            columns={columns}
            bordered
            rowSelection={{
              type: 'radio',
            }}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </Modal>
      </div>
    );
  }
}
