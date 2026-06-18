export interface IndustryProject {
  name: string;
  company: string;
  role: string;
  duration: string;
  status: 'live' | 'shipped';
  domain: string;          // shown in the browser-frame URL bar
  metric: string;          // big hero number, e.g. "70%"
  metricLabel: string;     // caption under the metric
  description: string;
  impact: string[];
  tech: string[];
  liveUrl: string;
}
