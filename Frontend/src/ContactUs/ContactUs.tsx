import { Button, Input, Textarea } from "@mantine/core";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import contact from "../../public/AboutUs/ContactUs.png";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col py-5 md:px-20 ">
      {/* Top Section - Form */}
      <div className="w-full flex flex-col md:flex-row items-center ml-10 gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6 text-center md:text-left">
            Get in Touch
          </h2>
          <form className="space-y-4">
            <Textarea
              placeholder="Enter your message"
              className="p-3 text-white rounded-lg w-full focus:outline-none focus:ring-2"
              autosize
              minRows={4}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter your name"
                className="p-3 text-white rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2"
              />
              <Input
                type="email"
                placeholder="Enter email address"
                className="p-3 text-white rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2"
              />
            </div>
            <Input
              type="text"
              placeholder="Enter Subject"
              className="p-3 text-white rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <Button
              size="md"
              autoContrast
              className="w-full mt-5 ml-3 bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
            >
              Send
            </Button>
          </form>
        </div>

        {/* Image & Contact Info in One Section */}
        <div className="w-full md:w-1/2 flex flex-col ml-36 items-start p-6 rounded-lg">
          <img
            src={contact}
            alt="Contact"
            className="max-w-[400px] rounded-lg object-cover"
          />
          <h2 className="text-3xl font-bold text-white mt-6 text-left">
            Contact Information
          </h2>

          <div className="w-full text-left mt-4">
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4 text-gray-300">
                <FaEnvelope className="text-yellow-500 text-xl" />
                <p>nihalsoni3122002@gmail.com</p>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <FaPhoneAlt className="text-yellow-500 text-xl" />
                <p>7777959765</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
