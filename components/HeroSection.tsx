import { ArrowLeft } from 'lucide-react';
import { HERO_IMAGE } from '../data/menu';
import { DishImage } from './DishImage';

export function HeroSection() {
  return (
    <section className="border-b border-black/10 bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-sm font-medium text-[#8C1D18] mb-3">
              مطبخ المضيفة · القاهرة منذ ١٩٨٨
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#181715] leading-[1.2] text-balance mb-5">
              مذاق البيت المصري الأصيل على أصوله
            </h1>
            <p className="text-base sm:text-lg text-[#5C5A55] leading-relaxed max-w-xl mb-8">
              من طواجن الفخار المكمورة في الفرن الحجري إلى مشويات الحاتي على فحم الزان
              والحمام المحشي بالفريك الصعيدي؛ نُعدّ كل طبق يومياً بالسمن البلدي النقي
              وبهارات خان الخليلي الطازجة.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-[#181715] hover:bg-[#2F2D29] text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181715]"
              >
                <span>تصفح قائمة الطعام</span>
                <ArrowLeft className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              </a>
              <a
                href="#reserve"
                className="inline-flex items-center justify-center border border-black/20 hover:border-black/40 bg-transparent text-[#181715] text-sm sm:text-base font-semibold px-6 py-3.5 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C1D18]"
              >
                احجز طاولة
              </a>
            </div>
          </div>

          {/* Balanced Hero Feast Image */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[430px] rounded-xl overflow-hidden bg-[#EFECE5] border border-black/10">
              <DishImage
                src={HERO_IMAGE}
                alt="سفرة مصرية شرقية متكاملة تضم طاجن فخار ومشويات على الفحم وحمام محشي وملوخية وعيش بلدي"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column culinary trust strip below the split */}
        <div className="mt-10 lg:mt-12 pt-8 border-t border-black/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:border-e lg:border-black/10 lg:pe-6">
            <p className="text-sm font-bold text-[#181715] mb-1">فخار على نار هادئة</p>
            <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
              طواجن يومية في أواني الفخار الفيومي بالفرن الحجري.
            </p>
          </div>
          <div className="lg:border-e lg:border-black/10 lg:pe-6">
            <p className="text-sm font-bold text-[#181715] mb-1">١٠٠٪ لحوم بلدية طازجة</p>
            <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
              ذبح يومي وتتبيلات طبيعية بالسمن البلدي بدون إضافات.
            </p>
          </div>
          <div className="lg:border-e lg:border-black/10 lg:pe-6">
            <p className="text-sm font-bold text-[#181715] mb-1">توصيل ساخن بالقاهرة</p>
            <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
              تغليف حراري يحفظ الطعم خلال ٣٥ إلى ٤٥ دقيقة.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#181715] mb-1">توصيل مجاني للعزومات</p>
            <p className="text-xs sm:text-sm text-[#5C5A55] leading-relaxed">
              شحن مجاني للطلبات فوق ٥٠٠ ج.م داخل فروعنا الثلاثة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
