import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                minWidth: 290,
                height: "100vh",
                alignItems: "center",
            }}
        >
            <div className="App">
                <Container maxWidth="md" sx={{ my: 5, bgcolor: "white", p: 1 }}>
                    <Typography align="center" variant="h3">
                        Welcome To Event CheckIn Application
                    </Typography>
                    <Typography align="left" paragraph sx={{ my: 2 }}>
                        This application is used for Credera Festive Hackathon
                        purpose. The application's goal is to solve problem
                        where Operation team might be having a hard time to keep
                        track of people participating in an event.
                    </Typography>
                    <Typography align="left" paragraph sx={{ my: 2 }}>
                        The application will provide a generated QR Code / Link
                        for participant to scan and check in the event. Where
                        Operation team can keep track of who has been checked in
                        and who hasn't.
                    </Typography>
                </Container>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin");
                    }}
                >
                    Login As a Test Admin
                </Button>
            </div>
        </Box>
    );
}

export default App;
