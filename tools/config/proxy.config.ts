import { Config } from 'http-proxy-middleware';

declare interface ProxyConfig extends Config {
  context: string | string[];
}

// Configure proxy middleware
// https://github.com/chimurai/http-proxy-middleware
export default [
  {
    context: ['/takingReminder'],
    target: process.env.PROXY_HOST,
    changeOrigin: true,
  },
] as ProxyConfig[];
