"use client";
import React from "react";
import {
  FileText,
  Scale,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen mt-20" style={{ backgroundColor: "#6D0E82" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Scale className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using Football Play Pro
              services.
            </p>
            <div className="mt-8 text-blue-200">
              <p>Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                By accessing and using Football Play Pro ("the App"), you accept
                and agree to be bound by these Terms and Conditions. If you do
                not agree to these terms, please do not use our services.
              </p>
              <div
                className="bg-blue-50 p-4 rounded-lg border-l-4"
                style={{ borderColor: "#6D0E82" }}
              >
                <p className="text-sm font-medium">
                  These terms constitute a legally binding agreement between you
                  and Football Play Pro.
                </p>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Service Description
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>Football Play Pro provides a platform for:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Field Booking
                  </h4>
                  <p className="text-sm">
                    Browse and book football fields in your area for matches and
                    training.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Team Management
                  </h4>
                  <p className="text-sm">
                    Create and manage teams, organize matches, and coordinate
                    with players.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Payment Processing
                  </h4>
                  <p className="text-sm">
                    Secure payment processing for field rentals and related
                    services.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Community Features
                  </h4>
                  <p className="text-sm">
                    Connect with other football enthusiasts and join local
                    communities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                User Responsibilities
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>As a user of Football Play Pro, you agree to:</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>
                    Provide accurate and up-to-date information when creating
                    your account
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>
                    Use the app only for lawful purposes and in accordance with
                    these terms
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>
                    Respect field rules and regulations during bookings
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>
                    Pay all fees and charges associated with your bookings
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>
                    Maintain the confidentiality of your account credentials
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Prohibited Activities
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You are prohibited from:</p>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      Using the app for any illegal or unauthorized purpose
                    </span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      Attempting to gain unauthorized access to our systems
                    </span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      Sharing your account with others or creating multiple
                      accounts
                    </span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      Posting offensive, harmful, or inappropriate content
                    </span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      Interfering with other users' enjoyment of the service
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div
                className="p-3 rounded-lg mr-4"
                style={{ backgroundColor: "#6D0E82" }}
              >
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Limitation of Liability
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <p className="mb-4">
                  Football Play Pro provides the platform "as is" and cannot
                  guarantee uninterrupted service. We are not liable for:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    • Field conditions or safety issues at third-party
                    facilities
                  </li>
                  <li>• Disputes between users or teams</li>
                  <li>• Technical issues or app downtime</li>
                  <li>• Loss of data or unauthorized access to accounts</li>
                  <li>• Injuries or accidents during field usage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 text-center mb-6">
                If you have any questions about these Terms and Conditions,
                please contact our legal team.
              </p>
              <div className="text-center space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> legal@footballplaypro.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Business Hours:</strong> Monday - Friday, 9:00 AM -
                  6:00 PM EST
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
