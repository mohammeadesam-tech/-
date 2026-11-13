import { FormEvent, useState } from 'react';
import { CalendarCheck2, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { BRANCHES } from '../data/menu';
import { ReservationReceipt } from '../types';

export function StoryAndReserveSection() {
  const today = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0].name);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState('4');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<ReservationReceipt | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const cleanedPhone = phone.replace(/\s+/g, '');

    if (trimmedName.length < 3) {
      setErrorMsg('يرجى إدخال الاسم الكامل لتأكيد الحجز.');
      return;
    }

    if (!/^(01[0125]\d{8}|02\d{8})$/.test(cleanedPhone)) {
      setErrorMsg('يرجى إدخال رقم هاتف مصري صحيح (مثال: 01012345678).');
      return;
    }

    const code = `RSV-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      code,
      name: trimmedName,
      phone: cleanedPhone,
      branch,
      date,
      time,
      guests: Number(guests),
      notes: notes.trim() || undefined,
    });
  };

  const resetBooking = () => {
    setReceipt(null);
    setName('');
    setPhone('');
    setNotes('');
    setErrorMsg('');
  };

  return (
    <section id="story" className="py-14 lg:py-20 bg-[#F2EFE8] border-t border-black/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Craftsmanship & Cairo Branches Column */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[#8C1D18] mb-2">
              حكاية مطبخنا · منذ ١٩٨٨
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#181715] mb-5 text-balance">
              سر النفس المصري في الفخار والفحم
            </h2>
            <p className="text-base text-[#5C5A55] leading-relaxed mb-5">
              بدأت «المضيفة» كبيت ضيافة عائلي في قلب القاهرة، وتوارثت أصول الطبخ
              المصري الأصيل دون اختصارات: نعتمد على طواجن الفخار المصنوعة يدوياً في
              الفيوم، والسمن البلدي الفلاحي، والفريك الصعيدي المنقى على اليد،
              والشواء على فحم الزان الطبيعي.
            </p>
            <p className="text-base text-[#5C5A55] leading-relaxed mb-8">
              سواء كنت تبحث عن غداء عائلي دافئ، أو عزومة رمضان أو مناسبة خاصة،
              تستقبلك صالاتنا في القاهرة بنفس كرم المائدة المصرية.
            </p>

            {/* Branches List separated by subtle hairline dividers */}
            <div className="border-t border-black/10 pt-6">
              <h3 className="text-sm font-bold text-[#181715] mb-4">فروعنا في القاهرة</h3>
              <div className="divide-y divide-black/10">
                {BRANCHES.map((item) => (
                  <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-sm text-[#181715] inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#8C1D18] shrink-0" strokeWidth={1.75} />
                        {item.name}
                      </span>
                      <span className="text-xs text-[#5C5A55] inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                        {item.hours}
                      </span>
                    </div>
                    <p className="text-sm text-[#5C5A55] pe-5">{item.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Table Reservation Column */}
          <div
            id="reserve"
            className="lg:col-span-6 bg-white border border-black/10 rounded-2xl p-6 sm:p-8"
          >
            {receipt ? (
              <div className="py-4">
                <div className="flex items-center gap-3 text-[#14532D] mb-4">
                  <CheckCircle2 className="w-7 h-7 shrink-0" strokeWidth={1.75} />
                  <div>
                    <p className="text-xs font-semibold">تم تأكيد حجز الطاولة</p>
                    <h3 className="font-display text-2xl font-bold text-[#181715]">
                      رقم الحجز <span className="tabular-nums">{receipt.code}</span>
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#5C5A55] mb-6 leading-relaxed">
                  في انتظارك يا {receipt.name}. تم تسجيل طاولتك بنجاح وسيتواصل معك
                  مضيف الفرع قبل الموعد بساعة للتأكيد النهائي.
                </p>

                <dl className="divide-y divide-black/8 border-y border-black/10 text-sm mb-6">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#5C5A55]">الفرع</dt>
                    <dd className="font-semibold text-[#181715]">{receipt.branch}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#5C5A55]">التاريخ والوقت</dt>
                    <dd className="font-semibold text-[#181715] tabular-nums">
                      {receipt.date} · {receipt.time}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#5C5A55]">عدد الضيوف</dt>
                    <dd className="font-semibold text-[#181715] tabular-nums">
                      {receipt.guests} أفراد
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#5C5A55]">رقم الهاتف</dt>
                    <dd className="font-semibold text-[#181715] tabular-nums" dir="ltr">
                      {receipt.phone}
                    </dd>
                  </div>
                  {receipt.notes && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[#5C5A55]">ملاحظات</dt>
                      <dd className="font-medium text-[#181715] text-left">
                        {receipt.notes}
                      </dd>
                    </div>
                  )}
                </dl>

                <button
                  type="button"
                  onClick={resetBooking}
                  className="w-full border border-black/20 hover:border-black/40 text-[#181715] text-sm font-semibold py-3 rounded-lg transition-colors min-h-[44px] cursor-pointer"
                >
                  حجز طاولة أخرى
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <CalendarCheck2 className="w-5 h-5 text-[#8C1D18]" strokeWidth={1.75} />
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#181715]">
                    احجز طاولة أو عزومة عائلية
                  </h3>
                </div>
                <p className="text-sm text-[#5C5A55] mb-6">
                  احجز مكانك مسبقاً في أي من فروعنا لتجنب الانتظار في أوقات الذروة.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="reserve-name"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        الاسم الكامل
                      </label>
                      <input
                        id="reserve-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أحمد محمود"
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reserve-phone"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        رقم الموبايل
                      </label>
                      <input
                        id="reserve-phone"
                        type="tel"
                        required
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01012345678"
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] text-right outline-none min-h-[42px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="reserve-branch"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        الفرع
                      </label>
                      <select
                        id="reserve-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px] cursor-pointer"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="reserve-guests"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        عدد الأفراد
                      </label>
                      <select
                        id="reserve-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px] cursor-pointer"
                      >
                        {[2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} أفراد
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="reserve-date"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        التاريخ
                      </label>
                      <input
                        id="reserve-date"
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reserve-time"
                        className="block text-xs font-semibold text-[#181715] mb-1.5"
                      >
                        الساعة
                      </label>
                      <select
                        id="reserve-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px] cursor-pointer"
                      >
                        <option value="13:00">١:٠٠ ظهراً</option>
                        <option value="15:00">٣:٠٠ عصراً</option>
                        <option value="18:00">٦:٠٠ مساءً</option>
                        <option value="20:00">٨:٠٠ مساءً</option>
                        <option value="22:00">١٠:٠٠ مساءً</option>
                        <option value="23:30">١١:٣٠ مساءً</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reserve-notes"
                      className="block text-xs font-semibold text-[#181715] mb-1.5"
                    >
                      ملاحظات إضافية (اختياري)
                    </label>
                    <input
                      id="reserve-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="طاولة عائلية هادئة، تجهيز صينية حمام..."
                      className="w-full bg-[#FAFAF7] border border-black/15 focus:border-[#8C1D18] rounded-lg px-3.5 py-2.5 text-sm text-[#181715] outline-none min-h-[42px]"
                    />
                  </div>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-xs font-semibold text-[#8C1D18] bg-[#8C1D18]/8 px-3 py-2.5 rounded-lg"
                    >
                      تنبيه: {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#181715] hover:bg-[#2F2D29] text-white text-sm font-semibold py-3.5 rounded-lg transition-colors min-h-[46px] cursor-pointer"
                  >
                    تأكيد حجز الطاولة
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
