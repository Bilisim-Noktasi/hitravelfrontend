'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export default function Category() {
    const t=useTranslations("CategoryCard")
    return (
        <>

            <section className="section-box box-category background-body">
                <div className="container-slider">
                    <div className="box-swiper mt-30">
                        <div className="swiper-container swiper-group-animate swiper-group-journey">
                            <Swiper {...swiperGroupAnimate}>
                                <SwiperSlide>
                                    <div className="card-walking background-card">
                                        <div className="card-info">
                                            <h4>Waking up <br className="d-none d-lg-block" />in a far away place</h4><Link className="btn btn-brand-secondary" href="#">{t("button")}
                                                <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg></Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card-advanture background-card">
                                        <div className="card-info">
                                            <p className="text-lg-bold">Explore the World</p>
                                            <h5 className="mb-60">The adventure starts today</h5><Link className="btn btn-brand-secondary" href="#">{t("button")}
                                                <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg></Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card-advanture card-vacation background-card">
                                        <div className="card-info">
                                            <p className="text-lg-bold">Dream Vacation</p>
                                            <h5 className="mb-60">Start your Journey Now</h5><Link className="btn btn-brand-secondary" href="#">{t("button")}
                                                <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg></Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="card-walking card-walking-2 background-card">
                                        <div className="card-info">
                                            <h4>Waking up<br className="d-none d-lg-block" />in a far away place</h4><Link className="btn btn-brand-secondary" href="#">{t("button")}
                                                <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg></Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
