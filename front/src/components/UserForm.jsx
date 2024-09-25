
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // State to check if user is registered

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { email });
      setMessage(response.data.message);
      setAddresses(response.data.addresses); // Set addresses returned from the registration response

      if (response.data.addresses.length === 0) {
        // If there are no existing addresses, allow the user to enter their name and address
        setIsRegistered(true);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error registering user');
    }
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/submit-details', { email, name, address });
      setAddresses(response.data.addresses); // Set addresses returned after submitting details
      setMessage(response.data.message);
      setName(''); // Clear name input after submission
      setAddress(''); // Clear address input after submission
    } catch (error) {
      console.error(error);
      setMessage('Error submitting details');
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={registerUser}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>} {/* Display registration message */}

      {isRegistered && ( // Show this only if the user has been registered
        <>
          <h2>Submit Your Name and Address</h2>
          <form onSubmit={submitDetails}>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}

      {addresses.length > 0 && ( // Display saved addresses if available
        <>
          <h2>Your Saved Addresses</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((addr) => (
                <tr key={addr._id}>
                  <td>{addr.name}</td>
                  <td>{addr.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserForm;
