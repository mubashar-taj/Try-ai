
export interface CampaignOutput {
  coreMessaging: {
    taglines: string[];
    valuePropositions: string[];
  };
  targetPersona: {
    name: string;
    demographics: string;
    goals: string[];
    challenges: string[];
  };
  socialMediaStrategy: {
    platform: string;
    contentPillars: string[];
    samplePosts: {
      platform: string;
      text: string;
      imagePrompt: string;
    }[];
  };
  emailMarketing: {
    subjectLines: string[];
    sampleEmail: {
      subject: string;
      body: string;
    };
  };
  blogStrategy: {
    postIdeas: string[];
    sampleOutline: {
      title: string;
      outline: string[];
    };
  };
}
