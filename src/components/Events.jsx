import React, { useState, useEffect } from "react";
import "../styles/Event.css";
import getUser from "../utils";

function EventList({ event, onDelete, onJoin }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []); // Empty dependency array means this effect runs once on mount

    const formattedDate = new Date(event.start_time).toLocaleDateString("en-US");
    const formattedEndDate = new Date(event.end_time).toLocaleDateString("en-US");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data.</p>;
    console.log(event,user)
    return (
        <div className="event-container" id={event.id}>
            <h1 className="event-title">{event.title}</h1>
            <label htmlFor="organizer"><b>Organizer</b></label>
            <p name='organizer' className="event-organizer">{event.organizer}</p>

            <label htmlFor="des"><b>Description</b></label>
            <p name='des' className="event-content">{event.description}</p>

            <label htmlFor="loc"><b>Location</b></label>
            <p name='loc' className="event-location">{event.location}</p>

            <label htmlFor="date"><b>Start Date</b></label>
            <p name='date' className="event-date">{formattedDate}</p>

            <label htmlFor="date"><b>End Date</b></label>
            <p name='date' className="event-date">{formattedEndDate}</p>

            <div className="participants-section">
                <h3>Participants</h3>
                <ul className="participants-list">
                    {event.participants.length > 0 ? (
                        event.participants.map((participant, index) => (
                            <li key={index} className="participant-item">
                                {participant}
                            </li>
                        ))
                    ) : (
                        <li>No participants yet.</li>
                    )}
                </ul>
            </div>

            {user.username=== event.organizer ? (
                <>
                    <button className="delete-button" onClick={() => onDelete(event.id)}>
                        Delete
                    </button>
                    <a style={{ paddingLeft: 5 }} href={`/events/edit/?id=${event.id}`}>
                        <button className="update-button">
                            Update
                        </button>
                    </a>
                </>
            ) : (
                !event.participants.includes(user.username) && (
                    <button className="join-button" onClick={() => onJoin(event.id)}>
                        Volunteer
                    </button>
                )
            )}
        </div>
    );
}

export default EventList;
