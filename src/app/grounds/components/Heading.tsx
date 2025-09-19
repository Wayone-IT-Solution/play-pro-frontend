"use client";

import { getLocalizedText } from "@/hooks/general";

const Heading = () => {
    return <div className="text-center mt-14 md:mt-16 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl xl:text-5xl font-inter font-bold mb-2 leading-none">
            <span className="text-[#932AAA]">{getLocalizedText("Play", "الملعب")}</span>
            <span className="text-gray-900">{getLocalizedText("Pro", "برو")}</span>{" "}
            {getLocalizedText("Fields", "الملاعب")}
        </h1>
        <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-normal">
            {getLocalizedText(
                "Discover and book world-class sports fields tailored for every professional and enthusiast.",
                "اكتشف واحجز ملاعب رياضية عالمية مصممة لكل محترف وهواة."
            )}
        </p>
    </div>
}

export default Heading