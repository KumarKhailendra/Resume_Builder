import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  personal: {},
  exprience: {},
  education: {},
  skils: [],
  projects: {},
  courses: {},
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
        exprience: {
          ...state.exprience,
          ...action.payload.data,
        },
      };
    case GLOBALTYPES.RESUME_EDUCATION_DETAILS:
      return {
        ...state,
        education: {
          ...state.education,
          ...action.payload.data,
        },
      };
    case GLOBALTYPES.RESUME_SKILS_DETAILS:
      return {
        ...state,
        skils: [...state.skils, ...action.payload.data],
      };
    case GLOBALTYPES.RESUME_PROJECT_DETAILS:
      return {
        ...state,
        projects: {
          ...state.projects,
          ...action.payload.data,
        },
      };
    case GLOBALTYPES.RESUME_COURSES_DETAILS:
      return {
        ...state,
        courses: {
          ...state.courses,
          ...action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default ResumeReducer;
