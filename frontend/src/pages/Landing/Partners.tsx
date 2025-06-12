import React from 'react';
import Sanjeev from "../../assets/Office/sanjeev.jpg";

const Partners: React.FC = () => {
  const partners = [
    { id: 1, name: 'Sanjeev Shrestha', role: 'Co-Founder', image: Sanjeev },
    { id: 2, name: 'Madan Shrestha', role: 'Operations Head', image: Sanjeev },
    { id: 3, name: 'Laxmi Krisha Maharjan', role: 'Finance Manager', image: Sanjeev },
    { id: 4, name: 'Bikash Shrestha', role: 'Technology Lead', image: Sanjeev },
  ];
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>

      <div className="flex flex-wrap justify-center md:justify-center gap-6 md:gap-20">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="w-[45%] md:w-auto flex flex-col items-center text-center"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-3"
            />
            <h3 className="text-sm md:text-base font-semibold">{partner.name}</h3>
            <p className="text-xs md:text-sm text-gray-500">{partner.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
