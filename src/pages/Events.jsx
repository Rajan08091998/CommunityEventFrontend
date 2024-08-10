import EventCreateAndEditForm from "../components/CreateUpdateEventForm";
import Navbar from "../components/Navbar";


function Events({ purpose }) {
    return (
        <>
            <Navbar />

            <EventCreateAndEditForm method={purpose} />

        </>
    )
}


export default Events