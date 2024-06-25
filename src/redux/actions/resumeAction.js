import { GLOBALTYPES } from "./globalTypes";

export const PersonalDetailsAction = (data) => async (dispatch) => {
    try {
        console.log(data);
        dispatch({ 
            type: GLOBALTYPES.RESUME_PERSONAL_DETAILS, 
            payload: {
                data: data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}

export const ExperienceDetailsAction = (data) => async (dispatch) => {
    try {
        dispatch({ 
            type: GLOBALTYPES.RESUME_EXPRIENCE_DETAILS, 
            payload: {
                data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}

export const EducationDetailsAction = (data) => async (dispatch) => {
    try {
        dispatch({ 
            type: GLOBALTYPES.RESUME_EDUCATION_DETAILS, 
            payload: {
                data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}

export const SkillsDetailsAction = (data) => async (dispatch) => {
    try {
        dispatch({ 
            type: GLOBALTYPES.RESUME_SKILS_DETAILS, 
            payload: {
                data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}

export const ProjectsDetailsAction = (data) => async (dispatch) => {
    try {
        dispatch({ 
            type: GLOBALTYPES.RESUME_PROJECT_DETAILS, 
            payload: {
                data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}

export const CoursesDetailsAction = (data) => async (dispatch) => {
    try {
        dispatch({ 
            type: GLOBALTYPES.RESUME_COURSES_DETAILS, 
            payload: {
                data
            } 
        })
    } catch (err) {
        console.log(err);
        // showFailureToaster(err.response.data.msg)
    }
}