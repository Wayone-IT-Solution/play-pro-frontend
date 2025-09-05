"use client";
import React from "react";
import { Shield, Lock, Eye, Users, Database, FileText } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#6D0E82" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20"></div>
        <div className="relative max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how Play Pro protects and
              handles your data.
            </p>
            <div className="mt-8 text-blue-200">
              <p>Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <Database className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Personal Information
                </h3>
                <p className="mb-3">
                  When you use Play Pro, we may collect the following personal
                  information:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>
                      Name, email address, and phone number when you create an
                      account
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>Profile information and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>Payment information for field bookings</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>Location data when you search for nearby fields</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Usage Information
                </h3>
                <p>
                  We automatically collect information about how you use our
                  app, including:
                </p>
                <ul className="space-y-2 ml-4 mt-3">
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>Device information and operating system</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>App usage patterns and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mt-2 mr-3"
                      style={{ backgroundColor: "#6D0E82" }}
                    ></span>
                    <span>Booking history and field interactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>We use the collected information to:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="bg-blue-50 p-4 rounded-lg border-l-4"
                  style={{ borderColor: "#6D0E82" }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Service Provision
                  </h4>
                  <p className="text-sm">
                    Provide and maintain our field booking services, process
                    payments, and manage your account.
                  </p>
                </div>
                <div
                  className="bg-blue-50 p-4 rounded-lg border-l-4"
                  style={{ borderColor: "#6D0E82" }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Communication
                  </h4>
                  <p className="text-sm">
                    Send you booking confirmations, updates, and customer
                    support messages.
                  </p>
                </div>
                <div
                  className="bg-blue-50 p-4 rounded-lg border-l-4"
                  style={{ borderColor: "#6D0E82" }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Improvement
                  </h4>
                  <p className="text-sm">
                    Analyze usage patterns to improve our app features and user
                    experience.
                  </p>
                </div>
                <div
                  className="bg-blue-50 p-4 rounded-lg border-l-4"
                  style={{ borderColor: "#6D0E82" }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Marketing
                  </h4>
                  <p className="text-sm">
                    Send promotional offers and updates about new features (with
                    your consent).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Data Protection & Security
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                We implement industry-standard security measures to protect your
                personal information:
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 mx-auto mb-3 p-3 rounded-full"
                      style={{ backgroundColor: "#6D0E82" }}
                    >
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Encryption
                    </h4>
                    <p className="text-sm">
                      All data is encrypted in transit and at rest using
                      industry-standard protocols.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 mx-auto mb-3 p-3 rounded-full"
                      style={{ backgroundColor: "#6D0E82" }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Access Control
                    </h4>
                    <p className="text-sm">
                      Limited access to personal data on a need-to-know basis
                      with strict authentication.
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 mx-auto mb-3 p-3 rounded-full"
                      style={{ backgroundColor: "#6D0E82" }}
                    >
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Secure Storage
                    </h4>
                    <p className="text-sm">
                      Data stored in secure, regularly monitored servers with
                      backup and recovery systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You have the following rights regarding your personal data:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Access & Portability
                  </h4>
                  <p className="text-sm">
                    Request a copy of your personal data in a portable format.
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Rectification
                  </h4>
                  <p className="text-sm">
                    Update or correct inaccurate personal information.
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Erasure</h4>
                  <p className="text-sm">
                    Request deletion of your personal data under certain
                    circumstances.
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Opt-out</h4>
                  <p className="text-sm">
                    Unsubscribe from marketing communications at any time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> privacy@footballplaypro.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Sports Avenue, Field City, FC
                  12345
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
