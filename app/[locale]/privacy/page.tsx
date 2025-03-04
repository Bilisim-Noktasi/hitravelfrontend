import Layout from "@/components/layout/Layout";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function Privacy() {
  const t = useTranslations("privacy");
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb ">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  {" "}
                  <Link href="/">{t("anasayfa")}</Link>
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
                  <span className="text-breadcrumb">{t("gizlilik")}</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="section-box box-become-video background-body">
            <div className="container">
              <div className="box-mw-824">
                <div className="text-center">
                  <h2 className="mt-0 mb-15 neutral-1000 wow fadeInUp">
                    {t("gizlilik")}
                  </h2>
                </div>
              </div>
              <div className="box-image-video mb-45">
                {" "}
                <img
                  className="bdrd-16"
                  src="/assets/imgs/page/pages/banner-privacy.png"
                  alt="Travilla"
                />
              </div>
              <div className="box-mw-824">
                <div className="box-detail-info">
                  <p>{t("intro")}</p>
                  <p>
                    <strong>1.{t("title")}:</strong> {t("description")}
                  </p>
                  <p>
                    <strong>1.{t("title1")}:</strong> {t("description1")}
                  </p>
                  <p>
                    <strong>1.{t("title2")}:</strong> {t("description2")}
                  </p>
                  <p>
                    <strong>1.{t("title3")}:</strong> {t("description3")}
                  </p>
                  <p>
                    <strong>1.{t("title4")}:</strong> {t("description4")}
                  </p>
                  <p>
                    <strong>1.{t("title5")}:</strong> {t("description5")}
                  </p>
                  <p>
                    {t("description6")}:{" "}
                    <a href="mailto:info@hitravel.com">info@hitravel.com.tr</a>
                  </p>
                </div>
                <div className="box-share-us">
                  <p className="text-lg-medium neutral-900">{t("closing")} </p>
                  <p className="text-lg-bold neutral-1000">{t("hi")}</p>
                </div>
              </div>
            </div>
          </section>
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
