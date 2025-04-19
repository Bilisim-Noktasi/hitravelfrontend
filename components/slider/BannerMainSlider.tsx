"use client";
import axios from "axios";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

export interface Banner {
  id: string;
  type: number;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  languageCode: number;
}

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
      </path>
    </svg>
  </button>
);

export default function BannerMainSlider() {
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);

  const locale = useLocale();

  useEffect(() => {
    setNav1(slider1.current ?? undefined);
    setNav2(slider2.current ?? undefined);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobil cihaz genişliği
    };

    handleResize(); // İlk değer
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "https://api.hitravel.com.tr/api/Banners?PageIndex=0&PageSize=20"
        );
        setBanners(response.data.items || []);
      } catch (error) {
        console.error("Banner verileri alınamadı:", error);
      }
    };

    fetchBanners();
  }, []);

  const settingsMain = {
    asNavFor: !isMobile ? nav2 : undefined,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    infinite: true, // Sonsuz kaydırma seçeneği
    centerMode: false, // Center mode kapalı, boşluk yaratmamak için
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    vertical: true,
    asNavFor: nav1,
  };

  return (
    <>
      {!isMobile ? (
        <>
          <Slider {...settingsMain}>
            {banners.filter((banner) => banner.type === 1 && (locale === 'tr' ? banner.languageCode === 2 : banner.languageCode === 1))
            .sort((a, b) => a.sortOrder - b.sortOrder).map((banner) => (
              <div key={banner.id}>
                <img src={banner.imageUrl ? banner.imageUrl : "/assets/imgs/page/homepage2/banner.png"} style={{
                  minHeight: '768px',
                  width: '100%',
                  objectFit: 'cover'
                }} />
              </div>
            ))}
          </Slider>
          <div className="slider-thumnail">
            <Slider {...settingsThumbs} className="slider-nav-thumbnails">
              {banners.filter((banner) => banner.type === 3 && (locale === 'tr' ? banner.languageCode === 2 : banner.languageCode === 1))
              .sort((a, b) => a.sortOrder - b.sortOrder).map((banner) => (
                <div className="banner-slide" key={banner.id}>
                  <img src={banner.imageUrl} />
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <>
          <Slider {...settingsMain} ref={slider1} className="banner-main">
            {banners.filter((banner) => banner.type === 2 && (locale === 'tr' ? banner.languageCode === 2 : banner.languageCode === 1))
            .sort((a, b) => a.sortOrder - b.sortOrder).map((banner) => (
              <div className="banner-slide" key={banner.id}>
                <img src={banner.imageUrl} />
              </div>
            ))}
          </Slider>
        </>
      )}
    </>
  );
}
