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
  const [teacher, setTeacher] = useState<any>();
  const [status, setStatus] = useState<any>();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  let list = KhoaHoc?.list || [];

  // 🔍 SEARCH
  if (search) {
    list = list.filter((c: any) =>
      (c.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🎯 FILTER
  if (teacher) list = list.filter((c: any) => c.teacher === teacher);
  if (status) list = list.filter((c: any) => c.status === status);

  // ✅ SUBMIT (ADD / UPDATE)
  const submit = async (values: any) => {
    try {
      await dispatch({
        type: editing ? 'KhoaHoc/update' : 'KhoaHoc/add',
        payload: editing
          ? { ...editing, ...values } // giữ id khi sửa
          : { ...values, students: 0 }, // thêm mới = 0 học viên
      });

      message.success('Lưu thành công');
      setOpen(false);
      setEditing(null);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  // ❌ DELETE
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
      {/* 🔍 SEARCH */}
      <Input.Search
        placeholder="Tìm theo tên khóa học..."
        allowClear
        enterButton="Tìm"
        style={{ width: 350, marginBottom: 10 }}
        onSearch={(value) => setSearch(value)}
        onChange={(e) => {
          if (!e.target.value) setSearch('');
        }}
      />

      {/* 🎯 FILTER */}
      <CourseFilter setTeacher={setTeacher} setStatus={setStatus} />

      {/* ➕ ADD BUTTON */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        style={{ marginBottom: 15 }}
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
      >
        Thêm khóa học
      </Button>

      {/* 📊 CHART */}
      <CourseChart data={list} />

      {/* 📋 TABLE */}
      <CourseTable
        data={list}
        onEdit={(record: any) => {
          setEditing(record);
          setOpen(true);
        }}
        onDelete={remove}
        onView={(r: any) => setDetail(r)}
      />

      {/* 📝 FORM */}
      <CourseForm
        open={open}
        initialValues={editing}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={submit}
      />

      {/* 📄 DETAIL */}
      <CourseDetail
        open={!!detail}
        data={detail}
        onClose={() => setDetail(null)}
      />
    </Card>
  );
};

export default connect(({ KhoaHoc }: any) => ({ KhoaHoc }))(Page);