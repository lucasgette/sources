import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { PostInput } from './TextField';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { getPosts, newPost } from '../../helpers/post.js';

const PostForm = ({ setPosts, setError }) => {

    const token = useSelector(state => state.token)



    return (

        <Formik
            initialValues={{ content: '' }}
            validateOnMount={true}
            validateOnChange={true}
            validateOnBlur={false}
            validationSchema={Yup.object({
                content: Yup.string()
                    .max(140, "Must be 140 characters or less")
                    .required("Can't be empty"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

                newPost(token, values.content)
                    .then(res => { setPosts(prevState => [...prevState, res]); resetForm() })
                    .catch(error => console.log(error))

                // getPosts(token)
                //     .then(res => setPosts(res.post))
                //     .catch(error => setError(error.response.data.error))


            }}
        >
            {({ isValid }) => (

                <Form  >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxSizing: 'border-box',
                        width: '100%',
                        padding: '20px 40px',

                    }}>

                        <Field
                            placeholder="What's happening?"
                            name="content"
                            type="text"
                            component={PostInput}
                        />

                        {/* <ErrorMessage name="content" /> */}
                        <Box
                            sx={{
                                flexGrow: 0,
                                width: '70px',
                                backgroundColor: '#fbf5f5',
                                alignSelf: 'flex-end',

                            }}
                        >
                            <Button
                                disabled={!isValid}
                                type="submit"

                            >
                                Submit

                            </Button>
                        </Box>


                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PostForm

