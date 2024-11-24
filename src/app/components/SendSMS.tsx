"use client"
import React, { useState } from 'react';
import axios from 'axios';

function SendSMS() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const convertToInternational = (phone: string): string => {
    const normalizedPhone = phone.replace(/\D/g, ''); // ניקוי רווחים/מקפים
    if (normalizedPhone.startsWith('0')) {
      return '+972' + normalizedPhone.slice(1); // הסרת 0 והוספת +972
    }
    return normalizedPhone; // אם כבר בינלאומי
  };

  const sendSms = async () => {
    const internationalPhoneNumber = convertToInternational(phoneNumber); // המרת מספר
    setStatus('Sending SMS...');
    try {
      const response = await axios.post('/api/sendSMS', {
        to: internationalPhoneNumber,
        message: message,
      });

      if (response.status === 200) {
        setStatus('SMS sent successfully!');
      } else {
        setStatus(`Failed to send SMS: ${response.data.error}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(`Error: ${error.response?.data?.error || error.message}`);
      } else {
        setStatus(`Unexpected error: ${String(error)}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Send SMS</h1>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="05X-XXXXXXX"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={sendSms}
        disabled={!phoneNumber || !message} // מניעה שליחה כשהשדות ריקים
        className={`w-full py-2 px-4 font-bold rounded-md transition-colors ${
          !phoneNumber || !message
            ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Send SMS
      </button>
      {status && (
        <p
          className={`mt-4 text-center text-lg font-medium ${
            status.includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}

export default SendSMS;
