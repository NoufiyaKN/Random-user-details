import React, { useState } from 'react';
import './App.css'
import { Col, Row } from 'react-bootstrap';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [boxColor, setBoxColor] = useState('#FFFFFF'); // Initial color white

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h1 >Random User Details</h1>
      <button style={{height: '40px'}} onClick={fetchRandomUser}>Refresh</button>
      <div  style={{ backgroundColor: boxColor, padding: '20px',width: '50%', margin: 'auto'}}>
        {userDetails && (
          <Row>
            <p>{userDetails.image && <img style={{height: '150px'}} src={userDetails.image} alt="User" />}</p>
            <Col sm={12} md={6} lg={6}>
              <p>ID: {userDetails.id}</p>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
              <p>Maiden Name: {userDetails.maidenName}</p>
              <p>Age: {userDetails.age}</p>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <p>Height: {userDetails.height}</p>
              <p>Weight: {userDetails.weight}</p>
              <p>Birth Date: {userDetails.birthDate}</p>
              <p>Eye Color: {userDetails.eyeColor}</p>
              <p>Hair: {userDetails.hair.color} , {userDetails.hair.type}</p>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default App;