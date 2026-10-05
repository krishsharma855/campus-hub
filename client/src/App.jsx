import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import AnnouncementCard from "./components/AnnouncementCard";
import ClubCard from "./components/ClubCard";

function App() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);
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
const fetchEvents = () => {
  fetch("http://localhost:5001/api/events")
    .then((response) => response.json())
    .then((data) => {
      setEvents(data);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
};

useEffect(() => {
  fetchEvents();
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
  const filteredEvents = showUpcomingOnly
  ? events.filter((event) => new Date(event.date) >= new Date())
  : events;

  return (
    <div>
      <h1>Campus Hub</h1>

      <h2>Upcoming Events</h2>
      <button onClick={fetchEvents}>Refresh Events</button>{" "}
      <button onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}>
      {showUpcomingOnly ? "Show All Events" : "Show Upcoming Only"}
      </button>
      {filteredEvents.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        filteredEvents.map((event) => (
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