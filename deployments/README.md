# Deployments

`scripts/deploy-contracts.mjs` writes chain manifests here.

Expected output after deployment:

```txt
deployments/arbitrum-sepolia.json
```

Copy the emitted `REFUSAL_HUB_ADDRESS`, `POLICY_REGISTRY_ADDRESS`, `REFUSAL_RECEIPT_ADDRESS`, `DEMO_RWA_ASSET_ADDRESS`, and `CONTRACTS_DEPLOYED_AT` values into Wrangler vars or your Cloudflare dashboard before deploying the Worker.
