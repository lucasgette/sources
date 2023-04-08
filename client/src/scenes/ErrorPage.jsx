import { Box } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Box 
        display='flex' 
        height='100vh' 
        justifyContent='center' 
        alignItems='center'
        textAlign='center'
        >

            <Box marginBottom='10%'>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <p>Go to home page clicking <Link to='/'>Here</Link></p>
            </Box>
        </Box>

    );
}