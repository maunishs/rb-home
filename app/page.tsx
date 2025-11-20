import LiveTicker from '@/components/LiveTicker'
import RBHeader from '@/components/RBHeader'
import HeroSection from '@/components/HeroSection'
import CategoryPills from '@/components/CategoryPills'
import Carousel from '@/components/Carousel'
import SalesRepContact from '@/components/SalesRepContact'
import QuickBrowseModules from '@/components/QuickBrowseModules'
import TrustSection from '@/components/TrustSection'
import WatchlistAndRecent from '@/components/WatchlistAndRecent'
import UpcomingEvents from '@/components/UpcomingEvents'
import DealsForYou from '@/components/DealsForYou'
import NewItemsBasedOnSearches from '@/components/NewItemsBasedOnSearches'
import RecommendedForYou from '@/components/RecommendedForYou'
import NewItemsFromSavedSearch from '@/components/NewItemsFromSavedSearch'
import CategoryBrandModule from '@/components/CategoryBrandModule'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LiveTicker />
      <RBHeader />
      <HeroSection />
      <CategoryPills />
      {/* Featured Items and Sales Rep Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Featured Items - 3/4 width (75%) */}
          <div className="lg:col-span-3">
            <Carousel />
          </div>
          {/* Sales Rep Contact - 1/4 width (25%) */}
          <div className="lg:col-span-1 flex">
            <SalesRepContact />
          </div>
        </div>
      </div>
      <QuickBrowseModules />
      <TrustSection />
      <WatchlistAndRecent />
      <UpcomingEvents />
      <DealsForYou />
      <NewItemsBasedOnSearches />
      <NewItemsFromSavedSearch />
      <RecommendedForYou
        category="CAT skidsteers"
        items={[
          {
            id: '1',
            title: 'Caterpillar 226D3 Skid Steer Loader 2020',
            price: '$42,500',
            image: '',
          },
          {
            id: '2',
            title: 'Caterpillar 242D3 Skid Steer Loader 2019',
            price: '$38,000',
            image: '',
          },
          {
            id: '3',
            title: 'Caterpillar 262D3 Skid Steer Loader 2021',
            price: '$48,500',
            image: '',
          },
          {
            id: '4',
            title: 'Caterpillar 272D3 Skid Steer Loader 2020',
            price: '$52,000',
            image: '',
          },
          {
            id: '5',
            title: 'Caterpillar 289D3 Skid Steer Loader 2019',
            price: '$58,500',
            image: '',
          },
        ]}
      />
      <CategoryBrandModule
        category="Excavators"
        subtitle="Find the perfect excavator for your construction needs"
        items={[
          {
            id: '1',
            title: 'Caterpillar 336F Excavator 2021',
            price: '$195,000',
            image: '',
          },
          {
            id: '2',
            title: 'Komatsu PC490LC Excavator 2020',
            price: '$175,000',
            image: '',
          },
          {
            id: '3',
            title: 'Volvo EC480E Excavator 2020',
            price: '$165,000',
            image: '',
          },
          {
            id: '4',
            title: 'John Deere 850K Dozer 2019',
            price: '$145,000',
            image: '',
          },
          {
            id: '5',
            title: 'Liebherr R 920 Compact Excavator 2021',
            price: '$98,000',
            image: '',
          },
        ]}
      />
      <Services />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
