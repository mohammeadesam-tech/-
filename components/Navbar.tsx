import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-2xl sm:text-3xl font-bold text-[#181715] tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C1D18]"
        >
          المضيفة
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5A55]"
        >
          <a
            href="#menu"
            className="hover:text-[#181715] hover:underline underline-offset-8 decoration-[#8C1D18] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            القائمة
          </a>
          <a
            href="#featured"
            className="hover:text-[#181715] hover:underline underline-offset-8 decoration-[#8C1D18] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            الأطباق المميزة
          </a>
          <a
            href="#story"
            className="hover:text-[#181715] hover:underline underline-offset-8 decoration-[#8C1D18] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            قصتنا
          </a>
          <a
            href="#reserve"
            className="hover:text-[#181715] hover:underline underline-offset-8 decoration-[#8C1D18] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            احجز طاولة
          </a>
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2.5 bg-[#8C1D18] hover:bg-[#6F1511] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C1D18]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            <span>سلة الطلبات</span>
            <span className="tabular-nums text-xs bg-white/15 px-2 py-0.5 rounded">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
