import { getCourses, saveCourses } from '@/services/KhoaHoc';

export default {
  namespace: 'KhoaHoc',

  state: {
    list: getCourses(),
  },

  reducers: {
    setList(state: any, { payload }: any) {
      saveCourses(payload);
      return { ...state, list: payload };
    },
  },

  effects: {
   
    *add({ payload }: any, { put, select }: any) {
      const list = yield select((s: any) => s.KhoaHoc.list);

      const name = payload.name.trim().toLowerCase();

    
      const isExist = list.some(
        (c: any) => c.name.trim().toLowerCase() === name
      );

      if (isExist) {
        throw new Error('Tên khóa học đã tồn tại');
      }

      yield put({
        type: 'setList',
        payload: [...list, { ...payload, id: Date.now().toString() }],
      });
    },

    // ✏️ SỬA KHÓA HỌC
    *update({ payload }: any, { put, select }: any) {
      const list = yield select((s: any) => s.KhoaHoc.list);

      const name = payload.name.trim().toLowerCase();

      // ❌ check trùng (loại trừ chính nó)
      const isExist = list.some(
        (c: any) =>
          c.id !== payload.id &&
          c.name.trim().toLowerCase() === name
      );

      if (isExist) {
        throw new Error('Tên khóa học đã tồn tại');
      }

      yield put({
        type: 'setList',
        payload: list.map((c: any) =>
          c.id === payload.id ? payload : c
        ),
      });
    },


    *remove({ payload }: any, { put, select }: any) {
      const list = yield select((s: any) => s.KhoaHoc.list);
      const course = list.find((c: any) => c.id === payload);

      if (!course) return;
      if (course.students > 0) {
        throw new Error('Không thể xóa khóa học đã có học viên');
      }

      yield put({
        type: 'setList',
        payload: list.filter((c: any) => c.id !== payload),
      });
    },
  },
};