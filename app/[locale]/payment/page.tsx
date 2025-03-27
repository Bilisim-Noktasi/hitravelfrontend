"use client";
import Layout from "@/components/layout/Layout";
import News1 from "@/components/sections/News1";
import { Link } from "@/i18n/routing";
import React, { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, clearPayment, setError } from '@/redux/paymentSlice';
import { AppDispatch, RootState } from '@/redux/store';

export default function Payment() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const { token } = useAuth();
  
  // Redux kullanımı
  const dispatch = useDispatch<AppDispatch>();
  const { 
    isLoading: paymentIsLoading,
    error: paymentError,
    success: paymentSuccess,
    paymentUrl
  } = useSelector((state: RootState) => state.payment);
  
  // State tanımlamaları
  const [vkn, setVkn] = useState("");
  const [name, setName] = useState<string | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [surname, setSurname] = useState<string | undefined>(undefined);
  const [showBankTransferForm, setShowBankTransferForm] = useState(false);
  const [showTourPayForm, setShowTourPayForm] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(true);
  const [note, setNote] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(undefined);
  const [cvv, setCvv] = useState<string | undefined>(undefined);
  const [privacy, setPrivacy] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [showPrepaymentForm, setShowPrepaymentForm] = useState(false);
  const [tc, setTc] = useState<string | undefined>(undefined);
  const [cardHolderName, setCardHolderName] = useState<string | undefined>(undefined);
  
  // Rezervasyon bilgileri
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Ödeme işlemi durumunun Redux üzerinden takibi
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Çeviriler
  const t = useTranslations("pay");
  const t2 = useTranslations("book");

  const fetchBookingDetails = async () => {
    if (!bookingId) {
      console.error("Booking ID not found");
      setLoading(false);
      return;
    }

    try {
      // Önce session storage'dan rezervasyon bilgilerini kontrol et
      const storedData = sessionStorage.getItem('bookingData');
      const storedBookingResponse = sessionStorage.getItem('bookingResponse');
      
      // Eğer bookingResponse (API yanıtı) session storage'da varsa öncelikle onu kullan
      if (storedBookingResponse) {
        try {
          const parsedBookingResponse = JSON.parse(storedBookingResponse);
          console.log("Using booking response from session storage:", parsedBookingResponse);
          setBookingData(parsedBookingResponse);
          setLoading(false);
          return;
        } catch (parseError) {
          console.error("Error parsing booking response from storage:", parseError);
        }
      }
      
      // Eğer varsa storage'dan veriyi al (rezervasyon formunda girilen veriler)
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Using booking data from session storage:", parsedData);
          setBookingData(parsedData);
          setLoading(false);
          return;
        } catch (parseError) {
          console.error("Error parsing booking data from storage:", parseError);
        }
      }

      // Eğer sessionStorage'da veri yoksa ve token varsa API'den deneyelim
      if (token) {
        // API'den rezervasyon detaylarını al
        const response = await axios.get(
          `https://api.hitravel.com.tr/api/Bookings/${bookingId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log("API response:", response.data);
        setBookingData(response.data);
      } else {
        // Token yoksa ve sessionStorage'da da veri bulunamadıysa
        console.error("No booking data found and user is not authenticated");
        setPaymentError("Rezervasyon bilgileri bulunamadı");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setPaymentError("Rezervasyon bilgileri alınırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde API'den rezervasyon verilerini al
  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId, token]);
  
  const handleCheckboxChange = () => {
    setShowBillingInfo(!showBillingInfo);
  };
  
  const handleVknChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setVkn(value);
  };
  
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setShowCreditCardForm(false);
    setShowBankTransferForm(false);
    setShowPrepaymentForm(false);
    setShowTourPayForm(false);
  };
  
  const toggleBankTransferForm = () => {
    setShowBankTransferForm(true);
    setShowCreditCardForm(false);
    setShowTourPayForm(false);
    setShowPrepaymentForm(false);
    setIsFormVisible(false);
  };
  
  const toggleCreditCardForm = () => {
    setShowCreditCardForm(true);
    setShowBankTransferForm(false);
    setShowPrepaymentForm(false);
    setShowTourPayForm(false);
    setIsFormVisible(false);
  };
  
  const togglePrepaymentForm = () => {
    setShowPrepaymentForm(true);
    setShowCreditCardForm(false);
    setShowBankTransferForm(false);
    setShowTourPayForm(false);
    setIsFormVisible(false);
  };
  
  const toggleTourPayForm = () => {
    setShowTourPayForm(true);
    setShowCreditCardForm(false);
    setShowBankTransferForm(false);
    setShowPrepaymentForm(false);
    setIsFormVisible(false);
  };
  
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    if (selectedPaymentMethod === selectedValue) return;

    setSelectedPaymentMethod(selectedValue);

    if (selectedValue === "creditCard") {
      setShowCreditCardForm(true);
      setShowBankTransferForm(false);
      setShowPrepaymentForm(false);
      setIsFormVisible(false);
    } else if (selectedValue === "bankTransfer") {
      setShowCreditCardForm(false);
      setShowBankTransferForm(true);
      setShowPrepaymentForm(false);
      setIsFormVisible(false);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);

    // Form verilerini doğrula
    if (!cardHolderName || !cardNumber || !expirationDate || !cvv) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Ödeme verileri hazırla
      const paymentData = {
        bookingId: bookingId || '',
        paymentMethod: selectedPaymentMethod,
        amount: bookingData.totalPrice,
        currency: bookingData.currency || "USD",
        cardDetails: {
          cardHolderName,
          cardNumber: cardNumber?.replace(/\s/g, ''),
          expirationMonth: expirationDate?.split('/')[0],
          expirationYear: "20" + (expirationDate?.split('/')[1] || ""),
          cvv
        },
        billingInfo: showBillingInfo ? {
          companyName: (document.getElementById('billingName') as HTMLInputElement)?.value || "",
          taxId: vkn,
          taxOffice: (document.getElementById('vergiDairesi') as HTMLInputElement)?.value || "",
          billingAddress: (document.getElementById('billingAddress') as HTMLInputElement)?.value || ""
        } : null
      };

      console.log("Payment data:", paymentData);

      // Redux ile ödeme işlemini yap
      const resultAction = await dispatch(processPayment(paymentData));
      
      if (processPayment.fulfilled.match(resultAction)) {
        // Ödeme başarılı olduktan sonra rezervasyon verisini temizle
        sessionStorage.removeItem('bookingData');
        sessionStorage.removeItem('bookingResponse');
        
        // Eğer ödeme URL'i varsa redirect yapılabilir
        if (resultAction.payload.paymentUrl) {
          window.location.href = resultAction.payload.paymentUrl;
        } else {
          // Teşekkür sayfasına yönlendir
          setTimeout(() => {
            router.push(`/${locale}/thank-you?paymentId=${resultAction.payload.id || ''}`);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redux'taki ödeme durumunun değişimini izle
  useEffect(() => {
    return () => {
      // Component unmount olduğunda payment state'ini temizle
      dispatch(clearPayment());
    };
  }, [dispatch]);

  // Redux üzerinden error mesajı ayarlamak için action creator tanımla
  const setPaymentError = (errorMessage: string) => {
    // Burada error mesajını Redux state'e atıyoruz
    // Bu action paymentSlice.ts'de tanımlanmalı
    dispatch(setError(errorMessage));
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <section className="box-section box-breadcrumb background-body py-4">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">{t("ana")}</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li>
                <Link href="/">{t("pay")}</Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="section-box box-next-trips background-body">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8 mb-30">
                <h2 className="neutral-1000">{t("payment")} 💳</h2>
              </div>
            </div>
          </div>
        </section>
      
      {paymentSuccess ? (
        <div className="container my-5">
          <div className="alert alert-success p-4 text-center">
            <h3>{t("Ödeme başarılı!")}</h3>
            <p>{t("Teşekkür sayfasına yönlendiriliyorsunuz")}</p>
          </div>
        </div>
      ) : (
        <>
        <div
          className="row g-0 justify-content-center"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div
            className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-0"
            style={{ padding: "0 5px" }}
          >
            <button
              onClick={toggleCreditCardForm}
              className="btn btn-dark bg-black-2"
              style={{
                borderRadius: "4px",
                padding: "13px 20px",
                width: "140px",
                marginTop: "20px",
              }}
            >
              {t("kart")}
            </button>
          </div>

          <div
            className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-0"
            style={{ padding: "0 5px" }}
          >
            <button
              onClick={toggleBankTransferForm}
              className="btn btn-dark"
              style={{
                borderRadius: "4px",
                padding: "13px 20px",
                width: "140px",
                marginTop: "20px",
              }}
            >
              {t("he")}
            </button>
          </div>

          <div
            className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-0"
            style={{ padding: "0 5px" }}
          >
            <button
              onClick={togglePrepaymentForm}
              className="btn btn-dark"
              style={{
                borderRadius: "4px",
                padding: "12px 20px",
                width: "140px",
                marginTop: "20px",
              }}
            >
              {t("25")}
            </button>
          </div>

          <div
            className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-0"
            style={{ padding: "0 5px" }}
          >
            <button
              onClick={toggleTourPayForm}
              className="btn btn-dark"
              style={{
                borderRadius: "4px",
                padding: "12px 20px",
                width: "140px",
                marginTop: "20px",
              }}
            >
              {t("tour")}
            </button>
          </div>
        </div>

        {showCreditCardForm && (
          <section className="background-body py-8 mt-20">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="card p-4">
                    <div className="mb-5 d-flex flex-column">
                      {/* Kart Sahibi Adı */}
                      <div className="mb-4 col-12 ps-3">
                        <label
                          htmlFor="cardHolderName"
                          className="form-label"
                        >
                          {t("name")}
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white border"
                          id="cardHolderName"
                          value={cardHolderName}
                          onChange={(e) =>
                            setCardHolderName(
                              e.target.value.replace(
                                /[^a-zA-ZıİçÇşŞğĞöÖüÜ ]/g,
                                ""
                              )
                            )
                          }
                          placeholder={t("name")}
                        />
                      </div>

                      {/* Kart Numarası */}
                      <div className="mb-4 col-12 ps-3">
                        <label htmlFor="cardNumber" className="form-label">
                          {t("no")}
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white border"
                          id="cardNumber"
                          value={cardNumber}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 4) {
                              value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                            }
                            setCardNumber(value);
                          }}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                    </div>

                    <div className="mb-5 d-flex flex-column">
                      {/* Son Kullanma Tarihi (Expiration Date) */}
                      <div className="mb-4 col-12 ps-3">
                        <label
                          htmlFor="expirationDate"
                          className="form-label"
                        >
                          {t("skt")}
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white border"
                          id="expirationDate"
                          value={expirationDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 2) {
                              value =
                                value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            setExpirationDate(value);
                          }}
                            placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      {/* CVV */}
                      <div className="mb-4 col-12 ps-3">
                        <label htmlFor="cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control bg-white border"
                          id="cvv"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.slice(0, 4).replace(/\D/g, "")
                            )
                          }
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="container">
                      {/* Fatura Bilgileri Checkbox */}
                      <div className="mb-4 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="billingInfo"
                          checked={showBillingInfo}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="billingInfo"
                        >
                          {t("fatura")}
                        </label>
                      </div>

                      {/* Fatura Bilgileri Formu - Koşullu Render */}
                      {showBillingInfo && (
                        <div>
                          <div className="mb-4 col-12">
                            <label
                              htmlFor="billingName"
                              className="form-label"
                            >
                              {t("unvan")}
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white border"
                              id="billingName"
                                placeholder={t("Şirket Ünvanı")}
                            />
                          </div>

                          <div className="mb-4 col-12">
                            <label htmlFor="vkn" className="form-label">
                              {t("vkn")}
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white border"
                              id="vkn"
                              value={vkn}
                              onChange={handleVknChange}
                              placeholder="VKN/TC"
                              maxLength={11}
                            />
                          </div>

                          <div className="mb-4 col-12">
                            <label
                              htmlFor="vergiDairesi"
                              className="form-label"
                            >
                              {t("vd")}
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white border"
                              id="vergiDairesi"
                              placeholder={t("vd")}
                            />
                          </div>

                          <div className="mb-4 col-12">
                            <label
                              htmlFor="billingAddress"
                              className="form-label"
                            >
                                {t("add")}
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white border"
                              id="billingAddress"
                                placeholder={t("Fatura Adresi")}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                      
                      {/* Hata Mesajı */}
                      {paymentError && (
                        <div className="alert alert-danger mb-4">
                          {paymentError}
                        </div>
                      )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={paymentIsLoading || isSubmitting}
                      className="btn btn-dark w-100 h-30 items-center btn-custom mx-auto d-block"
                      style={{
                        backgroundColor: "#000000",
                        border: "2px solid #343a40",
                        borderRadius: "8px",
                        transition: "none",
                        marginTop: "20px",
                      }}
                    >
                      {paymentIsLoading ? t("islemYapiliyor") : t("payment") + " 💳"}
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-4 mt-4 mt-md-0">
                    <div className="card p-4">
                    <h5 className="mb-4">{t("sepetOzeti")}</h5>
                      {loading ? (
                        <div className="text-center py-4">
                          <p>{t("islemYapiliyor")}</p>
                        </div>
                      ) : bookingData ? (
                        <>
                          <div className="mb-4 background-3 neutral-500" style={{ borderRadius: "3px", padding: "20px" }}>
                      <div className="text-black text-md font-extrabold">
                              📍{bookingData.tourName}
                      </div>
                      <div className="neutral-500">
                              📆 {bookingData.tourDate || bookingData.date} - {bookingData.time}
                      </div>
                      <div className="neutral-500">
                              🎫 {t2("code")}: {bookingId || (bookingData.id && bookingData.id.substring(0, 8)) || (bookingData.tourId && bookingData.tourId.substring(0, 8))}
                      </div>
                    </div>
                          
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                            {bookingData.adultCount || (bookingData.adults && bookingData.adults.count) || 0} {t2("a")}
                            <span>
                              ${
                                bookingData.adultTotalPrice || 
                                (bookingData.adults && bookingData.adults.count * bookingData.adults.price) || 
                                0
                              }
                            </span>
                          </p>
                          
                          {((bookingData.childCount && bookingData.childCount > 0) || 
                            (bookingData.children && bookingData.children.length > 0)) && (
                            <>
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                                {bookingData.childCount || (bookingData.children && bookingData.children.length) || 0} {t2("ç")}
                                <span>
                                  ${
                                    bookingData.childTotalPrice || 
                                    (bookingData.children && bookingData.children.reduce((sum: number, child: any) => sum + child.price, 0)) || 
                                    0
                                  }
                                </span>
                              </p>
                            </>
                          )}
                          
                          {((bookingData.bookingExtras && bookingData.bookingExtras.length > 0) || 
                            (bookingData.extras && bookingData.extras.length > 0)) && (
                            <>
                              <hr className="w-100 border-secondary" />
                              <p className="d-flex justify-content-between">
                                {t2("Ekstralar")}
                                <span>
                                  ${
                                    bookingData.extrasTotalPrice || 
                                    (bookingData.bookingExtras && bookingData.bookingExtras.reduce(
                                      (sum: number, extra: any) => sum + (extra.price * (extra.quantity || 1)), 0
                                    )) ||
                                    (bookingData.extras && bookingData.extras.reduce(
                                      (sum: number, extra: any) => sum + (extra.price * (extra.quantity || 1)), 0
                                    )) || 
                                    0
                                  }
                                </span>
                              </p>
                            </>
                          )}
                          
                          {(bookingData.transfer || bookingData.transferId) && (
                            <>
                              <hr className="w-100 border-secondary" />
                              <p className="d-flex justify-content-between">
                                {t2("Transfer")} {bookingData.transfer && bookingData.transfer.cityName ? `- ${bookingData.transfer.cityName}` : ''}
                                <span>
                                  ${bookingData.transferPrice || (bookingData.transfer && bookingData.transfer.price) || 0}
                                </span>
                              </p>
                            </>
                          )}
                          
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between text-dark fw-bold">
                            {t2("total")}
                            <span>${bookingData.totalPrice}</span>
                          </p>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p>{t("Sepet bilgileri bulunamadı")}</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

          {/* Diğer ödeme formları da benzer şekilde düzenlenebilir */}
        {showBankTransferForm && (
          <section className="background-body py-8 mt-20">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="row">
                <div className="col-12 col-md-8">
                    <div className="card p-4">
                      <h5 className="mb-4">{t("Banka Havalesi ile Ödeme")}</h5>
                      <p>{t("Lütfen aşağıdaki banka hesabına ödeme yapın ve işlem açıklamasına rezervasyon numaranızı yazın.")}</p>
                      <div className="mt-4">
                        <p><strong>{t("Banka")}: </strong>Ziraat Bankası</p>
                        <p><strong>{t("Şube")}: </strong>Merkez</p>
                        <p><strong>IBAN: </strong>TR00 0000 0000 0000 0000 0000 00</p>
                        <p><strong>{t("Hesap Sahibi")}: </strong>Hi Travel Tourism</p>
                        <p className="mt-3">{t("Rezervasyon Numarası")}: <strong>{bookingId || "########"}</strong></p>
                      </div>
                    </div>
                  </div>

                <div className="col-12 col-md-4 mt-4 mt-md-0">
                  <div className="card p-4">
                    <h5 className="mb-4">{t("sepetOzeti")}</h5>
                      {loading ? (
                        <div className="text-center py-4">
                          <p>{t("Yükleniyor...")}</p>
                        </div>
                      ) : bookingData ? (
                        <>
                          <div className="mb-4 background-3 neutral-500" style={{ borderRadius: "3px", padding: "20px" }}>
                      <div className="text-black text-md font-extrabold">
                              📍{bookingData.tourName}
                      </div>
                      <div className="neutral-500">
                              📆 {bookingData.tourDate || bookingData.date} - {bookingData.time}
                      </div>
                      <div className="neutral-500">
                              🎫 {t2("code")}: {bookingId || (bookingData.id && bookingData.id.substring(0, 8)) || (bookingData.tourId && bookingData.tourId.substring(0, 8))}
                      </div>
                    </div>
                          
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                            {bookingData.adultCount || (bookingData.adults && bookingData.adults.count) || 0} {t2("a")}
                            <span>
                              ${
                                bookingData.adultTotalPrice || 
                                (bookingData.adults && bookingData.adults.count * bookingData.adults.price) || 
                                0
                              }
                            </span>
                          </p>
                          
                          {((bookingData.childCount && bookingData.childCount > 0) || 
                            (bookingData.children && bookingData.children.length > 0)) && (
                            <>
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                                {bookingData.childCount || (bookingData.children && bookingData.children.length) || 0} {t2("ç")}
                                <span>
                                  ${
                                    bookingData.childTotalPrice || 
                                    (bookingData.children && bookingData.children.reduce((sum: number, child: any) => sum + child.price, 0)) || 
                                    0
                                  }
                                </span>
                              </p>
                            </>
                          )}
                          
                  <hr className="w-100 border-secondary" />
                  <p className="d-flex justify-content-between text-dark fw-bold">
                            {t2("total")}
                            <span>${bookingData.totalPrice}</span>
                          </p>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p>{t("Sepet bilgileri bulunamadı")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
            </section>
          )}
        </>
      )}
      </Layout>
    </>
  );
}
