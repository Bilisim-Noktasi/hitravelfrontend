import { useTranslations } from "next-intl";
import Link from "next/link";
export default function PopupSignup({
  isLogin,
  handleLogin,
  isRegister,
  handleRegister,
}: any) {
  const t = useTranslations("SignUp");
  return (
    <>
      <div
        className="popup-signup"
        style={{ display: `${isRegister ? "block" : "none"}` }}
      >
        <div className="popup-container">
          <div className="popup-content">
            {" "}
            <a className="close-popup-signup" onClick={handleRegister} />
            <div className="d-flex gap-2 align-items-center">
              <Link href="#"></Link>
              <h4 className="neutral-1000">{t("title")}</h4>
            </div>
            <div className="form-login">
              <form action="#">
                <div className="form-group">
                  <label className="text-sm-medium">{t("mail")}</label>
                  <input
                    className="form-control username"
                    type="text"
                    placeholder="Mail"
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-sm-medium">{t("password")}</label>
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="***********"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-sm-medium">{t("password")}</label>
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="***********"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="box-remember-forgot">
                    <div className="remeber-me">
                      <label className="text-xs-medium neutral-500">
                        <input className="cb-remember" type="checkbox" />
                        {t("subTitle")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-45 mb-30">
                  {" "}
                  <Link className="btn btn-black-lg" href="#">
                    {t("button")}
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15L15 8L8 1M15 8L1 8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <p className="text-sm-medium neutral-500">
                  {t("subTitle1")}
                  <a
                    className="neutral-1000 btn-signin"
                    onClick={() => {
                      handleRegister();
                      handleLogin();
                    }}
                  >
                    {t("subTitle2")}{" "}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
