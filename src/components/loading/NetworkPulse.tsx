import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function NetworkPulse() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="loader-network-static" aria-hidden="true">
        <div className="loader-network-line" />
      </div>
    );
  }

  return (
    <svg
      className="loader-network"
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line className="loader-net-edge" x1="40" y1="60" x2="120" y2="30" />
      <line className="loader-net-edge loader-net-edge-2" x1="120" y1="30" x2="200" y2="60" />
      <line className="loader-net-edge loader-net-edge-3" x1="200" y1="60" x2="280" y2="40" />
      <line className="loader-net-edge loader-net-edge-4" x1="120" y1="30" x2="160" y2="90" />
      <line className="loader-net-edge loader-net-edge-5" x1="200" y1="60" x2="160" y2="90" />
      <circle className="loader-net-node" cx="40" cy="60" r="5" />
      <circle className="loader-net-node loader-net-node-2" cx="120" cy="30" r="5" />
      <circle className="loader-net-node loader-net-node-3" cx="200" cy="60" r="5" />
      <circle className="loader-net-node loader-net-node-4" cx="280" cy="40" r="5" />
      <circle className="loader-net-node loader-net-node-5" cx="160" cy="90" r="4" />
      <circle className="loader-net-pulse" cx="120" cy="30" r="12" />
    </svg>
  );
}
