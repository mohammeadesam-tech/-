import { useMemo, useState } from 'react';
import { Check, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, MENU_DISHES } from '../data/menu';
import { Dish, DishCategory } from '../types';
import { DishImage } from './DishImage';

interface MenuSectionProps {
  onSelectDish: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc';

export function MenuSection({ onSelectDish, onQuickAdd }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const featuredDishes = useMemo(
    () => MENU_DISHES.filter((dish) => dish.featured).slice(0, 3),
    []
  );

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = MENU_DISHES.filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.categoryLabel.toLowerCase().includes(query) ||
        dish.ingredients.some((ing) => ing.toLowerCase().includes(query))
      );
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const handleQuickAddClick = (dish: Dish) => {
    onQuickAdd(dish);
    setRecentlyAddedId(dish.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === dish.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="menu" className="py-14 lg:py-20 bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Chef's Signature Highlights Row */}
        <div id="featured" className="mb-14 pb-12 border-b border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <p className="text-xs font-semibold text-[#8C1D18] mb-1.5">
                الأكثر طلباً في مطبخنا
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#181715]">
                أطباق الشيف المميزة اليوم
              </h2>
            </div>
            <p className="text-sm text-[#5C5A55] max-w-md">
              ثلاث وصفات مصرية راسخة تُحضّر حسب الطلب وتخرج ساخنة مباشرة من الفخار والشواية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDishes.map((dish) => {
              const isJustAdded = recentlyAddedId === dish.id;
              return (
                <article
                  key={`featured-${dish.id}`}
                  className="group bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="block w-full aspect-[4/3] overflow-hidden bg-[#EFECE5] text-right cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8C1D18]"
                  >
                    <DishImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-[#5C5A55] mb-1.5">
                      <span>{dish.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dish.servingLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#181715] mb-2 leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="text-right hover:text-[#8C1D18] transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </button>
                    </h3>
                    <p className="text-sm text-[#5C5A55] leading-relaxed line-clamp-2 mb-5 flex-1">
                      {dish.description}
                    </p>
                    <div className="pt-4 border-t border-black/8 flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-[#181715] tabular-nums">
                        {dish.price} ج.م
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectDish(dish)}
                          className="text-xs font-semibold text-[#181715] hover:text-[#8C1D18] px-3 py-2 rounded-lg border border-black/15 hover:border-black/30 transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                        >
                          تخصيص
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAddClick(dish)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#14532D] text-white'
                              : 'bg-[#8C1D18] hover:bg-[#6F1511] text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                              <span>أُضيف</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                              <span>أضف للسلة</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Full Interactive Menu Header & Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#181715] mb-1.5">
                قائمة المأكولات الشرقية الكاملة
              </h2>
              <p className="text-sm text-[#5C5A55]">
                اختر القسم أو ابحث باسم الطبق، ويمكنك تخصيص الحجم والإضافات لكل وجبة.
              </p>
            </div>
            <span className="text-sm text-[#5C5A55] tabular-nums">
              عرض {filteredDishes.length} من أصل {MENU_DISHES.length} طبق
            </span>
          </div>

          {/* Search, Category Filter Tabs, Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Segmented Tabs */}
            <div
              role="tablist"
              aria-label="تصنيفات قائمة الطعام"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFECE5] rounded-xl"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C1D18] ${
                      isActive
                        ? 'bg-white text-[#181715] shadow-xs'
                        : 'text-[#5C5A55] hover:text-[#181715]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search
                  className="w-4 h-4 text-[#5C5A55] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  strokeWidth={1.75}
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث: ملوخية، كفتة، حمام..."
                  aria-label="ابحث في قائمة الطعام"
                  className="w-full bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg pr-10 pl-9 py-2.5 text-sm text-[#181715] placeholder:text-[#5C5A55]/70 outline-none min-h-[42px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="مسح البحث"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5C5A55] hover:text-[#181715] p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="relative flex items-center">
                <SlidersHorizontal
                  className="w-4 h-4 text-[#5C5A55] absolute right-3 pointer-events-none"
                  strokeWidth={1.75}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="ترتيب الأطباق"
                  className="w-full sm:w-auto bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg pr-9 pl-4 py-2.5 text-sm text-[#181715] outline-none min-h-[42px] cursor-pointer"
                >
                  <option value="default">الترتيب الافتراضي</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredDishes.length === 0 ? (
          <div className="bg-white border border-black/10 rounded-xl p-12 text-center">
            <p className="text-lg font-bold text-[#181715] mb-2">
              لم نجد أطباقاً مطابقة لبحثك
            </p>
            <p className="text-sm text-[#5C5A55] mb-6">
              جرّب البحث بكلمة أخرى مثل طاجن أو مشويات أو تصفح جميع الأقسام.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSortBy('default');
              }}
              className="bg-[#181715] hover:bg-[#2F2D29] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors min-h-[42px] cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const isJustAdded = recentlyAddedId === dish.id;
              return (
                <article
                  key={dish.id}
                  className="group bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="block w-full aspect-[4/3] overflow-hidden bg-[#EFECE5] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8C1D18]"
                  >
                    <DishImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-[#5C5A55] mb-1.5">
                      <span>{dish.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dish.prepTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dish.servingLabel}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#181715] mb-2 leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="text-right hover:text-[#8C1D18] transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </button>
                    </h3>

                    <p className="text-sm text-[#5C5A55] leading-relaxed line-clamp-2 mb-5 flex-1">
                      {dish.description}
                    </p>

                    <div className="pt-4 border-t border-black/8 flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-[#181715] tabular-nums">
                        {dish.price} ج.م
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectDish(dish)}
                          className="text-xs font-semibold text-[#181715] hover:text-[#8C1D18] px-3 py-2 rounded-lg border border-black/15 hover:border-black/30 transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                        >
                          التفاصيل
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAddClick(dish)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#14532D] text-white'
                              : 'bg-[#8C1D18] hover:bg-[#6F1511] text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                              <span>تمت الإضافة</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                              <span>أضف للسلة</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
