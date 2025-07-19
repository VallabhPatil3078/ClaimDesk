import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

import shardoolPhoto from '../assets/shardool_photo.jpg';
import vallabhPhoto from '../assets/vallabh_patil.jpg';
import tejasPhoto from '../assets/tejas_photo.jpg';
import adityaPhoto from '../assets/aditya_photo.jpeg';

const members = [
  {
    name: 'Aditya Gaikwad',
    college: "AISSMS (All India Shri Shivaji Memorial Society's) College of Engineering",
    image: adityaPhoto,
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Shardool Patil',
    college: 'Pune Institute of Computer Technology',
    image: shardoolPhoto,
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Vallabh Patil',
    college: 'Pune Institute of Computer Technology',
    image: vallabhPhoto,
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Tejas Sawant',
    college: 'Pune Institute of Computer Technology',
    image: tejasPhoto,
    linkedin: '#',
    github: '#',
  },
];

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      <main className="flex-grow pt-12 sm:pt-16 pb-16 px-4 sm:px-8 lg:px-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-800 mb-6 sm:mb-10 drop-shadow-md">
          Meet Our Team
        </h1>
        <p className="text-center text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
          We are a passionate group of engineers dedicated to building tools that make it easier for people to reconnect with their lost belongings.
        </p>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-blue-200 shadow-md mb-4"
              />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 px-2">{member.college}</p>
              <div className="flex gap-4 text-xl">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                  <FaLinkedin />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition">
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement Box */}
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
            We created this Lost & Found portal to help people easily report and locate their missing belongings.
            Whether it’s a lost wallet or a found phone, our mission is to reconnect people with their possessions
            through a simple, intuitive, and community-powered platform — empowering trust, one item at a time.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
