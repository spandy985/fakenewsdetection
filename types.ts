
export enum Verdict {
  REAL = 'Real',
  MOSTLY_REAL = 'Mostly Real',
  MIXED = 'Mixed',
  MOSTLY_FAKE = 'Mostly Fake',
  FAKE = 'Fake',
  UNVERIFIABLE = 'Unverifiable'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DetectionResult {
  verdict: Verdict;
  confidenceScore: number; // 0 to 100
  analysis: string;
  keyFindings: string[];
  sources: GroundingSource[];
}
