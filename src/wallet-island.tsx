import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  useAccountModal,
  useConnectModal
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider, createConfig, http, useAccount, useChainId, useSendTransaction, useSwitchChain } from "wagmi";
import { mainnet } from "viem/chains";
import { injectedWallet } from "../node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/injectedWallet/injectedWallet.js";

type PreparedChainAction = {
  to: `0x${string}`;
  data: `0x${string}`;
  value: string;
  chainId: string;
};

declare global {
  interface Window {
    __RR_WALLET_CONFIG__?: {
      projectId?: string;
      rpcUrl?: string;
      chainId?: number;
    };
    __RR_OPEN_WALLET__?: () => void;
    __RR_SEND_WALLET_TX__?: (action: PreparedChainAction) => Promise<`0x${string}`>;
  }
}

const queryClient = new QueryClient();
const ARBITRUM_SEPOLIA = {
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: { name: "Arbitrum Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] }
  },
  blockExplorers: {
    default: { name: "Arbiscan", url: "https://sepolia.arbiscan.io" }
  },
  testnet: true
} as const;
const ETHEREUM_MAINNET = mainnet;

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason instanceof Error ? event.reason.message : String(event.reason || "");
  if (reason === "Network connection lost.") event.preventDefault();
});
window.addEventListener("error", (event) => {
  if (event.message === "Network connection lost.") event.preventDefault();
});

function walletConfig() {
  const runtime = window.__RR_WALLET_CONFIG__ || {};
  const rpcUrl = runtime.rpcUrl || "https://sepolia-rollup.arbitrum.io/rpc";
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Installed wallets",
        wallets: [injectedWallet]
      }
    ],
    {
      appName: "RefusalRail",
      projectId: runtime.projectId || "refusalrail-demo-walletconnect"
    }
  );
  return createConfig({
    chains: [ARBITRUM_SEPOLIA, ETHEREUM_MAINNET],
    connectors,
    transports: {
      [ARBITRUM_SEPOLIA.id]: http(rpcUrl),
      [ETHEREUM_MAINNET.id]: http("https://cloudflare-eth.com")
    },
    ssr: false
  });
}

function AccountBridge() {
  const { address, chain, isConnected } = useAccount();
  const chainId = useChainId();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();
  const { switchChainAsync, isPending } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const needsSwitch = isConnected && chainId !== ARBITRUM_SEPOLIA.id;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("rr:rainbowkit-account", {
        detail: {
          address: isConnected ? address || "" : "",
          chainId,
          chainName: chain?.name || "",
          connected: isConnected
        }
      })
    );
  }, [address, chain?.name, chainId, isConnected]);

  useEffect(() => {
    window.__RR_OPEN_WALLET__ = () => {
      if (isConnected && openAccountModal) {
        openAccountModal();
        return;
      }
      if (openConnectModal) openConnectModal();
    };

    return () => {
      delete window.__RR_OPEN_WALLET__;
    };
  }, [isConnected, openAccountModal, openConnectModal]);

  useEffect(() => {
    window.__RR_SEND_WALLET_TX__ = async (action: PreparedChainAction) => {
      if (!isConnected) {
        if (openConnectModal) openConnectModal();
        throw new Error("Connect a wallet with RainbowKit before sending the chain transaction.");
      }
      if (chainId !== ARBITRUM_SEPOLIA.id) {
        await switchChainAsync({ chainId: ARBITRUM_SEPOLIA.id });
      }
      return sendTransactionAsync({
        to: action.to,
        data: action.data,
        value: BigInt(action.value || "0x0"),
        chainId: ARBITRUM_SEPOLIA.id
      });
    };

    return () => {
      delete window.__RR_SEND_WALLET_TX__;
    };
  }, [chainId, isConnected, openConnectModal, sendTransactionAsync, switchChainAsync]);

  const walletLabel = isConnected && address
    ? `${address.slice(0, 6)}...${address.slice(-4)} · ${chain?.name || "Wallet"}`
    : "Connect wallet";

  return (
    <div className="rr-rainbow-shell" data-testid="rainbowkit-wallet">
      <button
        className="rr-wallet-connect min-h-11 min-w-11"
        type="button"
        data-rainbowkit-connect
        onClick={() => window.__RR_OPEN_WALLET__?.()}
      >
        {walletLabel}
      </button>
      {needsSwitch ? (
        <button
          className="rr-chain-switch min-h-11 min-w-11"
          type="button"
          onClick={() => switchChainAsync({ chainId: ARBITRUM_SEPOLIA.id })}
          disabled={isPending}
        >
          {isPending ? "Switching" : "Switch to Arbitrum Sepolia"}
        </button>
      ) : null}
    </div>
  );
}

function WalletIsland() {
  const config = useMemo(walletConfig, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={ARBITRUM_SEPOLIA.id}
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#c52a24",
            accentColorForeground: "#ffffff",
            borderRadius: "small",
            fontStack: "system"
          })}
        >
          <AccountBridge />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

for (const root of document.querySelectorAll<HTMLElement>("[data-rainbowkit-root]")) {
  createRoot(root).render(<WalletIsland />);
}
