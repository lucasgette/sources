import axios from 'axios';




export const authenticate = async ({ email, password }) => {
    try {
        const { data } = await axios.post('http://localhost:3001/auth/login', { email, password })

        return data

    } catch (error) {

        return (error.response.data)
    }


}

export const registerUser = async ({ email, username, password }) => {

    try {

        const { data } = await axios.post('http://localhost:3001/auth/register', { email, username, password })

        return data


    } catch (error) {
        return (error.response.data)

    }
}

