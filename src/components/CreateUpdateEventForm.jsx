import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function EventCreateAndEditForm({ method }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const event_id = urlParams.get('id');

    useEffect(() => {
        if (method === "update" && event_id) {
            api.get(`/api/v1/events/${event_id}/`)
                .then((res) => res.data)
                .then((data) => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setStartDate(data.start_time.slice(0, 16)); 
                    setEndDate(data.end_time.slice(0, 16)); // Reformat the date to 'YYYY-MM-DDTHH:MM'
                    setLocation(data.location);
                })
                .catch(error => console.error('Error fetching event:', error));
        }
    }, [event_id, method]);

    const createEvent = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resps;

            if (method === "create") {
                resps = await api.post('/api/v1/events/', { title, description, start_time: startDate,end_time:endDate, location });
            } else if (method === "update" && event_id) {
                resps = await api.patch(`/api/v1/events/${event_id}/`, { title, description, start_time: startDate,end_time:endDate, location });
            }

            console.log(resps);
            navigate('/');
        } catch (err) {
            alert("Failed to create/update event");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={createEvent}>
                {method==='create'? (

                    <h2>Create Event</h2>
                ): (
                    <h2>Update Event</h2>

                )}
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start Date</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                {loading ? (
                    <button className="button" type="submit" disabled>
                        {method === 'update' ? "Updating..." : "Creating..."}
                    </button>
                ) : (
                    <button className="button" type="submit">
                        {method === 'update' ? "Update" : "Create"}
                    </button>
                )}
            </form>
        </>
    );
}

export default EventCreateAndEditForm;
