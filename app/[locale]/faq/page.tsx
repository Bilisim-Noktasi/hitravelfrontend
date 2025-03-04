"use client";
import Layout from "@/components/layout/Layout";
import WhyChooseUs1 from "@/components/sections/WhyChooseUs1";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
export default function FAQ() {
  const [isAccordion, setIsAccordion] = useState(0);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
const t=useTranslations("faq")
  return (
    
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb ">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  {" "}
                  <Link href="/">{t("home")}</Link>
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
                  {" "}
                  <span className="text-breadcrumb">{t("sss")}</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="section-box box-faqs box-faqs-type-2 box-faqs-type-3 background-body">
            <div className="box-faqs-inner">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-30">
                    <h3 className="neutral-1000 mb-20">
                   {t("sss")}
                    </h3>
                    <p className="text-lg-medium neutral-500">
                    {t("desc")}
                    </p>
                    <div className="d-flex align-items-center mt-45">
                      <Link className="btn btn-black-lg-square" href="/contact">
                      {t("contact")}
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 15L15 8L8 1M15 8L1 8"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </Link>
                      <Link className="btn btn-link" href="/help-center">
                      {t("help")}
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 15L15 8L8 1M15 8L1 8"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-30">
                    <div className="box-banner-faq">
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="banner-faq">
                            {" "}
                            <img
                              src="/assets/imgs/page/pages/banner-faq.png"
                              alt="Travilla"
                            />
                          </div>
                          <div className="banner-faq">
                            {" "}
                            <img
                              src="/assets/imgs/page/pages/banner-faq2.png"
                              alt="Travilla"
                            />
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="banner-faq">
                            {" "}
                            <img
                              src="/assets/imgs/page/pages/banner-faq3.png"
                              alt="Travilla"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="section-box box-faqs-help background-body">
                  <div className="container">
                    <div className="box-faqs-inner">
                      <div className="box-title-contact-form"></div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="block-faqs">
                            <div className="accordion" id="accordionFAQ">
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingOne"
                                >
                                  <button
                                    className={
                                      isAccordion == 1
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                    onClick={() => handleAccordion(1)}
                                  >
                                    <p>
                                     {t("s1")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 1
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseOne"
                                  aria-labelledby="headingOne"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                    {t("a1")}
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingThree"
                                >
                                  <button
                                    className={
                                      isAccordion == 3
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                    onClick={() => handleAccordion(3)}
                                  >
                                    <p> {t("s2")}</p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 3
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseThree"
                                  aria-labelledby="headingThree"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                  {t("a2")}
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingFour"
                                >
                                  <button
                                    className={
                                      isAccordion == 4
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFour"
                                    aria-expanded="false"
                                    aria-controls="collapseFour"
                                    onClick={() => handleAccordion(4)}
                                  >
                                    <p>{t("s3")}</p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 4
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseFour"
                                  aria-labelledby="headingFour"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                  <p>{t("a3")}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingFive"
                                >
                                  <button
                                    className={
                                      isAccordion == 5
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive"
                                    aria-expanded="false"
                                    aria-controls="collapseFive"
                                    onClick={() => handleAccordion(5)}
                                  >
                                    <p>
                                      {t("s4")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 5
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseFive"
                                  aria-labelledby="headingFive"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                  {t("a4")}
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingThree2"
                                >
                                  <button
                                    className={
                                      isAccordion == 10
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree2"
                                    aria-expanded="false"
                                    aria-controls="collapseThree2"
                                    onClick={() => handleAccordion(10)}
                                  >
                                    <p> {t("s5")}</p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 10
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseThree2"
                                  aria-labelledby="headingThree2"
                                  data-bs-parent="#accordionFAQ2"
                                >
                                  <div className="accordion-body">
                                  {t("a5")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="block-faqs wow fadeInUp">
                            <div
                              className="accordion wow fadeInUp"
                              id="accordionFAQ2"
                            >
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingOne2"
                                >
                                  <button
                                    className={
                                      isAccordion == 8
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne2"
                                    aria-expanded="true"
                                    aria-controls="collapseOne2"
                                    onClick={() => handleAccordion(8)}
                                  >
                                    <p>
                                     {t("s6")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 8
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseOne2"
                                  aria-labelledby="headingOne2"
                                  data-bs-parent="#accordionFAQ2"
                                >
                                  <div className="accordion-body">
                                  {t("a6")}
                                  </div>
                                </div>
                              </div>

                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingFive"
                                >
                                  <button
                                    className={
                                      isAccordion == 7
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive"
                                    aria-expanded="false"
                                    aria-controls="collapseFive"
                                    onClick={() => handleAccordion(7)}
                                  >
                                    <p>
                                      {t("s7")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 7
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseFive"
                                  aria-labelledby="headingFive"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                    {t("a7")}
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingTwo2"
                                >
                                  <button
                                    className={
                                      isAccordion == 9
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo2"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo2"
                                    onClick={() => handleAccordion(9)}
                                  >
                                    <p>
                                     {t("s8")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 9
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseTwo2"
                                  aria-labelledby="headingTwo2"
                                  data-bs-parent="#accordionFAQ2"
                                >
                                  <div className="accordion-body">
                                  {t("a8")}
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item wow fadeInUp">
                                <h5
                                  className="accordion-header"
                                  id="headingFive"
                                >
                                  <button
                                    className={
                                      isAccordion == 6
                                        ? "accordion-button text-heading-5"
                                        : "accordion-button text-heading-5 collapsed"
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive"
                                    aria-expanded="false"
                                    aria-controls="collapseFive"
                                    onClick={() => handleAccordion(6)}
                                  >
                                    <p>
                               {t("a9")}
                                    </p>
                                  </button>
                                </h5>
                                <div
                                  className={
                                    isAccordion == 6
                                      ? "accordion-collapse collapse show"
                                      : "accordion-collapse collapse"
                                  }
                                  id="collapseFive"
                                  aria-labelledby="headingFive"
                                  data-bs-parent="#accordionFAQ"
                                >
                                  <div className="accordion-body">
                                  {t("s9")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
          <WhyChooseUs1></WhyChooseUs1>
          <section className="section-box box-media background-body">
            <div className="container-media wow fadeInUp">
              {" "}
              <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" />
              <img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
