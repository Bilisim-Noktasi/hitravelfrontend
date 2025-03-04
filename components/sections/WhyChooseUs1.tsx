import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaAppStore } from "react-icons/fa";
export default function WhyChooseUs1() {
  const t = useTranslations("WhyChooseUs");
  return (
    <>
      <section className="section-box box-why-choose-us background-body">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-40">
              <h2
                className="title-why neutral-1000"
                style={{ marginBottom: "2px" }}
              >
                {t("bigTitle")}
              </h2>
              <h2
                className="market neutral-1000"
                style={{ marginBottom: "5px" }}
              >
                {t("market")}
              </h2>
              <h2 className="mar neutral-1000" style={{ marginBottom: "5px" }}>
                {t("mar")}
              </h2>

              <div className="download-apps">
                <Link href="/404">
                  <img
                    src="/assets/imgs/template/googleplay.png"
                    alt="Travila"
                  />
                </Link>
                <Link href="/404">
                  <img src="/assets/imgs/template/appstore.png" alt="Travila" />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 mb-30">
              <div className="row">
                <div className="col-sm-6 mt-5">
                  <div className="card-why-choose-us">
                    <div className="card-image">
                      {" "}
                      <img
                        src="/assets/imgs/page/homepage1/destination.png"
                        alt="Travila"
                      />
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold">{t("yüz")}</h6>
                      <p className="text-sm-medium neutral-800">{t("prof")}</p>
                    </div>
                  </div>
                  <div className="card-why-choose-us card-why-choose-us-type-2">
                    <div className="card-info">
                      <h6 className="text-xl-bold">{t("rez")}</h6>
                      <p className="text-sm-medium neutral-900">{t("odeme")}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card-why-choose-us background-body">
                    <div className="card-image">
                      {" "}
                      <img
                        src="/assets/imgs/page/homepage1/support.png"
                        alt="Travila"
                      />
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold neutral-1000">
                        {t("canlı")}
                      </h6>
                      <p className="text-sm-medium neutral-800">
                        {t("burda")} 👋🏻
                      </p>
                    </div>
                  </div>
                  <div className="card-why-choose-us card-why-choose-us-type-3">
                    <div className="card-info">
                      <h6 className="text-xl-bold">{t("eniyi")}</h6>
                      <p className="text-sm-medium neutral-1000">
                        {t("Birden")}
                      </p>
                    </div>
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
