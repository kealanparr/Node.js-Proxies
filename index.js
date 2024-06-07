import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxies = [
  { host: '43.134.68.153',   port: 3128 },
  { host: '221.140.235.236', port: 5002 },
  { host: '8.219.97.248',    port: 80   },
];

async function scrapeWithRotatingProxies(proxies, url) {
  for (const proxy of proxies) {
    try {
      const proxyConfig = `http://${proxy.host}:${proxy.port}`;
      const proxyAgent = new HttpsProxyAgent(proxyConfig);

      const response = await fetch(url, { agent: proxyAgent });
      const text = await response.text();

      console.log(text);
    } catch (err) {
      console.error(err);
    }
  }
}

const url = 'https://ident.me/ip';
await scrapeWithRotatingProxies(proxies, url);
