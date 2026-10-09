import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import EduNovaCaseStudy from '@/components/EduNovaCaseStudy';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] text-[#EDEDED]">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <EduNovaCaseStudy />
      <ContactForm />
      <Footer />
    </main>
  );
}

