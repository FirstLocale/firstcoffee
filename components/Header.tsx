import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import MobNav from "./MobNavBar";

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-20">
        {/* header bottom border */}
        <div className="w-full py-11 bg-[#241f21] absolute top-0 border-b-2 border-orange-500"></div>

        <div className="w-full max-w-screen-lg mx-auto flex items-center justify-between px-4 sm:px-6 py-4 relative">
            {/* First logo & containers: */}
            <div className="flex relative pt-3 w-40 gap-2">
                <div className="relative inline-block z-40">
                <Link href="/" aria-label="Home">
                <div className="absolute inset-0 rounded-full border-2 border-orange-500 z-30"></div>
                    <Image
                    className="rounded-full relative z-40"
                    src="/firstlogo.webp"
                    alt="First Logo"
                    height={100}
                    width={100}
                    />
                </Link>
                
                </div>
            

            <div className="flex gap-1 items-center flex-col">
                <a
                href="https://www.instagram.com/first.coffeeshop/"
                aria-label="Instagram"
                target="_blank"
                rel="noopen noreferrer"
                >
                <FaInstagram style={{ fontSize: '1.5rem' }} />
                </a>
                <a
                href="https://www.facebook.com/first.coffeeshop/"
                aria-label="Facebook"
                target="_blank"
                rel="noopen noreferrer"
                >
                <FaFacebook style={{ fontSize: '1.5rem' }} />
                </a>
            </div>
            </div>

            {/* Mobile burgermenu */}
            <MobNav />
            
            {/* Nav links: */}
            <div className="bg-[#241f21] font-cutive w-[50%] gap-6 top-14 right-0 hidden md:flex absolute z-30">
                <Link href="/menus" aria-label="Menus" className="hover:underline hover:decoration-orange-500">
                <strong className="font-normal">Menus.</strong>
                </Link>
                
                <Link href="/about" aria-label="About" className="hover:underline hover:decoration-orange-500">
                <strong className="font-normal">About.</strong>
                </Link>

                <Link href="/events" aria-label="Events" className="hover:underline hover:decoration-orange-500">
                <strong className="font-normal">Events.</strong>
                </Link>

                <Link href="/contact" aria-label="Contact" className="hover:underline hover:decoration-orange-500">
                <strong className="font-normal">Contact.</strong>
                </Link>
            </div>
        </div>
        </header>
    );
};

export default Header;