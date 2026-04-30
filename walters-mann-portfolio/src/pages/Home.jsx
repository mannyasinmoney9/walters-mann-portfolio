import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Stats from '../components/sections/Stats'
import Services from '../components/sections/Services'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import FAQ from '../components/sections/FAQ'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <FAQ />
      <Contact />
    </main>
  )
}
