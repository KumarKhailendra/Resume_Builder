import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'
import { showFailure2Toaster, showFailureToaster, showSuccessToaster } from '@/utils/config'


export const login = (data) => async (dispatch) => {
    try {
        const res1 =  postDataAPI('login', data)
        showFailure2Toaster(res1)
        const res =  await res1;
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            } 
        })
        localStorage.setItem("firstLogin", true)
    } catch (err) {
        showFailureToaster(err.response.data.msg)
    }
}


export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if(firstLogin){
        try {
            const res = await postDataAPI('refresh_token')
            dispatch({ 
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                } 
            })

        } catch (err) {
            showFailureToaster(err.response.data.msg)
        }
    }else{
        showFailureToaster("Please Login First");
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data)
    console.log(check);

    try {
        const res1 = postDataAPI('register', data)
        showFailure2Toaster(res1)
        const res =  await res1;
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            } 
        })

        localStorage.setItem("firstLogin", true)
    } catch (err) {
        showFailureToaster(err.response.data.msg)
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("firstLogin");
        const res1 = postDataAPI('logout')
        showFailure2Toaster(res1)
        await res1;
        window.location.href = "/"
    } catch (err) {
        showFailureToaster(err.response.data.msg)
    }
}
