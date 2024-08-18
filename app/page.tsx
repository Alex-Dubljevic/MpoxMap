import Map from '../components/Map';
import News from '../components/News';
import IntroBox from '../components/IntroBox';
import Head from 'next/head';
import NewsletterSignup from '@/components/NewsletterSignup';

const Home: React.FC = () => {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Spline+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen font-sans">  
        <main className="flex-1 container mx-auto p-6">
          {/* IntroBox Component */}
          <section className="mb-12">
            <IntroBox />
          </section>
          {/* Map Component */}
          <section className="mb-12">
            <Map />
          </section>
          <section className="mb-12">
            <News />
          </section>
          <section className="mb-12">
            <NewsletterSignup />
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
