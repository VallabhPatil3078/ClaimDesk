import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <main className="flex-grow pt-12 sm:pt-16 pb-16 px-3 sm:px-6 lg:px-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#1e293b] mb-10 sm:mb-12">
          About Us
        </h1>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-4 sm:p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-center items-center mb-3 sm:mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-2 sm:border-4 border-[#dbeafe]"
                />
              </div>
              <h2 className="text-base sm:text-xl font-semibold text-[#1e293b]">{member.name}</h2>
              <p className="text-xs sm:text-sm text-[#475569] mb-1 sm:mb-2 text-center px-1 sm:px-2">
                {member.college}
              </p>
              <div className="flex gap-3 sm:gap-4 text-[#3b82f6] text-lg sm:text-xl mt-1 sm:mt-2">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement Box */}
        <div className="max-w-4xl mx-auto bg-white border border-[#cbd5e1] rounded-xl shadow p-4 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-3 sm:mb-4">Our Mission</h2>
          <p className="text-[#475569] text-sm sm:text-lg leading-relaxed px-2 sm:px-6">
            We created this Lost & Found portal to help people easily report and locate their missing belongings.
            Whether it’s a lost wallet or a found phone, our mission is to reconnect people with their possessions
            through a simple, intuitive, and community-powered platform. Empowering trust, one item at a time.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
