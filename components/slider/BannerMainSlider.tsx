"use client";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

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
          <Slider {...settingsMain} ref={slider1} className="banner-main">
            <div className="banner-slide">
              <div className="banner-image-1">
                <div className="container">
                  <h3 className="mt-2 mb-20 text-white text-right">
                    <br className="d-none d-lg-block" />
                  </h3>
                </div>
              </div>
            </div>

            <div className="banner-slide">
              <div className="banner-image ">
                <div className="container">
                  <h1 className="mt-20 mb-20">
                    <br className="d-none d-lg-block" />
                  </h1>
                  <h6 className="heading-6-medium"></h6>
                </div>
              </div>
            </div>
            <div className="banner-slide">
              <div className="banner-image-2">
                <div className="container">
                  <h1 className="mt-20 mb-20">
                    <br className="d-none d-lg-block" />
                  </h1>
                  <h6 className="heading-6-medium"></h6>
                </div>
              </div>
            </div>
          </Slider>
          <div className="slider-thumnail">
            <Slider
              {...settingsThumbs}
              ref={slider2}
              className="slider-nav-thumbnails"
            >
              <div className="banner-slide">
                <img src="/assets/imgs/page/homepage2/efes.webp" alt="Efes" />
              </div>
              <div className="banner-slide">
                <img
                  src="/assets/imgs/page/homepage2/akdeniz.webp"
                  alt="Akdeniz"
                />
              </div>
              <div className="banner-slide">
                <img src="/assets/imgs/page/homepage2/gunes.webp" alt="" />
              </div>
            </Slider>
          </div>
        </>
      ) : (
        <>
          <Slider {...settingsMain} ref={slider1} className="banner-main">
            <div className="banner-slide" style={{ width: "100vw" }}>
              <div
                className="banner-image"
                style={{
                  backgroundImage: `url(/assets/imgs/mobileefes.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="banner-slide">
              <div
                className="banner-image"
                style={{
                  backgroundImage: `url(/assets/imgs/mobileefes.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="banner-slide">
              <div
                className="banner-image"
                style={{
                  backgroundImage: `url(/assets/imgs/mobileefes.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </Slider>
        </>
      )}
    </>
  );
}
