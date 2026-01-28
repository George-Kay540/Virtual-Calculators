import React, { useState, useEffect } from 'react';
import { CalculatorType } from './types';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import BasicCalculator from './components/calculators/BasicCalculator';
import ScientificCalculator from './components/calculators/ScientificCalculator';
import FractionCalculator from './components/calculators/FractionCalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import AboutPage from './components/pages/AboutPage';
import TermsPage from './components/pages/TermsPage';
import PrivacyPage from './components/pages/PrivacyPage';
import { Menu } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const SEO_DATA: Record<CalculatorType, { title: string; description: string; keywords: string }> = {
  [CalculatorType.BASIC]: {
    title: 'Basic Online Calculator',
    description: 'A simple, fast, and responsive basic online calculator for everyday arithmetic, addition, subtraction, and percentages.',
    keywords: 'basic calculator, online calculator, kalkulator, calculadora, calculatrice, arithmetic calculator, math tool, simple calculator, free online calculator'
  },
  [CalculatorType.SCIENTIFIC]: {
    title: 'Online Scientific Calculator',
    description: 'Advanced scientific calculator with trigonometry, logarithms, powers, and roots. Perfect for students and engineers.',
    keywords: 'scientific calculator, advanced math, trigonometry, logarithms, square root, engineering calculator, sine cosine tangent'
  },
  [CalculatorType.FRACTION]: {
    title: 'Fraction Calculators',
    description: 'Perform math with fractions and mixed numbers. Simplify fractions, convert decimals to fractions, and see step-by-step work.',
    keywords: 'fraction calculator, math fractions, simplify fractions, mixed numbers, improper fractions, decimal to fraction, fraction solver'
  },
  [CalculatorType.PERCENTAGE]: {
    title: 'Percentage Calculators',
    description: 'Calculate percentages of values, percentage change, and percentage increase or decrease with our easy-to-use tool.',
    keywords: 'percentage calculator, percent change, increase decrease percentage, percent of value, business math, finance tool'
  },
  [CalculatorType.ABOUT]: {
    title: 'About Our Calculator Suite',
    description: 'Learn about the mission behind Online-Calculator-1 and the developer creating simple math tools for the web.',
    keywords: 'about online calculator, solo developer project, math tool mission'
  },
  [CalculatorType.TERMS]: {
    title: 'Terms of Use - Online-Calculator-1',
    description: 'The terms and conditions for using our suite of online mathematical tools and calculators.',
    keywords: 'terms of service, calculator disclaimer, legal math tools'
  },
  [CalculatorType.PRIVACY]: {
    title: 'Privacy Policy - Online-Calculator-1',
    description: 'Our commitment to your privacy. Learn how we handle data and why your calculations stay in your browser.',
    keywords: 'privacy policy, data privacy, local processing, calculator security'
  }
};

const App: React.FC = () => {
  const [activeType, setActiveType] = useState<CalculatorType>(() => {
    const pathname = window.location.pathname.replace('/', '') as CalculatorType;
    return Object.values(CalculatorType).includes(pathname) ? pathname : CalculatorType.BASIC;
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.replace('/', '') as CalculatorType;
      const type = Object.values(CalculatorType).includes(pathname) ? pathname : CalculatorType.BASIC;
      setActiveType(type);
    };

    window.addEventListener('popstate', handlePopState);

    // Update SEO Metadata
    const seo = SEO_DATA[activeType];
    if (seo) {
      document.title = `${seo.title} - Virtual-Calculators`;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', seo.description);

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.keywords);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeType]);

  const handleNavigate = (type: CalculatorType) => {
    setActiveType(type);
    const path = type === CalculatorType.BASIC ? '/' : `/${type}`;
    window.history.pushState(null, '', path);
    const mainContent = document.getElementById('main-content-area');
    if (mainContent) mainContent.scrollTop = 0;
  };

  const renderContent = () => {
    switch (activeType) {
      case CalculatorType.BASIC: return <BasicCalculator />;
      case CalculatorType.SCIENTIFIC: return <ScientificCalculator />;
      case CalculatorType.FRACTION: return <FractionCalculator />;
      case CalculatorType.PERCENTAGE: return <PercentageCalculator />;
      case CalculatorType.ABOUT: return <AboutPage />;
      case CalculatorType.TERMS: return <TermsPage />;
      case CalculatorType.PRIVACY: return <PrivacyPage />;
      default: return <BasicCalculator />;
    }
  };

  const getTitle = (type: CalculatorType) => SEO_DATA[type]?.title || 'Calculator';

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-ocean-300 selection:text-ocean-900">
      <Sidebar 
        activeType={activeType} 
        onSelect={handleNavigate} 
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex items-center p-4 border-b border-ocean-200 bg-white/50 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-ocean-600 hover:text-ocean-900 rounded-lg hover:bg-ocean-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-ocean-900 tracking-tight">{getTitle(activeType)}</span>
        </header>

        <div 
          id="main-content-area"
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 pt-2 pb-8 sm:px-8 sm:pt-4 lg:px-12 relative flex flex-col scroll-smooth"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center flex-1">
            <div className="hidden md:block w-full text-center flex-none mb-5">
              <h2 className="text-xl font-bold text-ocean-900 tracking-tight">{getTitle(activeType)}</h2>
            </div>

            <div className="w-full flex justify-center items-start flex-1 mb-20">
              {renderContent()}
            </div>
          </div>
          <Footer onNavigate={handleNavigate} />
        </div>

        <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-ocean-100/40 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-ocean-200/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
      </main>
      <Analytics />
    </div>
  );
};

export default App;