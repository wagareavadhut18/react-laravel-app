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
                    localStorage.setItem('adminToken', response.data.token)
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

export function logoutmiddleware(){
    return function(dispatch) {
            axios({
                url: "http://127.0.0.1:8000/api/logout",
                method: 'post',
                headers:{Authorization: 'Bearer '+localStorage.adminToken},
                data:{}
            }).then(response => {
                console.log("logout success",response);
                    localStorage.setItem('loginstatus', '')
                    localStorage.adminToken = '';
                    dispatch({
                        type: "LOGOUT",
                        payload: {
                            token: response.data.token,
                        }
                    })
            }, err => {
                // dispatch({
                //     type: "LOGIN_FAIL"
                // })
            })
    }
// logout hit yahan se hai
}
