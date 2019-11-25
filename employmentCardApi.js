import apiClient, { toFormData } from "./../../Utils/apiClient";
const rootPrefix = "/api/employment";

export function getEmployments() {
    return apiClient.get(`${rootPrefix}/getEmployments`);
}

export function getCaseButtonsForEmployment(employmentId, fullName) {
    return apiClient.get(`${rootPrefix}/getCaseButtonsForEmployment/${employmentId}`, { params: { fullName } });
}

export function getSalary(employmentId) {
    return apiClient.get(`${rootPrefix}/getSalary`, { params: { employmentId } });
}

export function getSalaryAffecting(employmentId) {
    return apiClient.get(`${rootPrefix}/getSalaryAffecting`, { params: { employmentId } });
}