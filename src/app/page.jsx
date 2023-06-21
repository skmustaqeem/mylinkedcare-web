import Dashboard from '@/components/Dashboard'
import HeaderLandingScreen from '@/components/shared/HeaderLandingScreen'

export default function Home() {
  return (
    <>
      <HeaderLandingScreen />
      <section className="section-page">
        {/* <PageTitle title="Dashboard" /> */}
      </section>
      <section className="container-lg m-5">
        <Dashboard />
      </section>
    </>
  )
}
