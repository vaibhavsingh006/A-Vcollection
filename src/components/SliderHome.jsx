import { useState } from "react";

const SliderHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/1008206/pexels-photo-1008206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 1",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/27203469/pexels-photo-27203469/free-photo-of-a-retail-shopping-store-with-a-lot-of-clothing-and-manikins.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 2",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/19599222/pexels-photo-19599222/free-photo-of-a-clothing-store-with-many-different-clothing-items.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 3",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slider Images */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full sm:h-72 md:h-96 lg:h-[40rem] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 text-button-text p-3 md:p-5 rounded-full transition-colors duration-300 border-none outline-none focus:outline-none"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white p-3 md:p-5 rounded-full transition-colors duration-300 border-none outline-none focus:outline-none"
      >
        &#10095;
      </button>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-accent" : "bg-secondary-background"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SliderHome;
