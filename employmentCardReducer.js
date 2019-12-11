import initalState from "../initialState";
import * as Types from "../../Actions/Employment/actionTypes";

export default (state = initalState.employment, action) => employmentReducer(state, action);

function employmentReducer(state, action) {
    switch (action.type) {
        case Types.LOAD_EMPLOYMENTS_SUCCESS: {
            return { ...state, employments: action.data.result };
        }

        case Types.LOAD_EMPLOYMENTINFO_SUCCESS: {
            return { ...state, cardInfo: action.data };
        }

        case Types.RESET_FILTER_EMPLOYMENTS: {
            return { ...state, noResult: false, filteredEmployments: [] };
        }

        case Types.FILTER_EMPLOYMENTS: {
            const { payload } = action
            const filterArray = (array, query) => array.filter(o =>
                Object.keys(o).some(k => String(o[k]).toLowerCase().includes(query.toLowerCase())));

            const filteredEmployments = filterArray(state.employments, payload);

            if (filteredEmployments.length === 0) {
                return { ...state, noResult: true, filteredEmployments }
            }

            return { ...state, filteredEmployments };
        }

        case Types.LOAD_CASEBUTTONS_SUCCESS: {
            return { ...state, caseButtons: action.data.caseButtons };
        }

        case Types.LOAD_SALARY_INFO_SUCCESS: {
            return { ...state, salaryInfo: action.data };
        }

        default:
            return state;
    }
}