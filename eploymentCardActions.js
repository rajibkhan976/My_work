import * as Api from "../../Api/Employment/employmentCardApi";
import * as Types from "./actionTypes";

const loadEmploymentList = data => {
    return { type: Types.LOAD_EMPLOYMENTS_SUCCESS, data };
};

const loadSalaryInfo = data => {
    return { type: Types.LOAD_SALARY_INFO_SUCCESS, data };
};

const loadCaseButtons = data => {
    return { type: Types.LOAD_CASEBUTTONS_SUCCESS, data };
};

export function getEmployments(showEndedEmployments, filterQuery) {
    return function(dispatch) {
        window.loader.show();
        return Api.getEmployments(showEndedEmployments)
            .then(result => {
                window.loader.hide();
                dispatch(loadEmploymentList(result.data));
                if (filterQuery) {
                    dispatch(filterEmployments(filterQuery));
                }
            })
            .catch(error => {
                dispatch({
                    type: Types.LOAD_EMPLOYMENTS_FAILED,
                    data: `Fetching employments failed: ${error}`
                });
            });
    };
}

export function getCaseButtons(employmentId, fullName) {
    return function(dispatch) {
        return Api.getCaseButtonsForEmployment(employmentId, fullName)
            .then(result => {
                dispatch(loadCaseButtons(result.data));
            })
            .catch(error => {
                return dispatch({
                    type: Types.LOAD_CASEBUTTONS_FAILED,
                    data: `Fetching case buttons failed: ${error}`
                });
            });
    };
}

export function getSalaryInfo(employmentId) {
    return function(dispatch) {
        return Api.getSalaryInfoForEmployee(employmentId)
            .then(result => {
                dispatch(loadSalaryInfo(result.data));
            })
            .catch(error => {
                return dispatch({
                    type: Types.LOAD_SALARY_INFO_FAILED,
                    data: `Fetching salary info failed: ${error}`
                });
            });
    };
}

export function filterEmployments(data) {
    window.loader.show();
    return function(dispatch) {
        dispatch({
            type: Types.FILTER_EMPLOYMENTS,
            payload: data
        });
        window.loader.hide();
    };
}

export function resetFilter() {
    return function(dispatch) {
        dispatch({
            type: Types.RESET_FILTER_EMPLOYMENTS
        });
    };
}
