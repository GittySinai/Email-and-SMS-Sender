import Image from "next/image";
import SendEmails from "./components/SendEmails";
import SendSMS from "./components/SendSMS";

export default function Home() {
  return (
<div>
{/* <SendEmails></SendEmails> */}
<SendSMS></SendSMS>
</div>
  );
}
