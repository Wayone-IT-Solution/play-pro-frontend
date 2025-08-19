import Image from "next/image";
import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-24">
      {/* Modal */}
      <div className="bg-white rounded-2xl p-10 w-full max-w-xl sm:max-w-2xl mx-4 text-center relative shadow-lg">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-light">
          ✕
        </button>

        {/* Thank You Image */}
        <div className="mb-8 mt-4">
          <Image
            src="/assets/thankyou.png"
            alt="Thank You"
            width={400}
            height={120}
            className="w-full max-w-sm mx-auto"
          />
        </div>

        {/* Congratulations Text */}
        <p className="text-[#9C9C9C] text-base mb-6 leading-relaxed px-4">
          Congratulations! You’ve successfully booked your
          <br />
          slot. We’ll see you soon.
        </p>

        {/* Booking ID */}
        <div className="mb-8">
          <p className="text-black text-lg font-semibold">
            Booking ID: 123456789876
          </p>
        </div>

       
        <Link href="/history">
          <button className="bg-[#6D54B5] text-white px-8 sm:px-16 py-3 sm:py-4 rounded-lg font-medium text-base hover:bg-opacity-90 transition-all duration-200 shadow-sm">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
