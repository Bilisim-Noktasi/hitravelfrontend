"use client";
import Layout from "@/components/layout/Layout";
import { AppDispatch, RootState } from "@/redux/store";
import { getVillaDispatch } from "@/redux/villaSlice";
import { Link } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import BookingForm from "@/components/elements/BookingForm";
import SwiperGroup3Slider from "@/components/slider/SwiperGroup3Slider";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Preloader from "@/components/elements/Preloader";
// import VillaSlider from "@/components/slider/VillaSlider";
import { PiBathtubThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { PiBedThin } from "react-icons/pi";
import { PiPersonSimpleSwimThin } from "react-icons/pi";
import News1 from "@/components/sections/News1";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

// Dinamik olarak harita bileşenini yükle (SSR olmadan)
// Using a simple loading state without translations
const MapComponent = dynamic(() => import("@/components/elements/MapComponent"), {
  ssr: false,
  loading: () => <div style={{ height: '400px', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>
});

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
const handleShare = () => {
  const shareUrl = window.location.href;
  if (navigator.share) {
    navigator
      .share({
        title: "Sayfayı Paylaş",
        url: shareUrl,
      })
      .then(() => console.log("Paylaşım başarılı"))
      .catch((error) => console.log("Paylaşım başarısız:", error));
  } else {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => alert("Bağlantı panoya kopyalandı!"))
      .catch((error) => console.log("Panoya kopyalama başarısız:", error));
  }
};

export default function VillaDetail({ params }: { params: { url: string } }) {
  const { url } = params;
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { villa } = useSelector((state: RootState) => state.villa);
  const t = useTranslations("villaDetail");
  
  // Move the dynamic import here where t is available
  const MapComponent = dynamic(() => import("@/components/elements/MapComponent"), {
    ssr: false,
    loading: () => <div style={{ height: '400px', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t("Harita_yükleniyor")}</div>
  });

  useEffect(() => {
    dispatch(getVillaDispatch(url, setLoading));
  }, [dispatch, url]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  const [isAccordion, setIsAccordion] = useState(null);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
  
  if (loading) {
    return <Preloader />;
  }

  // Harita bileşeni için yükleme durumu
  const MapWithLoading = () => {
    if (!villa?.latitude || !villa?.longitude) {
      return <p>{t("Bu_villa_için_konum_bilgisi_bulunmamaktadır")}</p>;
    }
    
    return (
      <div className="villa-map" style={{ height: "400px", width: "100%" }}>
        <MapComponent 
          latitude={villa.latitude} 
          longitude={villa.longitude} 
          title={villa.title}
        />
      </div>
    );
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb background-body">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  {" "}
                  <Link href="/">{t("Anasayfa")}</Link>
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
                  <Link href="/destination">{t("villa")}</Link>
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
                  <span className="text-breadcrumb">
                    {villa?.title.toUpperCase()}
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <section className="box-section box-content-tour-detail background-body">
            <div className="container">
              <div className="tour-header">
                <div className="tour-rate">
                  <div className="rate-element">
                    <span className="rating">
                      5.0{" "}
                      <span className="text-sm-medium neutral-500">
                        (0 {t("yorum")})
                      </span>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="tour-title-main">
                      <h4 className="neutral-1000">{villa?.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="tour-metas">
                  <div className="tour-meta-left">
                    <p className="text-md-medium neutral-500 mr-20 tour-location">
                      <svg
                        width={12}
                        height={16}
                        viewBox="0 0 12 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.99967 0C2.80452 0 0.205078 2.59944 0.205078 5.79456C0.205078 9.75981 5.39067 15.581 5.61145 15.8269C5.81883 16.0579 6.18089 16.0575 6.38789 15.8269C6.60867 15.581 11.7943 9.75981 11.7943 5.79456C11.7942 2.59944 9.1948 0 5.99967 0ZM5.99967 8.70997C4.39211 8.70997 3.0843 7.40212 3.0843 5.79456C3.0843 4.187 4.39214 2.87919 5.99967 2.87919C7.6072 2.87919 8.91502 4.18703 8.91502 5.79459C8.91502 7.40216 7.6072 8.70997 5.99967 8.70997Z" />
                      </svg>
                      {villa?.destination}
                    </p>
                    <Link
                      className="text-md-medium neutral-1000 mr-30"
                      href="#map-section"
                    >
                      {t("maps")}
                    </Link>
                    <p className="text-md-medium neutral-500 tour-code mr-15">
                      <svg
                        width={20}
                        height={18}
                        viewBox="0 0 20 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.2729 0.273646C13.4097 0.238432 13.5538 0.24262 13.6884 0.28573L18.5284 1.83572L18.5474 1.84209C18.8967 1.96436 19.1936 2.19167 19.4024 2.4875C19.5891 2.75202 19.7309 3.08694 19.7489 3.46434C19.7494 3.47622 19.7497 3.4881 19.7497 3.49998V15.5999C19.7625 15.8723 19.7102 16.1395 19.609 16.3754C19.6059 16.3827 19.6026 16.39 19.5993 16.3972C19.476 16.6613 19.3017 16.8663 19.1098 17.0262C19.1023 17.0324 19.0947 17.0385 19.087 17.0445C18.8513 17.2258 18.5774 17.3363 18.2988 17.3734L18.2927 17.3743C18.0363 17.4063 17.7882 17.3792 17.5622 17.3133C17.5379 17.3081 17.5138 17.3016 17.4901 17.294L13.4665 16.0004L6.75651 17.7263C6.62007 17.7614 6.47649 17.7574 6.34221 17.7147L1.47223 16.1647C1.46543 16.1625 1.45866 16.1603 1.45193 16.1579C1.0871 16.0302 0.813939 15.7971 0.613929 15.5356C0.608133 15.528 0.602481 15.5203 0.596973 15.5125C0.395967 15.2278 0.277432 14.8905 0.260536 14.5357C0.259972 14.5238 0.259689 14.5119 0.259689 14.5V2.39007C0.246699 2.11286 0.301239 1.83735 0.420015 1.58283C0.544641 1.31578 0.724533 1.10313 0.942417 0.93553C1.17424 0.757204 1.45649 0.6376 1.7691 0.61312C2.03626 0.583264 2.30621 0.616234 2.56047 0.712834L6.56277 1.99963L13.2729 0.273646ZM13.437 1.78025L6.72651 3.50634C6.58929 3.54162 6.44493 3.53736 6.31011 3.49398L2.08011 2.13402C2.06359 2.1287 2.04725 2.12282 2.03113 2.11637C2.00054 2.10413 1.96854 2.09972 1.93273 2.10419C1.91736 2.10611 1.90194 2.10756 1.88649 2.10852C1.88649 2.10852 1.88436 2.10866 1.88088 2.11001C1.8771 2.11149 1.86887 2.11532 1.85699 2.12447C1.81487 2.15686 1.79467 2.18421 1.77929 2.21715C1.76189 2.25446 1.75611 2.28942 1.75823 2.32321C1.7592 2.33879 1.75969 2.35439 1.75969 2.36999V14.4772C1.76448 14.5336 1.78316 14.5879 1.81511 14.6367C1.86704 14.7014 1.90866 14.7272 1.94108 14.7398L6.59169 16.2199L13.3028 14.4937C13.44 14.4584 13.5844 14.4626 13.7192 14.506L17.8938 15.8482C17.9184 15.8537 17.9428 15.8605 17.9669 15.8685C18.0209 15.8865 18.0669 15.8902 18.1034 15.8862C18.1214 15.8833 18.1425 15.8759 18.1629 15.8623C18.1981 15.8309 18.2196 15.8024 18.2346 15.7738C18.2473 15.7399 18.2533 15.7014 18.2511 15.6668C18.2502 15.6512 18.2497 15.6356 18.2497 15.62V3.52464C18.2453 3.48222 18.2258 3.42174 18.1769 3.3525C18.147 3.3102 18.1062 3.2784 18.0582 3.26022L13.437 1.78025Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.55957 2.02002C6.97375 2.02002 7.30957 2.3558 7.30957 2.77002V16.92C7.30957 17.3343 6.97375 17.67 6.55957 17.67C6.14533 17.67 5.80957 17.3343 5.80957 16.92V2.77002C5.80957 2.3558 6.14533 2.02002 6.55957 2.02002Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.4893 0.330078C13.9035 0.330078 14.2393 0.665862 14.2393 1.08008V15.2301C14.2393 15.6443 13.9035 15.9801 13.4893 15.9801C13.0751 15.9801 12.7393 15.6443 12.7393 15.2301V1.08008C12.7393 0.665862 13.0751 0.330078 13.4893 0.330078Z"
                        />
                      </svg>
                      {t("villacode")}:
                    </p>
                    <Link className="text-md-medium neutral-1000" href="#">
                      {villa?.type}
                    </Link>
                  </div>
                  <div className="tour-meta-right">
                    {" "}
                    <Link
                      className="btn btn-share"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Sayfanın yenilenmesini engeller
                        handleShare();
                      }}
                    >
                      <svg
                        width={16}
                        height={18}
                        viewBox="0 0 16 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13 11.5332C12.012 11.5332 11.1413 12.0193 10.5944 12.7584L5.86633 10.3374C5.94483 10.0698 6 9.79249 6 9.49989C6 9.10302 5.91863 8.72572 5.77807 8.37869L10.7262 5.40109C11.2769 6.04735 12.0863 6.46655 13 6.46655C14.6543 6.46655 16 5.12085 16 3.46655C16 1.81225 14.6543 0.466553 13 0.466553C11.3457 0.466553 10 1.81225 10 3.46655C10 3.84779 10.0785 4.20942 10.2087 4.54515L5.24583 7.53149C4.69563 6.90442 3.8979 6.49989 3 6.49989C1.3457 6.49989 0 7.84559 0 9.49989C0 11.1542 1.3457 12.4999 3 12.4999C4.00433 12.4999 4.8897 11.9996 5.4345 11.2397L10.147 13.6529C10.0602 13.9331 10 14.2249 10 14.5332C10 16.1875 11.3457 17.5332 13 17.5332C14.6543 17.5332 16 16.1875 16 14.5332C16 12.8789 14.6543 11.5332 13 11.5332Z" />
                      </svg>
                      {t("share")}
                    </Link>
                    <Link className="btn btn-wishlish" href="#">
                      <svg
                        width={20}
                        height={18}
                        viewBox="0 0 20 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.2222 2.3638C4.34203 0.243977 7.65342 0.0419426 10.0004 1.7577C12.3473 0.0419426 15.6587 0.243977 17.7786 2.3638C20.1217 4.70695 20.1217 8.50594 17.7786 10.8491L12.1217 16.5059C10.9501 17.6775 9.05063 17.6775 7.87906 16.5059L2.2222 10.8491C-0.120943 8.50594 -0.120943 4.70695 2.2222 2.3638Z"
                        />
                      </svg>
                      {t("Favori")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <section className="section-box box-banner-home2 box-banner-tour-detail-2 background-body">
              <div className="box-banner-tour-detail-2-inner">
                <div className="container-top">
                  <div className="container" />
                </div>
                <div className="container-banner container">
                  {/* <VillaSlider urlList={villa?.images || []} /> */}
                </div>
              </div>
            </section>
            <div className="container">
              <div className="row mt-65">
                <div className="col-lg-8">
                  <div className="box-info-tour">
                    <div className="tour-info-group">
                      <div
                        className="icon-item background-7"
                        style={{ fontSize: "1.5rem" }}
                      >
                        <CiUser style={{ position: "relative", top: "-5px" }} />
                      </div>

                      <div className="info-item">
                        <p className="text-sm-medium neutral-600">
                          {t("capacity")}
                        </p>
                        <p className="text-lg-bold neutral-1000">
                          {villa?.capacity} {t("kisi")}
                        </p>
                      </div>
                    </div>
                    <div className="tour-info-group">
                      <div
                        className="icon-item background-8"
                      >
                        <div
                          className="icon-item background-10"
                          style={{ fontSize: "1.5rem" }}
                        >
                          <PiBedThin
                            style={{ fontSize: "1.5rem", top: "-4px" }}
                          />
                        </div>
                      </div>
                      <div className="info-item">
                        <p className="text-sm-medium neutral-600">
                          {t("room")}
                        </p>
                        <p className="text-lg-bold neutral-1000">
                          {villa?.room} {t("oda")}
                        </p>
                      </div>
                    </div>
                    <div className="tour-info-group">
                      <div
                        className="icon-item background-1"
                        style={{ fontSize: "2rem" }}
                      >
                        <PiBathtubThin />
                      </div>

                      <div className="info-item">
                        <p className="text-sm-medium neutral-600">
                          {t("bathcount")}
                        </p>
                        <p className="text-lg-bold neutral-1000">
                          {villa?.bathroom} {t("bath")}
                        </p>
                      </div>
                    </div>

                    <div className="tour-info-group">
                      <div
                        className="icon-item background-3"
                        style={{ fontSize: "2rem" }}
                      >
                        <PiPersonSimpleSwimThin />
                      </div>

                      <div className="info-item">
                        <p className="text-sm-medium neutral-600">
                          {t("poolcount")}
                        </p>
                        <p className="text-lg-bold neutral-1000">
                          {villa?.pools.length} {t("pool")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="box-collapse-expand">
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 1
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOverview"
                        aria-expanded="false"
                        aria-controls="collapseOverview"
                        onClick={() => handleAccordion(1)}
                      >
                        <h6>
                          📍{villa?.title} {t("where")} ?
                        </h6>

                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseOverview flex flex-r"
                      >
                        <div className="card card-body">
                          <div style={{ display: "flex", gap: "90px" }}>
                            <ul>
                              {villa?.distances.map((item, index) => (
                                <li key={index}>{item.title}</li>
                              ))}
                            </ul>

                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {villa?.distances.map((item, index) => (
                                <li key={index}>{item.value} uzaklıkta</li>
                              ))}
                            </ul>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: villa?.description || "",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 2
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseHighlight"
                        aria-expanded="false"
                        aria-controls="collapseHighlight"
                        onClick={() => handleAccordion(2)}
                      >
                        <h6>🌞 {t("öne")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 2 ? "collapse" : "collapse show"
                        }
                        id="collapseHighlight"
                      >
                        <div className="card card-body">
                          <ul className="list-highlights">
                            {villa?.highlights.map((highlight, index) => (
                              <li key={index}>
                                
                                <span className="text-md-regular">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 3
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFeatures"
                        aria-expanded="false"
                        aria-controls="collapseFeatures"
                        onClick={() => handleAccordion(3)}
                      >
                        <h6>🏠 {t("Özellikler")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 3 ? "collapse" : "collapse show"
                        }
                        id="collapseFeatures"
                      >
                        <div className="card card-body">
                          <div className="row">
                            <div className="col-lg-6">
                              <ul className="list-features">
                                {villa?.features.slice(0, Math.ceil(villa.features.length / 2)).map((feature, index) => (
                                  <li key={index}>
                                    <span className="text-md-regular">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <ul className="list-features">
                                {villa?.features.slice(Math.ceil(villa.features.length / 2)).map((feature, index) => (
                                  <li key={index}>
                                    <span className="text-md-regular">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
       
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 5 ? "btn btn-collapse collapsed" : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseIncluded"
                        aria-expanded="false"
                        aria-controls="collapseIncluded"
                        onClick={() => handleAccordion(5)}
                      >
                        <h6>💰 {t("fiyat")}</h6>
                        <svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div className={isAccordion == 5 ? "collapse" : "collapse show"} id="collapseIncluded">
                        <div className="card card-body">
                          <div className="box-included row">
                            <div className="item-included col-md-6">
                              <h6 className="color-brand-1 mb-15">{t("Fiyata Dahil Olanlar")}</h6>
                              <ul className="list-included">
                                {villa?.included.map((item, index) => (
                                  <li key={index}>
                                    <span className="text-md-regular">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="item-included col-md-6">
                              <h6 className="color-brand-1 mb-15">{t("Fiyata Dahil Olmayanlar")}</h6>
                              <ul className="list-excluded">
                                {villa?.notIncluded.map((item, index) => (
                                  <li key={index}>
                                    <span className="text-md-regular">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {villa?.prices && villa.prices.length > 0 ? (
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>{t("Başlangıç Tarihi")}</th>
                                    <th>{t("Bitiş Tarihi")}</th>
                                    <th>{t("Gecelik Fiyat")}</th>
                                    <th>{t("Min_Gece")}</th>
                                    <th>{t("Temizlik Periyodu")}</th>
                                    <th>{t("Temizlik Ücreti")}</th>
                                    <th>{t("Isıtma Ücreti")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {villa.prices.map((price, index) => (
                                    <tr key={index}>
                                      <td>{new Date(price.startDate).toLocaleDateString()}</td>
                                      <td>{new Date(price.endDate).toLocaleDateString()}</td>
                                      <td>{price.price} {villa.currency.toUpperCase()}</td>
                                      <td>{price.minNight} {t("gece")}</td>
                                      <td>{price.cleaningNight} {t("gece")}</td>
                                      <td>{price.cleaningPrice} {villa.currency.toUpperCase()}</td>
                                      <td>{price.heating} {villa.currency.toUpperCase()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>{t("Bu_villa_için_fiyat_bilgisi_bulunmamaktadır")}</p>
                          )}
                         
                        </div>
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 6
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseDuration"
                        aria-expanded="false"
                        aria-controls="collapseDuration"
                        onClick={() => handleAccordion(6)}
                      >
                        <h6>
                          🏠{villa?.title} {t("neler")}
                        </h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 6 ? "collapse" : "collapse show"
                        }
                        id="collapseDuration"
                      >
                        <div className="card card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <ul className="list-itemb">
                                {villa?.features
                                  .slice(
                                    0,
                                    Math.ceil(villa.features.length / 2)
                                  )
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <ul className="list-itemb">
                                {villa?.features
                                  .slice(Math.ceil(villa.features.length / 2))
                                  .map((item, index) => (
                                    <li
                                      key={
                                        index +
                                        Math.ceil(villa.features.length / 2)
                                      }
                                    >
                                      {item}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <h6 className="mt-[-10px] mb-2">🙋🏼‍♀️ {t("sss")}</h6>
                      <div className="list-questions">
                        {[
                          {
                            question: "q1",
                            answer: "a1",
                          },
                          {
                            question: "q2",
                            answer: "a2",
                          },
                          {
                            question: "q3",
                            answer: "a3",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="item-question relative flex items-center w-full"
                          >
                            <span
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                              onClick={() => handleAccordion(index)}
                            >
                              <svg
                                width={12}
                                height={7}
                                viewBox="0 0 12 7"
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                              >
                                <path
                                  d="M1 1L6 6L11 1"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  fill="none"
                                />
                              </svg>
                            </span>

                            <button className="flex-1">
                              <p className="text-md-bold neutral-1000">
                                {t(item.question)}
                              </p>
                            </button>

                            <div
                              className={`content-question ${
                                isAccordion === index ? "block" : "hidden"
                              }`}
                            >
                              <p className="text-sm-medium neutral-800">
                                {t(item.answer)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 6 ? "btn btn-collapse collapsed" : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseDeposit"
                        aria-expanded="false"
                        aria-controls="collapseDeposit"
                        onClick={() => handleAccordion(6)}
                      >
                        <h6>📅 {t("Giriş/Çıkış Bilgileri")}</h6>
                        <svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div className={isAccordion == 6 ? "collapse" : "collapse show"} id="collapseDeposit">
                        <div className="card card-body">
                          <div className="mt-30">
                            <h6 className="color-brand-1 mb-15">{t("Depozito Bilgileri")}</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <p><strong>{t("Depozito Oranı")}:</strong> %{villa?.deposit}</p>
                              </div>
                              <div className="col-md-6">
                                <p><strong>{t("Hasar Depozitosu")}:</strong> {villa?.damageDeposit} {villa?.currency.toUpperCase()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-30">
                            <h6 className="color-brand-1 mb-15">{t("Giriş/Çıkış Bilgileri")}</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <p><strong>{t("Giriş Saati")}:</strong> {villa?.checkInTime}</p>
                              </div>
                              <div className="col-md-6">
                                <p><strong>{t("Çıkış Saati")}:</strong> {villa?.checkOutTime}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 7
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseReviews"
                        aria-expanded="false"
                        aria-controls="collapseReviews"
                        onClick={() => handleAccordion(7)}
                      >
                        <h6>
                          💬{t("customer")} {villa?.title} {t("ne")}?{" "}
                        </h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 7 ? "collapse" : "collapse show"
                        }
                        id="collapseReviews"
                      >
                        <div className="card card-body">
                          <div className="head-reviews"></div>
                          <div className="list-reviews">
                            <div className="item-review">
                              <div className="head-review">
                                <div className="author-review">
                                  {" "}
                                  <img
                                    src="/assets/imgs/page/tour-detail/avatar.png"
                                    alt="Travila"
                                  />
                                  <div className="author-info">
                                    <p className="text-lg-bold">
                                      Sarah Johnson
                                    </p>
                                    <p className="text-sm-medium neutral-500">
                                      December 4, 2024
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="content-review">
                                <p className="text-sm-medium neutral-800">
                                  The views from The High Roller were absolutely
                                  stunning! It's a fantastic way to see the
                                  Strip and the surrounding area. The cabins are
                                  spacious and comfortable, and the audio
                                  commentary adds an extra layer of enjoyment.
                                  Highly recommend!
                                </p>
                              </div>
                            </div>
                            <div className="item-review">
                              <div className="head-review">
                                <div className="author-review">
                                  {" "}
                                  <img
                                    src="/assets/imgs/page/tour-detail/avatar.png"
                                    alt="Travila"
                                  />
                                  <div className="author-info">
                                    <p className="text-lg-bold">
                                      Sarah Johnson
                                    </p>
                                    <p className="text-sm-medium neutral-500">
                                      December 4, 2024
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="content-review">
                                <p className="text-sm-medium neutral-800">
                                  The views from The High Roller were absolutely
                                  stunning! It's a fantastic way to see the
                                  Strip and the surrounding area. The cabins are
                                  spacious and comfortable, and the audio
                                  commentary adds an extra layer of enjoyment.
                                  Highly recommend!
                                </p>
                              </div>
                            </div>
                          </div>
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li className="page-item">
                                <Link
                                  className="page-link"
                                  href="#"
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">
                                    <svg
                                      width={12}
                                      height={12}
                                      viewBox="0 0 12 12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" href="#">
                                  1
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link active" href="#">
                                  2
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" href="#">
                                  3
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" href="#">
                                  4
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" href="#">
                                  5
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link className="page-link" href="#">
                                  ...
                                </Link>
                              </li>
                              <li className="page-item">
                                <Link
                                  className="page-link"
                                  href="#"
                                  aria-label="Next"
                                >
                                  <span aria-hidden="true">
                                    <svg
                                      width={12}
                                      height={12}
                                      viewBox="0 0 12 12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
              
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 8
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAddReview"
                        aria-expanded="false"
                        aria-controls="collapseAddReview"
                        onClick={() => handleAccordion(8)}
                      >
                        <h6>
                          {villa?.title} {t("yorum1")}😊{" "}
                        </h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 8 ? "collapse" : "collapse show"
                        }
                        id="collapseAddReview"
                      >
                        <div className="card card-body">
                          <div className="box-form-reviews">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder={t("ad")}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Mail"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea
                                    className="form-control"
                                    placeholder={t("bırak")}
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <button className="btn btn-black-lg-square">
                                  {t("paylas")}
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
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    */}

                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 9
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMap"
                        aria-expanded="false"
                        aria-controls="collapseMap"
                        onClick={() => handleAccordion(9)}
                      >
                        <h6 id="map-section">📍 {t("Konum")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 9 ? "collapse" : "collapse show"
                        }
                        id="collapseMap"
                      >
                        <div className="card card-body">
                          {villa?.latitude && villa?.longitude ? (
                            <MapWithLoading />
                          ) : (
                            <p>{t("Bu_villa_için_konum_bilgisi_bulunmamaktadır")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="booking-form">
                    <div className="head-booking-form">
                      <p className="text-xl-bold ">{t("rez")}</p>
                    </div>
                    <BookingForm />
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <h6 className="text-lg-bold neutral-1000">
                      {t("dikkat")} 🤔
                    </h6>
                    <div className="box-popular-posts box-popular-posts-md">
                      <ul>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img src={villa?.images[0]} alt="Travila" />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                {villa?.title}
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img src={villa?.images[5]} alt="Travila" />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                {villa?.title}
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-banner">
                    {" "}
                    <Link href="#">
                      <img
                        src="/assets/imgs/page/tour-detail/banner-ads.png"
                        alt="Travila"
                      />
                    </Link>
                  </div>
                  <div className="sidebar-banner">
                    {" "}
                    <Link href="#">
                      <img
                        src="/assets/imgs/page/tour-detail/banner-ads2.png"
                        alt="Travila"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <News1></News1>
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
