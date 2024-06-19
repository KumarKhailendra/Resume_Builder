import toast from "react-hot-toast";

export const BASE_URL = 'http://localhost:5000'

export const showSuccessToaster=(msg)=>{
    toast.success(msg);
}
export const showFailureToaster=(msg)=>{
    toast.error(msg)
}

export const showFailure2Toaster=(myPromise,msg)=>{
    toast.promise(myPromise, {
        loading: <p>Loading</p>,
        success: (data) => data.data.msg,
        error: (err) => err.response.data.msg
      });

}
