import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types';
import { DishImage } from './DishImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

const FREE_DELIVERY_THRESHOLD = 500;
const BASE_DELIVERY_FEE = 45;

const CAIRO_DISTRICTS = [
  'الزمالك',
  'المهندسين والدقي',
  'وسط البلد وجاردن سيتي',
  'المعادي ودار السلام',
  'مدينة نصر ومصر الجديدة',
  'التجمع الخامس والقاهرة الجديدة',
  'الشيخ زايد وأكتوبر',
];

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(CAIRO_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (items.length === 0 && step === 'checkout') {
      setStep('cart');
    }
  }, [items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleCheckoutSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMsg('');

    const trimmedName = customerName.trim();
    const cleanedPhone = phone.replace(/\s+/g, '');
    const trimmedAddress = address.trim();

    if (trimmedName.length < 3) {
      setErrorMsg('يرجى كتابة اسم المستلم كاملاً.');
      return;
    }
    if (!/^(01[0125]\d{8}|02\d{8})$/.test(cleanedPhone)) {
      setErrorMsg('يرجى إدخال رقم موبايل مصري صحيح للتواصل عند التوصيل.');
      return;
    }
    if (trimmedAddress.length < 8) {
      setErrorMsg('يرجى كتابة العنوان بالتفصيل (اسم الشارع، رقم العقار، الشقة).');
      return;
    }

    const orderNumber = `EG-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      orderNumber,
      customerName: trimmedName,
      phone: cleanedPhone,
      district,
      address: trimmedAddress,
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      estimatedTime: '٣٥ – ٤٥ دقيقة',
    });

    onClearCart();
    setStep('receipt');
  };

  const handleCloseDrawer = () => {
    if (step === 'receipt') {
      setStep('cart');
      setReceipt(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="سلة الطلبات"
      onClick={handleCloseDrawer}
    >
      <aside
        className="w-full max-w-md bg-[#FAFAF7] h-full flex flex-col border-r border-black/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8C1D18]" strokeWidth={1.75} />
            <h2 className="font-display text-2xl font-bold text-[#181715]">
              {step === 'receipt'
                ? 'تأكيد الطلب'
                : step === 'checkout'
                  ? 'بيانات التوصيل'
                  : 'سلة الطلبات'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="إغلاق السلة"
            className="p-2 rounded-lg text-[#5C5A55] hover:text-[#181715] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt View */}
        {step === 'receipt' && receipt ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-center gap-3 text-[#14532D] mb-3">
                <CheckCircle2 className="w-7 h-7 shrink-0" strokeWidth={1.75} />
                <div>
                  <p className="text-xs font-semibold">تم إرسال الطلب للمطبخ</p>
                  <p className="font-display text-2xl font-bold text-[#181715] tabular-nums">
                    طلب رقم {receipt.orderNumber}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#5C5A55] leading-relaxed">
                جاري تجهيز طعامك طازجاً الآن يا {receipt.customerName}. وقت الوصول المتوقع:{' '}
                <span className="font-semibold text-[#181715]">
                  {receipt.estimatedTime}
                </span>
                .
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-xl p-5 space-y-3 text-sm">
              <h3 className="font-bold text-[#181715] pb-2 border-b border-black/10">
                ملخص الأصناف
              </h3>
              {receipt.items.map((item) => (
                <div key={item.cartKey} className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#181715]">
                      {item.quantity} × {item.name}
                    </p>
                    <p className="text-xs text-[#5C5A55]">{item.portionLabel}</p>
                  </div>
                  <span className="font-semibold tabular-nums text-[#181715] shrink-0">
                    {item.unitPrice * item.quantity} ج.م
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-black/10 space-y-1.5">
                <div className="flex justify-between text-[#5C5A55]">
                  <span>المجموع الفرعي</span>
                  <span className="tabular-nums">{receipt.subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-[#5C5A55]">
                  <span>التوصيل ({receipt.district})</span>
                  <span className="tabular-nums">
                    {receipt.deliveryFee === 0 ? 'مجاني' : `${receipt.deliveryFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#181715] text-base pt-1.5 border-t border-black/10">
                  <span>الإجمالي المستحق</span>
                  <span className="tabular-nums">{receipt.total} ج.م</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-xl p-5 text-sm space-y-1.5">
              <p className="font-bold text-[#181715]">عنوان وطريقة الدفع</p>
              <p className="text-[#5C5A55]">
                {receipt.district} — {receipt.address}
              </p>
              <p className="text-[#5C5A55]">
                الدفع:{' '}
                {receipt.paymentMethod === 'cash'
                  ? 'نقداً عند الاستلام'
                  : 'بطاقة بنكية عند الاستلام'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="w-full bg-[#181715] hover:bg-[#2F2D29] text-white text-sm font-semibold py-3.5 rounded-lg transition-colors min-h-[46px] cursor-pointer"
            >
              العودة إلى القائمة
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-10 h-10 text-[#5C5A55]/60 mb-3" strokeWidth={1.5} />
            <p className="text-lg font-bold text-[#181715] mb-1.5">سلتك فارغة حالياً</p>
            <p className="text-sm text-[#5C5A55] mb-6 max-w-xs">
              أضف أطباقك المفضلة من طواجن الفخار أو مشويات الفحم لتصلك ساخنة حتى باب البيت.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#8C1D18] hover:bg-[#6F1511] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors min-h-[44px] cursor-pointer"
            >
              استكشف القائمة
            </button>
          </div>
        ) : step === 'checkout' ? (
          /* COD Checkout Form */
          <form
            onSubmit={handleCheckoutSubmit}
            className="flex-1 flex flex-col overflow-hidden"
            noValidate
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label
                  htmlFor="order-name"
                  className="block text-xs font-semibold text-[#181715] mb-1.5"
                >
                  اسم المستلم
                </label>
                <input
                  id="order-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="سارة محمد علي"
                  className="w-full bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-phone"
                  className="block text-xs font-semibold text-[#181715] mb-1.5"
                >
                  رقم الموبايل المصري
                </label>
                <input
                  id="order-phone"
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-right outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-district"
                  className="block text-xs font-semibold text-[#181715] mb-1.5"
                >
                  المنطقة داخل القاهرة والجيزة
                </label>
                <select
                  id="order-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm outline-none min-h-[42px] cursor-pointer"
                >
                  {CAIRO_DISTRICTS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="order-address"
                  className="block text-xs font-semibold text-[#181715] mb-1.5"
                >
                  العنوان بالتفصيل
                </label>
                <textarea
                  id="order-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="اسم الشارع، رقم العمارة، الدور، الشقة..."
                  className="w-full bg-white border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm outline-none resize-none"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#181715] mb-2">طريقة الدفع</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors min-h-[44px] cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-[#8C1D18] bg-[#8C1D18]/5 text-[#181715]'
                        : 'border-black/15 bg-white text-[#5C5A55]'
                    }`}
                  >
                    نقداً عند الاستلام
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-colors min-h-[44px] cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#8C1D18] bg-[#8C1D18]/5 text-[#181715]'
                        : 'border-black/15 bg-white text-[#5C5A55]'
                    }`}
                  >
                    بطاقة عند الاستلام
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="text-xs font-semibold text-[#8C1D18] bg-[#8C1D18]/8 px-3 py-2.5 rounded-lg"
                >
                  تنبيه: {errorMsg}
                </p>
              )}
            </div>

            <div className="p-6 border-t border-black/10 bg-white space-y-3">
              <div className="flex justify-between text-sm font-bold text-[#181715]">
                <span>الإجمالي النهائي</span>
                <span className="tabular-nums">{total} ج.م</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="border border-black/20 hover:border-black/40 text-[#181715] text-sm font-semibold px-4 py-3 rounded-lg min-h-[46px] cursor-pointer"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#8C1D18] hover:bg-[#6F1511] text-white text-sm font-semibold py-3 rounded-lg transition-colors min-h-[46px] cursor-pointer"
                >
                  تأكيد وإرسال الطلب
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Cart Item List */
          <>
            {/* Free delivery threshold indicator */}
            <div className="px-6 py-3 bg-[#F2EFE8] border-b border-black/10">
              <p className="text-xs text-[#181715] font-medium mb-1.5">
                {remainingForFreeDelivery === 0
                  ? 'حصلت على توصيل مجاني لطلبك داخل القاهرة.'
                  : `أضف بقيمة ${remainingForFreeDelivery} ج.م للحصول على توصيل مجاني.`}
              </p>
              <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#14532D] transition-all duration-200"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 divide-y divide-black/10">
              {items.map((item) => (
                <div key={item.cartKey} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EFECE5] shrink-0">
                    <DishImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#181715] leading-snug">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartKey)}
                        aria-label={`حذف ${item.name}`}
                        className="text-[#5C5A55] hover:text-[#8C1D18] p-1 shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#5C5A55] mb-2">
                      {item.portionLabel}
                      {item.addons.length > 0 &&
                        ` · ${item.addons.map((a) => a.label).join('، ')}`}
                    </p>

                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-black/15 bg-white rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, -1)}
                          aria-label="تقليل الكمية"
                          className="p-1.5 text-[#181715] hover:text-[#8C1D18] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, 1)}
                          aria-label="زيادة الكمية"
                          className="p-1.5 text-[#181715] hover:text-[#8C1D18] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-[#181715]">
                        {item.unitPrice * item.quantity} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-black/10 bg-white space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#5C5A55]">
                  <span>المجموع الفرعي</span>
                  <span className="tabular-nums">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-[#5C5A55]">
                  <span>رسوم التوصيل</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? 'مجاني' : `${deliveryFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#181715] pt-2 border-t border-black/10">
                  <span>الإجمالي</span>
                  <span className="tabular-nums">{total} ج.م</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full bg-[#8C1D18] hover:bg-[#6F1511] text-white text-sm font-semibold py-3.5 rounded-lg transition-colors min-h-[46px] cursor-pointer"
              >
                متابعة لإتمام الطلب
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
