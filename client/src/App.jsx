import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import AnnouncementCard from "./components/AnnouncementCard";
import ClubCard from "./components/ClubCard";

function App() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsError, setEventDetailsError] = useState("");
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

const handleViewDetails = async (eventId) => {
  setEventDetailsError("");

  try {
    const response = await fetch(
      `http://localhost:5001/api/events/${eventId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch event details");
    }

    setSelectedEvent(data);
  } catch (error) {
    setEventDetailsError(error.message);
  }
};

  const filteredEvents = showUpcomingOnly
  ? events.filter((event) => new Date(event.date) >= new Date())
  : events;

  return (
    <div>
      <h1>Campus Hub</h1>

{selectedEvent ? (
  <div>
    <button onClick={() => setSelectedEvent(null)}>
      ← Back to Events
    </button>

    <h2>{selectedEvent.title}</h2>
    <p>{selectedEvent.description}</p>
    <p>📍 {selectedEvent.location}</p>
    <p>
      📅 {new Date(selectedEvent.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
    </p>
  </div>
) : (
  <>
    <h2>Upcoming Events</h2>

    <button onClick={fetchEvents}>Refresh Events</button>{" "}
    <button onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}>
      {showUpcomingOnly ? "Show All Events" : "Show Upcoming Only"}
    </button>

    {eventDetailsError && <p>{eventDetailsError}</p>}

    {filteredEvents.length === 0 ? (
      <p>No upcoming events available.</p>
    ) : (
      filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewDetails={handleViewDetails}
        />
      ))
    )}
  </>
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