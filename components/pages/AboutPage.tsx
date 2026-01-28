import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up py-12 px-4">
      <h1 className="text-4xl font-extrabold text-ocean-900 mb-8">About</h1>
      <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
        <p>
          This website is an independently developed project created and maintained by a solo developer. It began as a personal passion project driven by a clear observation: many online calculator tools prioritize monetization and clutter over usability, speed, and clarity.
        </p>
        <p>
          The primary purpose of this website is to provide simple, accessible, and practical calculation tools to people across the internet, regardless of device or technical skill level. Every calculator on this site is designed with a strong focus on user experience, emphasizing clean layouts, minimal distractions, fast performance, and intuitive interaction.
        </p>
        <p>
          Rather than overwhelming users with unnecessary features or intrusive design elements, this project aims to deliver tools that do exactly what they are supposed to do—quickly and clearly. The interface is intentionally kept clean and straightforward so users can focus on their calculations without confusion, friction, or visual noise.
        </p>
        <p>
          As a solo-built platform, this website is continuously refined and improved over time. Features, layouts, and functionality may evolve as usage patterns become clearer and feedback is received. The long-term vision is to grow this project into a reliable and trustworthy collection of online calculators that users can return to with confidence.
        </p>
        <p>
          This website is not operated by a corporation, institution, or large development team. It is the result of individual effort, learning, and iteration, built for the benefit of the wider internet community.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;