type Endpoint = {
  name: string;
  url: string;
  status: "up" | "down" | "slow",
  graph?: string;
  latency: string;
  uptime: string;
}

export const endpoints: Endpoint[] = [
  {
    name: "API Gateway",
    url: "https://api.example.com/health",
    status: "up",
    latency: "142ms",
    uptime: "99.98%",
  },
  {
    name: "Auth Service",
    url: "https://auth.example.com/ping",
    status: "up",
    latency: "87ms",
    uptime: "100%",
  },
  {
    name: "Image CDN",
    url: "https://cdn.example.com/status",
    status: "slow",
    latency: "980ms",
    uptime: "99.1%",
  },
  {
    name: "Payments API",
    url: "https://pay.example.com/health",
    status: "down",
    latency: "_",
    uptime: "97.8%",
  },
  {
    name: "Search Index",
    url: "https://search.example.com/alive",
    status: "up",
    latency: "312ms",
    uptime: "99.7%",
  },
  {
    name: "Webhook Relay",
    url: "https://hooks.example.com/status",
    status: "up",
    latency: "55ms",
    uptime: "99.9%",
  },
];