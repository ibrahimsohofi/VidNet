import { Link } from "react-router-dom";
import FacebookIcon from "./Icons/FacebookIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import ToTop from "./Icons/ToTop";

function Footer() {
  const socialMedias = [
    {
      title: "Facebook",
      url: "https://www.facebook.com",
      icon: FacebookIcon,
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com",
      icon: InstagramIcon,
    },
    {
      title: "Twitter",
      url: "https://www.x.com",
      icon: TwitterIcon,
    },
    {
      title: "Telegram",
      url: "https://www.telegram.com",
      icon: TelegramIcon,
    },
  ];
  return (
    <footer className="h-fit bg-gray-900 text-white px-4 ">
      <article className="flex justify-evenly items-start mb-4 w-full py-5">
        <section className="flex flex-col items-center text-center  gap-2  ">
          <Link to="/" className="hover:scale-110 transition-transform">
            <img className="h-14 w-14 " src="logo512.png" alt="Site Logo" />
          </Link>
          <h1 className="text-md font-bold text-white ">VidNet</h1>
          <p className="text-sm leading-relaxed text-gray-300 max-w-60">
            Download and convert YouTube videos into your desired format
            effortlessly.
          </p>
        </section>
        <section className="flex flex-col  gap-2 font-semibold  ">
          <h2 className="text-xl border-b-2 w-fit">HELP</h2>
          <Link to="/" className="text-gray-400 hover:text-white">
            FAQ
          </Link>
          <Link to="/" className="text-gray-400  hover:text-white">
            Contact
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white">
            About
          </Link>
        </section>
        <section className="flex flex-col  gap-2 font-semibold   ">
          <h2 className="text-xl border-b-2 w-fit ">USEFUL LINKS</h2>
          <Link to="/" className="text-gray-400 hover:text-white">
            Downloader
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white">
            Converter
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white">
            How to use
          </Link>
        </section>
        <section className="flex flex-col  gap-2 font-semibold  ">
          <h2 className="text-xl border-b-2 w-fit ">How It Works</h2>
          <ol className="list-decimal pl-4  text-gray-400 ">
            <li>Paste the video URL.</li>
            <li>Click "Download".</li>
            <li>Select the format you want.</li>
            <li>Save the file.</li>
          </ol>
        </section>
      </article>
      <hr className=" my-6 mx-auto  border-t border-gray-600" />
      <article className="justify-between items-start flex-wrap flex pb-4">
        <h3 className=" text-sm text-gray-400  w-2/5">
          &copy;<a href="/">VidNet </a> 2024-2025 - All rights reserved
        </h3>
        <div className="flex justify-center items-center gap-3 w-1/5">
          {socialMedias.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.url}
                className="flex text-gray-400 hover:text-white fill-gray-300 hover:scale-110 scale-100 hover:fill-white  justify-center items-center gap-1"
              >
                <item.icon className=" w-5 h-5 " />
              </Link>
            );
          })}
        </div>
        <div className="w-2/5 flex justify-end items-center ">
          <a
            href="#top"
            className="flex hover:scale-105 gap-1 items-center text-sm fill-gray-300 hover:fill-white text-gray-400 hover:text-white"
          >
            <h3> Back to Top </h3> <ToTop className={"w-3 h-3"} />
          </a>
        </div>
      </article>
    </footer>
  );
}
export default Footer;
