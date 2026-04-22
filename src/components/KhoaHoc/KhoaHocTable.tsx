import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const statusMap: any = {
  OPEN: { text: 'Đang mở', color: 'green' },
  CLOSED: { text: 'Đã kết thúc', color: 'red' },
  PAUSE: { text: 'Tạm dừng', color: 'orange' },
};

export default ({ data, onEdit, onDelete, onView }: any) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name' },
    { title: 'Giảng viên', dataIndex: 'teacher' },
    {
      title: 'Học viên',
      dataIndex: 'students',
      sorter: (a: any, b: any) => a.students - b.students,
    },
    {
      title: 'Trạng thái',
      render: (r: any) => (
        <Tag color={statusMap[r.status].color}>
          {statusMap[r.status].text}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      render: (r: any) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onView(r)} />

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(r)}
          />

          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => onDelete(r.id)}
            disabled={r.students > 0}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={r.students > 0}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
};