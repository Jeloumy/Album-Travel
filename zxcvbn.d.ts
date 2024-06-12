declare module 'zxcvbn' {
    export interface ZXCVBNFeedback {
      suggestions: string[];
      warning: string;
    }
  
    export interface ZXCVBNScore {
      score: number;
      feedback: ZXCVBNFeedback;
    }
  
    export default function zxcvbn(password: string): ZXCVBNScore;
  }
  