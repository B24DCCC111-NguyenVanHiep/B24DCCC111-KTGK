import { Select } from 'antd';

export default ({ setTeacher, setStatus }: any) => {
  return (
    <div style={{ display: 'flex', gap: 10, margin: '10px 0' }}>
      <Select
        placeholder="Giảng viên"
        allowClear
        style={{ width: 200 }}
        onChange={setTeacher}
        options={[
          { label: 'Nguyễn Văn A', value: 'Nguyễn Văn A' },
          { label: 'Trần Thị B', value: 'Trần Thị B' },
          { label: 'Lê Văn C', value: 'Lê Văn C' },
        ]}
      />

      <Select
        placeholder="Trạng thái"
        allowClear
        style={{ width: 200 }}
        onChange={setStatus}
        options={[
          { label: 'Đang mở', value: 'OPEN' },
          { label: 'Đã kết thúc', value: 'CLOSED' },
          { label: 'Tạm dừng', value: 'PAUSE' },
        ]}
      />
    </div>
  );
};