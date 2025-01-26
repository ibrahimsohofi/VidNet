
function HowToUse() {
  const STEPS = [
    {
      step_title: "Step 01: Copy the Video Link",

      step_description: (
        <>
          Visit the video on{" "}
          <a className="text-blue-600 underline" href="https://www.youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>{" "}
          you want to download. Copy the link from the address bar or the
          'Share' option"
        </>
      ),
      step_img: "img.jpg",
      img_alt: "Copying the video URL from YouTube",
    },
    {
      step_title: "Step 02: Paste the Link",

      step_description:
        "Open our website and paste the copied link into the input field",
      step_img: "img.jpg",

      img_alt: "Pasting the copied link in the input field",
    },
    {
      step_title: " Step 03: Click Download",

      step_description:
        "Hit the 'Download' button, and we'll handle the rest. Your video will start downloading in seconds!",
      step_img: "img.jpg",
      img_alt: "Clicking the download button to start downloading",
    },
  ];
  return (
    <section className="  flex flex-col p-2 border-gray-300 border items-center mx-3  m-2 rounded-lg justify-between bg-white">
      <h1
        className="h-16 flex justify-center items-center text-gray-900 border-b-2 border-b-gray-200 w-fit
       bg-gray-100 rounded-lg shadow-lg p-2 px-10  text-3xl font-bold m-3"
      >
        How to Download Videos in 3 Easy Steps
      </h1>
      <div className="w-full flex justify-between ">
        {STEPS.map((info, index) => {
          return (
            <Card key={index} {...info}>
              <p className="text-center font-semibold text-gray-900 text-sm py-2 px-1 w-[99%] h-14">
                {info.step_description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
function Card({ step_title, step_description, step_img, img_alt }) {
  return (
    <article className="w-[32%] flex flex-col m-2  items-center  border rounded-lg p-2 hover:bg-gray-100 hover:scale-105  transition-all  focus-within:scale-105 hover:shadow-md ">
      <h3 className="bg-gray-200 border border-gray-300 w-full text-center py-3 rounded-lg text-base font-bold">
        {step_title}
      </h3>
      <p className="text-center font-semibold text-gray-900 text-sm py-2 px-1 w-[99%] h-14">
        {step_description}
      </p>

      <img
        className="rounded-md shadow-md shadow-gray-300 object-cover flex justify-self-end align-bottom"
        src={`./images/${step_img}`}
        alt={img_alt}
      />
    </article>
  );
}

export default HowToUse;
