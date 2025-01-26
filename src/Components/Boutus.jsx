import React from 'react';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://source.unsplash.com/1600x900/?technology")',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-gray-800/70"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-orange-400">VidNet!</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The fastest and most reliable way to download YouTube videos. Start your journey with us today!
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all">
              Start Now
            </button>
            <input
              type="text"
              placeholder="Search for videos..."
              className="px-6 py-3 w-full max-w-md bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-orange-500">VidNet</span>
          </motion.h2>
          <motion.p
            className="text-lg max-w-4xl mx-auto mb-12 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            VidNet is your ultimate solution for downloading YouTube videos effortlessly. Designed with simplicity and speed in mind, VidNet empowers you to save videos in the format and quality of your choice, all while ensuring a secure and seamless experience.
            <br />
            <br />
            Our mission is simple: to provide a user-friendly platform that lets you enjoy your favorite content offline, anytime, anywhere. With features like customizable downloads and lightning-fast processing, VidNet sets a new standard in convenience.
            <br />
            <br />
            Built with trust and transparency, VidNet values your privacy and delivers an ad-free, safe environment. Whether you’re saving tutorials, music videos, or entertainment for the road, VidNet has you covered.
            <br />
            <br />
            Start exploring VidNet today – where video downloading meets simplicity and speed.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
              hidden: { opacity: 0 },
            }}
          >
            {[
              {
                icon: "fas fa-bolt",
                title: "Lightning-Fast Downloads",
                description: "Get videos in seconds with our optimized platform.",
              },
              {
                icon: "fas fa-user-friends",
                title: "User-Friendly Interface",
                description: "Easily navigate and download with a simple interface.",
              },
              {
                icon: "fas fa-lock",
                title: "Secure Downloads",
                description: "Enjoy a safe experience with advanced security.",
              },
              {
                icon: "fas fa-cogs",
                title: "Customizable Formats",
                description: "Choose the format that fits your needs, from MP4 to MP3.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-transform"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <i className={`${feature.icon} text-4xl text-orange-500 mb-4`}></i>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-16 text-center relative">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Ready to download your favorite videos?
        </motion.h2>
        <motion.button
          className="relative bg-white text-orange-500 font-bold py-3 px-10 rounded-full shadow-lg overflow-hidden group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 group-hover:from-orange-600 group-hover:to-orange-500 opacity-20"></span>
          <span className="relative">Explore VidNet Now</span>
        </motion.button>
      </section>
    </div>
  );
};

export default AboutUsPage;
