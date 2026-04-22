import { useState } from 'react';
import { connect } from 'umi';
import { Input, Button, message, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CourseTable from '@/components/KhoaHoc/KhoaHocTable';
import CourseForm from '@/components/KhoaHoc/KhoaHocForm';
import CourseFilter from '@/components/KhoaHoc/KhoaHocFilter';
import CourseChart from '@/components/KhoaHoc/KhoaHocChart';
import CourseDetail from '@/components/KhoaHoc/KhoaHocDetail';

const Page = ({ KhoaHoc, dispatch }: any) => {
  const [search, setSearch] = useState('');
  const [teacher, setTeacher] = useState();
  const [status, setStatus] = useState();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  let list = KhoaHoc?.list || [];

  // search
  list = list.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // filter
  if (teacher) list = list.filter((c: any) => c.teacher === teacher);
  if (status) list = list.filter((c: any) => c.status === status);

  const submit = async (values: any) => {
    try {
      await dispatch({
        type: editing ? 'KhoaHoc/update' : 'KhoaHoc/add',
        payload: editing ? { ...editing, ...values } : values,
      });

      message.success('Lưu thành công');
      setOpen(false);
      setEditing(null);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const remove = async (id: string) => {
    try {
      await dispatch({ type: 'KhoaHoc/remove', payload: id });
      message.success('Xóa thành công');
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <Card title="📚 Quản lý khóa học">
      {/* Search */}
      <Input.Search
        placeholder="Tìm khóa học..."
        enterButton="Tìm"
        style={{ width: 350, marginBottom: 10 }}
        onSearch={(value) => setSearch(value)}
      />

      {/* Filter */}
      <CourseFilter setTeacher={setTeacher} setStatus={setStatus} />

      {/* Button thêm */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        style={{ marginBottom: 15 }}
        onClick={() => setOpen(true)}
      >
        Thêm khóa học
      </Button>

      {/* Chart */}
      <CourseChart data={list} />

      {/* Table */}
      <CourseTable
        data={list}
        onEdit={(r: any) => {
          setEditing(r);
          setOpen(true);
        }}
        onDelete={remove}
        onView={(r: any) => setDetail(r)}
      />

      {/* Form */}
      <CourseForm
        open={open}
        initialValues={editing}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={submit}
      />

      {/* Detail */}
      <CourseDetail
        open={!!detail}
        data={detail}
        onClose={() => setDetail(null)}
      />
    </Card>
  );
};

export default connect(({ KhoaHoc }: any) => ({ KhoaHoc }))(Page);