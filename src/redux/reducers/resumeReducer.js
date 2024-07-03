import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  personal: {},
  experience: [],
  education: [],
  skills: [],
  projects: [],
  courses: [],
  languages: [],
  interests: [],
  volunteers: []
};

const ResumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.RESUME_PERSONAL_DETAILS:
      return {
        ...state,
        personal: {
          ...state.personal,
          ...action.payload.data,
        },
      };
    case GLOBALTYPES.RESUME_EXPRIENCE_DETAILS:
      return {
        ...state,
        experience: [
          ...state.experience,
          ...action.payload.data,
        ],
      };
    case GLOBALTYPES.RESUME_VOLUNTEERS_DETAILS:
      return {
        ...state,
        volunteers: [
          ...state.volunteers,
          ...action.payload.data,
        ],
      };
    case GLOBALTYPES.RESUME_EDUCATION_DETAILS:
      return {
        ...state,
        education: [
          ...state.education,
          ...action.payload.data,
        ],
      };
    case GLOBALTYPES.RESUME_SKILS_DETAILS:
      return {
        ...state,
        skills: [...state.skills, ...action.payload.data],
      };
    case GLOBALTYPES.RESUME_LANGUAGES_DETAILS:
      return {
        ...state,
        languages: [...state.languages, ...action.payload.data],
      };
    case GLOBALTYPES.RESUME_INTERESTS_DETAILS:
      return {
        ...state,
        interests: [...state.interests, ...action.payload.data],
      };
    case GLOBALTYPES.RESUME_PROJECT_DETAILS:
      return {
        ...state,
        projects: [
          ...state.projects,
          ...action.payload.data,
        ],
      };
    case GLOBALTYPES.RESUME_COURSES_DETAILS:
      return {
        ...state,
        courses: [
          ...state.courses,
          ...action.payload.data,
        ],
      };
    default:
      return state;
  }
};

export default ResumeReducer;
