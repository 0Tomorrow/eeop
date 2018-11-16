import React from 'react';
import { Modal, Button, Input } from 'antd';
import OptionSelect from '../OptionSelect.js';
import { notifyType, sendType } from '../../enums/enum';

const InputGroup = Input.Group;
const { TextArea } = Input;
export class Create extends React.Component {
  state = {
    body: {},
    loading: false,
    visible: false,
  };

  onNotifyType = (e) => {
    const stateBody = this.state.body;
    stateBody.notifyType = e;
  };
  onSendType = (e) => {
    const stateBody = this.state.body;
    stateBody.sendType = e;
  };
  handleCancel = () => {
    this.setState({ visible: false });
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
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知对象</span>
            <OptionSelect option={notifyType} onChange={e => this.onNotifyType(e)} />
          </InputGroup>
          <InputGroup style={{ margin: '20px 0' }} compact>
            <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >通知类型</span>
            <OptionSelect option={sendType} onChange={e => this.onSendType(e)} />
          </InputGroup>
          <div>
            <InputGroup style={{ margin: '20px 0' }} compact>
              <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px', display: 'inline-block' }} >通知内容</span>
              <TextArea placeholder="编辑通知内容" style={{ width: '393px' }} autosize={{ minRows: 3, maxRows: 6 }} />
            </InputGroup>
          </div>
          <div>
            <InputGroup style={{ margin: '20px 0' }} compact>
              <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >链接</span>
              <Input style={{ width: '393px' }} onChange={this.onchange} defaultValue="" />
            </InputGroup>
          </div>
          <div style={{ margin: '20px 0' }}>
            <InputGroup style={{ margin: '20px 0' }} compact>
              <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px', display: 'inline-block' }} >详细信息</span>
              <TextArea placeholder="详细信息" style={{ width: '393px' }} autosize={{ minRows: 3, maxRows: 6 }} />
            </InputGroup>
          </div>
          <Button type="primary" style={{ marginLeft: '79px' }} >生成链接</Button>
          <div>
            <InputGroup style={{ margin: '20px 0' }} compact>
              <span className="ant-input-group-addon" style={{ padding: '8px 11px', width: '79px' }} >预览</span>
              <Input onChange={this.onchange} defaultValue="" style={{ width: '393px' }} />
            </InputGroup>
          </div>
          <Button type="primary" style={{ marginLeft: '79px' }} >发送</Button>
        </Modal>
      </div>
    );
  }
}
