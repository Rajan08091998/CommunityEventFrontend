import { useEffect, useState } from "react";
import api from "../api";
import EventList from "../components/Events";
import '../styles/Home.css'
import Navbar from "../components/Navbar";

function Home() {

    const [eventsList, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        api.get('/api/v1/events/')
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((error) => { alert(error) });
    }

    const onDelete = (event_id) => {
        api.delete(`/api/v1/events/${event_id}/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                getEvents();
            })
            .catch((err) => {
                alert(err)
            })
    }

    const onJoin = (event_id)=>{
        api.post(`/api/v1/events/${event_id}/participants/`)
        .then((res) => res.data)
        .then((data)=> {
            console.log(data)
            getEvents();
        })
        .catch((err)=> console.error(err));

    }

    return (
        <>
            <Navbar/>

            <h1>Events</h1>
            <br />
            <a href="/events/create">
                <button type="button" className='create-button'>
                    Create 
                </button>
            </a>
            <div>
                {eventsList.map((data) => <EventList key={data.id} event={data} onDelete={onDelete} onJoin={onJoin} />)}
            </div>
        </>
    )
}

export default Home;