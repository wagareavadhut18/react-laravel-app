import axios from "axios"
export function loginmiddleware(data){
    return function(dispatch) {
            dispatch({
                type:"LOGIN_STARTED"
            })
            axios({
                url: "http://127.0.0.1:8000/api/login",
                method: 'post',
                data:data
            }).then(response => {
                // console.log("login success",response);
                if (response.data.token) {
                    localStorage.setItem('loginstatus', true)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {
                            token: response.data.token,
                        }
                    })
                }
            }, err => {
                dispatch({
                    type: "LOGIN_FAIL"
                })
            })
    }
// login hit yahan se hai
}
