import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import AnnouncementCard from "./components/AnnouncementCard";
import ClubCard from "./components/ClubCard";

function App() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5001/api/clubs")
    .then((response) => response.json())
    .then((data) => {
      setClubs(data);
    })
    .catch((error) => {
      console.error("Error fetching clubs:", error);
    });
}, []);
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

      {events.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        events.map((event) => (
        <EventCard key={event.id} event={event} />
  ))
)}

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

      <h2>Clubs</h2>

      {clubs.length === 0 ? (
        <p>No clubs available.</p>
      ) : (
        clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
        ))
    )}
    </div>
  );
}

export default App;