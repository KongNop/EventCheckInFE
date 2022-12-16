import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const Footer = () => {
    return (
        <footer
        style={{ width: '100vw', backgroundColor: 'gray', bottom: 0, position: 'absolute', padding: 10}}>
                <Typography
                    sx={{ color: "white" }}
                    gutterBottom
                    paragraph
                    align="center"
                >
                    Creadera Festive Hackathon
                </Typography>
                <Typography
                    sx={{ color: "white", fontSize: 11 }}
                    paragraph
                    align="center"
                >
                    Kong Nopwattanapong
                </Typography>
        </footer>
    );
}

export default Footer