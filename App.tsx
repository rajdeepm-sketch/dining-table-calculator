/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Footer } from './components/layout/Layout';
import { CalculatorContainer } from './components/calculator/CalculatorContainer';
import { SEOContent } from './components/calculator/SEOContent';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CalculatorContainer />
        <SEOContent />
      </main>
      <Footer />
    </div>
  );
}

