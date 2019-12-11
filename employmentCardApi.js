import apiClient from "./../../Utils/apiClient";
const rootPrefixBody = "/api/v1/employment";
const rootPrefixAction = "/api/v1";

export function getEmployments(showEndedEmployments) {
    return apiClient.get(`${rootPrefixBody}/employments`, { params: showEndedEmployments });
}

export function getCaseButtonsForEmployment(employmentId, fullName) {
    return apiClient.get(`${rootPrefixAction}/case/${employmentId}/casebuttons`, { params: { fullName } });
}

export function getSalaryInfoForEmployee(employmentId) {
    return apiClient.get(`${rootPrefixAction}/salary/${employmentId}/salaryinfo`, { params: { employmentId } });
}
