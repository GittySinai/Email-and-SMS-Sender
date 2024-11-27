import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Messaging App
      </h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/pages/sendSMS"
            className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            📩 Go to Send SMS
          </Link>
        </li>
        <li>
          <Link
            href="/pages/sendCall"
            className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            📞 Go to Send Call
          </Link>
        </li>
        <li>
          <Link
            href="/pages/sendEmails"
            className="px-6 py-3 text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            ✉️ Go to Send Emails
          </Link>
        </li>
      </ul>
    </div>
  );
}
