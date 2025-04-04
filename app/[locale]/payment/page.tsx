"use client";
import Layout from "@/components/layout/Layout";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useAuth from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { processPayment } from "@/redux/paymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/utils/dateUtils";

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { token } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const locale = params.locale as string;

  // Redux state'leri
  const { success } = useSelector((state: RootState) => state.payment);

  // Form state'leri
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1); // Default: Kredi Kartı
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(true);
  const [showBankTransferForm, setShowBankTransferForm] = useState(false);
  const [showPrepaymentForm, setShowPrepaymentForm] = useState(false);
  const [showTourPayForm, setShowTourPayForm] = useState(false);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [vkn, setVkn] = useState("");
  const [paymentIsLoading, setPaymentIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Rezervasyon bilgileri
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations("pay");
  const t2 = useTranslations("book");

  // Redux store'daki başarılı ödeme durumunu izleme
  useEffect(() => {
    if (success) {
      setPaymentSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/thank-you`);
      }, 2000);
    }
  }, [success, router, locale]);

  const handlePayment = async (method: number) => {
    if (!bookingId) {
      console.error("Rezervasyon ID bulunamadı.");
      return;
    }

    // Seçilen ödeme yöntemine göre formları göster/gizle
    setSelectedPaymentMethod(method);
    setShowCreditCardForm(method === 1);
    setShowBankTransferForm(method === 2);
    setShowPrepaymentForm(method === 3);
    setShowTourPayForm(method === 4);

    // Kredi kartı seçilmediyse ve doğrudan ödeme yapılacaksa
    if (method !== 1) {
      const paymentData = {
        bookingId,
        paymentMethod: method
      };

      setPaymentIsLoading(true);
      setIsSubmitting(true);
      setPaymentError(null);

      try {
        const result = await dispatch(processPayment(paymentData)).unwrap();
    
        if (result.status === "success" && result.content) {
          // 3D Secure doğrulama sayfasına yönlendir
          const encodedContent = encodeURIComponent(result.content);
          router.push(`/${locale}/payment/secure?content=${encodedContent}`);
        } else {
          setPaymentError("Ödeme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Ödeme başarısız:", error);
        setPaymentError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setPaymentIsLoading(false);
        setIsSubmitting(false);
      }
    }
  };

  // Rezervasyon verisini al
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;

      try {
        // 1. Önce bookingResponse verisini kontrol et (reservation sayfasından gelenler için)
        const bookingResponseData = sessionStorage.getItem("bookingResponse");
        if (bookingResponseData) {
          const parsedData = JSON.parse(bookingResponseData);
          setBookingData(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Rezervasyon alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, token]);

  const handleCheckboxChange = () => {
    setShowBillingInfo(!showBillingInfo);
  };

  const handleVknChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    setVkn(value);
  };

  // Ödeme işlemi
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expirationDate || !cvv) return;

    // Ödeme verisini oluştur
    const paymentData: any = {
      bookingId,
      paymentMethod: selectedPaymentMethod, // Seçilen ödeme yöntemi
    };

    // Eğer kredi kartı kullanılıyorsa, kart bilgilerini ekle
    if (selectedPaymentMethod === 1) {
      if (!cardNumber || !expirationDate || !cvv) {
        console.error("Kart bilgileri eksik!");
        return;
      }

      paymentData.cardNumber = cardNumber.replace(/\s/g, ""); // Boşlukları kaldır
      paymentData.expiryMonth = expirationDate.split("/")[0];
      paymentData.expiryYear = "20" + (expirationDate.split("/")[1] || "");
      paymentData.cvv = cvv;
      paymentData.cardHolderName = cardHolderName;
    }

    setPaymentIsLoading(true);
    setIsSubmitting(true);
    setPaymentError(null);

    try {
      const result = await dispatch(processPayment(paymentData)).unwrap();
    
      if (result.status === "success" && result.content) {
        // 3D Secure doğrulama sayfasına yönlendir
        const encodedContent = encodeURIComponent(result.content);
        router.push(`/${locale}/payment/secure?content=${encodedContent}`);
      } else {
        setPaymentError("Ödeme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Ödeme başarısız:", error);
      setPaymentError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setPaymentIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <section className="box-section box-breadcrumb background-body">
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
              <div className="col-lg-12">
                <h2 className="neutral-1000">{t("payment")} 💳</h2>
              </div>
            </div>
          </div>
        </section>

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
                  onClick={() => handlePayment(1)}
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
                  onClick={() => handlePayment(2)}
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
                  onClick={() => handlePayment(3)}
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
                  onClick={() => handlePayment(4)}
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
                            <p>{t("loading")}</p>
                          </div>
                        ) : bookingData ? (
                          <>
                            <div className="mb-4 background-3 neutral-500" style={{ borderRadius: "3px", padding: "20px" }}>
                              <div className="text-black text-md font-extrabold">
                                📍{bookingData.tourName}
                              </div>
                              <div className="neutral-500">
                                📆 {formatDate(bookingData.tourDate)}  {bookingData.tourStartTime}
                              </div>
                              <div className="neutral-500">
                                🎫 {t2("code")}: {bookingData.bookingCode}
                              </div>
                            </div>

                            <hr className="w-100 border-secondary" />
                            <p className="d-flex justify-content-between">
                              {bookingData.adultCount ||
                                (bookingData.adults && bookingData.adults.count) ||
                                (bookingData.adults && Array.isArray(bookingData.adults) && bookingData.adults.length) || 0} {t2("a")}
                              <span>
                                ${
                                  bookingData.adultTotalPrice ||
                                  (bookingData.adults && bookingData.adults.count && bookingData.adults.price && bookingData.adults.count * bookingData.adults.price) ||
                                  (bookingData.adults && Array.isArray(bookingData.adults) &&
                                    bookingData.adults.reduce((sum: number, adult: any) => sum + adult.price, 0)) ||
                                  0
                                }
                              </span>
                            </p>

                            {((bookingData.childCount && bookingData.childCount > 0) ||
                              (bookingData.children && Array.isArray(bookingData.children) && bookingData.children.length > 0)) && (
                                <>
                                  <hr className="w-100 border-secondary" />
                                  <p className="d-flex justify-content-between">
                                    {bookingData.childCount || (bookingData.children && bookingData.children.length) || 0} {t2("ç")}
                                    <span>
                                      ${
                                        bookingData.childTotalPrice ||
                                        (bookingData.children && Array.isArray(bookingData.children) &&
                                          bookingData.children.reduce((sum: number, child: any) => sum + child.price, 0)) ||
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

            {showBankTransferForm && (
              <section className="background-body py-8 mt-20">
                <div className="container max-w-6xl mx-auto px-4">
                  <div className="row">
                    <div className="col-12 col-md-8">
                      {/* İş Bankası Bölümü */}
                      <div className="container px-2 background-3 mb-4">
                        <div
                          className="row align-items-center"
                          style={{ paddingTop: "20px" }}
                        >
                          <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <img
                              src="/assets/imgs/page/pay/isbank.png"
                              alt="Travila"
                              style={{ width: "150px" }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div style={{ fontSize: "18px", lineHeight: "1.6" }}>
                              <p style={{ marginBottom: "10px" }}>
                                TR38 0006 4000 0016 2170 2119 93 (₺)
                              </p>
                              <p style={{ marginBottom: "10px" }}>
                                TR22 0006 4000 0026 2170 1258 49 ($)
                              </p>
                              <p>TR55 0006 4000 0026 2170 1261 28 (€)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 8 Bankası Bölümü */}
                      <div className="container px-2 background-7 mb-4">
                        <div
                          className="row align-items-center"
                          style={{ paddingTop: "15px" }}
                        >
                          <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <img
                              src="/assets/imgs/page/pay/8.png"
                              alt="Travila"
                              style={{ width: "150px" }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div style={{ fontSize: "18px", lineHeight: "1.6" }}>
                              <p style={{ marginBottom: "10px" }}>
                                TR54 0011 1000 0000 0143 1894 81 (₺)
                              </p>
                              <p style={{ marginBottom: "10px" }}>
                                TR54 0011 1000 0000 0143 1936 52($)
                              </p>
                              <p>TR62 0011 1000 0000 0143 1936 05(€)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enpara Bölümü */}
                      <div className="container px-2 background-2 mb-4">
                        <div
                          className="row align-items-center"
                          style={{ paddingTop: "15px" }}
                        >
                          <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <img
                              src="/assets/imgs/page/pay/enpara.png"
                              alt="Travila"
                              style={{ width: "150px" }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div style={{ fontSize: "18px", lineHeight: "1.6" }}>
                              <p style={{ marginBottom: "10px" }}>
                                TR28 0011 1000 0000 0149 4053 21 (₺)
                              </p>
                              <p style={{ marginBottom: "10px" }}>
                                TR90 0011 1000 0000 0151 0197 40 ($)
                              </p>
                              <p>TR13 0011 1000 0000 0151 0197 68 (€)</p>
                              <span style={{ display: "block" }}>
                                {t("codes")}: FNNBTRISXXX
                              </span>
                              <span style={{ display: "block" }}>{t("sw")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-4 mt-4 mt-md-0">
                      <div className="card p-4">
                        <h5 className="mb-4">{t("sepetOzeti")}</h5>
                        {
                          <>
                            <div className="mb-4 background-3 neutral-500" style={{ borderRadius: "3px", padding: "20px" }}>
                              <div className="text-black text-md font-extrabold">
                                📍{bookingData.tourName}
                              </div>
                              <div className="neutral-500">
                                📆 {bookingData.tourDate}
                              </div>
                              <div className="neutral-500">
                                🎫 {t2("code")}: {bookingData.bookingId}
                              </div>
                            </div>

                            <hr className="w-100 border-secondary" />
                            <p className="d-flex justify-content-between">
                              {bookingData.adultCount} {t2("a")}
                              <span>
                                {bookingData.adultTotalPrice}
                              </span>
                            </p>

                            {((bookingData.childCount && bookingData.childCount > 0)) && (
                              <>
                                <hr className="w-100 border-secondary" />
                                <p className="d-flex justify-content-between">
                                  {bookingData.childCount} {t2("ç")}
                                  <span>
                                    {bookingData.childTotalPrice}
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
                                      {bookingData.extrasTotalPrice}
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
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
      </Layout>
    </>
  );
}
