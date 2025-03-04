import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
export default function Subscriber1() {
    const t=useTranslations("hibulten")
    return (
        <>

            <section className="section-box box-subscriber background-body">
                <div className="container">
                    <div className="block-subscriber">
                        <div className="subscriber-left"><h2 className="">{t("hiBulten")}🗞️</h2>
                            <div className="mt-15 mb-30 neutral-1000 text-xl">{t("subTitle")}</div>
                            <form className="form-subscriber " action="#">
                                <input className="form-control" type="text" placeholder="E-Mail" />
                                <input className="btn btn-submit" type="submit" defaultValue={t("kayıt")}/>
                            </form>
                            <p className="text-sm neutral-800 mt-15 text-center">{t("desc")}</p>
                        </div>
                        <div className="subscriber-right" />
                    </div>
                </div>
            </section>
        </>
    )
}
