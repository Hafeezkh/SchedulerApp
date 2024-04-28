import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebase.js'; // Import the database object from firebase.js
import { auth } from '../../firebase/firebase.js'; // Import the auth object from firebase.js

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the currently authenticated user
        const user = auth.currentUser;
        if (user) {
          // Fetch the user's first name from the database
          const userId = user.uid;
          const userRef = ref(database, `users/${userId}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.firstName); // Set the user's first name in the state
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();

    // Update current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    // Fetch user name and set current date/time once after 1 second
    setTimeout(() => {
      fetchUserName();
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container flex-col flex items-center mb-8 p-10 ">
      <div className="text-right mb-4">
        <Link to="/" onClick={handleLogout} className="text-blue-500">Logout</Link>
      </div>
      <h1 className="text-5xl mb-4">Welcome, <span className="text-blue-500">{userName}</span></h1>
      <p className="text-3xl mb-4">{currentDateTime}</p>
      <div className="dashboard-links p-3">
        {/* Box container for the calendar icon and text */}
        <div className="calendar-box bg-blue-200 rounded-lg p-20 flex items-center justify-center">
          <Link to="/calendar" className="text-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon text-9xl" style={{ color: 'blue' }} />
            <p className="text-2xl mt-4">Scheduler</p>
          </Link>
        </div>
        {/* Add more buttons for other features as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
