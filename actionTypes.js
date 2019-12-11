/*
 * Employment Action Types
 */

/* Employment Cards */

const USER_EMPLOYMENTS = "USER/EMPLOYMENTS/";

export const LOAD_EMPLOYMENTS_SUCCESS = `${USER_EMPLOYMENTS}LOAD_EMPLOYMENTS_SUCCESS`;
export const LOAD_EMPLOYMENTS_FAILED = `${USER_EMPLOYMENTS}LOAD_EMPLOYMENTS_FAILED`;

export const LOAD_CASEBUTTONS_SUCCESS = `${USER_EMPLOYMENTS}LOAD_CASEBUTTONS_SUCCESS`;
export const LOAD_CASEBUTTONS_FAILED = `${USER_EMPLOYMENTS}LOAD_CASEBUTTONS_FAILED`;

export const LOAD_SALARY_INFO_SUCCESS = `${USER_EMPLOYMENTS}LOAD_SALARY_INFO_SUCCESS`;
export const LOAD_SALARY_INFO_FAILED = `${USER_EMPLOYMENTS}LOAD_SALARY_INFO_FAILED`;

export const FILTER_EMPLOYMENTS = `${USER_EMPLOYMENTS}FILTER_EMPLOYMENTS`;
export const RESET_FILTER_EMPLOYMENTS = `${USER_EMPLOYMENTS}RESET_FILTER_EMPLOYMENTS`;
