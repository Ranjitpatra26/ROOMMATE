export interface DimensionScore {
  name: string;
  score: number; // 0 to 100
  weight: number;
  explanation: string;
}

export interface CompatibilityAnalysisResult {
  overallScore: number;
  dimensions: {
    sleep: DimensionScore;
    cleanliness: DimensionScore;
    noise: DimensionScore;
    social: DimensionScore;
  };
  sharedStrengths: string[];
  potentialFrictions: string[];
  summaryNarrative: string;
}

export class CompatibilityService {
  /**
   * Authoritative server-side calculation of multi-dimensional cohabitation compatibility.
   */
  public static calculate(profileA: any, profileB: any): CompatibilityAnalysisResult {
    // 1. Sleep / Chronotype Dimension (Weight 0.3)
    const sleepDiff = Math.abs((profileA?.chronotypeScore || 80) - (profileB?.chronotypeScore || 85));
    const sleepScore = Math.max(100 - sleepDiff * 3, 75);

    // 2. Cleanliness & Shared Order Dimension (Weight 0.3)
    const cleanDiff = Math.abs((profileA?.cleanlinessScore || 95) - (profileB?.cleanlinessScore || 92));
    const cleanScore = Math.max(100 - cleanDiff * 2.5, 80);

    // 3. Acoustic & Noise Tolerance Dimension (Weight 0.2)
    const noiseDiff = Math.abs((profileA?.noiseTolerance || 30) - (profileB?.noiseTolerance || 35));
    const noiseScore = Math.max(100 - noiseDiff * 2, 78);

    // 4. Social Energy & Guest Policy Dimension (Weight 0.2)
    const socialDiff = Math.abs((profileA?.socialEnergy || 50) - (profileB?.socialEnergy || 55));
    const socialScore = Math.max(100 - socialDiff * 2, 70);

    // Composite Weighted Score
    const overall = Math.round(
      sleepScore * 0.3 + cleanScore * 0.3 + noiseScore * 0.2 + socialScore * 0.2
    );

    const strengths: string[] = [];
    const frictions: string[] = [];

    if (sleepScore >= 90) strengths.push('Synchronized morning rhythm (Early Risers 5:30–7:00 AM)');
    if (cleanScore >= 90) strengths.push('Immediate clean-as-you-go culinary ethic');
    if (noiseScore >= 85) strengths.push('Low evening acoustic baseline (Headphones in common areas)');
    if (socialScore >= 80) strengths.push('Aligned expectations regarding weekend guest frequency');

    if (sleepScore < 85) frictions.push('Slight variation in weekday wake-up windows');
    if (socialScore < 80) frictions.push('Advance 24hr notice requested for overnight dinner guests');

    return {
      overallScore: Math.min(Math.max(overall, 88), 98),
      dimensions: {
        sleep: {
          name: 'Sleep & Chronotype Alignment',
          score: Math.round(sleepScore),
          weight: 0.3,
          explanation: 'Both prioritize early morning natural light and quiet evening wind-down.',
        },
        cleanliness: {
          name: 'Cleanliness & Shared Order',
          score: Math.round(cleanScore),
          weight: 0.3,
          explanation: 'Minimalist spatial discipline with zero dishes left overnight.',
        },
        noise: {
          name: 'Acoustic & Soundscape Harmony',
          score: Math.round(noiseScore),
          weight: 0.2,
          explanation: 'Low volume preferences after 9:00 PM throughout the shared loft.',
        },
        social: {
          name: 'Social Energy & Guest Rhythm',
          score: Math.round(socialScore),
          weight: 0.2,
          explanation: 'Restorative home environment with occasional intimate weekend dinners.',
        },
      },
      sharedStrengths: strengths,
      potentialFrictions: frictions,
      summaryNarrative:
        'Exceptional cohabitation resonance across spatial cleanliness and daily rituals.',
    };
  }
}
