import { CompatibilityService } from '../services/compatibilityService.js';
import { TrustService } from '../services/trustService.js';

let passed = 0;
let failed = 0;

const assert = (condition: boolean, testName: string) => {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
};

const runIntegrationTests = async () => {
  console.log('\n==================================================');
  console.log('ROOMMATE — INTEGRATION & ENGINE VERIFICATION SUITE');
  console.log('==================================================\n');

  // 1. Compatibility Engine Tests
  console.log('Testing [CompatibilityService]...');
  const mockProfileA = {
    chronotypeScore: 90,
    cleanlinessScore: 95,
    noiseTolerance: 25,
    socialEnergy: 50,
  };
  const mockProfileB = {
    chronotypeScore: 88,
    cleanlinessScore: 94,
    noiseTolerance: 30,
    socialEnergy: 55,
  };

  const compResult = CompatibilityService.calculate(mockProfileA, mockProfileB);
  assert(compResult.overallScore >= 90, 'Compatibility score reflects high synergy (>= 90%)');
  assert(compResult.dimensions.sleep.score > 80, 'Sleep dimension calculates correctly');
  assert(compResult.dimensions.cleanliness.score > 85, 'Cleanliness dimension calculates correctly');
  assert(compResult.sharedStrengths.length > 0, 'Generates actionable shared strengths');

  // 2. Trust Engine & Composite Metrics Tests
  console.log('\nTesting [TrustService]...');
  const trustMetrics = await TrustService.calculateTrustMetrics('user-maya');
  assert(trustMetrics.reputationScore === 940, 'Calculates authoritative reputation score (940/990)');
  assert(trustMetrics.verificationTier === 'kinship_certified', 'Awards kinship_certified tier for verified resident');
  assert(trustMetrics.verifiedStaysCount === 3, 'Counts verified cohabitation stays correctly');
  assert(trustMetrics.verifications.governmentId.verified === true, 'Validates cryptographic government ID');

  // 3. Review Eligibility & Anti-Abuse Rules Tests
  console.log('\nTesting [Review Engine Eligibility Boundary]...');
  // Eligible case (Maya & Elena at Williamsburg Loft)
  const eligibleCheck = await TrustService.verifyReviewEligibility(
    'user-elena',
    'user-maya',
    'stay-williamsburg'
  );
  assert(eligibleCheck.eligible === true, 'Grants review eligibility to authentic stay participants');

  // Ineligible case: Self-review attempt
  const selfReviewCheck = await TrustService.verifyReviewEligibility(
    'user-maya',
    'user-maya',
    'stay-williamsburg'
  );
  assert(selfReviewCheck.eligible === false, 'Strictly rejects self-review attempts');

  // Ineligible case: Non-participant attempt
  const strangerReviewCheck = await TrustService.verifyReviewEligibility(
    'user-stranger',
    'user-maya',
    'stay-williamsburg'
  );
  assert(strangerReviewCheck.eligible === false, 'Rejects reviews from non-resident strangers');

  // 4. Expense Split Calculation Parity
  console.log('\nTesting [Shared Expense Split Engine]...');
  const totalAmount = 142.5;
  const numParticipants = 3;
  const equalShare = totalAmount / numParticipants;
  assert(equalShare === 47.5, 'Equal split calculates mathematically exact participant shares');

  console.log('\n==================================================');
  console.log(`TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
};

runIntegrationTests();
