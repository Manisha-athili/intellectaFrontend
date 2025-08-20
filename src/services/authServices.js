import { API } from "../axios/axios.config";


export const sendRegistrationOtp = (data) => API.post('/register',data)
export const verifyOtpAndRegisterUser = (data) => API.post('/verify-otp', data);
export const resendOtpRequest = (data) => API.post('/resend-otp', data);

export const loginUser = (data) => API.post('/login', data);
export const profile = (data) => API.get('/profile', data);
export const forgotPassword = (data) => API.post('/forgot-password', data);
export const resetPassword = (data) => API.post('/reset-password', data);

