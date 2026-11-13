import { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Dish, DishAddon } from '../types';
import { DishImage } from './DishImage';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (
    dish: Dish,
    portionLabel: string,
    portionExtra: number,
    selectedAddons: DishAddon[],
    quantity: number
  ) => void;
}

export function DishDetailModal({ dish, onClose, onAddToCart }: DishDetailModalProps) {
  const [selectedPortionId, setSelectedPortionId] = useState<string>('');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dish) {
      setSelectedPortionId(dish.portions[0]?.id ?? '');
      setSelectedAddonIds([]);
      setQuantity(1);
    }
  }, [dish]);

  useEffect(() => {
    if (!dish) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) return null;

  const selectedPortion =
    dish.portions.find((p) => p.id === selectedPortionId) ?? dish.portions[0];
  const selectedAddons = dish.addons.filter((a) => selectedAddonIds.includes(a.id));
  const addonsSum = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = dish.price + (selectedPortion?.extraPrice ?? 0) + addonsSum;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onAddToCart(
      dish,
      selectedPortion?.label ?? 'فردي',
      selectedPortion?.extraPrice ?? 0,
      selectedAddons,
      quantity
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FAFAF7] border border-black/15 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Dish Media Column */}
          <div className="md:col-span-5 bg-[#EFECE5] min-h-[240px] md:min-h-full">
            <DishImage
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contiguous Purchase & Customization Module */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-xs text-[#5C5A55] mb-1">
                  {dish.categoryLabel} · {dish.prepTime} · {dish.servingLabel}
                </p>
                <h3
                  id="dish-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#181715]"
                >
                  {dish.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق تفاصيل الطبق"
                className="p-2 rounded-lg text-[#5C5A55] hover:text-[#181715] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#5C5A55] leading-relaxed mb-4">
              {dish.description}
            </p>

            {/* Ingredients Inline List */}
            <div className="mb-5 pb-4 border-b border-black/10">
              <p className="text-xs font-semibold text-[#181715] mb-1.5">المكونات الرئيسية</p>
              <p className="text-xs text-[#5C5A55] leading-relaxed">
                {dish.ingredients.join(' · ')}
              </p>
            </div>

            {/* Portion Selection */}
            <div className="mb-5">
              <p className="text-sm font-bold text-[#181715] mb-2.5">اختر الحجم</p>
              <div className="grid grid-cols-2 gap-2.5">
                {dish.portions.map((portion) => {
                  const isSelected = portion.id === selectedPortion?.id;
                  return (
                    <button
                      key={portion.id}
                      type="button"
                      onClick={() => setSelectedPortionId(portion.id)}
                      className={`px-3.5 py-2.5 rounded-lg border text-right transition-colors cursor-pointer min-h-[44px] ${
                        isSelected
                          ? 'border-[#8C1D18] bg-[#8C1D18]/5 text-[#181715]'
                          : 'border-black/15 bg-white text-[#5C5A55] hover:border-black/30'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{portion.label}</span>
                      <span className="block text-xs tabular-nums text-[#5C5A55]">
                        {portion.extraPrice === 0
                          ? `${dish.price} ج.م`
                          : `+${portion.extraPrice} ج.م`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Addons */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#181715] mb-2.5">إضافات جانبية اختيارية</p>
              <div className="space-y-2">
                {dish.addons.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                        checked
                          ? 'border-[#8C1D18] bg-[#8C1D18]/5'
                          : 'border-black/10 bg-white hover:border-black/25'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm text-[#181715]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                          className="accent-[#8C1D18] w-4 h-4 cursor-pointer"
                        />
                        <span>{addon.label}</span>
                      </span>
                      <span className="text-xs font-semibold text-[#5C5A55] tabular-nums">
                        +{addon.price} ج.م
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Confirm Action */}
            <div className="mt-auto pt-4 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="inline-flex items-center justify-between border border-black/15 bg-white rounded-lg px-2 py-1 min-h-[46px]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="تقليل الكمية"
                  className="p-2 text-[#181715] hover:text-[#8C1D18] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold tabular-nums text-[#181715]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="زيادة الكمية"
                  className="p-2 text-[#181715] hover:text-[#8C1D18] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 bg-[#8C1D18] hover:bg-[#6F1511] text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors min-h-[46px] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>إضافة إلى السلة</span>
                <span className="tabular-nums font-bold">{totalPrice} ج.م</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
