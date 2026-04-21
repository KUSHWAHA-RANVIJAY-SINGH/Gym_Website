import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import Problem from '@/components/public/Problem';
import SocialProof from '@/components/public/SocialProof';
import Services from '@/components/public/Services';
import TransformationHub from '@/components/public/TransformationHub';
import Pricing from '@/components/public/Pricing';
import Contact from '@/components/public/Contact';
import StickyCTA from '@/components/public/StickyCTA';

export default function Home() {
  return (
    <main className="bg-black min-h-screen selection:bg-rose-600 selection:text-white">
      <Header />
      <Hero />
      <Problem />
      <SocialProof />
      <Services />
      <TransformationHub />
      <Pricing />
      <Contact />
      <Footer />
      <StickyCTA />
    </main>
  );
}
