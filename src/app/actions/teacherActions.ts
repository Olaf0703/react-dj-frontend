export const teacherCreatesStudent = (payload: string) => ({
  type: 'TEACHER_CREATE_STUDENT',
  payload,
});

export const teacherAuthStudent = (payload: string) => ({
  type: 'TEACHER_AUTH_STUDENT',
  payload,
});

export const teacherCreateGroup = (payload: string) => ({
  type: 'TEACHER_CREATE_GROUP',
  payload,
});

export const teacherRemoveGroup = (payload: string) => ({
  type: 'TEACHER_REMOVE_GROUP',
  payload,
});

export const teacherAddStudent = (payload: string) => ({
  type: 'TEACHER_ADD_STUDENT',
  payload,
});

export const teacherRemoveStudent = (payload: string) => ({
  type: 'TEACHER_REMOVE_STUDENT',
  payload,
});
