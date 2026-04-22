import { Modal, Form, Input, InputNumber, Select } from 'antd';

export default ({ open, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={initialValues ? ' Sửa khóa học' : 'Thêm khóa học'}
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu"
      cancelText="Hủy"
      centered
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
        layout="vertical"
      >
        {/* NAME */}
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Không được để trống' },
            { max: 100, message: 'Tối đa 100 ký tự' },
          ]}
        >
          <Input placeholder="Nhập tên khóa học..." />
        </Form.Item>

        {/* TEACHER */}
        <Form.Item
          name="teacher"
          label="Giảng viên"
          rules={[{ required: true, message: 'Chọn giảng viên' }]}
        >
          <Select
            placeholder="Chọn giảng viên"
            options={[
              { label: 'Nguyễn Văn A', value: 'Nguyễn Văn A' },
              { label: 'Trần Thị B', value: 'Trần Thị B' },
              { label: 'Lê Văn C', value: 'Lê Văn C' },
            ]}
          />
        </Form.Item>

        {/* STUDENTS */}
        <Form.Item
          name="students"
          label="Số học viên"
          initialValue={0}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* STATUS */}
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Chọn trạng thái' }]}
        >
          <Select
            options={[
              { label: 'Đang mở', value: 'OPEN' },
              { label: 'Đã kết thúc', value: 'CLOSED' },
              { label: 'Tạm dừng', value: 'PAUSE' },
            ]}
          />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};