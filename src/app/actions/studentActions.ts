import axios                    from 'axios';
import * as TYPES               from '../types'
import query                    from 'api/queries/get'
import { STUDENT_WALLET_QUERY } from 'api/queries/users'
import {
  CREATE_STUDENT,
  CHANGE_STUDENT_GRADE,
  CHANGE_STUDENT_PASSWORD
}                               from 'api/mutations/students'
import mutation                 from 'api/mutations/get'
import { sendRawQuery }         from 'api/queries/get';


export const studentSetData = (payload: any) => {
  return {
    type: TYPES.STUDENT_SET_DATA,
    payload: payload,
  };
};
export const studentGetCollectible = (payload: string) => ({
  type: 'STUDENT_GET_COLLECTIBLE',
  payload,
});

export const studentAnswersBlock = (payload: string) => ({
  type: 'STUDENT_ANSWERS_BLOCK',
  payload,
});

export const studentAnswersQuestion = (payload: string) => ({
  type: 'STUDENT_ANSWERS_QUESTION',
  payload,
});

export const studentAddAvatar = (payload: string) => ({
  type: 'STUDENT_ADD_AVATAR',
  payload,
});

export const studentRemoveAvatar = (payload: string) => ({
  type: 'STUDENT_REMOVE_AVATAR',
  payload,
});

export const studentAuth = (payload: string) => ({
  type: 'STUDENT_AUTH',
  payload,
});

export const studentSelectCard = (payload: string) => ({
  type: 'STUDENT_SELECT_CARD',
  payload,
});

export const studentCloseCard = (payload: string) => ({
  type: 'STUDENT_CLOSE_CARD',
  payload,
});
export const studentSelectTypeGame = (payload: string) => ({
  type: 'STUDENT_SELECT_TYPE_GAME',
  payload,
});

export const studentSelectGame = (payload: string) => ({
  type: 'STUDENT_SELECT_GAME',
  payload,
});

export const studentCloseGame = (payload: string) => ({
  type: 'STUDENT_CLOSE_GAME',
  payload,
});

export const studentSelectTopic = (payload: string) => ({
  type: 'STUDENT_SELECT_TOPIC',
  payload,
});

export const studentConfig = (payload: string) => ({
  type: 'STUDENT_CONFIG',
  payload,
});

export const setCollectibles = (payload: string) => ({
  type: 'SET_COLLECTIBLE',
  payload
})

export const setAreasOfKnowledge = (payload: string) => ({
  type: 'SET_AOK',
  payload
})

export const setBlockPresentation = (payload: string) => ({
  type: 'SET_BLOCK_PRESENTATION',
  payload
})

// export const setAvatar = (payload: any, dispatch: any) => {
export const setAvatar = (payload: any) => {
  axios({
    url: <string>process.env.REACT_APP_SERVER_URL,
    method: 'post',
    data: {
      query: `
      mutation setFavoriteAvatarCollection {
        setFavoriteAvatarCollection(
              avatarAccessorie: ${payload.accessory},
              avatarClothes: ${payload.clothes},
              avatarHead: ${payload.head},
              avatarPants: ${payload.pants}
              studentId:1
            ) {
              favoriteAvatarCollection {
                  id
              }
       }
   }
        `
    }
  })
}

export const setCoinWallet = async (studentId: number, token: string, dispatch: any) => {
  const res: any = await query(`studentById(id: "${studentId}")`, STUDENT_WALLET_QUERY, token).catch(() => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }
  const coinWallet = result.data.studentById.coinWallet
  dispatch({ type: TYPES.EARNING_COIN_SET, payload: coinWallet.balance })
  return { success: true, msg: 'Success!' }
}

export const createStudent = async (
  audience: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  guardianStudentPlanId: number,
  listSubjectId: number[],
  studentPlan: number,
  gradeId: number,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CREATE_STUDENT(
      audience,
      firstName,
      lastName,
      username,
      password,
      guardianStudentPlanId,
      listSubjectId,
      studentPlan,
      gradeId,
    ),
    token
  ).catch(() => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }

  const { guardian } = result.data.createStudent;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  // dispatch({
  //     type: TYPES.GUARDIAN_SET_STUDENT,
  //     payload: student || []
  // });
  return { success: true, msg: 'Success', data: result.data.createOrder }
}

export const changeStudentGrade = async (
  gradeId: string,
  studentId: string,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CHANGE_STUDENT_GRADE(
      gradeId,
      studentId,
    ),
    token
  ).catch(() => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }

  const { guardian } = result.data.createChangeStudentGrade;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  // dispatch({
  //     type: TYPES.GUARDIAN_SET_STUDENT,
  //     payload: student || []
  // });
  return { success: true, msg: 'Success', data: result.data.createOrder }
}

export const changeStudentPassword = async (
  password: string,
  studentId: string,
  token: string,
  dispatch: any
) => {
  const res: any = await mutation(
    CHANGE_STUDENT_PASSWORD(
      password,
      studentId,
    ),
    token
  ).catch(() => ({ success: false }));

  if (res.success === false) {
    return { success: false, msg: 'Network Error!' };
  }

  const result: any = await res.json();

  if (result.errors) {
    return { success: false, msg: result.errors[0].message };
  }

  // const { guardian, student} = result.data.changeStudentPassword;
  const { guardian } = result.data.changeStudentPassword;

  dispatch({
    type: TYPES.GUARDIAN_SET_DATA,
    payload: guardian,
  });
  // dispatch({
  //     type: TYPES.GUARDIAN_SET_STUDENT,
  //     payload: student || []
  // });
  return { success: true, msg: 'Success', data: result.data.createOrder }
}

export const doSetOldUser = async (token: string) => {

  try {
      const res: any = await sendRawQuery(
          `mutation IsNew {
            updateIsNew {
              student{
                isNew
              }
            }
          }`,
          token
      );
      return res.msg ?
          { msg: res.msg, status: false } :
          { ...res.data.IsNew, status: true }
  } catch(e) {
      console.log(e)
      return { msg: 'Set old user error!', status: false }
  }
}
