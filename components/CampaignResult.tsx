
import React from 'react';
import type { CampaignOutput } from '../types';
import { ResultSection } from './ResultSection';
import { LoadingSpinner } from './LoadingSpinner';
import { CopyButton } from './CopyButton';

interface CampaignResultProps {
  campaignOutput: CampaignOutput | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomeState: React.FC = () => (
  <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg">
    <h3 className="text-xl font-semibold text-white">Welcome to the AI Campaign Generator</h3>
    <p className="mt-2 text-gray-400">Fill out the form on the left to create your complete marketing strategy. Your results will appear here.</p>
  </div>
);

export const CampaignResult: React.FC<CampaignResultProps> = ({ campaignOutput, isLoading, error }) => {
  if (isLoading) {
    return <div className="flex flex-col items-center justify-center p-8 h-96">
        <LoadingSpinner />
        <p className="mt-4 text-gray-300">Generating your campaign... this may take a moment.</p>
    </div>;
  }

  if (error) {
    return <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg">
      <h3 className="font-bold">An Error Occurred</h3>
      <p>{error}</p>
    </div>;
  }

  if (!campaignOutput) {
    return <WelcomeState />;
  }

  const { coreMessaging, targetPersona, socialMediaStrategy, emailMarketing, blogStrategy } = campaignOutput;

  return (
    <div className="space-y-6">
      <ResultSection title="Core Messaging">
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-indigo-300 mb-2">Taglines</h4>
                <ul className="space-y-2">
                    {coreMessaging.taglines.map((tagline, i) => (
                        <li key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                            <span className="text-gray-300">{tagline}</span>
                            <CopyButton textToCopy={tagline} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-indigo-300 mb-2">Value Propositions</h4>
                <ul className="space-y-2">
                    {coreMessaging.valuePropositions.map((prop, i) => (
                        <li key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                           <span className="text-gray-300">{prop}</span>
                           <CopyButton textToCopy={prop} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </ResultSection>

      <ResultSection title="Target Persona">
        <div className="space-y-4 text-gray-300">
          <p><strong>Name:</strong> {targetPersona.name}</p>
          <p><strong>Demographics:</strong> {targetPersona.demographics}</p>
          <div>
            <h4 className="font-semibold text-indigo-300">Goals:</h4>
            <ul className="list-disc list-inside ml-4">
              {targetPersona.goals.map((goal, i) => <li key={i}>{goal}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300">Challenges:</h4>
            <ul className="list-disc list-inside ml-4">
              {targetPersona.challenges.map((challenge, i) => <li key={i}>{challenge}</li>)}
            </ul>
          </div>
        </div>
      </ResultSection>

      <ResultSection title="Social Media Strategy">
        <div className="space-y-4">
            <p className="text-gray-300"><strong>Recommended Platform:</strong> <span className="font-semibold text-white">{socialMediaStrategy.platform}</span></p>
            <div>
                <h4 className="font-semibold text-indigo-300 mb-2">Content Pillars:</h4>
                <div className="flex flex-wrap gap-2">
                    {socialMediaStrategy.contentPillars.map((pillar, i) => (
                        <span key={i} className="bg-indigo-900/50 text-indigo-300 text-sm font-medium px-2.5 py-0.5 rounded-full">{pillar}</span>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-indigo-300 mb-2">Sample Posts:</h4>
                <div className="space-y-4">
                {socialMediaStrategy.samplePosts.map((post, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-lg">
                        <p className="font-semibold text-gray-200 mb-2">Post for {post.platform}</p>
                        <p className="text-gray-300 whitespace-pre-wrap">{post.text}</p>
                        <div className="mt-3 bg-gray-900 p-2 rounded-md">
                            <p className="text-xs text-gray-400">Image Prompt:</p>
                            <p className="text-sm text-gray-300 italic">"{post.imagePrompt}"</p>
                        </div>
                         <div className="mt-3 flex justify-end">
                             <CopyButton textToCopy={post.text} />
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </ResultSection>
      
      <ResultSection title="Email Marketing">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-indigo-300 mb-2">Subject Lines</h4>
            <ul className="space-y-2">
              {emailMarketing.subjectLines.map((line, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                    <span className="text-gray-300">{line}</span>
                    <CopyButton textToCopy={line} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300 mb-2">Sample Email</h4>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400">Subject: <span className="text-gray-200 font-medium">{emailMarketing.sampleEmail.subject}</span></p>
              <hr className="border-gray-700 my-2"/>
              <p className="text-gray-300 whitespace-pre-wrap">{emailMarketing.sampleEmail.body}</p>
              <div className="mt-3 flex justify-end">
                <CopyButton textToCopy={emailMarketing.sampleEmail.body} />
              </div>
            </div>
          </div>
        </div>
      </ResultSection>

      <ResultSection title="Blog Strategy">
         <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-indigo-300 mb-2">Post Ideas</h4>
            <ul className="space-y-2">
              {blogStrategy.postIdeas.map((idea, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                    <span className="text-gray-300">{idea}</span>
                    <CopyButton textToCopy={idea} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300 mb-2">Sample Outline: "{blogStrategy.sampleOutline.title}"</h4>
            <div className="bg-gray-800 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {blogStrategy.sampleOutline.outline.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ResultSection>

    </div>
  );
};
