import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

export default function PopupSignin({
  isLogin,
  handleLogin,
  isRegister,
  handleRegister,
}: any) {
  const t = useTranslations("SignIn");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(credentials));
    // Close the popup if login is successful
    if (!error) {
      handleLogin();
    }
  };
  
  return (
    <>
      <div
        className="popup-signin"
        style={{ display: `${isLogin ? "block" : "none"}` }}
      >
        <div className="popup-container">
          <div className="popup-content">
            {" "}
            <a className="close-popup-signin" onClick={handleLogin} />
            <div className="d-flex gap-2 align-items-center">
              <Link href="#"></Link>
              <h4 className="neutral-1000">{t("title")}</h4>
            </div>
            <div className="box-button-logins">
              {" "}
              <Link className="btn btn-login btn-google mr-10" href="#">
                <img
                  src="/assets/imgs/template/popup/google.svg"
                  alt="Travila"
                />
                <span className="text-sm-bold">{t("google")}</span>
              </Link>
              <Link className="btn btn-login mr-10" href="#">
                <img
                  src="/assets/imgs/template/popup/facebook.svg"
                  alt="Travila"
                />
              </Link>
              <Link className="btn btn-login" href="#">
                <img
                  src="/assets/imgs/template/popup/apple.svg"
                  alt="Travila"
                />
              </Link>
            </div>
            <div className="form-login">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-group">
                  <label className="text-sm-medium">{t("mail")}</label>
                  <input
                    className="form-control username"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-sm-medium">{t("password")}</label>
                  <input 
                    className="form-control password" 
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="box-remember-forgot">
                    <div className="remeber-me">
                      <label className="text-xs-medium neutral-500">
                        <input className="cb-remember" type="checkbox" />
                        {t("rememberMe")}
                      </label>
                    </div>
                    <div className="forgotpass">
                      {" "}
                      <Link className="text-xs-medium neutral-500" href="#">
                        {t("forgotPassword")}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-45 mb-30">
                  <button 
                    type="submit" 
                    className="btn btn-black-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : t("button")}
                    {!isLoading && (
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
                    )}
                  </button>
                </div>
                <p className="text-sm-medium neutral-500 px-6">
                  {" "}
                  {t("subTitle")}
                  <a
                    className="neutral-1000 font-bold"
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
