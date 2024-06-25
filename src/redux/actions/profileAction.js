import { putDataAPI } from "@/utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { showSuccessToaster } from "@/utils/config";

export const updateProfileUser = (userData) => async (dispatch) => {
    try {
        await putDataAPI("profile", userData)
        showSuccessToaster("Profile update succes!")
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                }
            }
        })
    } catch (err) {
        // showFailureToaster("we found error from server")
    }
}