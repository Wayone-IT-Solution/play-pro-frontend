"use client";
import React, { useState } from "react";
import { Phone, Mail, Headphones, MessageCircle } from "lucide-react";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
  };

  return (
    <div className="min-h-screen mt-20 bg-[#013F5E] text-white">
      {/* Hero */}
      <section className="text-center py-16 px-6">
        <div className="p-4 bg-white/10 rounded-full w-fit mx-auto backdrop-blur-sm mb-6">
          <MessageCircle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
          We’re here to help with your football field booking needs.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="bg-white text-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Phone className="w-8 h-8 text-white" />,
              title: "Phone Support",
              desc: "Speak directly with our support team",
              details: ["+91 98765 43210", "Mon-Fri: 9 AM - 8 PM IST", "Sat-Sun: 10 AM - 6 PM IST"],
            },
            {
              icon: <Mail className="w-8 h-8 text-white" />,
              title: "Email Support",
              desc: "Send us a detailed message",
              details: ["support@playpro.com", "Response within 2-4 hours", "24/7 email monitoring"],
            },
            {
              icon: <Headphones className="w-8 h-8 text-white" />,
              title: "Live Chat",
              desc: "Instant help through our app",
              details: ["In-App Chat", "Available 24/7", "Average response: 2 minutes"],
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all bg-gradient-to-br from-gray-50 to-gray-100 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 p-4 rounded-full" style={{ backgroundColor: "#013F5E" }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              <div className="space-y-1">
                {item.details.map((line, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-[#013F5E] text-white py-3 rounded-lg font-semibold hover:bg-[#02577A] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
