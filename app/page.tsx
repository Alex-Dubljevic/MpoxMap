// app/page.tsx

import Map from '../components/Map';
import News from '../components/News';

const Home: React.FC = () => {
  // Example data
  const data = {
    outbreaks: 123,
    cases: 4567,
    deaths: 89,
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container mx-auto p-6">
        {/* Data Boxes */}
        <div className="mb-8 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-bold">Current MPox Numbers</h2>
          <div className="mt-2">
            <div className="mb-2 p-2 bg-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">Outbreaks</h3>
              <p>{data.outbreaks}</p>
            </div>
            <div className="mb-2 p-2 bg-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">Cases</h3>
              <p>{data.cases}</p>
            </div>
            <div className="mb-2 p-2 bg-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">Deaths</h3>
              <p>{data.deaths}</p>
            </div>
          </div>
        </div>
        {/* Map Component */}
        <section className="mb-12">
          <Map />
        </section>
        <section className="mb-12">
          <News />
        </section>
      </main>
      
    </div>
  );
};

export default Home;
