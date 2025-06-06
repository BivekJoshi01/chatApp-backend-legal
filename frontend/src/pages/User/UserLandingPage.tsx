import React from "react";
import { CiStar } from "react-icons/ci";
import LogoSVG from "../../assets/Office/GlobeImage.svg";
import { FiShoppingCart } from "react-icons/fi";

const UserLandingPage: React.FC = () => {
  return (
    <>
      <section className="relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-16 px-4 text-center overflow-hidden">
        <img
          src={LogoSVG}
          alt="Background Logo"
          className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
        />

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Get Creative with Universal Stationery Suppliers
          </h2>
          <p className="text-stone-700 text-lg mb-3">
            Shop high-quality supplies for school, art, and office work.
          </p>
          <p className="text-stone-700 text-lg mb-6">
            शिक्षा, सिर्जनशीलता र सफलताको हरेक यात्रा सुरु हुन्छ सही सामाग्रीबाट – कापी, कलमदेखि किताब, रङ र फाइलसम्म,
            हाम्रै स्टेसनरी पसलमा पाइन्छ सबै कुरा एउटै छानामुनि, उचित मूल्यमा र भरपर्दो सेवा सहित।
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Explore Products
          </button>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-semibold text-center mb-5 text-gray-800"> ✨ Shop by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[
            'Pens',
            'Notebooks',
            'Art Supplies',
            'Backpacks',
            'Desk Items',
          ].map((category) => (
            <div
              key={category}
              className="bg-white rounded-2xl shadow-md p-5 text-center group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="h-24 w-24 mx-auto flex items-center justify-center bg-stone-200 rounded-full mb-4 group-hover:bg-stone-300 transition-colors duration-300">
                {/* Replace this div with an icon/image if needed */}
                <span className="text-xl text-stone-500">🛒</span>
              </div>
              <span className="block text-base font-semibold text-gray-700 group-hover:text-black transition-colors">
                {category}
              </span>
            </div>
          ))}
        </div>
      </section>


      <section className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-10">New Arrivals</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="h-48 bg-stone-200 rounded-t-lg relative overflow-hidden">
                <img
                  src={`https://via.placeholder.com/300x200?text=Product+${item}`}
                  alt={`Product ${item}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Product Name {item}</h4>

                <div className="flex items-center text-yellow-500 text-sm mb-2">
                  {[...Array(4)].map((_, i) => (
                    <CiStar key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-gray-500 text-xs">(24 reviews)</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">A brief product description that gives users quick insight.</p>

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-lg">$9.99</span>
                  <button className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-all">
                    <FiShoppingCart size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className=" py-12 px-4">
        <div className="container mx-auto max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Track Your Goods</h3>
          <p className="mb-4 text-stone-600">Enter your order ID below to track your delivery.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Order ID"
              className="flex-1 px-4 py-2 border rounded-xl"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Track
            </button>
          </form>
          <div className="mt-6 bg-stone-100 p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Status:</h4>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              In Transit
            </span>
          </div>
        </div>
      </section>

      <section
        className="relative text-white py-16 px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
        }}
      >
        <div className=" p-10 max-w-2xl mx-auto text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 text-white/90">
            Subscribe to our newsletter and never miss new arrivals or deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-xl text-gray-900 w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </>
  );
};

export default UserLandingPage;
