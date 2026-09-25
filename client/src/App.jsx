import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import AnnouncementCard from "./components/AnnouncementCard";

function App() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:5001/api/announcements")
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  return (
    <div>
      <h1>Campus Hub</h1>

      <h2>Upcoming Events</h2>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <h2>Announcements</h2>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
          />
        ))
      )}
    </div>
  );
}

export default App;