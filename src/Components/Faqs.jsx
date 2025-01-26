import React, { useState } from "react";
import ChevronDown from "./Icons/ChevronDown";
import { Link } from "react-router-dom";

function Faqs() {
  const faqsData = [
    {
      question: "How does it work?",
      answer: (
        <>
          1- Copy the YouTube video link.
          <br />
          2- Paste it into the Vidly search bar. <br />
          3- Choose your desired format and resolution. <br />
          4- Click 'Download' and enjoyyour video offline!
        </>
      ),
    },
    {
      question: "How do I use the downloader tool?",
      answer:
        'Navigate to the "Downloader" page from the navigation menu. Enter the URL of the file you want to download, and click the "Download" button. The file will be saved to your device.',
    },
    {
      question: " What types of files can I convert? ",
      answer:
        'Our converter tool supports various file types, including documents, images, audio, and video files. For a detailed list, please visit the "Converter" page.',
    },
    {
      question: "Is there a limit to the file size I can upload?",
      answer:
        "Yes, the maximum file size you can upload is 100MB. If your file exceeds this limit, you may need to compress it before uploading.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        ' You can contact us by navigating to the "Contact" page and filling out the contact form. We will get back to you as soon as possible.',
    },
    {
      question: "Are my files secure on this website?",
      answer:
        " Yes, we take your privacy and security very seriously. All uploaded files are encrypted and are only accessible to you.",
    },
    {
      question: " Is this service free?",
      answer:
        'Yes, our basic services are free. However, we offer premium features that require a subscription. Check out our "About" page for more details.',
    },
    {
      question: "What is this website about?",
      answer:
        "This website provides tools for downloading and converting files, as well as information about our services and contact details.",
    },
    {
      question: "What are supported formats and resolutions?",
      answer:
        " VidNet supports a wide range of formats (MP4, MP3, etc.) and resolutions (720p, 1080p, etc.). You can choose the option that best suits your needs.",
    },
    {
      question: "How do I download a video from YouTube?",
      answer:
        "Simply copy the video URL, paste it into the input field on our website, select your preferred format and resolution, and click the download button. It's that easy!",
    },
  ];
  return (
    <article className="border-gray-300 border w-[98.4%] m-3 h-fit rounded-lg bg-white shadow-lg">
      <section className="flex justify-evenly p-6 items-center rounded-lg">
        <div className="w-7/12 flex-col flex-wrap flex gap-4 text-md pr-14">
          <h1 className="text-3xl w-fit font-Montserrat border-b font-bold">
            How Can We Assist You?
          </h1>

          <p className="  ">
            Ever struggled to save your favorite YouTube videos for offline
            viewing?
            <a href="/" className="text-blue-800 underline">
              Vidly
            </a>{" "}
            is here to help! Whether it's a tutorial, a music video, or anything
            else, our platform offers a fast, secure, and user-friendly way to
            download videos in just a few clicks.
          </p>
          <p>
            Once you're ready, you can choose the video format and resolution
            that works best for you. Vidly works seamlessly across all devices
            for a smooth experience.
          </p>
          <p>
            To get started, simply watch the video below for a quick
            walkthrough. It will show you exactly how to begin downloading your
            videos.
          </p>
          <p>
            And if you need any further assistance, our FAQ section has all the
            answers, and we're always here to help
          </p>
        </div>

        <div className="w-2/5 flex p-2 pt-6 justify-end items-center">
          <video
            src="./videos/Ecommerce.mkv"
            className="rounded-lg h-auto w-full"
            controls
          ></video>
        </div>
      </section>
      <section className="flex justify-start  flex-col  px-8 py-2  gap-5 rounded-lg w-full ">
        <h1 className="text-3xl w-fit font-Montserrat border-b font-bold">
          Frequently Asked Questions
        </h1>
        <div className="gap-2 grid-cols-1 flex-col flex justify-center items-center">
          {faqsData.map((item, index) => {
            return <QuestionCard key={index} {...item} />;
          })}
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center ">
        <h5 className="p-3 text-xl text-gray-800 font-semibold">Didn't find what you are looking for?</h5>
        <button className="bg-orange-500 p-2 w-36 text-white text-xl rounded-lg  shadow-lg mb-3  hover:scale-[1.02]" ><Link to="/contact">Contact us</Link></button>
      </section>
    </article>
  );
}
function QuestionCard({ question, answer }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1 w-full ">
        <h2 className=" flex-wrap hover:scale-[1.01]  h-fit bg-gray-100 hover:bg-gray-200  justify-between items-center p-4  text-xl font-semibold rounded-lg w-full flex">
          {question}
          <button
            className="focus:outline-none"
            onClick={() => {
              setIsVisible(isVisible ? false : true);
            }}
          >
            <ChevronDown
              className={`w-4 h-4 duration-500 transition-transform hover:scale-[1.3] hover:duration-300 ${
                isVisible ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        </h2>
        
        <div  className={`transition-max-height duration-[500ms] ease-in-out  ${
            isVisible ? "max-h-40" : "max-h-0"
          }`}>
        <p
          className={`px-4 bg-gray-50 transition-max-height rounded-lg duration-[550ms] mt-2 ${
            isVisible ? "opacity-100  py-4" : " overflow-hidden opacity-0 py-0"
          }`}
        >
          {answer}
        </p>
        </div>
      </div>
    </>
  );
}


export default Faqs;
