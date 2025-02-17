import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-evenly bottom-0 left-0 sticky bg-zinc-800">
      <Image
        className="rounded-full"
        src="/firstlogo.png"
        alt="First Logo"
        height={100}
        width={100}
      />
      <section className="flex">
        <FaPhone />
        <p> Call Us</p>
      </section>
      <section className="flex">
        <TfiEmail />
        <p> Email Us</p>
      </section>
      <section>
        <a
          href="https://www.facebook.com/first.coffeeshop/"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/first.coffeeshop/"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </section>
      <section>
        <p>
          Clopton Park | Open 7 Days | Mon-Sat 9am-3.30pm, Sun 10am-2pm | IP13
          6QT | Private Hire Options
        </p>
        <p>Fully Licensed</p>
      </section>
    </footer>
  );
};
export default Footer;
