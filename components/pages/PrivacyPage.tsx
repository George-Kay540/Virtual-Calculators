import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up py-12 px-4">
      <h1 className="text-4xl font-extrabold text-ocean-900 mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <p className="text-lg">
            This Privacy Policy explains how information is handled when you use this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Personal Data</h2>
          <p>
            This website is designed to function without requiring users to submit personal information. No account registration is required, and no personal identifiers are intentionally collected through calculator inputs.
          </p>
          <p className="mt-2">
            Calculations entered into the tools are processed locally within your browser and are not stored on the website’s servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Automatically Collected Information</h2>
          <p>
            Like most websites, certain non-personal information may be collected automatically, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Browser type and version</li>
            <li>Device type and screen size</li>
            <li>Approximate geographic location (non-precise)</li>
            <li>Pages visited and time spent on the site</li>
          </ul>
          <p className="mt-4">
            This information is used strictly for performance monitoring, analytics, and improvement of user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Cookies</h2>
          <p>
            This website may use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Basic site functionality</li>
            <li>Traffic analysis and performance measurement</li>
            <li>Advertising and monetization</li>
          </ul>
          <p className="mt-4">
            Third-party services, including analytics providers and advertising networks such as Google AdSense, may use cookies or similar technologies to display relevant advertisements and analyze usage patterns.
          </p>
          <p className="mt-2">
            Users can disable cookies through their browser settings if they choose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Third-Party Services</h2>
          <p>
            This website may rely on third-party services to operate effectively, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Analytics tools to understand site usage</li>
            <li>Advertising platforms to support ongoing development</li>
          </ul>
          <p className="mt-4">
            These third parties operate under their own privacy policies, and the website owner does not control how they collect or use data beyond integration settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">External Links</h2>
          <p>
            This website may contain links to external websites for reference or convenience. The website owner is not responsible for the content, security, or privacy practices of external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically to reflect changes in technology, services used, or legal requirements. Continued use of the website after changes are posted constitutes acceptance of the revised policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;