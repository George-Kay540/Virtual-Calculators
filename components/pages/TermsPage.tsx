import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up py-12 px-4">
      <h1 className="text-4xl font-extrabold text-ocean-900 mb-8">Terms of Use</h1>
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <p className="text-lg">
            By accessing, browsing, or using this website and any of its tools, you agree to be bound by the following Terms of Use. If you do not agree with these terms, you should discontinue use of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">General Use</h2>
          <p>
            All tools, calculators, and content on this website are provided “as is” and “as available”, without warranties of any kind, either express or implied. While reasonable effort is made to ensure accuracy, completeness, and reliability, no guarantees are made regarding the correctness of results produced by the calculators.
          </p>
          <p className="mt-2">Use of this website and its tools is entirely at your own risk.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Informational Purpose Only</h2>
          <p>
            The calculators and information provided on this website are intended solely for general informational and educational purposes. They are not designed to replace professional judgment or specialized expertise.
          </p>
          <p className="mt-4 font-semibold">The website does not provide professional advice of any kind, including but not limited to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Financial advice</li>
            <li>Legal advice</li>
            <li>Medical advice</li>
            <li>Engineering or scientific advice</li>
            <li>Academic or examination-critical calculations</li>
          </ul>
          <p className="mt-4">
            Users are strongly encouraged to verify results independently and consult qualified professionals when accuracy or real-world consequences matter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, the website owner shall not be held liable for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Errors or omissions in calculator results</li>
            <li>Decisions made based on information or calculations from this website</li>
            <li>Direct, indirect, incidental, consequential, or special damages arising from use or inability to use the website</li>
          </ul>
          <p className="mt-4">
            This includes, but is not limited to, loss of data, financial loss, academic consequences, or business-related decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Website Availability and Changes</h2>
          <p>
            The website, its content, and its tools may be modified, updated, suspended, or discontinued at any time without prior notice. There is no obligation to maintain any specific calculator or feature indefinitely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Intellectual Property</h2>
          <p>
            All original content, design elements, layouts, text, and calculator logic on this website are the intellectual property of the site creator, unless otherwise stated. Unauthorized copying, reproduction, redistribution, or misuse of content is prohibited without explicit permission.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;