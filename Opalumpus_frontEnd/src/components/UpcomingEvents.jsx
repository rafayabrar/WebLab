import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpcomingEvents.css";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch upcoming events from the server
    axios.get("http://localhost:4000/api/trips")
      .then(response => {
        console.log("Fetched events:", response.data.trips); // Debugging line
        setEvents(response.data.trips);
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="upcoming-events-container">
      <h2>Upcoming Trips</h2>
      {events.length === 0 ? (
        <p>No upcoming trips available.</p>
      ) : (
        events.map(event => (
          <div key={event._id} className="event-item">
            <h3>{event.destination}</h3>
            <p>Duration: {event.duration}</p>
            <p>Price: {event.price}</p>
            <p>Description: {event.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingEvents;