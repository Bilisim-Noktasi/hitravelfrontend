"use client";
import { useTranslations } from "next-intl";
import SwiperGroup3Slider from "../slider/SwiperGroup3Slider";
import { Link } from "@/i18n/routing";

export default function News1() {
  const t = useTranslations("homeBlog");
  return (
    <>
      <section className="section-box box-news background-body">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-12 d-flex justify-content-between align-items-center mb-10 wow fadeInLeft flex-wrap">
              <h4 className="neutral-1000">{t("title")}</h4>
              <div className="mt-2 mt-md-0">
                <Link className="btn btn-black-lg" href="/blog">
                  {t("button")}
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
          </div>
          <div className="box-list-news wow fadeInUp">
            <div className="box-swiper mt-30">
              <div className="swiper-container swiper-group-3">
                <SwiperGroup3Slider />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .flex-wrap {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
