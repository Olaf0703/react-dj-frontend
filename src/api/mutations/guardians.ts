import { GUARDIAN_STUDENT, GUARDIAN, }                  from '../fragments/guardianFragments';
import { COUPON_COODE, }                                from '../fragments/paymentFragments';
import { USER, USER_PROFILE }                           from '../fragments/userFragments'
import { PAYMENT_METHOD, GUARDIAN_STUDENT_PLAN, GUARDIAN_STUDENT_PLAN_RAW,  ORDER, PLAN, PLAN_RAW } from '../fragments/paymentFragments'
import { STUDENT, STUDENT_RAW, STUDENT_GRADE }                                      from '../fragments/studentFragments'
import { AUDIENCES }                                    from '../fragments/peopleFragments'
import { AREA_OF_KNOWLEDGE }                            from '../fragments/areaOfKnowledgeFragments'
import { GRADES }                                       from '../fragments/peopleFragments'

export const CREATE_GUARDIAN = (email: string, firstName: string, lastName: string, username: string, password: string, couponCode: string) => `
	createGuardian(email: "${email}", username: "${username}", password: "${password}", coupon: "${couponCode}", lastName: "${lastName}", firstName: "${firstName}") {
        guardian {
            ${GUARDIAN}
        }
        user {
            ${USER}
        }
        profile {
            ${USER_PROFILE}
        }
        token
        refreshToken
	}
`;

export const CREATE_ORDER = (
    cardCvc: string,
    cardExpMonth: string,
    cardExpYear: string,
    cardFirstName: string,
    cardLastName: string,
    cardNumber: string,
    discountCode: string,
    guardianId: number,
    orderDetailInput: {},
    paymentMethod: string,
    returnUrl: string,
) => `
    createOrder(cardCvc: "${cardCvc}", cardExpMonth: "${cardExpMonth}", cardExpYear: "${cardExpYear}", cardFirstName: "${cardFirstName}", cardLastName: "${cardLastName}", cardNumber: "${cardNumber}", discountCode: "${discountCode}", guardianId: "${guardianId}", orderDetailInput: ${orderDetailInput}, paymentMethod: "${paymentMethod}", returnUrl: "${returnUrl}"){
        order{
            ${ORDER}
        }
        status
        urlRedirect
    }
`;

export const CONFIRM_PAYMENT_ORDER = (
    orderId: number,
) => `
    confirmPaymentOrder(orderId: ${orderId}){
        order{
            ${ORDER}
        }
        status
    }

`

export const CHANGE_PAYMENT_METHOD = (
    guardianId: number,
    method: string
) => `
    changePaymentMethod(guardianId: ${guardianId}, method: ${method}){
        status
    }
`

export const CREATE_GUARDIAN_STUDENT_PLAN = (
    guardianId: number,
    listSubjectId: number,
    period: string,
    planId: number,
    price: number,
    returnUrl: string,
    studentId: number
) => `
    createGuardianStudentPlan(
        guardianId: ${guardianId},
        listSubjectId: ${listSubjectId},
        period: "${period}",
        planId: ${planId},
        price: ${price},
        returnUrl: "${returnUrl}",
        studentId: ${studentId}
    ) {
        guardianStudentPlan {
            ${GUARDIAN_STUDENT_PLAN}
        }
        order {
            ${ORDER}
        }
        urlRedirect
    }
`

export const UPDATE_GUARDIAN_STUDENT_PLAN = (
    guardianStudentPlanId: number,
    period: string,
    price: number,
    returnUrl: string
) => `
    updateGuardianStudentPlan(
        guardianStudentPlanId: ${guardianStudentPlanId},
        period: "${period}",
        price: ${price},
        returnUrl: "${returnUrl}"
    ) {
        guardianStudentPlan {
            ${GUARDIAN_STUDENT_PLAN}
        }
        order {
            ${ORDER}
        }
        urlRedirect
    }
`

export const CANCEL_GUARDIAN_STUDENT_PLAN = (
    guardianStudentPlanId: number,
    reason: string,
) => `
    cancelGuardianStudentPlan(
        guardianStudentPlanId: ${guardianStudentPlanId},
        reason: "${reason}"
    ) {
        guardianStudentPlan {
            ${GUARDIAN_STUDENT_PLAN}
        }
    }
`

export const CANCEL_MEMBERSHIP = (
    guardianId: number,
    reason: string
) => `
    cancelMembership(
        guardianId: ${guardianId},
        reason: "${reason}"
    ) {
        status
    }
`

export const UPDATE_EMAIL_PASSWORD = (
    email: string,
    username: string,
    password: string
) => `
mutation {
    changeGuardianEmailPassword(email: "${email}", username: "${username}", password: "${password}"){
      guardian {
        user {
          email
          username
        }
      }
    }
}
`
export const FETCH_GUARDIAN_AVAILABLE_BOUGHT_PLANS = (
    guardianId: number,
) => `
query getActiveGuardianPlan {
    guardianAvailableBroughtPlan(guardianId: "${guardianId}"){
      id,
      plan {
        id
        identifier
        name
        description
        areaOfKnowledge
        slug
        priceMonth
        priceYear
        currency
        isCancel
      }
      total
      period
      status
      quantity
      expiredAt
    }
  }
`
export const CANCEL_GUARDIAN_BOUGHT_PLAN = (
    orderDetailId: number,
    reason: string

) => `
mutation cancelGuardianPlan {
    cancelGuardianPlan(orderDetailId: "${orderDetailId}", reason: "${reason}") {
      status
    }
  }
`

export const ADD_STUDENT_PLAN_PACKAGE = (
    guardianId: number,
    planId: number

) => `
mutation AddGuardianPlan {
    addGuardianPlan(
      guardianId: "${guardianId}",
      orderDetailInput: [{planId: ${planId}, quantity: 1, period: "Monthly"}],
      returnUrl: "https://www.example.com/", coupon: "ZXC") {
      guardian {
        id
        user {
          username
          email
        }
      }
      order {
        id
        total
        subTotal
        isPaid
        orderdetailSet {
          plan {
            name
          }
        }
      }
      status
    }
  }
`

export const UPDATE_GUARDIAN_AVAILABLE_BOUGHT_PLAN = (
    guardianId: number,
    orderDetailId: number,

) => `
mutation UpdateGuardianPlan {
    updateGuardianPlan(
      guardianId: "${guardianId}",
      orderDetailId: "${orderDetailId}",
      period: "YEARLY",
      returnUrl: "https://www.example.com/") {
      status
      order {
        id
      }
      urlRedirect
    }
  }
`

export const FETCH_PLANS = `
query plans {
    plans {
      id
      name
      description
      areaOfKnowledge
      priceMonth
      priceYear
      currency
      isCancel
      isActive
    }
  }
`
