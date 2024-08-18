import Head from 'next/head';
import './globals.css';
import { ReactNode } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams'; // Ensure the correct path to your BackgroundBeams component

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MpoxMap</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <body className="bg-neutral-900 text-gray-100">
        <div className="relative">
          {/* BackgroundBeams Component */}
          <BackgroundBeams className="absolute inset-0 z-0" />
          {/* Main Content */}
          <div className="relative z-10">
            <header className="bg-blue-800 text-white py-4">
              <div className="container mx-auto text-center">
                <h1 className="text-8xl font-source-serif font-bold-700">Welcome to MpoxMap</h1>
                <p className="mt-2 text-lg font-source-serif">Real-time tracking and information on mpox outbreaks globally.</p>
              </div>
            </header>
            <main className="container mx-auto p-6">
              {children}
            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
              <p>&copy; 2024 MpoxMap. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
