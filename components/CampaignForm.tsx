
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface CampaignFormProps {
  onSubmit: (productName: string, productDescription: string, targetAudience: string, goal: string) => void;
  isLoading: boolean;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isLoading }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName && productDescription && targetAudience && goal) {
      onSubmit(productName, productDescription, targetAudience, goal);
    }
  };

  const isFormIncomplete = !productName || !productDescription || !targetAudience || !goal;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Campaign Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-300">Product/Service Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., 'SynthWave AI'"
          />
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            id="productDescription"
            rows={4}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describe what it does and who it's for."
          />
        </div>
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., 'Startups and small businesses'"
          />
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-300">Marketing Goal</label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a goal...</option>
            <option value="Increase brand awareness">Increase brand awareness</option>
            <option value="Drive sales">Drive sales</option>
            <option value="Generate leads">Generate leads</option>
            <option value="Launch a new product">Launch a new product</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading || isFormIncomplete}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
              Generate Campaign
            </>
          )}
        </button>
      </form>
    </div>
  );
};
