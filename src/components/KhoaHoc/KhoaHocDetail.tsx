import { Drawer, Descriptions } from 'antd';

export default ({ open, data, onClose }: any) => {
  return (
    <Drawer visible={open} onClose={onClose} width={500}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Tên">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Giảng viên">{data?.teacher}</Descriptions.Item>
        <Descriptions.Item label="Học viên">{data?.students}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">{data?.status}</Descriptions.Item>
      </Descriptions>

      <div dangerouslySetInnerHTML={{ __html: data?.description }} />
    </Drawer>
  );
};