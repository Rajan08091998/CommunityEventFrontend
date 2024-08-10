import React from "react";
import "../styles/Event.css"

function EventList({ event, onDelete }) {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US")

    return (
        <div className="event-container" id={event.id}>
            <label htmlFor="title"><b>Title</b></label>
            <p name='title' className="event-title">{event.title}</p>

            <label htmlFor="des"><b>Description</b></label>
            <p name='des' className="event-content">{event.description}</p>

            <label htmlFor="loc"><b>Location</b></label>
            <p name='loc' className="event-location">{event.location}</p>

            <label htmlFor="date"> <b>Date</b></label>
            <p name='date' className="event-date">{formattedDate}</p>

            <button className="delete-button" onClick={() => onDelete(event.id)}>
                Delete
            </button>
            <a style={{paddingLeft: 5}}  href={`/events/edit/?id=${event.id}`}>
                <button className="update-button">
                    Update
                </button>
            </a>
        </div>
    );
}

export default EventList