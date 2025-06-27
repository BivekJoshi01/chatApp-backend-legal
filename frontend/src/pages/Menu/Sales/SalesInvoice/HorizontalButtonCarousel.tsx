import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "../../../../components/Button/button";
import "./Style.css"
const HorizontalButtonCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-primary-10 p-2">
      {/* Left Arrow */}
      {isOverflowing && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background h-full"
        >
          <FiChevronLeft size={20} />
        </button>
      )}

      {/* Scrollable Buttons */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-8 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {Array.from({ length: 110 }).map((_, i) => (
          <Button key={i} className="snap-start">
            Book {i + 1}
          </Button>
        ))}
      </div>


      {/* Right Arrow */}
      {isOverflowing && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2  z-10 bg-background h-full"
        >
          <FiChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default HorizontalButtonCarousel;
