import Image from 'next/image';

const StadiumBrowser = () => {
  const sports = [
    {
      name: 'Football',
      stadiumCount: '30 Stadium',
      icon: '/assets/football1.png', 
      alt: 'Football icon'
    },
    {
      name: 'Cricket',
      stadiumCount: '300 Stadium',
      icon: '/assets/cricket.png',
      alt: 'Cricket icon'
    },
    {
      name: 'Hocky',
      stadiumCount: '567 Stadium',
      icon: '/assets/field-hockey.png', 
      alt: 'Hockey icon'
    },
    {
      name: 'Badminton',
      stadiumCount: '340 Stadium',
      icon: '/assets/badminton.png', 
      alt: 'Badminton icon'
    },
    {
      name: 'Tennis',
      stadiumCount: '765 Stadium',
      icon: '/assets/tennis.png', 
      alt: 'Tennis icon'
    },
    {
      name: 'Volleyball',
      stadiumCount: '788 Stadium',
      icon: '/assets/volleyball.png', 
      alt: 'Volleyball icon'
    }
  ];

  return (
    <div className=" py-20 px-5" style={{ backgroundColor: '#0F0B2E1A' }}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black text-center mb-12 font-inter">
          Browse Stadiums By Sport
        </h1>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 flex items-center gap-5 cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
            >
              {/* Sport Icon */}
              <div className="flex-shrink-0">
                <Image
                  src={sport.icon}
                  alt={sport.alt}
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
              </div>

              {/* Sport Info */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-black mb-1 font-inter">
                  {sport.name}
                </h3>
                <p className="text-gray-600 font-inter">
                  {sport.stadiumCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StadiumBrowser;