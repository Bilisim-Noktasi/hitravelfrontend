import Countdown from "@/components/elements/Countdown";
import VideoPopup from "@/components/elements/VideoPopup";
import Layout from "@/components/layout/Layout";
import News1 from "@/components/sections/News1";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function CommingSoon() {
  const locale = useLocale();

  const isTurkish = locale === "tr";

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <section className="section-box box-become-video background-body">
            <div className="container">
              <div className="text-center">
                <img
                  className="mr-10"
                  src={
                    isTurkish
                      ? "/assets/imgs/page/pages/coming.png"
                      : "/assets/imgs/page/pages/coming-en.png"
                  }
                  alt="Travile"
                />
              </div>
            </div>
          </section>
          <News1 />
        </div>
      </Layout>
    </>
  );
}
