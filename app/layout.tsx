// app/layout.tsx
import Head from 'next/head';
import './globals.css';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MpoxMap</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Welcome to MpoxMap</h1>
            <p className="mt-2 text-lg">Real-time tracking and information on mpox outbreaks globally.</p>
          </div>
        </header>
        <main className="container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 MpoxMap. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
