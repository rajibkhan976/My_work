import * as Types from "./actionTypes";
import * as Api from "../../Api/Employment/employmentCardApi";

export function getEmploymentCards() {
    return function (dispatch) {
        return Api.getEmployments()
            .then(result => {
                return dispatch({
                    type: Types.GET_EMPLOYMENTS_SUCCESS,
                    data: result.data.result
                });
            })
            .catch(error => {
                return dispatch({
                    type: Types.GET_EMPLOYMENTS_FAILED,
                    data: `Fetching employments failed: ${error}`
                });
            });
    };
}

export function getCaseButtons(employmentId, fullName) {
    return function (dispatch) {
        return Api.getCaseButtonsForEmployment(employmentId, fullName)
            .then(result => {
                return dispatch({
                    type: Types.GET_CASEBUTTONS_SUCCESS,
                    data: result.data.caseButtons
                });
            })
            .catch(error => {
                return dispatch({
                    type: Types.GET_CASEBUTTONS_FAILED,
                    data: `Fetching case buttons failed: ${error}`
                });
            });
    }
}

export function getSalary(employmentId) {
    return function (dispatch) {
        return Api.getSalary(employmentId)
            .then(result => {
                return dispatch({
                    type: Types.GET_SALARY_SUCCESS,
                    data: result.data
                });
            })
            .catch(error => {
                return dispatch({
                    type: Types.GET_SALARY_FAILED,
                    data: `Fetching salary failed: ${error}`
                });
            });
    }
}

export function getSalaryAffecting(employmentId) {
    return function (dispatch) {
        return Api.getSalaryAffecting(employmentId)
            .then(result => {
                return dispatch({
                    type: Types.GET_SALARY_AFFECTING_SUCCESS,
                    data: result.data
                });
            })
            .catch(error => {
                return dispatch({
                    type: Types.GET_SALARY_AFFECTING_FAILED,
                    data: `Fetching salary affecting failed: ${error}`
                });
            });
    }
}