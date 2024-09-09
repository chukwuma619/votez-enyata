import Testimonials from '@/components/homepage/testimonials';
// import Pricing from '@/components/homepage/pricing';
import Footer from '@/components/homepage/footer';
import Features from '@/components/homepage/features';
import HomeNavbar from '@/components/homepage/navbar';
import Hero from '@/components/homepage/hero';
import FAQ from '@/components/homepage/faq';

export default function Example() {
  return (
    <>
      <HomeNavbar />
      <main>
        <Hero />
        <Features />
        {/* <CTA/> */}
        <Testimonials />
        {/* <Pricing /> */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
