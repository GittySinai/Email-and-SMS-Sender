import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Messaging App</h1>
      <ul>
        <li>
          <Link href="/pages/sendSMS">Go to Send SMS</Link>
        </li>
        <li>
        <Link href="/pages/sendCall">Go to Send Call"</Link>
        </li>
        <li>
          <Link href="/pages/sendEmails">Go to Send Emails"</Link>
        </li>
      </ul>
    </div>
  );
}
