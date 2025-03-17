import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Tour } from "@/types";
import { Calendar } from "primereact/calendar";
import { useLocale, useTranslations } from "next-intl";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createBooking } from "@/redux/bookingSlice";

export default function BookingForm({ tour }: { tour: Tour | null }) {
  const locale = useLocale();
  const t = useTranslations("tour");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.booking);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [isTransferSelected, setIsTransferSelected] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<any | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<{id: number, selected: boolean, price: number}[]>([]);

  // Fiyat hesaplama fonksiyonu
  useEffect(() => {
    if (!tour) return;

    // Tur fiyatı hesaplama
    // Yetişkin sayısı + 3 yaşından büyük çocuklar için ücret
    const childrenOver3 = childAges.filter(age => age > 3).length;
    const baseTourPrice = tour.tourPriceUSD * (adultCount + childrenOver3);
    
    // Ekstra ücretleri hesaplama
    const totalPersonCount = adultCount + childCount;
    const extrasPrice = selectedExtras
      .filter(extra => extra.selected)
      .reduce((total, extra) => total + (extra.price * totalPersonCount), 0);
    
    // Transfer ücreti hesaplama
    let transferPrice = 0;
    if (isTransferSelected && selectedTransfer) {
      transferPrice = selectedTransfer.priceUSD * totalPersonCount;
    }
    
    // Toplam fiyat
    const calculatedTotal = baseTourPrice + extrasPrice + transferPrice;
    setTotalPrice(calculatedTotal);
  }, [tour, adultCount, childCount, childAges, selectedExtras, isTransferSelected, selectedTransfer]);

  // Ekstra seçenekleri başlangıçta ayarla
  useEffect(() => {
    if (tour?.tourExtras) {
      const initialExtras = tour.tourExtras.map(extra => ({
        id: Number(extra.id),
        selected: false,
        price: extra.priceUSD
      }));
      setSelectedExtras(initialExtras);
    }
  }, [tour]);

  // Checkbox değişim handler'ı
  const handleCheckboxChange = () => {
    setIsTransferSelected((prev) => !prev);
    setSelectedTransfer(null);
  };

  // Transfer değişim handler'ı
  const handleTransferChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tour?.transfers.find(
      (transfer) => transfer.cityName === event.target.value
    );

    if (selected) {
      setSelectedTransfer(selected);
    }
  };

  // Ekstra seçenekleri değiştirme handler'ı
  const handleExtraChange = (extraId: number, checked: boolean) => {
    setSelectedExtras(prevExtras => 
      prevExtras.map(extra => 
        extra.id === extraId ? { ...extra, selected: checked } : extra
      )
    );
  };

  // Çocuk sayısı değiştiğinde childAges dizisini güncelle
  const handleChildCountChange = (newCount: number) => {
    if (newCount < 0) return; // Negatif sayıya düşmesin
    setChildCount(newCount);
    setChildAges((prevAges) => {
      if (newCount > prevAges.length) {
        // Yeni çocuk eklendiğinde yaşları sıfırla
        return [...prevAges, ...Array(newCount - prevAges.length).fill(0)];
      } else {
        // Çocuk sayısı azaldığında, fazlalıkları sil
        return prevAges.slice(0, newCount);
      }
    });
  };

  // Çocuk yaşlarını güncelleme
  const handleAgeChange = (index: number, value: string) => {
    const age = parseInt(value, 10);
    if (!isNaN(age) && age >= 0 && age <= 17) {
      setChildAges((prevAges) => {
        const newAges = [...prevAges];
        newAges[index] = age;
        return newAges;
      });
    }
  };

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    // Rezervasyon işlemi yapılabilir.
    // dispatch(createBooking({ date, time, adultCount, childCount, childAges }));
  };

  return (
    <div className="content-booking-form">
      {/* Tarih Seçimi */}
      <div className="item-line-booking">
        {" "}
        <strong className="text-md-bold neutral-1000">{t("Tarih")}:</strong>
        <span className="p-float-label" style={{ position: "relative" }}>
          <Calendar
            minDate={new Date()}
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            locale="en"
            style={{ background: "white" }}
            dateFormat="dd/mm/yy"
            placeholder={t("Reservation Date")}
          />
          {/* <CiCalendar
              color="gray"
              size={28}
              style={{ position: "absolute", right: 10, top: 11 }}
            /> */}
        </span>
      </div>

      {/* Saat Seçimi */}
      <div className="item-line-booking">
        <strong className="text-md-bold neutral-1000">{t("Hours")}:</strong>
        <div className="line-booking-right flex-wrap">
          {tour?.startTimes?.map((item, index) => {
            const formattedTime = item.startTime.substring(0, 5);
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="time"
                  value={formattedTime}
                  onChange={(e) => setTime(e.target.value)}
                />
                {formattedTime}
              </label>
            );
          })}
        </div>
      </div>

      {/* Bilet Seçimi */}
      <div className="item-line-booking">
        <div className="box-tickets">
          <strong className="text-md-bold neutral-1000">{t("Ticket")}:</strong>
          <div className="line-booking-tickets">
            {/* Yetişkinler */}
            <div className="item-ticket">
              <p className="text-md-medium neutral-500 mr-60">Adults:</p>
              <p className="text-md-medium neutral-500">{adultCount}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-lg font-semibold border border-gray-500 rounded-md hover:bg-gray-100 transition"
                onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
              >
                -
              </button>
              <button
                className="px-3 py-1 text-lg font-semibold border border-gray-500 rounded-md hover:bg-gray-100 transition"
                onClick={() => setAdultCount(Math.min(9, adultCount + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Çocuklar */}
          <div className="line-booking-tickets">
            <div className="item-ticket">
              <p className="text-md-medium neutral-500 mr-45">Children:</p>
              <p className="text-md-medium neutral-500">{childCount}</p>
            </div>
            <div>
              <button
                className="px-3 py-1 mt-2 text-lg font-semibold border border-gray-500 rounded-md hover:bg-gray-100 transition"
                onClick={() => handleChildCountChange(Math.max(0, childCount - 1))}
              >
                -
              </button>
              <button
                className="px-3 py-1 text-lg font-semibold border border-gray-500 rounded-md hover:bg-gray-100 transition"
                onClick={() => handleChildCountChange(Math.min(4, childCount + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Çocuk yaşları */}
          {childCount > 0 && (
            <div className="item-line-booking">
              {childAges.map((age, index) => (
                <div key={index} className="mt-2">
                  <label className="text-sm-medium neutral-500">
                    {index + 1}. Çocuk
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="17"
                    placeholder={`Çocuk ${index + 1} Yaşı`}
                    value={age}
                    onChange={(e) => handleAgeChange(index, e.target.value)}
                    className="!w-20 !h-10 border border-gray-400 rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Ekstra Seçenekler */}
      <div className="item-line-booking">
        <div className="box-tickets">
          <strong className="text-md-bold neutral-1000">{t("Ekstra")}:</strong>
          <div className="line-booking-tickets">
            <div className="item-ticket">
              <ul className="list-filter-checkbox">
                {tour?.tourExtras.map((extra, index) => (
                  <li key={index}>
                    <label className="cb-container">
                      <input 
                        type="checkbox" 
                        onChange={(e) => handleExtraChange(Number(extra.id), e.target.checked)}
                        checked={selectedExtras.find(item => item.id === Number(extra.id))?.selected || false}
                      />
                      <span className="text-sm-medium">{extra.name}</span>
                      <span className="checkmark" />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="include-price">
              <ul>
                {tour?.tourExtras.map((extra, index) => (
                  <li key={index} className="text-md-bold neutral-1000">
                    ${extra.priceUSD}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Seçimi */}
      <div className="item-line-booking">
        <div className="box-tickets">
          <strong className="text-md-bold neutral-1000">{t("Transfer")}:</strong>
          <div className="line-booking-tickets">
            <input 
              type="checkbox" 
              checked={isTransferSelected} 
              onChange={handleCheckboxChange} 
              style={{ width: "20px", height: "20px", marginRight: "20px", marginTop: "12px" }} 
            />
            {isTransferSelected &&
              <select
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleTransferChange}
                value={selectedTransfer?.cityName || ""}
              >
                <option value="">Transfer Seçiniz</option>
                {tour?.transfers.map((transfer, index) => (
                  <option key={index} value={transfer.cityName}>
                    {transfer.cityName} - {transfer.stateName} (${transfer.priceUSD})
                  </option>
                ))}
              </select>
            }
          </div>
        </div>
      </div>

      {/* Toplam Fiyat */}
      <div className="item-line-booking last-item">
        <strong className="text-md-bold neutral-1000">{t("Toplam")}:</strong>
        <div className="line-booking-right">
          <p className="text-xl-bold neutral-1000">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Rezervasyon butonu */}
      <div className="box-button-book">
        <a className="btn btn-book" href="/tr/reservation">
          {t("book")}
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 15L15 8L8 1M15 8L1 8"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Yardım Linki */}
      <div className="box-need-help">
        <a href="/tr/faq">
          <svg width={12} height={14} viewBox="0 0 12 14" fill="none">
            <path
              d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
              fill="#0D0D0D"
            />
          </svg>
          {t("yardım")}
        </a>
      </div>
    </div>
  );
}
