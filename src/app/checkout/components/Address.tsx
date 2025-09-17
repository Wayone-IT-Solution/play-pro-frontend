import React from 'react'
import { getLocalizedText } from '@/hooks/general'

const Address = ({ address, setAddress }: { address: any, setAddress: any }) => {
    return (
        <div className="mt-4 px-2 w-full">
            <label className="block text-lg mb-2 font-bold text-gray-700">
                {getLocalizedText("Add Address", "أضف العنوان")}
            </label>
            <div className="grid grid-cols-3 gap-4">
                {/* Street */}
                <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder={getLocalizedText("e.g. 221B Baker Street", "مثال: 221B شارع بيكر")}
                    className="w-full border-2 col-span-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA]"
                />

                {/* City */}
                <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder={getLocalizedText("e.g. London", "مثال: لندن")}
                    className="w-full border-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA]"
                />

                {/* State (optional) */}
                <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder={getLocalizedText("e.g. California (optional)", "مثال: كاليفورنيا (اختياري)")}
                    className="w-full border-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA]"
                />

                {/* Postal Code */}
                <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder={getLocalizedText("e.g. 123456", "مثال: 123456")}
                    className="w-full border-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA]"
                />

                {/* Country */}
                <input
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    placeholder={getLocalizedText("e.g. United Kingdom", "مثال: المملكة المتحدة")}
                    className="w-full border-2 border-gray-200 text-[#932AAA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-[#932AAA]"
                />
            </div>
        </div>
    )
}

export default Address
