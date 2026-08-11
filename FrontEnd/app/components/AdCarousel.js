"use client";

import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://asset.kompas.com/crops/g6ujpuQPPgqVuezzhOAaKtZhbDM=/0x59:1920x1019/780x390/data/photo/2024/06/21/66753b5f9ba79.jpg',
    title: 'Konser Musik Terbesar 2026',
    description: 'Dapatkan tiketmu sekarang sebelum kehabisan! Penampilan eksklusif dari artis papan atas.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    title: 'Festival Seni Budaya',
    description: 'Jelajahi keindahan budaya lokal dan internasional dalam satu panggung megah.',
  },
  {
    id: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJukMSkFjSvf7ABiOkL79IOomLlBlEp2VwiO_cMQIY6W2nODorTRE5uc&s=10',
    title: 'Pesta Konser Internasional',
    description: 'Rayakan Konser Internasional terbesar dengan pengalaman visual yang tak terlupakan bersama orang terkasih.',
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
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group sora">
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
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {slide.title}
              </h2>
              <p className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-2xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
