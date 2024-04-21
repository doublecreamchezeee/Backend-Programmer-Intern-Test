import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_PUBLIC_URL}`
      // axios.get(`http://localhost:9000`
      , {
        headers: {
          authorization: process.env.REACT_APP_API_KEY
        }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    axios.get(`${process.env.REACT_APP_API_PUBLIC_URL}?name=${searchValue}`
      // axios.get(`http://localhost:9000?name=${searchValue}`
      , {
        headers: {
          authorization: process.env.REACT_APP_API_KEY
        }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDataChange = (e, userId, field) => {
    const newValue = e.target.value;
    setUserData(prevUserData =>
      prevUserData.map(user => {
        if (user._id === userId) {
          return { ...user, [field]: newValue };
        }
        return user;
      })
    );
  };

  const handleUpdateAll = async () => {
    try {
      console.log(userData)
      const response =
        axios.post(`${process.env.REACT_APP_API_PUBLIC_URL}/update`
        // axios.post('http://localhost:9000/update'
          , userData
          , {
            headers: {
              authorization: process.env.REACT_APP_API_KEY
            }
          })
          .then(response => {
            console.log('Update successful:', response.data);
          })
          .catch(error => {
            console.error('Error updating data:', error);
          });
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Data</h1>
      <input
        type="text"
        className='textInput'
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by name..."
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Username</th>
            <th>Email</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user._id}>
              {/* <td>{user._id}</td> */}
              <td><input type="text" className="textInput" value={user.username} onChange={(e) => handleDataChange(e, user._id, 'username')} /></td>
              <td><input type="text" className="textInput" value={user.email} onChange={(e) => handleDataChange(e, user._id, 'email')} /></td>
              <td><input type="text" className="textInput" value={user.birthdate} onChange={(e) => handleDataChange(e, user._id, 'birthdate')} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdateAll}>Update All</button>
    </div>
  );
}

export default App;
