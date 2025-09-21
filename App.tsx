
import React, { useState, useCallback } from 'react';
import { CampaignForm } from './components/CampaignForm';
import { CampaignResult } from './components/CampaignResult';
import { generateCampaign } from './services/geminiService';
import type { CampaignOutput } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [campaignOutput, setCampaignOutput] = useState<CampaignOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCampaign = useCallback(async (productName: string, productDescription: string, targetAudience: string, goal: string) => {
    setIsLoading(true);
    setError(null);
    setCampaignOutput(null);

    try {
      const result = await generateCampaign(productName, productDescription, targetAudience, goal);
      setCampaignOutput(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-8 h-8 text-indigo-400" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                AI Marketing Campaign Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <CampaignForm onSubmit={handleGenerateCampaign} isLoading={isLoading} />
            </div>
          </aside>
          <div className="lg:col-span-8 xl:col-span-9">
            <CampaignResult 
              campaignOutput={campaignOutput}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
