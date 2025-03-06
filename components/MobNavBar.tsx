'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Twirl as Hamburger } from 'hamburger-react'
import { FaFacebook, FaInstagram } from "react-icons/fa";

const MobNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Framer Motion variants
    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren",
            },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1,
                staggerDirection: 1,
                when: "beforeChildren",
            },
        },
    };

    const linkVariants = {
        closed: {
            opacity: 0,
            y: 20,
        },
        open: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <div className="md:hidden h-24 relative z-50">
            {/* Hamburger Button */}
            <div className="relative z-50">
                <Hamburger 
                toggled={isOpen} 
                toggle={setIsOpen} 
                color="#F97316"
                size={30}
                duration={0.3}
                />
            </div>

            {/* Mobile Navigation Menu - Using AnimatePresence to properly remove from DOM */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-[#241f21] flex flex-col pt-8 px-6 border-b-2 border-orange-500"
                    >
                        <motion.nav className="flex flex-col gap-6 font-cutive">
                            <motion.div variants={linkVariants}>
                                <Link href="/" aria-label="Home" onClick={toggleMenu}>
                                    <div className="rounded-full border-2 border-orange-500 inline-block">
                                        <Image
                                            className="rounded-full relative z-40"
                                            src="/firstlogo.webp"
                                            alt="First Logo"
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div variants={linkVariants}>
                                <Link
                                    href="/menus"
                                    aria-label="Menus"
                                    className="text-xl py-2 pl-3 block hover:underline hover:decoration-orange-500"
                                    onClick={toggleMenu}
                                >
                                    <strong className="font-normal">Menus.</strong>
                                </Link>
                            </motion.div>

                            <motion.div variants={linkVariants}>
                                <Link
                                    href="/about"
                                    aria-label="About"
                                    className="text-xl py-2 pl-3 block hover:underline hover:decoration-orange-500"
                                    onClick={toggleMenu}
                                >
                                    <strong className="font-normal">About.</strong>
                                </Link>
                            </motion.div>

                            <motion.div variants={linkVariants}>
                                <Link
                                    href="/events"
                                    aria-label="Events"
                                    className="text-xl py-2 pl-3 block hover:underline hover:decoration-orange-500"
                                    onClick={toggleMenu}
                                >
                                    <strong className="font-normal">Events.</strong>
                                </Link>
                            </motion.div>

                            <motion.div variants={linkVariants}>
                                <Link
                                    href="/contact"
                                    aria-label="Contact"
                                    className="text-xl py-2 pl-3 block hover:underline hover:decoration-orange-500"
                                    onClick={toggleMenu}
                                >
                                    <strong className="font-normal">Contact.</strong>
                                </Link>
                            </motion.div>

                            <motion.div variants={linkVariants} className="flex gap-4 pl-6">
                                <a
                                    href="https://www.instagram.com/first.coffeeshop/"
                                    aria-label="Instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://www.facebook.com/first.coffeeshop/"
                                    aria-label="Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl"
                                >
                                    <FaFacebook />
                                </a>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobNav;