'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupPayment } from "@/util/swiperOption"
import Link from 'next/link'

export default function SwiperGroupPaymentSlider() {
	return (
		<>
			<Swiper {...swiperGroupPayment}>
				<SwiperSlide>
					<div className="btn btn-payment"><img src="/assets/imgs/template/icons/iyz.png" alt="Travila" /></div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="btn btn-payment"><img src="/assets/imgs/template/icons/logo.png" alt="Travila" /></div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="btn btn-payment"><img src="/assets/imgs/template/icons/mastercard.png" alt="Travila" /></div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="btn btn-payment"><img src="/assets/imgs/template/icons/ae.png" alt="Travila" /></div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="btn btn-payment"><img src="/assets/imgs/template/icons/troy.png" alt="Travila" /></div>
				</SwiperSlide>
			
			</Swiper>
		</>
	)
}
