import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleEventAdmin = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const handleQROpen = () => {
        setOpenQR(true);
    };
    const handleQRClose = () => {
        setOpenQR(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    const [eventDetail, setEventDetail] = useState({
        eventName: "",
        eventDate: "",
        description: "",
        users: [{ name: "", status: false }],
    });
    const { event } = useParams();
    async function fetchEvent(): Promise<void> {
        const res: AxiosResponse<any, any> = await axios.get(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/checkIn/${event}`
        );
        setEventDetail(res.data.Item);
        setLoading(false);
    }

    async function deleteEvent(): Promise<void> {
        handleClose();
        setLoading(true);
        const res: AxiosResponse<any, any> = await axios.delete(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/events/${event}`
        );
        setLoading(false);
        alert("Successfully Delete the event");
        navigate("/admin");
    }
    useEffect(() => {
        setLoading(true);
        fetchEvent();
    }, []);
    const Demo = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    if (loading) {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        minWidth: 290,
                        height: "100vh",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                    </Box>
                </Box>
            </>
        );
    }
    return (
        <>
            <Container
                maxWidth="md"
                sx={{
                    backgroundColor: "white",
                }}
            >
                <Typography
                    align="center"
                    sx={{ mt: 5, mb: 2, color: "#E67F0D" }}
                    variant="h2"
                    component="div"
                >
                    {eventDetail.eventName}
                </Typography>
            </Container>
            <Container
                maxWidth="md"
                sx={{
                    backgroundColor: "#f87d64",
                }}
            >
                <Typography
                    align="center"
                    sx={{ mb: 2, color: "#FFFFFF" }}
                    paragraph
                    component="div"
                >
                    {eventDetail.eventDate}
                </Typography>
            </Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 290,
                }}
            >
                <Grid item xs={12} md={12}>
                    <Container
                        maxWidth="sm"
                        sx={{
                            backgroundColor: "#e9e9e9c6",
                            mb: 2,
                            py: 1,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            align="left"
                            sx={{
                                mx: 2,
                                my: 2,
                                whiteSpace: "pre-line",
                            }}
                            // variant="h6"
                            component="div"
                        >
                            {eventDetail.description}
                        </Typography>
                    </Container>
                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{ mb: 2, bgcolor: "#fc9745", boxShadow: "none" }}
                        onClick={() => {
                            handleQROpen();
                        }}
                    >
                        View QR
                    </Button>
                    <Demo>
                        <Box
                            sx={{
                                minWidth: 290,
                            }}
                        >
                            <List>
                                {eventDetail.users.map((user, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    {user.status === true ? (
                                                        <CheckCircleIcon
                                                            fontSize="large"
                                                            color="success"
                                                        />
                                                    ) : (
                                                        <PendingIcon fontSize="large" />
                                                    )}
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    </Demo>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            sx={{
                                m: 2,
                                bgcolor: "#FFFCE8",
                                color: "black",
                                boxShadow: "none",
                            }}
                            onClick={() => {
                                navigate("/admin");
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            sx={{ m: 2 }}
                            onClick={() => {
                                handleClickOpen();
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete the event"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All the event's data will be deleted from the system
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            deleteEvent();
                        }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openQR}
                onClose={handleQRClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Your Event QR Code"}
                </DialogTitle>
                <DialogContent>
                    <QRCode
                        size={256}
                        style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                        }}
                        value={`http://localhost:3000/checkIn/${event}`}
                        viewBox={`0 0 256 256`}
                    />

                    <DialogContentText align="center" sx={{ mt: 1 }}>
                        Copy Link to Clipboard
                        {/* <Box sx={{ display: "inline", ml: 1, mt: 1 }}> */}
                        <IconButton
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `http://localhost:3000/checkIn/${event}`
                                );
                            }}
                        >
                            <ContentCopyIcon sx={{ mr: 1 }} />
                        </IconButton>
                        {/* </Box> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleQRClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SingleEventAdmin;
