import React from 'react';
import { BackgroundBeamsDemo } from '@/components/ui/background-beams-demo';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';

const Waitlist = () => {
  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 md:px-0">
      <Helmet>
        <title>Join the Waitlist - PromptVault</title>
        <meta name="description" content="Join the waitlist for the feature-rich version of PromptVault, the best AI prompt collection for developers and creators." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <Header />

      <main className="w-full overflow-hidden">
        <BackgroundBeamsDemo />
      </main>
    </div>
  );
};

export default Waitlist;
