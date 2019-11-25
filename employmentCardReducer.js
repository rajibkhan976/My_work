import initialState from "../initialState";
import * as Types from "../../Actions/Employment/actionTypes";

export default function employmentCardReducer(state = initialState.employment, action) {
    return {
        employmentCards: employmentCards(state.employmentCards, action),
        salary: salaryDetails(state.salary, action),
        salaryAffecting: salaryAffecting(state.salaryAffecting, action),
        caseButtons: caseButtons(state.caseButtons, action)
    };
}

function employmentCards(state, action) {
    switch (action.type) {
        case Types.GET_EMPLOYMENTS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function caseButtons(state, action) {
    switch (action.type) {
        case Types.GET_CASEBUTTONS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function salaryDetails(state, action) {
    switch (action.type) {
        case Types.GET_SALARY_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function salaryAffecting(state, action) {
    switch (action.type) {
        case Types.GET_SALARY_AFFECTING_SUCCESS:
            return action.data;
        default:
            return state;
    }
}