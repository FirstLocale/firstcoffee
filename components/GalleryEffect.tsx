'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryItem {
    id: string;
    image: string;
    alt: string;
    width: number;
    height: number;
}

interface GallerySliderProps {
    galleryItems: GalleryItem[];
}

export default function GallerySlider({ galleryItems }: GallerySliderProps) {
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

    return (
        <div className="py-16">
        <div className="overflow-hidden rounded-md">
            <Image
            className="w-full h-auto object-cover transition-all duration-1000 ease-in-out"
            src={galleryItems[currentImageIndex].image}
            alt={galleryItems[currentImageIndex].alt || "Gallery image"}
            width={galleryItems[currentImageIndex].width || 800}
            height={galleryItems[currentImageIndex].height || 600}
            priority={currentImageIndex === 0}
            />
        </div>
        </div>
    );
}