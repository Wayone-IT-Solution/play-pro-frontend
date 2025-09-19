import { countries } from "@/datas/countryData";
import { useState } from "react";

export default function PhoneInput({ getLocalizedText, formData, handleInputChange }: any) {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleCountrySelect = (country: any) => {
        console.log(country?.dialCode)
        setSelectedCountry(country);
        setDropdownOpen(false);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
                {getLocalizedText("Phone Number", "رقم الهاتف")}
            </label>
            <div className="flex">
                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        type="button"
                        className="shrink-0 z-10 inline-flex items-center py-[3.] h-full px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                    >
                        {/* <span className="mr-2">{selectedCountry.flag}</span> */}
                        {selectedCountry.dialCode}
                        <svg
                            className="w-2.5 h-2.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded shadow-md max-h-60 overflow-y-auto w-60">
                            <ul className="text-sm text-gray-700">
                                {countries.map((country) => (
                                    <li key={country.code}>
                                        <button
                                            type="button"
                                            onClick={() => handleCountrySelect(country)}
                                            className="w-full px-4 py-2 hover:bg-gray-100 flex items-center"
                                        >
                                            <span className="mr-2">{country.flag}</span>
                                            {country.name} ({country.dialCode})
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={getLocalizedText("Enter phone number", "أدخل رقم الهاتف")}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 border-l-0 rounded-r-lg  text-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );
}
