import { useState } from "react";

function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [btnTxt, setBtnTxt] = useState("Send message");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  function handleSubmit(e) {
    const ValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = false;
    e.preventDefault();

    if (!userData.name) {
      setNameError("Name is required!");
      error = true;
    } else if (userData.name.trim().length < 3) {
      setNameError("Please enter a valid name!");
      error = true;
    } else {
      setNameError("");
    }

    if (!userData.email) {
      setEmailError("Email is required!");
      error = true;
    } else if (!ValidEmail.test(userData.email)) {
      setEmailError("Please enter a valid Email!");
      error = true;
    } else {
      setEmailError("");
    }

    if (!userData.message) {
      setMessageError("Message is required!");
      error = true;
    } else if (userData.message.trim().length < 10) {
      setMessageError("Please enter a valid Message!");
      error = true;
    } else {
      setMessageError("");
    }
    if (!error) {
      setBtnTxt("Submitting...");
      setTimeout(() => {
        alert("Data submitted");

        setUserData({ name: "", email: "", message: "" });
        setBtnTxt("Send Message");
      }, 2000);
    }
  }
  return (
  
      <div className="flex  gap-2 justify-center items-center mx-auto w-9/12 border mb-6 border-gray-300 shadow-lg bg-gray-100 rounded-xl m-4 p-3">
        <div className="flex  w-5/12 items-center">
          <img src="./icons/support.svg" alt="" className=" object-contain" />
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col justify-center items-center h-fit mx-auto w-7/12 gap-5 px-4   "
        >
          <h2 className="text-5xl font-bold text-orange-500 ">Get In Touch</h2>
          <p className=" text-lg font-semibold text-center w-11/12 text-gray-800">
            If you have any questions or feedback, please feel free to contact
            us via the following form:
          </p>
          <div className="flex flex-col gap-4 w-full ">
            <div className="w-full flex flex-col  ">
              <label
                htmlFor="name"
                className="text-gray-900 font-semibold text-xl py-1 px-2"
              >
                Name:
              </label>

              <input
                type="text"
                className={`h-14 rounded-lg bg-white focus:bg-white p-4 text-gray-800 text-lg focus:text-xl focus:outline-none outline-none focus:shadow-md transition-all duration-[500ms] border-2  font-semibold ${nameError?"border-red-500":"border-gray-300"}`}
                placeholder="Your Name"
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              <div className="h-1">
                {nameError && (
                  <span className="text-red-500 text-sm pl-3 font-semibold font-Montserrat ">
                    {nameError}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <label
                htmlFor="email"
                className="text-gray-900 font-semibold text-xl py-1 px-2"
              >
                Email:
              </label>
              <input
                type="text"
                className={`h-14  rounded-lg bg-white p-4 text-gray-800 text-lg focus:text-xl focus:outline-none outline-none  focus:shadow-md transition-all duration-[500ms] border-2 font-semibold ${emailError?"border-red-500":"border-gray-300"}`}
                placeholder="Your Email"
                value={userData.email}
                name="email"
                id="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <div className="h-3">
              {emailError && (
                <span className="text-red-500 text-sm pl-3 font-semibold font-Montserrat ">{emailError}</span>
              )}
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <label
                htmlFor="meassage"
                className="text-gray-900 font-semibold text-xl py-1 px-2"
              >
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                className={`h-40  rounded-lg bg-white p-4 text-gray-800 text-lg focus:text-xl focus:outline-none outline-none  focus:shadow-md transition-all duration-[500ms] border-2  font-semibold ${messageError?"border-red-500":"border-gray-300"}`}
                placeholder="Your Email"
                value={userData.message}
                onChange={(e) =>
                  setUserData({ ...userData, message: e.target.value })
                }
              ></textarea>
              <div className="h-3  ">
              {messageError && (
                <span className="text-red-500 text-sm pl-3 font-semibold font-Montserrat ">
                  {messageError}
                </span>
              )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-600 p-2 h-12 my-2   w-[99.9%] mx-auto font-semibold text-xl text-white  hover:bg-orange-500 hover:scale-[1.01] rounded-lg  shadow-lg"
              
            >
              {" "}
              {btnTxt}
            </button>
          </div>
        </form>
      </div>
   
  );
}
export default Contact;
