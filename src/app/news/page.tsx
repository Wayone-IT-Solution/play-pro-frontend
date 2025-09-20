"use client";

import React, { useState } from "react";
import {
  Tag,
  User,
  Clock,
  Search,
  Filter,
  Calendar,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";
import Image from "next/image";

// Types
interface NewsArticle {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  image: string;
  category: { en: string; ar: string };
  date: string;
  author: { en: string; ar: string };
  readTime: number;
  featured: boolean;
  tags: { en: string[]; ar: string[] };
}

// Sample news data
const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: {
      en: "PlayPro Launches Revolutionary AI-Powered Court Booking System",
      ar: "بلاي برو تطلق نظام حجز الملاعب الثوري المدعوم بالذكاء الاصطناعي",
    },
    excerpt: {
      en: "Experience seamless sports facility booking with our new AI-powered platform that predicts availability and suggests optimal playing times.",
      ar: "اختبر حجز المرافق الرياضية السلس مع منصتنا الجديدة المدعومة بالذكاء الاصطناعي التي تتنبأ بالتوفر وتقترح أوقات اللعب المثلى.",
    },
    content: {
      en: "Our latest innovation transforms how athletes and sports enthusiasts book their favorite courts and facilities...",
      ar: "ابتكارنا الأحدث يحول طريقة حجز الرياضيين وعشاق الرياضة لملاعبهم ومرافقهم المفضلة...",
    },
    image: "/assets/banner.png",
    category: { en: "Technology", ar: "التكنولوجيا" },
    date: "2024-03-15",
    author: { en: "Sarah Johnson", ar: "سارة جونسون" },
    readTime: 5,
    featured: true,
    tags: {
      en: ["AI", "Booking", "Innovation"],
      ar: ["الذكاء الاصطناعي", "الحجز", "الابتكار"],
    },
  },
  {
    id: "2",
    title: {
      en: "New Premium Sports Equipment Collection Now Available",
      ar: "مجموعة المعدات الرياضية المميزة الجديدة متاحة الآن",
    },
    excerpt: {
      en: "Discover our curated selection of professional-grade tennis rackets, footballs, and training equipment from top global brands.",
      ar: "اكتشف مجموعتنا المختارة من مضارب التنس الاحترافية وكرات القدم ومعدات التدريب من أفضل العلامات التجارية العالمية.",
    },
    content: {
      en: "We're excited to announce the launch of our premium sports equipment collection...",
      ar: "نحن متحمسون للإعلان عن إطلاق مجموعة المعدات الرياضية المميزة...",
    },
    image: "/assets/banner.png",
    category: { en: "E-Commerce", ar: "التجارة الإلكترونية" },
    date: "2024-03-12",
    author: { en: "Michael Chen", ar: "مايكل تشن" },
    readTime: 3,
    featured: false,
    tags: {
      en: ["Equipment", "Tennis", "Football"],
      ar: ["المعدات", "التنس", "كرة القدم"],
    },
  },
  {
    id: "3",
    title: {
      en: "PlayPro Partners with Local Sports Clubs for Community Programs",
      ar: "بلاي برو تتشارك مع النوادي الرياضية المحلية لبرامج المجتمع",
    },
    excerpt: {
      en: "Building stronger communities through sports with our new partnership program offering discounted bookings and equipment for local clubs.",
      ar: "بناء مجتمعات أقوى من خلال الرياضة مع برنامج الشراكة الجديد الذي يقدم حجوزات ومعدات مخفضة للنوادي المحلية.",
    },
    content: {
      en: "Community engagement has always been at the heart of PlayPro's mission...",
      ar: "المشاركة المجتمعية كانت دائماً في قلب رسالة بلاي برو...",
    },
    image: "/assets/banner.png",
    category: { en: "Community", ar: "المجتمع" },
    date: "2024-03-10",
    author: { en: "Emma Rodriguez", ar: "إيما رودريغيز" },
    readTime: 4,
    featured: false,
    tags: {
      en: ["Community", "Partnership", "Sports Clubs"],
      ar: ["المجتمع", "الشراكة", "النوادي الرياضية"],
    },
  },
  {
    id: "4",
    title: {
      en: "Smart Court Technology: The Future of Sports Facility Management",
      ar: "تقنية الملاعب الذكية: مستقبل إدارة المرافق الرياضية",
    },
    excerpt: {
      en: "Explore how IoT sensors and smart lighting are revolutionizing sports facility management and enhancing player experiences.",
      ar: "استكشف كيف تحدث أجهزة استشعار إنترنت الأشياء والإضاءة الذكية ثورة في إدارة المرافق الرياضية وتعزز تجارب اللاعبين.",
    },
    content: {
      en: "The integration of smart technology in sports facilities is transforming the industry...",
      ar: "تكامل التكنولوجيا الذكية في المرافق الرياضية يحول الصناعة...",
    },
    image: "/assets/banner.png",
    category: { en: "Innovation", ar: "الابتكار" },
    date: "2024-03-08",
    author: { en: "David Kim", ar: "ديفيد كيم" },
    readTime: 6,
    featured: true,
    tags: {
      en: ["IoT", "Smart Technology", "Facility Management"],
      ar: ["إنترنت الأشياء", "التكنولوجيا الذكية", "إدارة المرافق"],
    },
  },
  {
    id: "5",
    title: {
      en: "Seasonal Sports Gear Sale: Up to 50% Off Premium Equipment",
      ar: "تخفيضات المعدات الرياضية الموسمية: خصم حتى 50% على المعدات المميزة",
    },
    excerpt: {
      en: "Don't miss our biggest sale of the year! Premium rackets, shoes, and accessories from leading brands at unbeatable prices.",
      ar: "لا تفوت أكبر تخفيضاتنا في السنة! مضارب وأحذية وإكسسوارات مميزة من العلامات التجارية الرائدة بأسعار لا تُقاوم.",
    },
    content: {
      en: "Our annual seasonal sale is here with incredible discounts on top-quality sports equipment...",
      ar: "تخفيضاتنا الموسمية السنوية هنا مع خصومات مذهلة على معدات رياضية عالية الجودة...",
    },
    image: "/assets/banner.png",
    category: { en: "Sales", ar: "التخفيضات" },
    date: "2024-03-05",
    author: { en: "Lisa Wang", ar: "ليزا وانغ" },
    readTime: 2,
    featured: false,
    tags: {
      en: ["Sale", "Equipment", "Discount"],
      ar: ["تخفيضات", "معدات", "خصم"],
    },
  },
  {
    id: "6",
    title: {
      en: "PlayPro Mobile App 3.0: Enhanced Booking Experience",
      ar: "تطبيق بلاي برو للجوال 3.0: تجربة حجز محسنة",
    },
    excerpt: {
      en: "The latest version of our mobile app features improved navigation, real-time court availability, and integrated payment systems.",
      ar: "النسخة الأحدث من تطبيقنا للجوال تتميز بتنقل محسن وتوفر الملاعب في الوقت الفعلي وأنظمة دفع متكاملة.",
    },
    content: {
      en: "We're thrilled to announce the release of PlayPro Mobile App 3.0...",
      ar: "نحن متحمسون للإعلان عن إصدار تطبيق بلاي برو للجوال 3.0...",
    },
    image: "/assets/banner.png",
    category: { en: "App Update", ar: "تحديث التطبيق" },
    date: "2024-03-01",
    author: { en: "Alex Thompson", ar: "أليكس ثومبسون" },
    readTime: 4,
    featured: false,
    tags: {
      en: ["Mobile App", "Update", "UX"],
      ar: ["تطبيق الجوال", "تحديث", "تجربة المستخدم"],
    },
  },
];

