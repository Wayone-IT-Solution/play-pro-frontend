"use client";

import { Post } from "@/utils/axios";
import React, { useState } from "react";
import {
  Phone,
  Mail,
  Headphones,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { getLocalizedText } from "@/hooks/general";

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
          message: getLocalizedText(
            "Thank you! We’ll get back to you soon.",
            "شكراً لك! سنتواصل معك قريباً."
          ),
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
          message:
            response.message ||
            getLocalizedText("Something went wrong!", "حدث خطأ ما!"),
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: getLocalizedText(
          "Failed to send message. Please try again later.",
          "فشل إرسال الرسالة. يرجى المحاولة لاحقاً."
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6D0E82] via-[#510A60] to-black text-white">
      {/* Hero */}
      <motion.section
        className="text-center py-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 bg-white/10 mt-20 rounded-full w-fit mx-auto backdrop-blur-sm mb-6 shadow-md">
          <MessageCircle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          {getLocalizedText("Contact Us", "اتصل بنا")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {getLocalizedText(
            "We’re here to help with your football field booking needs.",
            "نحن هنا لمساعدتك في حجز ملاعب كرة القدم."
          )}
        </p>
      </motion.section>

      {/* Contact Methods */}
      <section className="px-6 mb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-900">
          {[
            {
              icon: <Phone className="w-6 h-6" />,
              title: getLocalizedText("Call Us", "اتصل بنا"),
              text: "+966 500330888",
            },
            {
              icon: <Mail className="w-6 h-6" />,
              title: getLocalizedText("Email Us", "راسلنا عبر البريد"),
              text: "info@playprodammam.com",
            },
            {
              icon: <Headphones className="w-6 h-6" />,
              title: getLocalizedText("Live Support", "الدعم المباشر"),
              text: getLocalizedText("24/7 assistance", "المساعدة على مدار الساعة"),
            },
          ].map((method, index) => (
            <motion.div
              key={method.title}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-[#6D0E82]/10 text-[#6D0E82] p-3 rounded-full mb-4">
                {method.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{method.title}</h3>
              <p className="text-gray-600">{method.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white text-gray-900 p-4 lg:py-16 lg:px-6">
        <motion.div
          className="max-w-3xl mx-auto bg-white p-4 lg:p-10 rounded-3xl shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-[#6D0E82]">
            {getLocalizedText("Send Us a Message", "أرسل لنا رسالة")}
          </h2>

          {status && (
            <motion.div
              className={`mb-6 flex items-center gap-2 p-4 rounded-lg text-sm font-medium ${status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {status.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                name: "senderName",
                type: "text",
                placeholder: getLocalizedText("Your Name", "اسمك"),
                value: formData.senderName,
              },
              {
                name: "senderEmail",
                type: "email",
                placeholder: getLocalizedText("Your Email", "بريدك الإلكتروني"),
                value: formData.senderEmail,
              },
              {
                name: "senderMobile",
                type: "tel",
                placeholder: getLocalizedText(
                  "Your Mobile Number",
                  "رقم هاتفك"
                ),
                value: formData.senderMobile,
              },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={field.value}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6D0E82] outline-none transition"
              />
            ))}

            <textarea
              name="query"
              placeholder={getLocalizedText("Your Message", "رسالتك")}
              value={formData.query}
              onChange={handleInputChange}
              rows={5}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6D0E82] outline-none transition"
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6D0E82] to-[#932AAA] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-70"
              whileTap={{ scale: 0.96 }}
            >
              {loading
                ? getLocalizedText("Sending...", "جارٍ الإرسال...")
                : getLocalizedText("Send Message", "أرسل الرسالة")}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUsPage;
