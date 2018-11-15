import React from 'react';
import { Modal, Button, Input, Cascader } from 'antd';

const InputGroup = Input.Group;
const { TextArea } = Input;
const options = [{
  value: '1',
  label: '全体成员',
}, {
  value: '2',
  label: '全体管理员',
}];
export class Create extends React.Component {
  state = {
    loading: false,
    visible: false,
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

  render() {
    const { visible, loading } = this.state;
    return (
      <div style={{ display: 'inline-block', float: 'right', marginBottom: '20px' }}>
        <Button type="primary" size="large" onClick={this.showModal}>
          新建通知
        </Button>
        <Modal
          visible={visible}
          title="编辑通知"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} >关闭</Button>,
            <Button key="back" onClick={this.handleCancel} >预览</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>保存</Button>,
          ]}
        >
          <InputGroup style={{ margin: '20px 0' }} compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知类型</span>
            <Cascader onChange={this.onSendType} options={options} placeholder="Select" style={{ width: '393px' }} />
          </InputGroup>
          <InputGroup style={{ margin: '20px 0' }} compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知类型</span>
            <Cascader onChange={this.onSendType} options={options} placeholder="Select" style={{ width: '393px' }} />
          </InputGroup>
          <div>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px', display: 'inline-block' }} >通知内容</span>
            <TextArea placeholder="编辑通知内容" style={{ width: '393px' }} autosize={{ minRows: 1, maxRows: 6 }} />
          </div>
          <InputGroup style={{ margin: '20px 0' }} compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >链接</span>
            <Cascader onChange={this.onSendType} options={options} placeholder="Select" style={{ width: '393px' }} />
          </InputGroup>
          <div style={{ margin: '20px 0' }}>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px', display: 'inline-block' }} >详细信息</span>
            <TextArea placeholder="编辑通知内容" style={{ width: '393px' }} autosize={{ minRows: 1, maxRows: 6 }} />
          </div>
          <Button type="primary" >生成链接</Button>
          <Input style={{ margin: '20px 0' }} addonBefore="预览" onChange={this.onchange} defaultValue="" />
          <Button type="primary">发送</Button>
        </Modal>
      </div>
    );
  }
}
