"use client";

import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://asset.kompas.com/crops/g6ujpuQPPgqVuezzhOAaKtZhbDM=/0x59:1920x1019/780x390/data/photo/2024/06/21/66753b5f9ba79.jpg',
    title: 'Konser Musik Terbesar 2026',
    description: 'Dapatkan tiketmu sebelum kehabisan.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    title: 'Festival Seni Budaya',
    description: 'Satu panggung, ribuan cerita.',
  },
  {
    id: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJukMSkFjSvf7ABiOkL79IOomLlBlEp2VwiO_cMQIY6W2nODorTRE5uc&s=10',
    title: 'Pesta Konser Internasional',
    description: 'Pengalaman yang tak terlupakan.',
  }
];

export default function AdCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[180px] sm:h-[490px] overflow-hidden rounded-xl group sora bg-gray-100">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 z-20 px-5 py-4 w-full bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm font-bold leading-tight">{slide.title}</p>
              <p className="text-white/60 text-xs mt-0.5">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 right-4 z-30 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-5 bg-white' : 'w-1 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-1 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-1 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
