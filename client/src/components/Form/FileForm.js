import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';


const FileForm = () => {

    const { token } = useSelector(state => state)

    function showPreview(event) {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
        }
        else {
            delete preview.src
        }
    }


    return (
        <>
            <Formik
                initialValues={{ avatar: '' }}
                validationSchema={Yup.object({

                    avatar: Yup.mixed().required(),


                })}
                onSubmit={(values, { setSubmitting }) => {

                    axios.post('http://localhost:3001/avatar', values, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`

                        }
                    })

                }}
            >
                {({ values, handleSubmit, setFieldValue, resetForm }) => {
                    console.log(values)

                    return (
                        <>
                            <Form>


                                <label htmlFor="avatar">File upload</label>
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("avatar", event.currentTarget.files[0])
                                        showPreview(event)
                                    }}
                                />
                                <ErrorMessage name="avatar" />




                                <button type="submit">Submit</button>
                            </Form>

                            <button onClick={() => { resetForm() }}>Borrar imagen</button>
                            <Box className="preview">
                                <img id="file-ip-1-preview" />
                            </Box>

                        </>
                    )
                }}
            </Formik>
        </>
    );
};

export default FileForm;