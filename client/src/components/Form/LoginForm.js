import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import { customField, InputBox, StyledErrorMessage } from './TextField';
import FlexBetween from '../FlexBetween';
import { authenticate } from '../../helpers/auth';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/auth';
import { useNavigate } from 'react-router-dom';



const SignupForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required required'),
                password: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .min(2, 'Must be 2 characters or more')
                    .required('Password is required')
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

                const res = await authenticate(values)

                if (res.error) {
                    window.alert(res.error)
                    values.password = ''
                    setSubmitting(false);
                    return
                }

                const { username, token, id } = res
                dispatch(setLogin({ username, token, id }))

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

                    <Form>
                        <Typography sx={
                            {
                                textAlign: 'center',
                                fontSize: '2.5rem',
                                fontWeight: '600'
                            }
                        }>Login</Typography>

                        <InputBox>
                            <Field label='Email Name' name="email" type="text" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="email" />
                            </StyledErrorMessage>
                        </InputBox>


                        <InputBox marginBottom='35px'>
                            <Field label='password' name="password" type="password" component={customField} />
                            <StyledErrorMessage>
                                <ErrorMessage name="password" />
                            </StyledErrorMessage>
                        </InputBox>

                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: '#0887f7',
                                color: '#FFF',
                                padding: '15px 25px',
                                width: '100%',
                                alignSelf: 'center',
                                marginTop: '15px',
                                display: 'block',
                                fontWeight: 600,
                                '&:hover': {
                                    color: '#555'
                                }
                            }}
                        >Submit</Button>

                    </Form>

                    <Typography
                        onClick={() => navigate('/register')}
                        sx={{
                            fontSize: '0.8rem',
                            color: '#555',
                            margin: '10px',
                            '&:hover': {
                                cursor: 'pointer',
                                color: '#0887f7',
                            }
                        }}
                    >
                        You don't have an account? Sign up in here
                    </Typography>

                </FlexBetween >
            </Box>
        </Formik>
    );
};

export default SignupForm;