const env = 'dev';  // 'dev' || 'local'
const LOCAL_API_URL = 'http://localhost:8000';
const DEV_API_URL = 'https://stage-api.mylinkcare.org';

const BASE_URL = env == 'dev' ? DEV_API_URL : LOCAL_API_URL; // LOCAL_API_URL | DEV_API_URL

const API_ENDPOINTS = {

    // AUTH API ENDPOINTS
    LOGIN: BASE_URL + "/auth/auth/login",
    IS_USER_EXISTS: BASE_URL + "/auth/auth/userExists",
    OTP_VARIFY: BASE_URL + "/auth/auth/otpVerify",
    REGISTER_DOCTOR: BASE_URL + "/auth/auth/signup",
    REGISTER_CLINIC: BASE_URL + "/auth/auth/registerclinic",
    REGISTER_DOCTOR_TO_CLINIC: BASE_URL + "/auth/auth/addDoctorClinic",
    ADD_QUICK_PATIENT: BASE_URL + "/auth/auth/createQuickPatient",
    GET_PATIENT: BASE_URL + "/auth/auth/getPatient",
    GET_LOCATION_BY_MEDICID: BASE_URL + "/auth/serving-locations/bymedic/{{medic_id}}",
    PATIENT_SUMMARY: BASE_URL + "/auth/patient/patient-summary-parent",
    PATIENT_PROBLEMS: BASE_URL + "/auth/users/patient-problems",
    PATIENT_MEDICAL_HISTORY: BASE_URL + "/auth/pathology/details",
    PATIENT_LIST: BASE_URL + "/auth/patient/patient-list",
    PATIENT_FILE: BASE_URL + "/auth/patient-file",
    CREATE_PATIENT: BASE_URL + "/auth/patient/identification",
    CREATE_EMERGENCY_CONTACT: BASE_URL + "/auth/patient/emergency-contact",
    UPDATE_PATIENT: BASE_URL + "/auth/patient/personal-info",
    ADD_MEDICAL_HISTORY: BASE_URL + "/auth/pathology/create",
    GET_DOCUMENT: BASE_URL + "/auth/documents/get-document",
    GET_DOCUMENT_TYPE: BASE_URL + "/auth/documents/categories",
    CREATE_DOCUMENT: BASE_URL + "/auth/documents",
    GET_LIFE_STYLE: BASE_URL + "/auth/life-style",
    GET_LIFE_STYLE_GRAPH: BASE_URL + "/auth/life-style/details",
    GET_MEDICATION_PRESCRIPTION: BASE_URL + "/auth/prescription/details",
    DOWNLOAD_PDF: BASE_URL + "/auth/prescription/generate-pdf",
    UPDATE_DOC_PROFILE: BASE_URL + "/auth/auth/updatedoctorpersonalinfo",
    UPDATE_DOC_GENERAL_INFO: BASE_URL + "/auth/auth/updatedoctorgeneralinfo",
    UPDATE_PASSWORD: BASE_URL + "/auth/auth/updatepassword",
    ADD_CLINIC: BASE_URL + "/auth/auth/add-clinic",
    GET_CLINIC_DETAILS: BASE_URL + "/auth/auth/clinic/{{clinic_id}}",
    UPDATE_CLINIC: BASE_URL + "/auth/auth/update-clinic",
    GET_CLINICS_LIST: BASE_URL + "/auth/serving-locations/detail-by-medic/{{medic_id}}",

    GET_DOCTOR_PROFILE_IFNO: BASE_URL + "/auth/auth/doctor-profile",
    GET_GENERAL_DOCTOR_PROFILE_IFNO: BASE_URL + "/auth/auth/doctor-general-profile",
    SEND_INVITATION : BASE_URL + "/auth/auth/send-invitation",


    // MASTER API ENDPOINTS
    STATES_BY_CODE_LIST: BASE_URL + "/locations/state/bycode/IN",
    CITIES_BY_CODE_LIST: BASE_URL + "/locations/city/bycode/IN/{{state_code}}",
    STATE_MEDICAL_COUNCIL_LIST: BASE_URL + "/masters/state-medcial-council",
    SPECIALITIES_LIST: BASE_URL + "/masters/specialities",
    GET_REASON: BASE_URL + "/masters/reasons",
    GET_APPOINTMENT_TYPE: BASE_URL + "/masters/appointment-type",
    BLOOD_TYPE: BASE_URL + "/masters/blood-type",
    GET_RELATIONS: BASE_URL + "/masters/relationship",
    GET_PATHOLOGY_CODE: BASE_URL + "/masters/pathology-codes",
    GET_SINCE_CODE: BASE_URL + "/masters/allergy-since",
    GET_ALLERGY_TYPE: BASE_URL + "/masters/allergytypes",
    GET_ALLERGEN: BASE_URL + "/masters/allergen",
    GET_SEVERITY: BASE_URL + "/masters/severity",
    GET_REACTIONS: BASE_URL + "/masters/reactions",
    GET_PRICING_PLAN: BASE_URL + "/masters/subscription-details",
    GET_MEDICINES: BASE_URL + "/masters/medicines/keyword/{{text}}",
    GET_CLINICS: BASE_URL + "auth/serving-location-details/bymedic/{{id}}",


    // APOOINTMENTS 
    GET_APPOINTMENTS: BASE_URL + "/schedule/appointment",
    GET_APPOINTMENTS_MONTHLY: BASE_URL + "/schedule/appointment/monthly",
    CREATE_APPOINTMENT: BASE_URL + "/schedule/appointment/create",
    UPDATE_APPOINTMENT: BASE_URL + "/schedule/appointment/",

    // VITALS
    CREATE_VITALS: BASE_URL + '/schedule/vinpmtal/',

    // AVAILIBILITIES
    GET_AVAILIBILITIES: BASE_URL + "/schedule/availability/",
    AVAILIBILITIES_CREATE: BASE_URL + "/schedule/availability/create",
    AVAILIBILITIES_UPDATE: BASE_URL + "/schedule/availability",
    AVAILIBILITIES_DELETE: BASE_URL + "/schedule/availability",
    
    GET_VITALS: BASE_URL + "/schedule/vital/latest-for-patient",
    VITALS_GRAPH: BASE_URL + "/schedule/vital/patient",
    GET_LAB_DATA: BASE_URL + "/schedule/lab-result",
    CREATE_REPORT: BASE_URL + "/schedule/lab-result/create",

    //medicine
    PATIENT_CONSULTATION: BASE_URL + "/medicine/consultation/patient",
    PATIENT_ALLERGY: BASE_URL + "/medicine/allergy/patient",
    ADD_ALLERGY: BASE_URL + "/medicine/allergy/create",
    
    // EXAMS
    GET_EXAMS_LIST: BASE_URL + "/schedule/diagnosis/exam-results",
    GET_EXAMS_ORDERS_LIST: BASE_URL + "/schedule/diagnosis/exam-result-orders",
    UPLOAD_EXAM_DOC: BASE_URL + "/schedule/diagnosis/",
    GET_MEDICATION_PATIENT: BASE_URL + "/schedule/medication/patient",
    SET_MEDICATION_STATUS: BASE_URL + "/schedule/medication/set-status",

    // MEDICATION
    GET_INTAKES_BY_USER: BASE_URL + '/schedule/intakes/byuser',

}

const UNPROTECTED_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_DOCTOR: '/register/doctor',
    REGISTER_CLINIC: '/register/clinic',
    FORGOT_PASSWORD: '/forgotPassword',
}

const WEEKDAYS = [
    { label: "Monday", value: '1' },
    { label: "Tuesday", value: '2' },
    { label: "Wednesday", value: '3' },
    { label: "Thursday", value: '4' },
    { label: "Friday", value: '5' },
    { label: "Saturday", value: '6' },
    { label: "Sunday", value: '7' },
]

const WEEKDAYS_CONSTANTS = {
    '1': "Monday",
    '2': "Tuesday",
    '3': "Wednesday",
    '4': "Thursday",
    '5': "Friday",
    '6': "Saturday",
    '7': "Sunday",
}

const Constants = {
    API_ENDPOINTS,
    UNPROTECTED_ROUTES,
    WEEKDAYS,
    WEEKDAYS_CONSTANTS
}

export default Constants
