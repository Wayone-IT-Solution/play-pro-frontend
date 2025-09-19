"use client"
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

// --- TYPE DEFINITIONS ---
type FormInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type FormSelectProps = {
  label: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-3 bg-gray-100 border-none rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

const FormSelect: React.FC<FormSelectProps> = ({ label, children, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <select
      {...props}
      className="w-full p-3 bg-gray-100 border-none rounded-md text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {children}
    </select>
  </div>
);

const InsuranceInformationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    insuredParent: '',
    address: '',
    insuranceCompany1: '',
    insuranceCompany2: '',
    policy: '',
    employerNameAddress: ''
  });

  const [ageGroup, setAgeGroup] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    console.log('Insurance form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <header className="bg-white p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-[#932AAA]">Play</span>
            <span className="text-gray-500">Pro</span>
            <span className="text-black ml-1">Academy</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Aliquam lacinia diam quis lacus euismod</p>
        </header>

        <main className="bg-white p-6 mt-1">
          {/* Insurance Information Section Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <FaBars className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">Insurance Information:</h2>
            </div>
            <p className="text-sm text-gray-400 ml-7">
              start with some keywords to help the AI generated a title and description
            </p>
          </div>

          {/* Insurance Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {/* Insured Parent Row */}
            <div className="flex items-end gap-4">
              <div className="flex-grow">
                <FormSelect
                  label="Insured parent"
                  value={formData.insuredParent}
                  onChange={e => handleInputChange('insuredParent', e.target.value)}
                >
                  <option>Select a category</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </FormSelect>
              </div>
              <div className="flex gap-4 pb-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-4 w-4 text-purple-600 rounded" 
                  />
                  <span className="text-sm text-gray-700">Adult</span>
                </label>
                <span className="text-gray-400">OR</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-4 w-4 text-purple-600 rounded" 
                  />
                  <span className="text-sm text-gray-700">Youth</span>
                </label>
              </div>
            </div>
            <div></div>

            {/* Address Row */}
            <FormSelect
              label="Address"
              value={formData.address}
              onChange={e => handleInputChange('address', e.target.value)}
            >
              <option>Select a category</option>
              <option>Home Address</option>
              <option>Work Address</option>
              <option>Other</option>
            </FormSelect>
            <div></div>

            {/* Insurance Company Row */}
            <div></div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Insurance Company</label>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Select a subcategory"
                  value={formData.insuranceCompany1}
                  onChange={e => handleInputChange('insuranceCompany1', e.target.value)}
                  className="w-full p-3 bg-gray-100 border-none rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-gray-400">OR</span>
                <input
                  placeholder="Select a subcategory"
                  value={formData.insuranceCompany2}
                  onChange={e => handleInputChange('insuranceCompany2', e.target.value)}
                  className="w-full p-3 bg-gray-100 border-none rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Policy Row */}
            <FormSelect
              label="Policy"
              value={formData.policy}
              onChange={e => handleInputChange('policy', e.target.value)}
            >
              <option>Select a category</option>
              <option>Basic Coverage</option>
              <option>Premium Coverage</option>
              <option>Comprehensive Coverage</option>
            </FormSelect>
            
            {/* Employer's Name/Address */}
            <FormInput 
              label="Employer's Name / Address" 
              placeholder="Select a subcategory"
              value={formData.employerNameAddress}
              onChange={e => handleInputChange('employerNameAddress', e.target.value)}
            />
          </div>

          {/* Cost Information Box */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border">
            <div className="text-sm text-gray-700 leading-relaxed">
              <div className="flex justify-between items-center mb-2">
                <span><strong>Cost's:</strong> Varsity and J.V. $140.00</span>
                <span><strong>Cheerleading</strong> $65.00</span>
                <span><strong>Flag</strong> $35.00</span>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                **Midview Youth Football has not and does not carry medical insurance for participants. I understand that should it be 
                necessary, any and all medical expenses for my child are my responsibility.
              </p>
              
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800 mb-2">PLEASE READ CAREFULLY BEFORE SIGNING</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We consent to our child's participation in the Midview Youth Football program. In consideration for permitting our child to participate 
                  in the activities conducted by Midview Youth Football, we release, waive, discharge, covenant and relinquish any and all action or cause of 
                  action against the organization, promoters, officials, staff coaches and/or volunteers for personal injury, death and or property damage occurring 
                  to our child as a result of engaging or receiving instruction in the activities conducted by this organization. We further release all officials, officers, promoters, staff, coaches and/or volunteers from any claim whatsoever on account of first aid, treatment or services rendered to their child 
                  during participation in this organization. We agree to return all equipment, cleaned and in good condition to Midview Youth Football by the 
                  date notified.
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="bg-[#932AAA] text-white px-16 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsuranceInformationForm;