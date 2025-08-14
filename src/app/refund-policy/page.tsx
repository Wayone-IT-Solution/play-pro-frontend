"use client";
import React from "react";
import { RefreshCw, Clock, CreditCard, AlertCircle, CheckCircle2, DollarSign } from "lucide-react";

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen mt-20" style={{ backgroundColor: '#013F5E' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <RefreshCw className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Refund Policy
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Fair and transparent refund guidelines for all Play Pro bookings and services.
            </p>
            <div className="mt-8 text-blue-200">
              <p>Effective: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          
          {/* Refund Eligibility */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Refund Eligibility</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  Eligible for Full Refund
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Cancellation Timeline</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 24+ hours before booking: 100% refund</li>
                      <li>• 12-24 hours before: 75% refund</li>
                      <li>• 6-12 hours before: 50% refund</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Other Situations</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Field facility issues</li>
                      <li>• Weather-related cancellations</li>
                      <li>• App technical problems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Refund Process</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Request a Refund</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 p-3 rounded-full" style={{ backgroundColor: '#013F5E' }}>
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Submit Request</h4>
                    <p className="text-sm text-gray-600">Contact our support team through the app or email with your booking details.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 p-3 rounded-full" style={{ backgroundColor: '#013F5E' }}>
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Review Process</h4>
                    <p className="text-sm text-gray-600">We'll review your request within 24-48 hours and verify eligibility.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 p-3 rounded-full" style={{ backgroundColor: '#013F5E' }}>
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Refund Issued</h4>
                    <p className="text-sm text-gray-600">Approved refunds are processed within 3-5 business days to your original payment method.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4" style={{ borderColor: '#013F5E' }}>
                <p className="text-sm font-medium text-gray-800">
                  <strong>Processing Time:</strong> Refunds typically appear in your account within 3-5 business days, 
                  though it may take up to 10 business days depending on your bank or payment provider.
                </p>
              </div>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Non-Refundable Situations</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">No Refund Available</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Late Cancellations</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Cancellations within 6 hours of booking</li>
                      <li>• No-shows without prior notice</li>
                      <li>• Last-minute cancellations due to personal reasons</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Usage</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Completed bookings and played matches</li>
                      <li>• Premium subscription fees (partial month usage)</li>
                      <li>• Processing fees and service charges</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm">
                  <strong>Special Circumstances:</strong> We may consider refunds for exceptional situations 
                  on a case-by-case basis. Contact our support team to discuss your specific situation.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Methods & Processing */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Payment Methods & Processing</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Credit Cards</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Debit Cards</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Digital Wallets</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Bank Transfer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> Refunds will be processed to the same payment method used for the original transaction. 
                  If the original payment method is no longer available, please contact our support team for alternative arrangements.
                </p>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Dispute Resolution</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you're not satisfied with our refund decision, we encourage you to contact our customer service team 
                to discuss your concerns. We're committed to finding fair solutions for all our users.
              </p>
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-3">Escalation Process</h4>
                <div className="space-y-2 text-sm">
                  <p>1. <strong>First Contact:</strong> Reach out to our standard support team</p>
                  <p>2. <strong>Escalation:</strong> Request escalation to a senior support manager</p>
                  <p>3. <strong>Final Review:</strong> Management review for complex cases</p>
                  <p>4. <strong>External Mediation:</strong> Third-party mediation if internal resolution fails</p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: '#013F5E' }}>
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Policy Updates</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                We may update this Refund Policy from time to time to reflect changes in our services or legal requirements. 
                When we make changes, we will:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Notify you via email and in-app notification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Update the "Last Updated" date at the top of this page</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Provide a 30-day notice period for significant changes</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact for Refunds */}
          <section>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Need a Refund?</h3>
              <p className="text-gray-700 text-center mb-6">
                Contact our dedicated refund support team for quick assistance with your refund request.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Refund Support</h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><strong>Email:</strong> refunds@footballplaypro.com</p>
                    <p><strong>Phone:</strong> +1 (555) REFUND-1</p>
                    <p><strong>Live Chat:</strong> Available in the app 24/7</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">What to Include</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Booking reference number</li>
                    <li>• Date and time of booking</li>
                    <li>• Reason for refund request</li>
                    <li>• Any supporting documentation</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#013F5E' }}>
                  <Clock className="w-4 h-4 mr-2" />
                  Average Response Time: 2-4 Hours
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;