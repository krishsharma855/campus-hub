import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div>
      <h1>Campus Hub</h1>

      <h2>Upcoming Events</h2>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default App;