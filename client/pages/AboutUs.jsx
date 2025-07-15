import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import shardoolPhoto from '../assets/shardool_photo.jpg';
import vallabhPhoto from '../assets/vallabh_patil.jpg';
import tejasPhoto from '../assets/tejas_photo.jpg';

const members = [
  {
    name: 'Aditya Gaikwad',
    college: "AISSMS (All India Shri Shivaji Memorial Society's) College of Engineering",
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
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

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-24 px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1e293b] mb-12">About Us</h1>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#dbeafe]"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#1e293b]">{member.name}</h2>
              <p className="text-sm text-[#475569] mb-2 text-center px-2">{member.college}</p>
              <div className="flex gap-4 text-[#3b82f6] text-xl mt-2">
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
        <div className="max-w-4xl mx-auto bg-white border border-[#cbd5e1] rounded-xl shadow p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Our Mission</h2>
          <p className="text-[#475569] text-base sm:text-lg leading-relaxed px-2 sm:px-6">
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
