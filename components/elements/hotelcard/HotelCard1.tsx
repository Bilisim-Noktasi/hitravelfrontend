import { AppDispatch, RootState } from "@/redux/store";
import { getVillaDispatch, getVillasDispatch } from "@/redux/villaSlice";
import urlParser from "@/util/urlParser";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";

export default function HotelCard1({ villa }: any) {
  const t = useTranslations("HotelCard1");

  return (
    <>
      <div className="card-journey-small background-card">
        <div className="card-image">
          {" "}
          <Link className="label" href="#">
            {t("topRates")}
          </Link>
          <Link className="wish" href="#">
            <svg
              width={20}
              height={18}
              viewBox="0 0 20 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
          <Link href={`/villa-detail/${villa?.homeId || ''}`}>
            <img src={villa?.imageUrl} alt="Travila" />
          </Link>
        </div>
        <div className="card-info">
          <div className="card-rating">
            <div className="card-left"> </div>
            <div className="card-right">
              {" "}
              <span className="rating">
                0{" "}
                <span className="text-sm-medium neutral-500">
                  (0 {t("reviews")} )
                </span>
              </span>
            </div>
          </div>
          <div className="card-title">
            {" "}
            <Link className="text-lg-bold neutral-1000" href={`/villa-detail/${villa?.homeId || ''}`}>
              {villa?.title}{" "}
            </Link>
          </div>
          <div className="card-program">
            <div className="card-location">
              <p className=" text-sm-medium neutral-00">📍 Antalya,kaş</p>
            </div>
            <div className="endtime">
              <div className="card-price">
                <h6 className="heading-6 neutral-1000">$48.25</h6>
                <p className="text-md-medium neutral-500">{t("night")}</p>
              </div>
              <div className="card-button">
                {" "}
                <Link
                  className="btn btn-gray"
                  href={`/villa-detail/${villa?.homeId || ''}`}
                >
                  {t("bookNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
