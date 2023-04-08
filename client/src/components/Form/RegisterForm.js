import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import { customField, InputBox, StyledErrorMessage } from './TextField';
import FlexBetween from '../FlexBetween';
import { registerUser } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';


const SignupForm = ({ changeForm }) => {

    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{ email: '', username: '', password: '', passwordConfirmation: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required required'),
                username: Yup.string()
                    .required('Username is required required')
                    .max(15, 'Must be 15 characters or less')
                    .min(2, 'Must be 2 characters or more'),

                password: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .min(2, 'Must be 2 characters or more')
                    .required('Password is required'),

                passwordConfirmation: Yup.string()
                    .required('Confirm password is required')
                    .oneOf([Yup.ref('password')], 'Passwords must match')

            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                const res = await registerUser(values)

                if (res.error) {
                    window.alert(res.error)
                    values.password = ''
                    setSubmitting(false);
                    return
                }

                setSuccess(true)

                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }}
        >
            <Box margin='40px 15px'>

                <FlexBetween
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minWidth: '400px',
                        backgroundColor: '#fff',
                        maxWidth: '700px',
                        borderRadius: '15px',
                        border: '1px solid #ccc',
                        padding: '25px',
                        margin: 'auto'
                    }}>
                    {success && <Typography sx={{ color: 'green', fontSize: '0.8rem', margin: '10px' }}
                    >User created succesfully. You are being redirected to login.</Typography>}

                    <Form>
                        <Typography sx={
                            {
                                textAlign: 'center',
                                fontSize: '2.5rem',
                                fontWeight: '600'
                            }
                        }>Register</Typography>

                        <InputBox>
                            <Field label='Email Name' name="email" type="text" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="email" />
                            </StyledErrorMessage>
                        </InputBox>

                        <InputBox>
                            <Field label='Username' name="username" type="username" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="username" />
                            </StyledErrorMessage>
                        </InputBox>

                        <InputBox marginBottom='35px'>
                            <Field label='password' name="password" type="password" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="password" />
                            </StyledErrorMessage>
                        </InputBox>

                        <InputBox marginBottom='35px'>
                            <Field label='Confirm Password' name="passwordConfirmation" type="password" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="passwordConfirmation" />
                            </StyledErrorMessage>
                        </InputBox>

                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: '#0887f7',
                                color: '#FFF',
                                padding: '15px 25px',
                                width: '100%',
                                marginTop: '15px',
                                fontWeight: 600,
                                '&:hover': {
                                    color: '#555'
                                }
                            }}
                        >Submit</Button>

                    </Form>
                    <Typography
                        onClick={() => navigate('/')}
                        sx={{
                            color: '#555',
                            fontSize: '0.8rem',
                            margin: '10px',
                            '&:hover': {
                                cursor: 'pointer',
                                color: '#0887f7',

                            }
                        }}

                    >
                        Already registered? Sing in here
                    </Typography>
                </FlexBetween >
            </Box>
        </Formik>
    );
};

export default SignupForm;