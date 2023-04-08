import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/Form/RegisterForm.js'
import Navbar from '../components/Navbar/Navbar.js'


const RegisterPage = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state)

    useEffect(() => {
        if (user) {
            return navigate('/')
        }

    }, [user, navigate])


    return (
        <>
            <Navbar />
            <RegisterForm />
        </>
    )
}

export default RegisterPage