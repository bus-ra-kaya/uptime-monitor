type Endpoint = {
  name: string;
  url: string;
  status: "UP" | "DOWN" | "SLOW",
  graph?: string;
  latency: string;
  uptime: string;
}

export const endpoints: Endpoint[] = [
  {
    name: "API Gateway",
    url: "https://api.example.com/health",
    status: "UP",
    latency: "142ms",
    uptime: "99.98%",
  },
  {
    name: "Auth Service",
    url: "https://auth.example.com/ping",
    status: "UP",
    latency: "87ms",
    uptime: "100%",
  },
  {
    name: "Image CDN",
    url: "https://cdn.example.com/status",
    status: "SLOW",
    latency: "980ms",
    uptime: "99.1%",
  },
  {
    name: "Payments API",
    url: "https://pay.example.com/health",
    status: "DOWN",
    latency: "_",
    uptime: "97.8%",
  },
  {
    name: "Search Index",
    url: "https://search.example.com/alive",
    status: "UP",
    latency: "312ms",
    uptime: "99.7%",
  },
  {
    name: "Webhook Relay",
    url: "https://hooks.example.com/status",
    status: "UP",
    latency: "55ms",
    uptime: "99.9%",
  },
];