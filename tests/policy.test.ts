import { describe, expect, it } from "vitest";
import { currentPolicy, evaluateAction } from "../src/policy";

const identity = {
  ownerId: "owner-test",
  userId: "user-test",
  sessionId: "session-test",
  roleId: "holder"
};

describe("RefusalRail policy engine", () => {
  it("refuses a principal sale during a market halt", async () => {
    const receipt = await evaluateAction({
      ...identity,
      actionType: "SELL_PRINCIPAL",
      shock: "MARKET_HALT"
    });

    expect(receipt.status).toBe("refused");
    expect(receipt.reasonCode).toBe("MARKET_HALT");
    expect(receipt.balanceAfter).toBe(receipt.balanceBefore);
    expect(receipt.proofHash).toHaveLength(64);
    expect(receipt.calldataHash).toHaveLength(64);
  });

  it("allows a distribution claim under the same policy", async () => {
    const receipt = await evaluateAction({
      ...identity,
      actionType: "CLAIM_DISTRIBUTION",
      shock: "NONE"
    });

    expect(receipt.status).toBe("allowed");
    expect(receipt.reasonCode).toBe("POLICY_PASS");
    expect(receipt.balanceAfter).toBeGreaterThan(receipt.balanceBefore);
  });

  it("keeps a stable policy hash shape", async () => {
    const policy = await currentPolicy();
    expect(policy.policyHash).toHaveLength(64);
    expect(policy.noSellPrincipal).toBe(true);
    expect(policy.allowDistributionSweep).toBe(true);
  });
});
