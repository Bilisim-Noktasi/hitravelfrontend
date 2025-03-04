"use client";
import Layout from "@/components/layout/Layout";
import News1 from "@/components/sections/News1";
import { Link } from "@/i18n/routing";
import React, { useState, FormEvent } from "react";

import { useTranslations } from "next-intl";

export default function Booking() {
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
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [cvv, setCvv] = useState<string | undefined>(undefined);
  const [privacy, setPrivacy] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [showPrepaymentForm, setShowPrepaymentForm] = useState(false);
  const [tc, setTc] = useState<string | undefined>(undefined);
  const [cardHolderName, setCardHolderName] = useState<string | undefined>(
    undefined
  );
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
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  const t = useTranslations("pay");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form data
    if (!cardHolderName || !cardNumber || !expirationDate || !cvv) {
      alert("Please fill in all required fields");
      return;
    }

    // Process the form data
    console.log("Form submitted with values:", {
      name,
      surname,
      cardNumber,
      expirationDate,
      cvv,
      email,
      cardHolderName,
      phone,
      note,
      tc,
    });

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
                            placeholder={t("T")}
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
                                placeholder="Şirket Ünvanı"
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
                                {t("vd")}
                              </label>
                              <input
                                type="text"
                                className="form-control bg-white border"
                                id="billingAddress"
                                placeholder="Fatura Adresi"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-dark w-100 h-30 items-center btn-custom mx-auto d-block"
                        style={{
                          backgroundColor: "#000000",
                          border: "2px solid #343a40",
                          borderRadius: "8px",
                          transition: "none",
                          marginTop: "20px",
                        }}
                      >
                        {t("payment")} 💳
                      </button>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 mt-4 mt-md-0">
                    <div className="card p-4 ">
                      <h5 className="mb-4">{t("sepetOzeti")}</h5>
                      <div
                        className="mb-4 background-3 neutral-500"
                        style={{
                          borderRadius: "3px",
                          padding: "20px",
                        }}
                      >
                        <div className="text-black text-md font-extrabold">
                          📍Adrasan Boat Tour
                        </div>
                        <div className="neutral-500">
                          📆 3 {t("d")} , 2 {t("g")}
                        </div>
                        <div className="neutral-500">
                          🎫 {t("code")} :2025-0001
                        </div>
                      </div>
                      <div
                        className="mb-4 background-8 neutral-500"
                        style={{ borderRadius: "3px", padding: "20px" }}
                      >
                        <div className="text-black text-md font-extrabold">
                          ✋🏻 {t("t5")}{" "}
                        </div>
                      </div>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between">
                        2 {t("a")}
                        <span>$200</span>
                      </p>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between">
                        2 {t("ç")}
                        <span>$200</span>
                      </p>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between text-dark fw-bold">
                        {t("total")}
                        <span>$400</span>
                      </p>
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
                  {/* Sol taraf: Banka Transferi Formu */}
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

                  {/* Sağ taraf: Sepet Özeti */}
                  <div className="col-12 col-md-4 mt-4 mt-md-0">
                    <div className="card p-4">
                      <h5 className="mb-4">{t("sepetOzeti")}</h5>
                      <div
                        className="mb-4 background-3 neutral-500"
                        style={{ borderRadius: "3px", padding: "20px" }}
                      >
                        <div className="text-black text-md font-extrabold">
                          📍Adrasan Boat Tour
                        </div>
                        <div className="neutral-500">
                          📆 3 {t("d")} , 2 {t("g")}
                        </div>
                        <div className="neutral-500">
                          🎫 {t("code")} :2025-0001
                        </div>
                      </div>
                      <div
                        className="mb-4 background-8 neutral-500"
                        style={{ borderRadius: "3px", padding: "20px" }}
                      >
                        <div className="text-black text-md  font-extrabold">
                          ✋🏻 {t("t1")}{" "}
                        </div>
                      </div>
                      <div
                        className="mb-4 bg-1 neutral-500"
                        style={{ borderRadius: "3px", padding: "20px" }}
                      >
                        <div className="text-black text-md font-extrabold">
                          ❗{t("t2")}{" "}
                          <a
                            href="https://wa.me/905326691107"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "red",
                              textDecoration: "underline",
                            }}
                          >
                            {t("wp")}
                          </a>{" "}
                          {t("t3")}
                        </div>
                      </div>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between">
                        2 {t("a")}
                        <span>$200</span>
                      </p>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between">
                        2 {t("ç")}
                        <span>$200</span>
                      </p>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between fw-bold">
                        {t("indirimmm")}
                        <span className="bg-5">-20</span>
                      </p>
                      <hr className="w-100 border-secondary" />
                      <p className="d-flex justify-content-between text-dark fw-bold">
                        {t("total")}
                        <span>$400</span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        className="btn btn-dark w-100 mt-12 bg-black-2"
                        style={{ borderRadius: "6px" }}
                      >
                        {t("ok")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {showPrepaymentForm && (
            <div
              className="container"
              style={{ marginTop: "30px", paddingLeft: "33px" }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div className="card p-3">
                    <h5 className="mb-4">{t("sepetOzeti")}</h5>
                    <div
                      className="mb-4 background-3 neutral-500"
                      style={{ borderRadius: "3px", padding: "20px" }}
                    >
                      <div className="text-black text-md font-extrabold">
                        📍Adrasan Boat Tour
                      </div>
                      <div className="neutral-500">
                        📆 3 {t("d")} , 2 {t("g")}{" "}
                      </div>
                      <div className="neutral-500">
                        🎫 {t("code")} :2025-0001
                      </div>
                    </div>
                    <div
                      className="mb-4 background-8 neutral-500"
                      style={{ borderRadius: "3px", padding: "20px" }}
                    >
                      <div className="text-black text-md font-extrabold">
                        ✋🏻{t("t5")}{" "}
                      </div>
                    </div>
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                      2 {t("a")}
                      <span>$200</span>
                    </p>
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between">
                      2 {t("ç")}
                      <span>$200</span>
                    </p>
                    <hr className="w-100 border-secondary" />
                    <p className="d-flex justify-content-between text-dark fw-bold">
                      {t("total")}
                      <span>$400</span>
                    </p>

                    <div className="mt-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="paymentOption1"
                          name="paymentOption"
                          value="creditCard"
                          checked={selectedPaymentMethod === "creditCard"}
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="paymentOption1"
                        >
                          {t("credi")}
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="paymentOption2"
                          name="paymentOption"
                          value="bankTransfer"
                          checked={selectedPaymentMethod === "bankTransfer"}
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="paymentOption2"
                        >
                          {t("he")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPaymentMethod === "creditCard" && (
                  <div className="col-12 col-md-8">
                    <div className="card p-4">
                      <div className="mb-5 d-flex flex-column">
                        {/* Kart Sahibi Adı */}
                        <div className="mb-4 col-12 ps-3">
                          <label
                            htmlFor="cardHolderName"
                            className="form-label"
                          >
                            {t("card")}
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
                            placeholder={t("card")}
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

                        {showBillingInfo && (
                          <div>
                            <div className="mb-4 col-12">
                              <label
                                htmlFor="billingName"
                                className="form-label"
                              >
                                Şirket Ünvanı
                              </label>
                              <input
                                type="text"
                                className="form-control bg-white border"
                                id="billingName"
                                placeholder="Şirket Ünvanı"
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
                                placeholder="Vergi Dairesi"
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
                                placeholder={t("add")}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-dark w-100 h-30 items-center btn-custom mx-auto d-block"
                        style={{
                          backgroundColor: "#000000",
                          border: "2px solid #343a40",
                          borderRadius: "8px",
                          transition: "none",
                          marginTop: "20px",
                        }}
                      >
                        {t("odeme")} 💳
                      </button>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "bankTransfer" && (
                  <div className="col-12 col-md-8"></div>
                )}
              </div>
            </div>
          )}
          {showTourPayForm && (
            <div
              className="col-12 col-md-4 mt-4 mt-md-0"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div className="card p-4" style={{ marginTop: "20px" }}>
                <h5 className="mb-4">{t("sepetOzeti")}</h5>
                <div
                  className="mb-4 background-3 neutral-500"
                  style={{
                    borderRadius: "3px",
                    padding: "20px",
                  }}
                >
                  <div className="text-black text-md font-extrabold">
                    📍Adrasan Boat Tour
                  </div>
                  <div className="neutral-500">
                    📆 3 {t("d")} , 2 {t("g")}
                  </div>
                  <div className="neutral-500"> 🎫 {t("code")} :2025-0001</div>
                </div>
                <div
                  className="mb-4 background-2 neutral-500"
                  style={{
                    borderRadius: "3px",
                    padding: "20px",
                  }}
                >
                  <div className="text-black text-sm font-small">
                    📮 {t("mail")}
                  </div>
                </div>
                <hr className="w-100 border-secondary" />
                <p className="d-flex justify-content-between">
                  2 {t("a")}
                  <span>$200</span>
                </p>
                <hr className="w-100 border-secondary" />
                <p className="d-flex justify-content-between">
                  2 {t("ç")}
                  <span>$200</span>
                </p>
                <hr className="w-100 border-secondary" />
                <p className="d-flex justify-content-between text-dark fw-bold">
                  {t("total")}
                  <span>$400</span>
                </p>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-dark w-100 mt-12 bg-black-2"
                    style={{ borderRadius: "6px" }}
                  >
                    {t("ok")}
                  </button>
                </div>
              </div>
            </div>
          )}

          <section
            className="section-box box-media background-body"
            style={{ marginTop: "40px" }}
          >
            <div className="container-media wow fadeInUp">
              <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" />
            </div>
          </section>
        </Layout>
      </>
    );
  };
}
