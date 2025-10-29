import React from 'react';

const About = () => {
  return (
    <div
      className="p-6 max-w-5xl mx-auto rounded-xl shadow-lg bg-pink-50 bg-cover bg-center"
      style={{
       // backgroundImage: "url('/about bg 2.jpg')",
       // backgroundBlendMode: "overlay", // To softly blend the image with the pink color
      }}
    >
      <h1 className="text-4xl font-extrabold mb-4 text-pink-700 flex items-center gap-2">
        💃 About Us
      </h1>

      <p className="text-lg leading-relaxed text-gray-800 bg-white bg-opacity-70 p-2 rounded-md">
        Welcome to <span className="font-semibold text-pink-600">Vaibhavi Collection’s Women’s Clothing Store</span> – where fashion meets tradition and comfort!
        We're your one-stop destination in Shirpur for stunning styles, tailor-made outfits, and trendsetting fashion picks.
      </p>

      <p className="mt-4 text-lg text-gray-700 bg-white bg-opacity-70 p-2 rounded-md">
        ✨ Our goal is simple: make every woman feel confident, comfortable, and absolutely beautiful. From ready-to-wear to custom-stitched elegance,
        we blend traditional tailoring with modern styles for every occasion.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-2 text-pink-600">👗 What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 pl-2 space-y-1 bg-white bg-opacity-70 p-2 rounded-md">
        <li>🎀 Designer ethnic and western wear</li>
        <li>🧵 Custom tailoring and fittings</li>
        <li>🎉 Festive & seasonal collections</li>
        <li>🛍️ Comfortable daily and work wear</li>
        <li>🚚 Online ordering and fast delivery</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-2 text-pink-600">💡 Why Shop With Us?</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 pl-2 space-y-1 bg-white bg-opacity-70 p-2 rounded-md">
        <li>💖 Personal attention and styling</li>
        <li>💸 Affordable prices, great value</li>
        <li>🔒 Safe and secure online shopping</li>
        <li>🧥 Premium fabrics and fittings</li>
        <li>📦 Reliable delivery with care</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-2 text-pink-600">📍 Visit or Contact Us</h2>
      <p className="text-lg text-gray-700 bg-white bg-opacity-70 p-2 rounded-md">
        Come see us in Shirpur for a warm shopping experience or reach out online. We’re here to help you shine in every outfit! 🌟
      </p>

      <p className="mt-6 text-lg font-semibold text-pink-700 bg-white bg-opacity-70 p-2 rounded-md">
        Thank you for supporting <span className="underline">Vaibhavi collections</span> – Where tradition meets trend. 💃✨
      </p>
    </div>
  );
};

export default About;
