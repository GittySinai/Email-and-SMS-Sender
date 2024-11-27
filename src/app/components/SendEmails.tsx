"use client"
import React, { useState } from 'react';
import axios from 'axios';

function SendEmails() {
  const [users] = useState([
    { username: 'gitty sinai', email: 'g0527116807@gmail.com' },
    { username: 'noa katz', email: 'noakatz465@gmail.com' },
  ]);

  const [status, setStatus] = useState('');

  const sendEmails = async () => {
    setStatus('Sending emails...');
    try {
      const response = await axios.post('/api/sendEmail', 
        users.map((user) => ({
          to: user.email,
          subject: `Hello, ${user.username}!`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <h1 style="color: #4CAF50;">Hello, ${user.username}!</h1>
              <p>We are excited to connect with you. Here are some details:</p>
              <ul>
                <li><strong>Username:</strong> ${user.username}</li>
                <li><strong>Email:</strong> ${user.email}</li>
              </ul>
              <p style="margin-top: 20px;">Best regards,</p>
              <p style="font-weight: bold; color: #4CAF50;">Your Team</p>
            </div>
          `,
        }))
      );
  
      if (response.status === 200) {
        setStatus('Emails sent successfully!');
      } else {
        setStatus(`Error sending emails: ${response.data.error}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(`Error: ${error.response ? error.response.data.error : error.message}`);
      } else {
        setStatus(`Unexpected Error: ${String(error)}`);
      }
    }
  };
  
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Email Sender</h1>
      <ul className="space-y-2 mb-6">
        {users.map((user, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
          >
            <span className="font-medium">{user.username}</span>
            <span className="text-gray-600">{user.email}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={sendEmails}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
      >
        Send Emails
      </button>
      {status && (
        <p className="mt-4 text-center text-lg text-blue-600 font-medium">{status}</p>
      )}
    </div>
  );
}

export default SendEmails;
