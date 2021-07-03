import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {loginmiddleware} from "../../reduxstore/middlewares";


function Login(props) {
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //     console.log("Values....", values);
                    // }, 500);
                    var middlefunction = loginmiddleware({email:values.email,password:values.password});
                    props.dispatch(middlefunction);
                    // console.log(props);
                }}
                // validations.....................................
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Email must be a valid email").required("Email is required"),
                    password: Yup.string()
                        .required("Password is required")
                        .min(4, "Password shold be minimun 4 characters")
                        // .matches(/(?=.*[0-9])/, "Password contain number only"),
                })}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmiting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;

                    return (
                        <div className="hold-transition login-page pt-5 pb-5">
                            <div className="login-box">
                                <div className="login-logo">
                                    <a href="../../index2.html"><b>Admin</b></a>
                                </div>
                                {/* /.login-logo */}
                                <div className="card">
                                    <div className="card-body login-card-body">
                                        <p className="login-box-msg">Sign in to Continue</p>

                                        <form autoComplete="off" onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="form-control"
                                                    name="email"
                                                    value={values.email}
                                                    placeholder="Email"
                                                ></input>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">
                                                        <span className="fas fa-envelope" />
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.email && touched.email && (
                                                <span className="text-danger">
                                                    {errors.email}
                                                </span>
                                            )}
                                            <div className="input-group mt-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    placeholder="Password"
                                                ></input>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">
                                                        <span className="fas fa-lock" />
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.password && touched.password && (
                                                <span className="text-danger">
                                                    {errors.password}
                                                </span>
                                            )}
                                            <div className="row">
                                                {/* /.col */}
                                                <div className="col-12 mt-3">
                                                    <button type="submit" className="btn btn-primary btn-block" disabled={isSubmiting}>Sign In</button>
                                                </div>
                                                {/* /.col */}
                                            </div>
                                        </form>
                                    </div>
                                    {/* /.login-card-body */}
                                </div>
                            </div>
                            {/* /.login-box */}
                        </div>

                    );
                }}
            </Formik>
        </>
    );
}


Login =connect(function(state,props){
    // console.log("connect ki state hai",state,"connect props===",props);
    if(state.AdminReducer?.isloggedin===true){
        window.location.href = "/admin/dashboard";
    }else{
        return {
            isloading:state.AdminReducer?.isloading
        }
    }
})(Login) 

export default withRouter(Login);//syntax for redux and dispatch


// export default connect()(Login);

