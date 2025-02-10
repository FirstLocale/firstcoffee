import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="flex gap-3">
      <Link href="/" aria-label="Home">
        <Image
          className="rounded-full"
          src="/firstlogo.png"
          alt="First Logo"
          height={100}
          width={100}
        />
      </Link>
      <a
        href="https://www.instagram.com/first.coffeeshop/"
        aria-label="Instagram"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.facebook.com/first.coffeeshop/"
        aria-label="Facebook"
      >
        <FaInstagram />
      </a>
      <Link href="/menus" aria-label="Menus">
        <p>Menus</p>
      </Link>
      <Link href="/about" aria-label="About">
        <p>About</p>
      </Link>
      <Link href="/events" aria-label="Events">
        <p>Events</p>
      </Link>
      <Link href="/contact" aria-label="Contact">
        <p>Contact</p>
      </Link>
    </header>
  );
};

export default Header;
