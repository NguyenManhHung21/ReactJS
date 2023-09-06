import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import * as React from "react";

export interface IAddRoomModalProps {
    isShowModal: boolean,
    form: any,
    handleCancel: () => void,
    handleOk: () => void;
}

export default function AddRoomModal(props: IAddRoomModalProps) {
  const { TextArea } = Input;
  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={props.isShowModal}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <Form form={props.form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng: " />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea placeholder="Nhập mô tả: " />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
