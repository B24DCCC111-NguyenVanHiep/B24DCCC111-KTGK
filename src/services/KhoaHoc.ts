const KEY = 'KhoaHoc';

export const getCourses = () => {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const saveCourses = (data: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};