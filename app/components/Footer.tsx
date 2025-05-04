'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="footer-top-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="footer-section">
            <div className="footer-title text-lg font-semibold mb-4">Resources</div>
            <div className="flex flex-col space-y-2">
              <Link href="/blog" className="footer-txt hover:text-gray-300">Blog</Link>
              <Link href="/resource-hub" className="footer-txt hover:text-gray-300">Resource Hub</Link>
              <Link href="/referral-program" className="footer-txt hover:text-gray-300">Affiliate Program</Link>
              <Link href="/tiktok-ebook" className="footer-txt hover:text-gray-300">TikTok Ebook For Brands</Link>
              <Link href="/marketing-report" className="footer-txt hover:text-gray-300">2025 Influencer Marketing Report</Link>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-title text-lg font-semibold mb-4">Tools</div>
            <div className="flex flex-col space-y-2">
              <Link href="/price-calculator" className="footer-txt hover:text-gray-300">Influencer Price Calculator</Link>
              <Link href="/instagram-fake-checker" className="footer-txt hover:text-gray-300">Instagram Fake Follower Checker</Link>
              <Link href="/tiktok-fake-checker" className="footer-txt hover:text-gray-300">TikTok Fake Follower Checker</Link>
              <Link href="/instagram-engagement" className="footer-txt hover:text-gray-300">Instagram Engagement Rate Calculator</Link>
              <Link href="/tiktok-engagement" className="footer-txt hover:text-gray-300">TikTok Engagement Rate Calculator</Link>
              <Link href="/campaign-brief" className="footer-txt hover:text-gray-300">Influencer Campaign Brief Template</Link>
              <Link href="/contract-template" className="footer-txt hover:text-gray-300">Influencer Contract Template</Link>
              <Link href="/analytics" className="footer-txt hover:text-gray-300">Influencer Analytics & Tracking</Link>
              <Link href="/reels-downloader" className="footer-txt hover:text-gray-300">Instagram Reels Downloader</Link>
              <Link href="/tiktok-downloader" className="footer-txt hover:text-gray-300">TikTok Video Downloader</Link>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-title text-lg font-semibold mb-4">Discover</div>
            <div className="flex flex-col space-y-2">
              <Link href="/find-influencers" className="footer-txt hover:text-gray-300">Find Influencers</Link>
              <Link href="/top-influencers" className="footer-txt hover:text-gray-300">Top Influencers</Link>
              <Link href="/search-influencers" className="footer-txt hover:text-gray-300">Search Influencers</Link>
              <Link href="/shoutouts" className="footer-txt hover:text-gray-300">Buy Shoutouts</Link>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-title text-lg font-semibold mb-4">Support</div>
            <div className="flex flex-col space-y-2">
              <Link href="/support" className="footer-txt hover:text-gray-300">Contact Us</Link>
              <Link href="/how-it-works" className="footer-txt hover:text-gray-300">How It Works</Link>
              <Link href="/faq" className="footer-txt hover:text-gray-300">Frequently Asked Questions</Link>
            </div>
          </div>
        </div>

        <div className="footer-btm-row flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="footer-btm-row-left flex flex-wrap gap-4 mb-4 md:mb-0">
            <div className="footer-item">© InfluenceMe Inc.</div>
            <Link href="/privacy" className="footer-item hover:text-gray-300">Privacy</Link>
            <Link href="/terms" className="footer-item hover:text-gray-300">Terms</Link>
            <Link href="/sitemap" className="footer-item hover:text-gray-300">Sitemap</Link>
          </div>

          <div className="footer-btm-row-right flex space-x-4">
            <div className="footer-img relative w-6 h-6">
              <Link href="https://instagram.com/influenceme" target="_blank" className="block">
                <Image src="/img/instagram.svg" alt="Instagram logo" fill className="hover:opacity-80 transition-opacity" />
              </Link>
            </div>
            <div className="footer-img relative w-6 h-6">
              <Link href="https://tiktok.com/@influenceme" target="_blank" className="block">
                <Image src="/img/tiktok.svg" alt="TikTok logo" fill className="hover:opacity-80 transition-opacity" />
              </Link>
            </div>
            <div className="footer-img relative w-6 h-6">
              <Link href="https://twitter.com/influenceme" target="_blank" className="block">
                <Image src="/img/twitter.svg" alt="Twitter logo" fill className="hover:opacity-80 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 