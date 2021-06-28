import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import LockOutlined from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"
import { GoogleLogin } from "react-google-login"
import Header from "../components/Header"
import { signin, signup } from "../actions/userActions"
import {
    Container,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
        backgroundColor: 'red',
    },
}));

const Auth = ({ history }) => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);//this will be broken in separate component in future
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [authForm, setAuthForm] = useState(initialState);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            history.push("/books");
        }
    }, [history, userInfo])

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        if(!result){
            alert("Google Auth Failed. Please try after somtime");
            return;
        }
        const form = {
            firstName: result.givenName,
            lastName: result.familyName,
            email: result.email,
            password: result.googleId,
        }
        await dispatch(signup(form));
    }

    const googleFailure = async (res) => {
        console.log("Failed->" + res);
        alert("Invalid Credentials in Google Login.");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {//could be further refactored as separate child components
            if (validateInfoForSignUp(authForm)) {
                alert('Please fill all fields or password does not matched !');
            } else {
                e.currentTarget.textContent = 'Signing up ....';
                await dispatch(signup(authForm));
            }
        } else {
            if (validateInfoForSignIn(authForm)) {
                alert('Please fill all details !');
            } else {
                e.currentTarget.textContent = 'Signing In ....';
            }
            await dispatch(signin(authForm));
        }
    }

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {isSignUp ? "Sign Up" : "Sign In"}
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    {isSignUp && (
                                        <>
                                            {' '}
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete='fname'
                                                    name='firstName'
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                    id='firstName'
                                                    label='First Name'
                                                    autoFocus
                                                    onChange={(e) =>
                                                        setAuthForm({
                                                            ...authForm,
                                                            firstName: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete='lname'
                                                    name='lastName'
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                    id='lastName'
                                                    label='Last Name'
                                                    onChange={(e) =>
                                                        setAuthForm({
                                                            ...authForm,
                                                            lastName: e.target.value,
                                                        })
                                                    }

                                                />
                                            </Grid>
                                        </>
                                    )}

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='email'
                                        name='email'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email Addresss'
                                        autoFocus
                                        onChange={(e) =>
                                            setAuthForm({
                                                ...authForm,
                                                email: e.target.value,
                                            })
                                        }

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete='cur-password'
                                        name='password'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        id='password'
                                        label='Password'
                                        type="password"
                                        autoFocus
                                        onChange={(e) =>
                                            setAuthForm({
                                                ...authForm,
                                                password: e.target.value,
                                            })
                                        }

                                    />
                                    {isSignUp && (
                                        <Grid item xs={12}>
                                            <TextField
                                                variant='outlined'
                                                required
                                                fullWidth
                                                name='password'
                                                label='Confirm Password'
                                                type='password'
                                                id='conf_password'
                                                autoComplete='confirm-password'
                                                onChange={(e) =>
                                                    setAuthForm({
                                                        ...authForm,
                                                        confirmPassword: e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                    onClick={handleSubmit}>{`${isSignUp ? 'Sign Up' : 'Sign In'}`}</Button>

                                <GoogleLogin
                                    clientId={process.env.REACT_APP_NOT_GOOGLE_SECRET_CODE}
                                    render={(renderProps) => (
                                        <Button
                                            className={classes.googleButton}
                                            color='primary'
                                            fullWidth
                                            startIcon={<Icon />}
                                            variant='contained'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            Google Log In
                                        </Button>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFaliure={googleFailure}
                                    cookiePolicy='single_host_origin'
                                />

                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <Link
                                            to='#'
                                            variant='body2'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsSignUp(!isSignUp)
                                            }}
                                        >{`${
                                            isSignUp
                                                ? 'Already have an account? Sign in'
                                                : 'Dont have an account? Sign up'
                                            }`}</Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Typography>
                    </div>
                </CssBaseline>

            </Container>
        </div>
    )
}


function validateInfoForSignUp(authForm) {
    return !authForm.firstName ||
        !authForm.lastName ||
        !authForm.email ||
        !authForm.password ||
        authForm.password !== authForm.confirmPassword;
}

function validateInfoForSignIn(authForm) {
    return !authForm.email ||
    !authForm.password;
}
export default Auth