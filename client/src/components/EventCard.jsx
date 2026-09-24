function EventCard({ event }) {
    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>📅 {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</p>
        </div>
    );
}

export default EventCard;