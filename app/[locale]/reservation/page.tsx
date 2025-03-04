"use client";
import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Booking() {
  const [vkn, setVkn] = useState("");
  const [name, setName] = useState<string | undefined>(undefined);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [surname, setSurname] = useState<string | undefined>(undefined);
  const [showBankTransferForm, setShowBankTransferForm] = useState(false);

  const [showCreditCardForm, setShowCreditCardForm] = useState(true);
  const [cardNumber, setCardNumber] = useState<string | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [cvv, setCvv] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [tc, setTc] = useState<string | undefined>(undefined);
  const [cardHolderName, setCardHolderName] = useState<string | undefined>(
    undefined
  );

  const handleVknChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setVkn(value);
  };
  const [privacy, setPrivacy] = useState(false);
  const [note, setNote] = useState<string>("");
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const t = useTranslations("book");
  const handleSubmit = () => {
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
                <Link href="/">{t("book")}</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="section-box box-next-trips background-body">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8 mb-30">
                <h2 className="neutral-1000">{t("odemeYap")} </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="background-body py-8 mt-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="card p-4">
                  <div className="mb-4 d-flex">
                    <div className="form-group w-50 me-2">
                      <label htmlFor="name" className="form-label">
                        {t("ad")}
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="name"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value.replace(
                              /[^a-zA-ZıİçÇşŞğĞöÖüÜ ]/g,
                              ""
                            )
                          )
                        }
                        placeholder={t("ad")}
                      />
                    </div>

                    <div className="form-group w-50 ms-2 py-8 mb-n3">
                      <label htmlFor="surname" className="form-label">
                        {t("Soyad")}
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="surname"
                        value={surname}
                        onChange={(e) =>
                          setSurname(
                            e.target.value.replace(
                              /[^a-zA-ZıİçÇşŞğĞöÖüÜ ]/g,
                              ""
                            )
                          )
                        }
                        placeholder={t("Soyad")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        {t("phone")}
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="phone"
                        value={phone || ""}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="0555 456 7890"
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Mail
                      </label>
                      <input
                        type="email"
                        className="form-control bg-white border"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value || "")}
                        placeholder="mail@mail.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tc" className="form-label">
                      T.C Kimlik No/Pasaport No
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white border"
                      id="tc"
                      value={tc}
                      onChange={(e) =>
                        setTc(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="11111111111"
                      maxLength={11}
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="note" className="form-label">
                      {t("not")}
                    </label>
                    <textarea
                      className="form-control bg-white border"
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t("not")}
                      maxLength={50}
                      style={{ minHeight: "100px", resize: "vertical" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 mt-4 mt-md-0">
                {" "}
                <div className="card p-4 ">
                  <h5 className="mb-4">{t("sepetOzeti")}</h5>
                  <div
                    className="mb-4 background-3 neutral-500"
                    style={{
                      borderRadius: "3px",
                      padding: "20px",
                    }}
                  >
                    {" "}
                    <div className="text-black text-md font-extrabold">
                      📍Adrasan Boat Tour
                    </div>
                    <div className="neutral-500">
                      📆 3 {t("d")} , 2 {t("g")}{" "}
                    </div>
                    <div className="neutral-500">
                      {" "}
                      🎫 {t("code")} :2025-0001
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
              <Link
                href="/payment"
                className="btn btn-dark bg-black"
                style={{
                  color: "white",
                  borderRadius: "4px",
                  padding: "12px 30px",
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-block",
                  paddingLeft: "12px",
                  marginLeft: "850px",
                  position: "relative",
                  top: "-70px",
                  width: "350px",
                  height: "50px",
                }}
              >
                {t("odemeyap")}
              </Link>
            </div>
          </div>
        </section>

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
}
