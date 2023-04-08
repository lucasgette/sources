import axios from 'axios'


export const getPosts = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:3001/post/getPosts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data

    } catch (error) {
        return error
    }
}

export const getTimeline = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:3001/post/timeline', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data

    } catch (error) {
        return error
    }
}



export const getUserPosts = async (token, username) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/post/getUserPosts/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data

    } catch (error) {
        return error
    }
}

export const newPost = async (token, content) => {
    try {

        console.log('creating post!')
        const { data } = await axios.post('http://localhost:3001/post/createPost',
            {
                content
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return data

    } catch (error) {
        return error

    }

}

export const deletePost = async ({ token, user, id }) => {
    try {
        const { data } = await axios.patch(`http://localhost:3001/post/delete/${user}/${id}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return data
    } catch (error) {
        return error

    }
}