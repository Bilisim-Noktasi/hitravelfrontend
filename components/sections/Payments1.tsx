import { useTranslations } from 'next-intl'
import SwiperGroupPaymentSlider from '../slider/SwiperGroupPaymentSlider'
import { Link } from '@/i18n/routing'

export default function Payments1() {
    const t=useTranslations("odeme")
    return (
        <>

            <section className="section-box box-payments background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="row">
                                <div className="col-md-7 mb-30"><img className="bdrd8 w-100" src="/assets/imgs/page/homepage1/pay1.png" alt="Travila" /></div>
                                <div className="col-md-5 mb-30"><img className="bdrd8 w-100 mb-15" src="/assets/imgs/page/homepage1/pay2.png" alt="Travila" /><img className="bdrd8 w-100" src="/assets/imgs/page/homepage1/pay3.png" alt="Travila" /></div>
                            </div>
                        </div>
                        <div className="col-lg-7 mb-30">
                            <div className="box-left-payment">
                                <h2 className="title-why mb-25 mt-10 neutral-1000">{t("title")}</h2>
                                <p className="text-xl-medium neutral-600 mb-35">{t("subTitle")}</p>
                                <div className="payment-method">
                                    <div className="box-swiper mt-30">
                                        <div className="swiper-container swiper-group-payment">
										<SwiperGroupPaymentSlider />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
