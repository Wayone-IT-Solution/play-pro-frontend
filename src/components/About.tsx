'use client';
import { getLocalizedText } from '@/hooks/general';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
    const [players, setPlayers] = useState(0);
    const [matches, setMatches] = useState(0);
    const [venues, setVenues] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const animateCount = (setter: any, target: any, delay = 10) => {
            let count = 0;
            const increment = target / 100;
            const interval = setInterval(() => {
                count += increment;
                if (count >= target) {
                    clearInterval(interval);
                    setter(target);
                } else {
                    setter(Math.floor(count));
                }
            }, delay);
        };

        animateCount(setPlayers, 800000);
        animateCount(setMatches, 50000);
        animateCount(setVenues, 30);
        animateCount(setRevenue, 200);
    }, []);

    return (
        <div className="bg-white text-gray-800">
            {/* Hero */}
            {/* Hero */}
            <section className="relative h-[90vh] flex items-center justify-center text-center px-4 bg-gray-900 text-white">
                <Image
                    src="/assets/std.png"
                    alt={getLocalizedText("Background", "الخلفية")}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                />
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold">
                        {getLocalizedText("PlayPro", "بلاي برو")}
                    </h1>
                    <p className="mt-4 text-xl max-w-2xl mx-auto">
                        {getLocalizedText(
                            "Bridging athletes and venues through technology — Simple. Smart. Seamless.",
                            "نربط الرياضيين والملاعب من خلال التكنولوجيا — بسيط. ذكي. سلس."
                        )}
                    </p>
                </div>
            </section>





            {/* Features */}
            <section className="bg-gray-100 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-14">
                        {getLocalizedText("Key Features", "الميزات الرئيسية")}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            [
                                "Smart Booking System",
                                "Instant booking, reminders, and slot selection.",
                                "نظام حجز ذكي",
                                "حجوزات فورية، تذكيرات، واختيار المواعيد بسهولة."
                            ],
                            [
                                "Transparent Pricing",
                                "No hidden fees. Clear costs upfront.",
                                "أسعار شفافة",
                                "لا رسوم خفية. التكاليف واضحة من البداية."
                            ],
                            [
                                "Matchmaking & Community",
                                "Find teammates or opponents nearby.",
                                "مطابقة اللاعبين والمجتمع",
                                "اعثر على زملاء أو خصوم بالقرب منك."
                            ],
                            [
                                "Facilitator Tools",
                                "Automate scheduling, payments & reporting.",
                                "أدوات التيسير",
                                "أتمتة الجدولة، والمدفوعات، والتقارير."
                            ],
                            [
                                "Marketing Integration",
                                "Boost your venue visibility and revenue.",
                                "تكامل التسويق",
                                "عزّز رؤية ملعبك وزِد إيراداتك."
                            ],
                            [
                                "Analytics & Growth",
                                "See peak hours, performance and trends.",
                                "التحليلات والنمو",
                                "اعرف ساعات الذروة، الأداء، والاتجاهات."
                            ],
                        ].map(([titleEn, descEn, titleAr, descAr], i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
                            >
                                <h3 className="text-lg font-bold text-[#6D0E82] mb-2">
                                    {getLocalizedText(titleEn, titleAr)}
                                </h3>
                                <p>{getLocalizedText(descEn, descAr)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Vision & Mission */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">
                    {getLocalizedText("Vision & Mission", "الرؤية والرسالة")}
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white border-l-4 border-[#6D0E82] p-6 shadow">
                        <h3 className="text-xl font-bold mb-2">
                            {getLocalizedText("Vision", "الرؤية")}
                        </h3>
                        <p>
                            {getLocalizedText(
                                "To simplify sports for everyone by bridging athletes and venues — creating a world where every player can easily book, connect, and play on the best courts.",
                                "لتبسيط الرياضة للجميع من خلال ربط الرياضيين بالملاعب — وخلق عالم يمكن فيه لكل لاعب الحجز، والتواصل، واللعب بسهولة على أفضل الملاعب."
                            )}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            [
                                "Empower athletes with discovery, booking, and matchmaking.",
                                "تمكين الرياضيين من الاكتشاف والحجز والمطابقة."
                            ],
                            [
                                "Enable venue owners with automation, analytics, and pricing tools.",
                                "تمكين أصحاب الملاعب من خلال الأتمتة والتحليلات وأدوات التسعير."
                            ],
                            [
                                "Grow a strong sports community built on accessibility and fairness.",
                                "بناء مجتمع رياضي قوي قائم على سهولة الوصول والعدالة."
                            ]
                        ].map(([missionEn, missionAr], i) => (
                            <div key={i} className="bg-white border-l-4 border-[#6D0E82] p-6 shadow">
                                <h4 className="font-semibold mb-1">
                                    {getLocalizedText(`Mission #${i + 1}`, `الرسالة رقم ${i + 1}`)}
                                </h4>
                                <p>{getLocalizedText(missionEn, missionAr)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Achievements */}
            <section className="bg-[#6D0E82] text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        {getLocalizedText("Our Impact", "تأثيرنا")}
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-4xl font-bold">{players.toLocaleString()}</h3>
                            <p>{getLocalizedText("Registered Players", "اللاعبون المسجلون")}</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">{matches.toLocaleString()}</h3>
                            <p>{getLocalizedText("Matches Booked", "المباريات المحجوزة")}</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">{venues}</h3>
                            <p>{getLocalizedText("Venue Partners", "شركاء الملاعب")}</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">{revenue}%</h3>
                            <p>{getLocalizedText("Revenue Growth", "نمو الإيرادات")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                    {getLocalizedText("All-in-One Court Management", "إدارة شاملة للملاعب")}
                </h2>
                <p className="text-lg text-gray-700">
                    {getLocalizedText(
                        "PlayPro simplifies rentals for football, basketball, tennis, padel (coming soon) — empowering athletes and owners through technology.",
                        "تعمل PlayPro على تبسيط تأجير الملاعب لكرة القدم، كرة السلة، التنس، والبادل (قريبًا) — مما يمكّن الرياضيين وأصحاب الملاعب من خلال التكنولوجيا."
                    )}
                </p>
            </section>
        </div>
    );
}
