/**
 * Vincent AI Mock Service
 *
 * This is a simplified mock of the Vincent AI service for scoring contributions.
 * In production, this would call the actual Vincent AI API.
 *
 * The mock analyzes PR URLs and provides realistic scoring based on simple heuristics.
 */

interface VincentScore {
  score: number;
  feedback: string;
  breakdown: {
    codeQuality: number;
    testCoverage: number;
    documentation: number;
    prDescription: number;
    codeStyle: number;
    impact: number;
  };
}

/**
 * Analyze a PR and generate a contribution score
 *
 * In production, this would:
 * 1. Clone the repository
 * 2. Fetch PR diff and changes
 * 3. Run static analysis tools
 * 4. Check test coverage
 * 5. Analyze code quality
 * 6. Generate AI feedback
 *
 * For now, it generates realistic scores based on PR URL patterns
 */
export async function scoreContribution(prUrl: string): Promise<VincentScore> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Extract PR number and repo info from URL
  const prMatch = prUrl.match(/github\.com\/([\w-]+)\/([\w-]+)\/pull\/(\d+)/);

  if (!prMatch) {
    throw new Error("Invalid GitHub PR URL");
  }

  const [, owner, repo, prNumber] = prMatch;

  // Generate pseudo-random but consistent scores based on PR number
  // This ensures the same PR always gets the same score
  const seed = parseInt(prNumber);
  const random = (min: number, max: number, offset: number = 0) => {
    const x = Math.sin(seed + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  // Generate individual scores (weighted towards higher scores)
  const codeQuality = random(70, 100, 1);
  const testCoverage = random(60, 95, 2);
  const documentation = random(65, 95, 3);
  const prDescription = random(75, 100, 4);
  const codeStyle = random(80, 100, 5);
  const impact = random(70, 100, 6);

  // Calculate weighted average
  const totalScore = Math.floor(
    codeQuality * 0.3 +
      testCoverage * 0.2 +
      documentation * 0.15 +
      prDescription * 0.15 +
      codeStyle * 0.1 +
      impact * 0.1
  );

  // Generate feedback based on score
  let feedback = generateFeedback(totalScore, {
    codeQuality,
    testCoverage,
    documentation,
    prDescription,
    codeStyle,
    impact,
  });

  return {
    score: totalScore,
    feedback,
    breakdown: {
      codeQuality,
      testCoverage,
      documentation,
      prDescription,
      codeStyle,
      impact,
    },
  };
}

function generateFeedback(
  score: number,
  breakdown: VincentScore["breakdown"]
): string {
  let feedback = `**Overall Score: ${score}/100**\n\n`;

  if (score >= 90) {
    feedback +=
      "🌟 **Excellent work!** This is a high-quality contribution.\n\n";
  } else if (score >= 80) {
    feedback +=
      "✅ **Great job!** This is a solid contribution with minor areas for improvement.\n\n";
  } else if (score >= 70) {
    feedback +=
      "👍 **Good work!** This contribution meets the quality standards.\n\n";
  } else if (score >= 60) {
    feedback +=
      "⚠️ **Acceptable.** This contribution has some areas that need attention.\n\n";
  } else {
    feedback +=
      "❌ **Needs Improvement.** This contribution requires significant revisions.\n\n";
  }

  feedback += "**Detailed Breakdown:**\n\n";

  // Code Quality
  feedback += `- **Code Quality (${breakdown.codeQuality}/100)**: `;
  if (breakdown.codeQuality >= 85) {
    feedback += "Excellent code structure and best practices followed.\n";
  } else if (breakdown.codeQuality >= 70) {
    feedback += "Good code quality with some room for optimization.\n";
  } else {
    feedback +=
      "Code quality could be improved with better structure and practices.\n";
  }

  // Test Coverage
  feedback += `- **Test Coverage (${breakdown.testCoverage}/100)**: `;
  if (breakdown.testCoverage >= 85) {
    feedback += "Comprehensive test coverage for new features.\n";
  } else if (breakdown.testCoverage >= 70) {
    feedback += "Adequate test coverage, consider adding edge cases.\n";
  } else {
    feedback += "Test coverage is insufficient. Please add more tests.\n";
  }

  // Documentation
  feedback += `- **Documentation (${breakdown.documentation}/100)**: `;
  if (breakdown.documentation >= 85) {
    feedback +=
      "Well-documented code with clear comments and README updates.\n";
  } else if (breakdown.documentation >= 70) {
    feedback += "Documentation is present but could be more comprehensive.\n";
  } else {
    feedback +=
      "Documentation is lacking. Please add comments and update docs.\n";
  }

  // PR Description
  feedback += `- **PR Description (${breakdown.prDescription}/100)**: `;
  if (breakdown.prDescription >= 85) {
    feedback += "Clear and detailed PR description explaining changes.\n";
  } else if (breakdown.prDescription >= 70) {
    feedback += "Good PR description, could include more context.\n";
  } else {
    feedback +=
      "PR description needs more detail about what was changed and why.\n";
  }

  // Code Style
  feedback += `- **Code Style (${breakdown.codeStyle}/100)**: `;
  if (breakdown.codeStyle >= 85) {
    feedback += "Excellent adherence to project coding standards.\n";
  } else if (breakdown.codeStyle >= 70) {
    feedback += "Mostly follows code style guidelines.\n";
  } else {
    feedback +=
      "Code style inconsistencies detected. Please follow project guidelines.\n";
  }

  // Impact
  feedback += `- **Impact (${breakdown.impact}/100)**: `;
  if (breakdown.impact >= 85) {
    feedback += "Significant positive impact on the project.\n";
  } else if (breakdown.impact >= 70) {
    feedback += "Good contribution with measurable impact.\n";
  } else {
    feedback += "Limited impact. Consider addressing more critical issues.\n";
  }

  // Recommendations
  feedback += "\n**Recommendations:**\n";
  const improvements: string[] = [];

  if (breakdown.codeQuality < 80)
    improvements.push("Refactor complex functions");
  if (breakdown.testCoverage < 80) improvements.push("Add more unit tests");
  if (breakdown.documentation < 80)
    improvements.push("Improve code documentation");
  if (breakdown.prDescription < 80) improvements.push("Enhance PR description");
  if (breakdown.codeStyle < 85) improvements.push("Follow style guidelines");

  if (improvements.length > 0) {
    improvements.forEach((item) => {
      feedback += `- ${item}\n`;
    });
  } else {
    feedback += "- Keep up the excellent work!\n";
  }

  return feedback;
}

/**
 * Validate if a PR URL is valid and accessible
 */
export async function validatePR(prUrl: string): Promise<boolean> {
  const githubPrRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/pull\/\d+$/;
  return githubPrRegex.test(prUrl);
}

/**
 * Get PR details (mock - in production would fetch from GitHub API)
 */
export async function getPRDetails(prUrl: string) {
  const prMatch = prUrl.match(/github\.com\/([\w-]+)\/([\w-]+)\/pull\/(\d+)/);

  if (!prMatch) {
    throw new Error("Invalid GitHub PR URL");
  }

  const [, owner, repo, prNumber] = prMatch;

  return {
    owner,
    repo,
    prNumber: parseInt(prNumber),
    url: prUrl,
    // In production, fetch these from GitHub API
    title: `Pull Request #${prNumber}`,
    state: "open",
    author: "contributor",
    createdAt: new Date().toISOString(),
  };
}
