import mutationFetch    from 'api/mutations/get';
import { CREATE_GUARDIAN,
    UPDATE_EMAIL_PASSWORD,
    FETCH_GUARDIAN_AVAILABLE_BOUGHT_PLANS,
    UPDATE_GUARDIAN_AVAILABLE_BOUGHT_PLAN,
    CANCEL_GUARDIAN_BOUGHT_PLAN,
    FETCH_PLANS,
    ADD_STUDENT_PLAN_PACKAGE,
    CANCEL_MEMBERSHIP
 }                      from 'api/mutations/guardians';
import { sendRawQuery } from 'api/queries/get';
import * as TYPES       from 'app/types'

export const createGuardian = async (email: string, firstName: string, lastName: string, userName: string, password: string, couponCode: string, dispatch: any) => {
    const res: any = await mutationFetch(
        CREATE_GUARDIAN(email, firstName, lastName, userName, password, couponCode)
    ).catch(() => ({ success: 'false' }));

    if (res.success === false) {
        return { success: false, msg: 'Network Error!' };
    }

    const result: any = await res.json();

    if (result.errors) {
        return { success: false, msg: result.errors[0].message };
    }

    const { guardian, user, token, refreshToken } = result.data.createGuardian;

    dispatch({
        type: TYPES.GUARDIAN_SET_DATA,
        payload: guardian,
    });
    dispatch({
        type: TYPES.USER_SET_DATA,
        payload: { ...user, token: token, refreshToken: refreshToken },
    });

    return { success: true, msg: 'Success', data: result.data }
}

export const doUpdateGuardianEmailPassword = async (email: string, username: string, password: string, token: string) => {
    const res: any = await sendRawQuery(
        UPDATE_EMAIL_PASSWORD(email, username, password),
        token
    );

    return res.msg ? null : res.data.changeGuardianEmailPassword.user;
}

export const doFetchAvailableBroughtPlans = async (guardianId: number, token: string) => {
    const res: any = await sendRawQuery(
        FETCH_GUARDIAN_AVAILABLE_BOUGHT_PLANS(guardianId),
        token
    );
    return res.msg ? null : res.data.guardianAvailableBroughtPlan;
}

export const doUpdateBroughtPlan = async (guardianId: number, orderDetailId: number, token: string) => {
    try {
        const res: any = await sendRawQuery(
            UPDATE_GUARDIAN_AVAILABLE_BOUGHT_PLAN(guardianId, orderDetailId),
            token
        );
        return res.msg ? {status: false} : res.data.updateGuardianPlan;
    }
    catch {
        return {status: false}
    }
}

export const doFetchPlans = async ( token: string) => {
    try {
        const res: any = await sendRawQuery(
            FETCH_PLANS,
            token
        );
        return res.msg ? {status: false} : res.data.plans;
    }
    catch {
        return {status: false}
    }
}

export const doCancelBroughtPlan = async ( orderDetailId: number, reason: string, token: string) => {
    try {
        const res: any = await sendRawQuery(
            CANCEL_GUARDIAN_BOUGHT_PLAN( orderDetailId, reason),
            token
        );
        return res.msg ? {status: false} : res.data.cancelGuardianPlan;
    }
    catch {
        return {status: false}
    }
}

export const doAddStudentPlan = async ( guardianId: number, planId: number, token: string) => {
    try {
        const res: any = await sendRawQuery(
            ADD_STUDENT_PLAN_PACKAGE( guardianId, planId),
            token
        );

        return res.msg ? {msg: res.msg, status: false} : {...res.data.cancelGuardianPlan, status: true};
    }
    catch(e) {
        return {msg:e, status: false}
    }
}
export const doCancelMembership = async ( guardianId: number, reason: string, token: string) => {
    try {
        const res: any = await sendRawQuery(
            CANCEL_MEMBERSHIP( guardianId, reason),
            token
        );
        return res.msg ? {status: false} : res.data.cancelMemberShip ;
    }
    catch {
        return {status: false}
    }
}

