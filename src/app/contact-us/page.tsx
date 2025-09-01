"use client";
import { Post } from "@/utils/axios";
import React, { useState } from "react";
import { Phone, Mail, Headphones, MessageCircle } from "lucide-react";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderMobile: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response: any = await Post("/api/contact/raise-query", formData);
      if (response.success) {
        setStatus({
          type: "success",
          message: "Thank you! We’ll get back to you soon.",
        });
        setFormData({
          senderName: "",
          senderEmail: "",
          senderMobile: "",
          query: "",
        });
      } else {
        setStatus({
          type: "error",
          message: response.message || "Something went wrong!",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-[#6D0E82] text-white">
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
        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Send Us a Message
          </h2>

          {status && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="senderName"
              placeholder="Your Name"
              value={formData.senderName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="senderEmail"
              placeholder="Your Email"
              value={formData.senderEmail}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              name="senderMobile"
              placeholder="Your Mobile Number"
              value={formData.senderMobile}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="query"
              placeholder="Your Message"
              value={formData.query}
              onChange={handleInputChange}
              rows={5}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6D0E82] text-white py-3 rounded-lg font-semibold hover:bg-[#02577A] transition-all disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
