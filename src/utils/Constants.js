const env = 'dev';  // 'dev' || 'local'
const LOCAL_API_URL = 'http://localhost:8000';
const DEV_API_URL = 'https://stage-api.mylinkcare.org';

const BASE_URL = env == 'dev' ? DEV_API_URL : LOCAL_API_URL; // LOCAL_API_URL | DEV_API_URL

const API_ENDPOINTS = {

    // AUTH API ENDPOINTS
    LOGIN: BASE_URL + "/auth/auth/login",
    IS_USER_EXISTS: BASE_URL + "/auth/auth/userExists",
    OTP_VARIFY: BASE_URL + "/auth/auth/otpVerify",
    REGISTER_PATIENT: BASE_URL + "/auth/auth/patientRegister",


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

}

const UNPROTECTED_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_PATIENT: '/register/patient',
    FORGOT_PASSWORD: '/forgot-password',
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
