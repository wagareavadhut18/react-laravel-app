function AdminReducer(state={
    isloggedin:localStorage.loginstatus?true:false,
    // token:localStorage.token,
    // username:localStorage.username
    loginstatus:localStorage.loginstatus,
    },action){
        switch(action.type){
            case "LOGIN_STARTED" :{
                state = {...state}
                state["isloading"]  = true
                return state
            }
            case "LOGIN_SUCCESS" :{
              state = {...state}
              state["isloading"] = false
              state.isloggedin = true
              return state
            }
            case "LOGIN_FAIL" :{
                state = {...state}
                state["isloading"] = false
                return state
            }
            case"LOGOUT" :{
                state = {...state}
                // localStorage.clear()
                state.isloggedin = false
                // state.username = undefined
                return state
                
            }
            default:return state
        }
    }
    export default AdminReducer