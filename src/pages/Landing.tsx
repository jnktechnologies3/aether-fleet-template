import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SkillsTerminal from '../components/SkillsTerminal'
import Problem from '../components/Problem'
import ThreeSkills from '../components/ThreeSkills'
import MiddlePath from '../components/MiddlePath'
import CostComparison from '../components/CostComparison'
import Loop from '../components/Loop'
import Scenarios from '../components/Scenarios'
import WorkflowPicker from '../components/WorkflowPicker'
import SkillsGrid from '../components/SkillsGrid'
import FitCheck from '../components/FitCheck'
import Curriculum from '../components/Curriculum'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <SkillsTerminal />
        <Problem />
        <ThreeSkills />
        <MiddlePath />
        <CostComparison />
        <Loop />
        <Scenarios />
        <WorkflowPicker />
        <SkillsGrid />
        <FitCheck />
        <Curriculum />
        <Testimonials />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
