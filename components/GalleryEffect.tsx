'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
    const [active, setActive] = useState(0);
    const [isManual, setIsManual] = useState(false);

    // Auto-rotation with reset logic
    useEffect(() => {
        if (galleryItems.length === 0) return;

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % galleryItems.length);
            // Reset manual trigger
            setIsManual(false);
        }, 5000);

        return () => clearInterval(interval);
        // Reset effect when active or manual changes:
    }, [galleryItems.length, active, isManual]);

    // Handle height adjustment for responsiveness
    const [containerHeight, setContainerHeight] = useState('17rem');
    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerWidth < 640 ? '17rem' : '17rem');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handlers that reset the timer
    const onNext = useCallback(() => {
        setActive((prev) => (prev + 1) % galleryItems.length);
        // Mark as manual interaction:
        setIsManual(true);
    }, [galleryItems.length]);

    const onPrev = useCallback(() => {
        setActive((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
        // Mark as manual interaction:
        setIsManual(true);
    }, [galleryItems.length]);

    if (galleryItems.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full overflow-hidden rounded-md">
            {/* Image Slider Container */}
            <div
                className="flex transition-transform duration-500 ease-in-out rounded-md"
                style={{ transform: `translateX(-${active * 100}%)`, height: containerHeight }}
            >
                {galleryItems.map((item) => (
                    <div key={item.id} className="min-w-full relative">
                        <Image
                            src={item.image}
                            alt={item.alt || 'Gallery image'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={active === 0}
                            className="object-cover w-full h-full rounded-md"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white py-2 pl-3 pr-2 rounded-md transition-all z-10"
                aria-label="Previous image"
            >
                <ArrowBackIosIcon fontSize="small" />
            </button>
            <button
                onClick={onNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white py-2 pl-3 pr-2 rounded-md transition-all z-10"
                aria-label="Next image"
            >
                <ArrowForwardIosIcon fontSize="small" />
            </button>
        </div>
    );
}