import { Zap, Shield, Smartphone, Globe, Layers, Download, Copy, Clipboard, CheckCircle } from 'lucide-react';
import { Feature } from './types';

export const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Manual', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Lightning Fast',
    description: 'Our proprietary compression algorithm ensures download speeds up to 10x faster than standard browser capabilities.',
    icon: Zap
  },
  {
    title: 'Secure & Private',
    description: 'No logs, no tracking. Your download history is ephemeral and encrypted. Safety is our priority.',
    icon: Shield
  },
  {
    title: 'Cross Platform',
    description: 'Optimized for any device. Whether you are on mobile, tablet or desktop, the experience is seamless.',
    icon: Smartphone
  },
  {
    title: 'High Definition',
    description: 'We prioritize the highest available quality from source. 4K and 1080p downloads supported automatically.',
    icon: Layers
  },
  {
    title: 'No Watermarks',
    description: 'Get the clean file. We strip away platform-specific overlays and watermarks for pristine content.',
    icon: Globe
  },
  {
    title: 'Unlimited Access',
    description: 'No daily limits or throttling. Download as many videos, reels, and photos as you need.',
    icon: Download
  }
];

export const HOW_TO_STEPS = [
  {
    step: "01",
    title: "Copy URL",
    description: "Open Instagram app or website, locate the content you wish to extract, and copy the link to your clipboard.",
    icon: Copy
  },
  {
    step: "02",
    title: "Input Source",
    description: "Return to the Orbit interface and paste the link into the designated extraction field above.",
    icon: Clipboard
  },
  {
    step: "03",
    title: "Download",
    description: "Initiate the sequence. The system will process the media and provide a secure download link instantly.",
    icon: CheckCircle
  }
];

export const FAQ_ITEMS = [
  {
    question: "Is this service free to use?",
    answer: "Yes. The Orbit Downloader protocol is completely open-access. There are no subscription fees, hidden charges, or limits on the number of downloads you can perform."
  },
  {
    question: "Is it safe to download videos here?",
    answer: "Safety is our core directive. We do not store any user data or download history. The connection is encrypted via SSL, and we do not require any software installation on your device."
  },
  {
    question: "Can I download from private accounts?",
    answer: "Our system respects privacy protocols. You can only download content from public Instagram accounts. Private accounts are restricted from external access."
  },
  {
    question: "Where are videos saved after downloading?",
    answer: "Files are saved to your device's default download directory. On mobile devices, check your Gallery or Files app. On desktop, check your Downloads folder."
  },
  {
    question: "Does it support Reel and IGTV downloads?",
    answer: "Affirmative. The system is compatible with all Instagram media formats including Posts, Reels, IGTV, and Carousel albums."
  },
  {
    question: "Do you add watermarks to downloaded content?",
    answer: "Negative. We provide the source file exactly as it exists on the network, clean and free of any additional watermarks or overlays."
  },
];

export const MOCK_RESULT = {
  thumbnail: "https://picsum.photos/600/800",
  title: "Futuristic Cityscape - Cyberpunk Aesthetic",
  author: "@future_vision_2077",
  downloadUrl: "#"
};