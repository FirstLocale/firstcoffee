'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
    id: string;
    image: string;
    alt: string;
    width: number;
    height: number;
}

interface GallerySliderProps {
    galleryItems: GalleryItem[];
    containerHeight?: string;
}

export default function GallerySlider({ 
    galleryItems,
    containerHeight = '20rem'
}: GallerySliderProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (galleryItems.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % galleryItems.length
                );
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [galleryItems.length]);

    if (galleryItems.length === 0) {
        return null;
    }

    const currentItem = galleryItems[currentImageIndex];

    return (
        <div>
            <div 
                className="overflow-hidden rounded-md relative" // Position is now explicitly set to relative
                style={{ height: containerHeight }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full relative" // Adding position relative here too
                    >
                        <Image
                            src={currentItem.image}
                            alt={currentItem.alt || "Gallery image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop
                            priority={currentImageIndex === 0}
                            className="object-cover" // Moved from outer div to Image
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}