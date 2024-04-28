
import React, { useState, useEffect } from 'react';
import { ref, get, push } from 'firebase/database';
import { database } from '../../firebase/firebase.js'; // Import the database object from firebase.js
import { auth } from '../../firebase/firebase.js'; // Import the auth object from firebase.js

const Schedule = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        // Get the currently authenticated user
        const user = auth.currentUser;
        if (user) {
          // Fetch the user's email from the database
          const userId = user.uid;
          const userRef = ref(database, `users/${userId}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserEmail(userData.email); // Set the user's email in the state
          }
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from the database for the selected date
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
          const eventsData = snapshot.val();
          const eventsArray = [];
          for (const eventId in eventsData) {
            if (eventsData[eventId].date === selectedDate.toISOString().slice(0, 10)) {
              eventsArray.push({ id: eventId, ...eventsData[eventId] });
            }
          }
          setEvents(eventsArray);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (selectedDate) {
      fetchEvents();
    }
  }, [selectedDate]);

  const handleAddEvent = () => {
    if (newEvent.trim() !== '') {
      const newEventObject = {
        title: newEvent,
        date: selectedDate.toISOString().slice(0, 10) // Convert date to ISO string format (YYYY-MM-DD)
      };

      // Push the new event data to the database
      const eventsRef = ref(database, 'events'); // Assuming 'events' is the path to your events collection in the database
      push(eventsRef, newEventObject)
        .then(() => {
          console.log('Event added successfully');
        })
        .catch((error) => {
          console.error('Error adding event:', error);
        });

      // Update the local state with the new event
      setEvents([...events, newEventObject]);
      setNewEvent('');
    }
  };

  const handleEventChange = (e) => {
    setNewEvent(e.target.value);
  };

  const handleShareEvent = () => {
    const subject = 'Invitation to Event';
    const body = `You are invited to ${events.length > 0 ? events[events.length - 1].title : 'an event'} on ${selectedDate.toISOString().slice(0, 10)}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className='max-w-xl p-6'>
      <div className="text-xl mb-4">{userEmail}</div>
      <div className="mb-4 ">
        <input
          type="text"
          value={newEvent}
          onChange={handleEventChange}
          placeholder="Add Event"
          className="w-full p-2 border-b border-gray-400 focus:outline-none"
        />
        <div className="pt-3">
          <button onClick={handleAddEvent} className="bg-blue-500 text-white py-2 px-6 ml-2 rounded-md">Add</button>
          <button onClick={handleShareEvent} className="bg-green-500 text-white py-2 px-6 ml-2 rounded-md">Share</button>
        </div>
      </div>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
