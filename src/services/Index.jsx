import requests from "./httpSevices";

// login api===============================================
export const LoginUser = async (data) => {
  return await requests.post(`signin`, data);
};
// customer api's =========================================
export const GetCustomer = async () => {
  return await requests.get(`customers`);
};
export const GetCustomerDetail = async (id) => {
  return await requests.get(`customers/${id}`);
};
export const CreateCustomer = async (data) => {
  return await requests.post(`customers`, data);
};
export const UpdateCustomer = async (id,data) => {
  return await requests.put(`customers/${id}`, data);
};
export const DeleteCustomer = async (id) => {
  return await requests.delete(`customers/${id}`);
};

// get select options api===================================

export const GetSelectOption = async () => {
  return await requests.get(`get-input-fields`);
};

// employee api's ==============================================
export const GetEmployee = async () => {
  return await requests.get(`employees`);
};
export const CreateEmployee = async (data) => {
  return await requests.post(`employees`, data);
};
export const UpdateEmployee = async (id,data) => {
  return await requests.put(`employees/${id}`, data);
};
export const DeleteEmployee = async (id) => {
  return await requests.delete(`employees/${id}`);
};

// loan api's ======================================================
export const GetLoanByMode = async (data) => {
  return await requests.post(`customers/get-by-mode`, data);
};
export const GetLoan = async () => {
  return await requests.get(`loan`);
};
export const CreateLoan = async (id,data) => {
  return await requests.post(`loan/${id}`, data);
};
export const UpdateLoan = async (id,data) => {
  return await requests.put(`loan/${id}`, data);
};
export const DeleteLoan = async (id) => {
  return await requests.delete(`loan/${id}`);
};

// loan type api's ======================================================
export const GetLoanType = async () => {
  return await requests.get(`loan-types`);
};
export const CreateLoanType = async (data) => {
  return await requests.post(`loan-types`, data);
};
export const UpdateLoanType = async (id,data) => {
  return await requests.put(`loan-types/${id}`, data);
};
export const DeleteLoanType = async (id) => {
  return await requests.delete(`loan-types/${id}`);
};
// loanType option api ===============================================
export const GetAllLoanType = async () => {
  return await requests.get(`define-loan-types`);
};
// route api's ======================================================
export const GetRoute = async () => {
  return await requests.get(`collections-routes`);
};
export const CreateRoute = async (data) => {
  return await requests.post(`collections-routes`, data);
};
export const UpdateRoute = async (id,data) => {
  return await requests.put(`collections-routes/${id}`, data);
};
export const DeleteRoute = async (id) => {
  return await requests.delete(`collections-routes/${id}`);
};
// Expenses api's ======================================================
export const GetExpenses = async () => {
  return await requests.get(`expenses`);
};
export const CreateExpenses = async (data) => {
  return await requests.post(`expenses`, data);
};
export const UpdateExpenses = async (id,data) => {
  return await requests.put(`expenses/${id}`, data);
};
export const DeleteExpenses = async (id) => {
  return await requests.delete(`expenses/${id}`);
};

// dashboard api  =====================================================
export const GetDashboard = async () => {
  return await requests.get(`dashboard/`);
};
// report api  =====================================================
export const GetReports = async (data) => {
  return await requests.post(`reports`, data);
};
