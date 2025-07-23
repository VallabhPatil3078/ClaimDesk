import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import shardoolPhoto from "../assets/shardool_photo.jpg";
import vallabhPhoto from "../assets/vallabh_patil.jpg";
import tejasPhoto from "../assets/tejas_photo.jpg";
import adityaPhoto from "../assets/aditya_photo.jpeg";

const members = [
  {
    name: "Aditya Gaikwad",
    college:
      "AISSMS (All India Shri Shivaji Memorial Society's) College of Engineering",
    image: adityaPhoto,
    linkedin: "https://www.linkedin.com/in/aditya-gaikwad-940470258/",
    github: "https://github.com/adityagikw",
  },
  {
    name: "Shardool Patil",
    college: "Pune Institute of Computer Technology",
    image: shardoolPhoto,
    linkedin:
      "https://www.linkedin.com/in/shardool-babasaheb-patil-6646b4294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/shardool-patil",
  },
  {
    name: "Vallabh Patil",
    college: "Pune Institute of Computer Technology",
    image: vallabhPhoto,
    linkedin: "https://www.linkedin.com/in/vallabh-patil-488009264/",
    github: "https://github.com/VallabhPatil3078",
  },
  {
    name: "Tejas Sawant",
    college: "Pune Institute of Computer Technology",
    image: tejasPhoto,
    linkedin: "http://www.linkedin.com/in/tejassawant06",
    github: "https://github.com/TejasSawant06/",
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
          We’re a passionate group of engineers committed to reconnecting people
          with their lost belongings through technology, trust, and teamwork.
        </p>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {members.map((member, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-blue-200 shadow-md mb-4 group-hover:border-blue-400 transition"
                />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-700">
                  {member.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 px-2">
                  {member.college}
                </p>
                <div className="flex gap-4 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600 transition"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-transparent rounded-2xl pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
            We built this Lost & Found portal to help people quickly report and
            locate missing items. Whether it’s a lost wallet or a found phone,
            our mission is to create a simple, community-powered solution that
            fosters trust and brings belongings back to their rightful owners.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