const categories = [
  { en: "All", ar: "الكل" },
  { en: "Technology", ar: "التكنولوجيا" },
  { en: "E-Commerce", ar: "التجارة الإلكترونية" },
  { en: "Community", ar: "المجتمع" },
  { en: "Innovation", ar: "الابتكار" },
  { en: "Sales", ar: "التخفيضات" },
  { en: "App Update", ar: "تحديث التطبيق" },
];

const PlayProNewsPage: React.FC = () => {
  const [currentLanguage] = useState<"en" | "ar">("en");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    getLocalizedText("All", "الكل")
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const isRTL = currentLanguage === "ar";

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === getLocalizedText("All", "الكل") ||
      article?.category[currentLanguage] === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      article?.title[currentLanguage]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      article?.excerpt[currentLanguage]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(
    (article) => article?.featured
  );
  const regularArticles = filteredArticles.filter(
    (article) => !article?.featured
  );

  return (
    <div
      className={`min-h-screen mt-16 bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getLocalizedText("Our Latest", "أحدث مقالاتنا")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getLocalizedText(
              "Stay updated with the latest news, product launches, and innovations from PlayPro",
              "ابق على اطلاع بأحدث الأخبار وإطلاق المنتجات والابتكارات من بلاي برو"
            )}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className={`absolute ${isRTL ? "right-3" : "left-3"
                } top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
            />
            <input
              type="text"
              placeholder={getLocalizedText(
                "Search articles...",
                "البحث في المقالات..."
              )}
              className={`w-full ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                } py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category[currentLanguage]}>
                  {category[currentLanguage]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {getLocalizedText("Featured Stories", "القصص المميزة")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article: any) => {
                article = getLocalizedValues(article);
                return (
                  <article
                    key={article?.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={article?.image || "/assets/banner.png"}
                      alt={article?.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {article?.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {new Date(article?.date).toLocaleDateString(
                            currentLanguage === "ar" ? "ar-SA" : "en-US"
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {article?.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article?.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span className="mr-3 rtl:ml-3 rtl:mr-0">
                            {article?.author}
                          </span>
                          <Clock className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>
                            {article?.readTime}{" "}
                            {getLocalizedText("min read", "دقيقة قراءة")}
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                          {getLocalizedText("Read More", "اقرأ المزيد")}
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4 ml-1" />
                          ) : (
                            <ArrowRight className="w-4 h-4 ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {getLocalizedText("Latest News", "آخر الأخبار")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article: any) => {
              article = getLocalizedValues(article);
              return (
                <article
                  key={article?.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Image
                    width={100}
                    height={100}
                    src={article?.image || "/assets/banner.png"}
                    alt={article?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {article?.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(article?.date).toLocaleDateString(
                          currentLanguage === "ar" ? "ar-SA" : "en-US"
                        )}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article?.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {article?.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article?.author}</span>
                      <span>
                        {article?.readTime} {getLocalizedText("min", "د")}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {article?.tags.map((tag: any, index: any) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
                        >
                          <Tag className="w-3 h-3 inline mr-1 rtl:ml-1 rtl:mr-0" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {getLocalizedText(
                "No articles found",
                "لم يتم العثور على مقالات"
              )}
            </h3>
            <p className="text-gray-500">
              {getLocalizedText(
                "Try adjusting your search or filter criteria",
                "جرب تعديل معايير البحث أو التصفية"
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayProNewsPage;
