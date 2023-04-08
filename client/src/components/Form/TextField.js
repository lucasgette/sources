import { Box, styled, TextField, Typography } from "@mui/material";


export const customField = ({ field, form, ...props }) => {

    return (
        <TextField
            label={field.name}
            variant="outlined"
            {...field}
            {...props}
            sx={{
                marginTop: '35px',
                backgroundColor: '#fff',
                minWidth: '400px'
            }}
        />
    )
}


export const InputBox = ({ children }) => {

    return <Box display='flex' flexDirection='column'>
        {children}
    </Box>
}

export const StyledErrorMessage = styled(Typography)({
    color: 'red',
    fontSize: '0.8rem',
    margin: '5px'
})


export const PostInput = ({ field, form, ...props }) => {
    return (
        <TextField
            multiline
            minRows={2}
            {...field}
            {...props}

            sx={{
                boxSizing: 'border-box',
                width: '100%',
                marginBottom: '20px'
            }}
        />
    )
}