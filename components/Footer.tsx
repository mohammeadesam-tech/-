import { Phone } from 'lucide-react';
import { BRANCHES } from '../data/menu';

export function Footer() {
  return (
    <footer className="bg-[#181715] text-[#FAFAF7] py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-bold text-white mb-3">المضيفة</p>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm mb-4">
              مطبخ المأكولات الشرقية المصرية الأصيلة منذ عام ١٩٨٨. طواجن فخار يومية،
              مشويات على الفحم، وحلويات شرقية تُعد بالسمن البلدي.
            </p>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white tabular-nums">
              <Phone className="w-4 h-4 text-[#D97706]" strokeWidth={1.75} />
              <span>الخط الساخن للطلبات: 19482</span>
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-white mb-3">الفروع وساعات العمل</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {BRANCHES.map((branch) => (
                <li key={branch.id}>
                  <span className="text-white font-medium">{branch.name}:</span>{' '}
                  {branch.address}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white mb-3">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <a href="#featured" className="hover:text-white transition-colors">
                  أطباق الشيف المميزة
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  قائمة الطعام الكاملة
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  قصتنا ومطبخنا
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-white transition-colors">
                  حجز طاولة
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} مطعم المضيفة للمأكولات الشرقية المصرية. جميع الحقوق محفوظة.</p>
          <p className="text-white/80 font-medium">المطور: محمد عصام</p>
          <p>الأسعار شاملة ضريبة القيمة المضافة · التوصيل يومياً بالقاهرة والجيزة</p>
        </div>
      </div>
    </footer>
  );
}
