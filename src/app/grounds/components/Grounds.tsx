"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getLocalizedValues } from '@/hooks/general';

const Grounds = ({ fields }: { fields: any }) => {
    return (
        <>{fields.map((field: any) => {
            field = getLocalizedValues(field);
            return <div key={field._id}>
                <Link
                    href={`/grounds/${field._id}`}
                    passHref
                    className="relative rounded-2xl border border-gray-200 p-1 overflow-hidden transition-shadow duration-300 bg-white h-full flex flex-col"
                >
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] sm:aspect-[3/4]">
                        {field.images && field.images.length > 0 ? (
                            <Image
                                src={field.images[0]}
                                alt="Ground "
                                fill
                                unoptimized
                                className="object-cover rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl text-gray-500 text-sm">
                                No Image
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/60 p-3 text-white">
                            <h3 className="text-base sm:text-lg font-semibold mb-1">
                                {field.name}
                            </h3>
                            <div className="flex items-center text-xs sm:text-sm text-gray-200">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="currentColor"
                                    className="mr-1 shrink-0"
                                >
                                    <path d="M6 0C3.515 0 1.5 2.015 1.5 4.5c0 3.375 4.5 7.5 4.5 7.5s4.5-4.125 4.5-7.5C10.5 2.015 8.485 0 6 0zm0 6.75c-1.243 0-2.25-1.007-2.25-2.25S4.757 2.25 6 2.25s2.25 1.007 2.25 2.25S7.243 6.75 6 6.75z" />
                                </svg>
                                {field.address}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-white p-3 sm:p-4 flex justify-between items-center">
                        <div className="text-xs sm:text-sm font-medium text-gray-700">
                            Distance: {field.distance ?? "3.5 km"}
                        </div>
                        <button
                            className="px-4 py-1.5 sm:px-6 sm:py-2 text-white font-medium rounded-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                            style={{ background: "#932AAA" }}
                        >
                            Book Now
                        </button>
                    </div>
                </Link>
            </div>
        })}</>
    )
}

export default Grounds