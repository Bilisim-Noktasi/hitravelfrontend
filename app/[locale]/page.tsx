import Layout from "@/components/layout/Layout"
import BannerHome1 from "@/components/sections/BannerHome1"
import News1 from "@/components/sections/News1"
import Payments1 from "@/components/sections/Payments1"
import PopularDestinations1 from "@/components/sections/PopularDestinations1"
import Subscriber1 from "@/components/sections/Subscriber1"
import Testimonials1 from "@/components/sections/Testimonials1"
import TopRated1 from "@/components/sections/TopRated1"
import WhyChooseUs1 from "@/components/sections/WhyChooseUs1"
import YourJourney from "@/components/sections/YourJourney"
export default function Home() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <BannerHome1 />
                <YourJourney />
                <PopularDestinations1 />
                <TopRated1 />
                <WhyChooseUs1 />
                <Payments1 />
                <Testimonials1 />
                <News1/>
                <Subscriber1 />
            </Layout>
        </>
    )
}