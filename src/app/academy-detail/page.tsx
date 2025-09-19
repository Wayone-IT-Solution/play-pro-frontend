"use client"
import React, { useState } from 'react';
import { FaBars, FaPen, FaCalendarAlt } from 'react-icons/fa';

// --- TYPE DEFINITIONS TO FIX THE ERROR ---
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

// A reusable component for select fields, now with explicit types
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

// Insurance Information Form Component (embedded)
const InsuranceInformationForm: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    insuredParent: '',
    address: '',
    insuranceCompany1: '',
    insuranceCompany2: '',
    policy: '',
    employerNameAddress: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    console.log('Insurance form submitted:', formData);
    onNext();
  };

  return (
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

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-16 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-[#932AAA] text-white px-16 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
        >
          Next
        </button>
      </div>
    </main>
  );
};

const RegisterationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tshirtSize: '',
    skirtSize: '',
    jerseySub1: '',
    jerseySub2: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    zipCode: '',
    parentGuardianName: '',
    homePhone: '',
    workCellPhone: '',
    email: '',
    emergencyContact1: { name: '', relationship: '', phoneNumber: '' },
    emergencyContact2: { name: '', relationship: '', phoneNumber: '' },
    emergencyContact3: { name: '', relationship: '', phoneNumber: '' },
    doctor: '',
    doctorPhone: '',
    preferredHospital: '',
    signature: null
  });

  const [ageGroup, setAgeGroup] = useState('');

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev:any)=> ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNext = () => {
    console.log('Form submitted:', formData);
    setCurrentStep(2); // Move to insurance step
  };

  const handleBackToRegistration = () => {
    setCurrentStep(1);
  };

  const handleInsuranceComplete = () => {
    console.log('All forms completed!');
    // You can navigate to next step or show success message
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

        {/* Step Indicator */}
        <div className="bg-white p-4 mt-1 border-b">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm font-medium">Registration</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Insurance</span>
            </div>
          </div>
        </div>

        {/* Conditional Rendering Based on Current Step */}
        {currentStep === 1 && (
          <main className="bg-white p-6 mt-1">
            {/* Registration Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <FaBars className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-800">Midview Youth Football registration</h2>
              </div>
              <p className="text-sm text-gray-500 ml-7">
                start with some keywords to help the AI generated a title and discription
              </p>
            </div>

            {/* T-shirt, Skirt, Jersey Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
              {/* Left Column */}
              <div>
                <div className="flex items-end gap-4">
                  <div className="flex-grow">
                    <FormSelect
                      label="T-shirt Size"
                      value={formData.tshirtSize}
                      onChange={e => handleInputChange('tshirtSize', e.target.value)}
                    >
                      <option>Select a category</option>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </FormSelect>
                  </div>
                  <div className="flex gap-4 pb-2">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="ageGroup" value="adult" className="form-radio h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Adult</span>
                    </label>
                    <span className="text-gray-400">or</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="ageGroup" value="youth" className="form-radio h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Youth</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div>
                <FormSelect
                  label="Skirt Size"
                  value={formData.skirtSize}
                  onChange={e => handleInputChange('skirtSize', e.target.value)}
                >
                  <option>Select a category</option>
                  <option>Small</option>
                  <option>Medium</option>
                </FormSelect>
              </div>
              {/* Jersey fields */}
              <div></div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Jersey</label>
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Select a subcategory"
                    className="w-full p-3 bg-gray-100 border-none rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-gray-400">or</span>
                  <input
                    placeholder="Select a subcategory"
                    className="w-full p-3 bg-gray-100 border-none rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Personal & Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
              <FormInput label="Name" placeholder="Select a category" />
              <div className="relative">
                <FormInput
                  label="Date Of Birth"
                  placeholder="Select a subcategory"
                  type="text"
                  onFocus={e => (e.target.type = 'date')}
                  onBlur={e => (e.target.type = 'text')}
                />
                <FaCalendarAlt className="absolute right-3 top-8 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <FormSelect label="Select gender">
                <option>Select a category</option>
                <option>Male</option>
                <option>Female</option>
              </FormSelect>
              <div></div>
              <FormInput label="Address" placeholder="Select a category" />
              <FormInput label="City" placeholder="Select a subcategory" />
              <FormSelect label="Zip Code">
                <option>Select a category</option>
                <option>110043</option>
                <option>110085</option>
              </FormSelect>
              <div></div>
              <FormInput label="Parent/Guardian Name" placeholder="Select a category" />
              <FormInput label="Home Phone" placeholder="Select a subcategory" />
              <FormInput label="Work/cell phone" placeholder="Select a category" />
              <FormInput label="Email" placeholder="Select a category" type="email" />
            </div>

            {/* Emergency Contact Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FaBars className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-800">In Case Of Emergency - Please Contact</h2>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-3">
                  <FormInput label="Name" placeholder="Select a category" />
                  <FormInput label="Relationship" placeholder="Select a category" />
                  <FormInput label="Phone Number" placeholder="Select a category" type="tel" />
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-4">
                <FormInput label="Doctor" placeholder="Select a category" />
                <FormInput label="Phone Number" placeholder="Select a category" type="tel" />
                <FormInput label="Preferred Hospital" placeholder="Select a category" />
              </div>
            </div>

            {/* Signature Upload */}
            <div className="mb-8">
              <label className="block text-xs font-medium text-gray-600 mb-1">Signature</label>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center bg-purple-50">
                <div className="flex flex-col items-center justify-center">
                  <FaPen className="w-8 h-8 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">Select a category</p>
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
        )}

        {/* Insurance Form Step */}
        {currentStep === 2 && (
          <InsuranceInformationForm 
            onNext={handleInsuranceComplete} 
            onBack={handleBackToRegistration}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterationFlow;