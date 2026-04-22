import { Card, Progress } from 'antd';

export default ({ data }: any) => {
  const total = data.length || 1;

  const open = data.filter((d: any) => d.status === 'OPEN').length;
  const closed = data.filter((d: any) => d.status === 'CLOSED').length;
  const pause = data.filter((d: any) => d.status === 'PAUSE').length;

  return (
    <Card title="Thống kê">
      <p>Đang mở</p>
      <Progress percent={(open / total) * 100} />

      <p>Đã kết thúc</p>
      <Progress percent={(closed / total) * 100} status="exception" />

      <p>Tạm dừng</p>
      <Progress percent={(pause / total) * 100} />
    </Card>
  );
};