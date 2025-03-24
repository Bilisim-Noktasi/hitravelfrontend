"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Testimonials1() {
  const t=useTranslations("comment")
  
  // swiperGroupAnimate değerlerini kopyalayıp loop'u false yaparak özelleştirilmiş bir yapılandırma oluşturalım
  const customSwiperConfig = {
    ...swiperGroupAnimate,
    loop: false // Loop'u devre dışı bırak
  };
  
  return (
    <>
      <section className="section-box box-testimonials background-3 sm:w-24 h-24">
        <div className="container-testimonials">
          <div className="block-testimonials">
            <div className="testimonials-left" style={{ marginTop: "20px" }}>
              <h2 className="text-52-bold  mb-25 neutral-1000 mt-25">
               {t("title")}🫠
              </h2>
              <p className="text-lg-medium neutral-900">
               {t("you")}
              </p>
              <p className="text-lg-medium neutral-900 items-center text-center">
              {t("ekip")} ❤️
              </p>
            </div>

            <div className="testimonials-right">
              <div className="container-slider">
                <div className="box-swiper mt-30">
                  <div className="swiper-container swiper-group-animate swiper-group-journey">
                    <Swiper {...customSwiperConfig}>
                      <SwiperSlide>
                        <div
                          className="card-testimonial background-card"
                          style={{ width: "400px", height: "300px" }}
                        >
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Caner Yıldız
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="card-info">
                            <p className="neutral-500">
                              Siteyi ilk kez kullandım ve çok memnun kaldım.
                              Aradığım her şey bir arada ve çok hızlı bir
                              şekilde buldum. Rezervasyonumda hiçbir sorun
                              yaşamadım, harika bir tatil geçirdim
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div
                          className="card-testimonial background-card"
                          style={{ width: "400px", height: "300px" }}
                        >
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Okan Kılıç
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="card-info">
                            <p className="neutral-500">
                              Birçok tatil sitesini inceledim ama burası en
                              iyisi! Hızlı işlem, net bilgiler ve müşteri
                              desteğiyle gönül rahatlığıyla tatilimi ayarladım.
                              Kesinlikle tavsiye ederim
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div
                          className="card-testimonial background-card"
                          style={{ width: "400px", height: "300px" }}
                        >
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Elif Çelik
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="card-info">
                            <p className="neutral-500">
                              Bu site üzerinden tatil planlamak çok kolay oldu.
                              Her şey çok düzenliydi ve tüm ihtiyaçlarım
                              karşılandı. Gönül rahatlığıyla tatilimi burada
                              ayarladım. Kesinlikle tekrar kullanacağım
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div
                          className="card-testimonial background-card"
                          style={{ width: "400px", height: "300px" }}
                        >
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-info">
                                <p
                                  className="text-lg-bold neutral-1000 }"
                                  style={{
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  Emre Arslan
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="card-info">
                            <p className="neutral-500">
                              Birçok siteyi denedim, ama bu site gerçekten fark
                              yaratıyor! Hızlı ve güvenli rezervasyon, zengin
                              seçenekler ve her aşamada harika müşteri
                              desteğiyle tatilim tam istediğim gibi geçti.
                              Herkese tavsiye ederim!
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="box-button-slider box-button-slider-team text-start">
                  <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-animate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
