import { Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';

function EmptyCart() { 
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return( 
        <Container sx={{ 
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            marginTop: '4rem', 
        }}> 
        <img src="/construction.svg" alt="under construction" width={'50%'}/> 
            <Container sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
            }}> 
                <Typography variant={isSmallScreen ? 'h6' : 'h5'}>This page is under construction</Typography> 
                <Typography>See you soon!</Typography> 
                <Button component={Link} to="/" variant="contained" sx={{ boxShadow: 'none', marginTop: '1rem', }}>
                    Go back
                </Button> 
            </Container> 
        </Container> 
    ) 
} 

export default EmptyCart;