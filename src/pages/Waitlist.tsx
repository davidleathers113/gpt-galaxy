
import React from 'react';
import { BackgroundBeamsDemo } from '@/components/ui/background-beams-demo';
import { Helmet } from 'react-helmet';

const Waitlist = () => {
  return (
    <div className="min-h-screen pt-16">
      <Helmet>
        <title>Join the Waitlist - PromptVault</title>
        <meta name="description" content="Join the waitlist for the feature-rich version of PromptVault, the best AI prompt collection for developers and creators." />
      </Helmet>
      
      <main>
        <BackgroundBeamsDemo />
      </main>
    </div>
  );
};

export default Waitlist;
