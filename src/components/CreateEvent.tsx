import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()
    const [users, setUsers] = useState([{ name: "", status: false }]);
    const [remove, setRemove] = useState(false);
    const [user, setUser] = useState("");
    async function handleCreateEvent() {
        const res = await axios.post(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/events`,
            {
                eventName: eventName,
                eventDate: eventDate,
                description: description,
                users: users,
            }
        );
        console.log(res);
        navigate(`/admin/event/${eventName}`)
    }
    function handleAddPeople(event: any) {
        event.preventDefault();
        let userList = users;
        let userObject = { name: user, status: false };
        userList.push(userObject);
        setUsers(userList);
        setUser("");
    }

    function handleRemovePeople() {
        let userList = users;
        console.log(userList);
        let item = userList.pop();
        console.log(item);
        console.log(userList);
        setUsers(userList);
    }

    useEffect(() => {
        setUsers([]);
    }, []);

    return (
        <>
            <Container
                component="main"
                sx={{
                    bgcolor: "white",
                    paddingTop: 1,
                    paddingBottom: 5,
                    borderTopRightRadius: 100,
                    borderTopLeftRadius: 5,
                    pb: 5,
                    mt: 5,
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Create Event
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="eventName"
                            label="Event Name"
                            name="eventName"
                            value={eventName}
                            onChange={(e) => {
                                setEventName(e.target.value);
                            }}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            name="eventDescription"
                            label="Event Description"
                            type="eventDescription"
                            id="eventDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            id="date"
                            label="Event Date"
                            type="date"
                            sx={{ width: "100%", mt: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={eventDate}
                            onChange={(e) => {
                                setEventDate(e.target.value);
                            }}
                        />
                        <form onSubmit={handleAddPeople}>
                            <div>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="participants"
                                    label="Participants"
                                    type="eventDescription"
                                    id="participants"
                                    value={user}
                                    onChange={(e) => {
                                        setUser(e.target.value);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                >
                                    Add Participants
                                </Button>
                            </div>
                        </form>
                        <h4>Current Participants:</h4>
                        {users.length === 0 ? (
                            <Typography align="center" component="div">
                                - none -
                            </Typography>
                        ) : (
                            ""
                        )}
                        {users.map((user, index) => {
                            return (
                                <Typography
                                    key={index}
                                    align="center"
                                    component="div"
                                >
                                    {user.name}
                                </Typography>
                            );
                        })}
                        {/* <Button
                            type="button"
                            fullWidth
                            color="error"
                            variant="contained"
                            sx={{ mb: 2 }}
                            onClick={() => handleRemovePeople()}
                        >
                            Remove Participants
                        </Button> */}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={handleCreateEvent}
                            sx={{ mt: 3, mb: 5 }}
                            disabled={
                                eventDate == "" ||
                                eventName == "" ||
                                description == "" ||
                                users.length == 0
                            }
                        >
                            Create Event
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default CreateEvent;
