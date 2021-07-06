## Using react and passport api

# Installation of react  in laravel commands:-

-composer require laravel/ui

-php artisan ui react

-npm i 

-npm run dev

- In resources/js/components/components/ folder create your App.js for react like

import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">App Component</div>
                        <div className="card-body">I'm an app component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

- Next step is import that App.js in resources/js/app.js as follows

require('./components/App');

- In routes/web.php add following route

Route::get('/', function () {
    return view('welcome');
});

- The resources/views/welcome.blade.php file modify by following code

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel project</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>

- Then last fire following command to publish all css and js to public folder

  npm run dev

  php artisan serve


## Passport installation

https://laravel.com/docs/8.x/passport

composer require laravel/passport

php artisan migrate

php artisan passport:install

- Import trait in User model:-

use Laravel\Passport\HasApiTokens;

use HasApiTokens, HasFactory, Notifiable;

- Next, you should call the Passport::routes method within the boot method of your App\Providers\AuthServiceProvider. This method will register the routes necessary to issue access tokens and revoke access tokens, clients, and personal access tokens:

<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (! $this->app->routesAreCached()) {
            Passport::routes();
        }
    }
}

- Finally, in your application's config/auth.php configuration file, you should set the driver option of the api authentication guard to passport. This will instruct your application to use Passport's TokenGuard when authenticating incoming API requests:

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],

# Personal Access Tokens

After creating your personal access client, place the client's ID and plain-text secret value in your application's .env file:

PASSPORT_PERSONAL_ACCESS_CLIENT_ID="client-id-value"
PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET="unhashed-client-secret-value"

- It is available in oauth_clients table 1st record


# For Authentication :-

php artisan make:controller Auth/ApiAuthController


<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use App\Models\User;

class ApiAuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'The provided creadentials are incorrect.'
            ]);
        }

        $token = $user->createToken('Auth Token')->accessToken;

        return response()->json(['token' => $token]);
    }

    public function register(Request $request){
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

        $token = $user->createToken('Auth Token')->accessToken;

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'You have been successfully logged out!']);
    }
}

- Change in routes/api.php

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ApiAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/logout', [ApiAuthController::class, 'logout'])->middleware('auth:api');

## Formik validation installation:

npm install formik;

npm i yup;

- Use in react component as follows:-

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
function Login() {
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("Values....", values);
                    }, 500);
                }}
                // validations.....................................
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Email must be a valid email").required("Email is required"),
                    password: Yup.string()
                        .required("Password is required")
                        .min(4, "Password shold be minimun 4 characters")
                        .matches(/(?=.*[0-9])/, "Password contain number only"),
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

export default Login;


## Make seeder in laravel

php artisan make:seeder UserSeeder

- In UserSeeder.php

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@yopmail.com',
            'user_type' => 'admin',
            'password' => Hash::make('password')
        ]);
    }
}


- In DatabaseSeeder.php

/**
    * Seed the application's database.
    *
    * @return void
    */
public function run()
{
    // \App\Models\User::factory(10)->create();
    $this->call([
        UserSeeder::class,
    ]);
}

- To run specific migration -

php artisan migrate --path=/database/migrations/my_migration.php

- To run down() method of migration use:

php artisan migrate:rollback --path=/database/migrations/my_migration.php

## Install react-redux :

npm i react-redux

npm i redux

npm i redux-thunk

## Login authentication in react laravel

- Add the following code in Login.js under the formik's validation on submit method

var middlefunction = loginmiddleware({email:values.email,password:values.password});
props.dispatch(middlefunction);

- Above code is for transfering data from login.js to middleware.js file login function

- Add following code in middleware for login-

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
                console.log("login success",response);
                if (response.data.token) {
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
}

- Make AdminReducer.js by following code for dispatches

function AdminReducer(state={
    isloggedin:false,
    // token:localStorage.token,
    // username:localStorage.username
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

- Add following code in store.js file for combining all the reducers:

import {createStore , combineReducers , applyMiddleware} from "redux"
import AdminReducer from "./AdminReducer";

var reducers = combineReducers({AdminReducer});

let store  =  createStore(reducers, applyMiddleware(middle, thunk));

- Add the following code for exporting login.js to connect with middleware and reducer file

import { withRouter } from 'react-router-dom';

Login =connect(function(state,props){
    if(state.AdminReducer?.isloggedin===true){
        window.location.href = "/admin/dashboard";
    }else{
        return {
            isloading:state.AdminReducer?.isloading
        }
    }
})(Login) 

export default withRouter(Login);//syntax for redux and dispatch

- In routes/web.php add the following code for managing different urls:

Route::view('/admin/{path?}', 'admin');

## To get JSON response create ForceJsonResponse middleware

- create middleware using following command

php artisan make:middleware ForceJsonResponse

- Register that middleware in app/Http/Kernel.php

protected $middleware = [
    ...
    \App\Http\Middleware\ForceJsonResponse::class,
];

protected $routeMiddleware = [
    ...
    'json.response' => \App\Http\Middleware\ForceJsonResponse::class,
];

- Use that middleware in routes/api.php

Route::middleware(['json.response'])->group(function () {
    //Your GET AND POST routes goes here
});
