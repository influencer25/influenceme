'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Influencer Marketing?",
    answer: "Influencer marketing is a digital marketing strategy that involves collaborating with individuals, known as influencers, who have a dedicated and engaged following on social media platforms and other online channels. These influencers can impact their followers' purchasing decisions due to their credibility and authority in specific niches or industries. Brands partner with influencers to promote their products or services authentically, build social proof, and leverage their influence to reach a larger and more targeted audience."
  },
  {
    question: "How does Influencer Marketing work?",
    answer: "Influencer marketing works by identifying and partnering with content creators who have built trust and credibility with their audience. These partnerships can take various forms, from sponsored posts and product reviews to long-term brand ambassadorships. The key is to create authentic content that resonates with the influencer's audience while promoting your brand's message or products."
  },
  {
    question: "Why should I use Influencer Marketing?",
    answer: "Influencer marketing offers several benefits: it provides authentic social proof, reaches highly engaged audiences, builds brand trust, and can be more cost-effective than traditional advertising. It also allows for targeted marketing to specific demographics and niches, and can generate high-quality content for your brand."
  },
  {
    question: "How do I find the right influencers?",
    answer: "Finding the right influencers involves considering factors like audience demographics, engagement rates, content quality, and brand alignment. Look for influencers whose values and content style match your brand, and whose audience matches your target market. Consider both macro and micro-influencers, as each has unique advantages."
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="faqs-holder max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="faq-holder mb-4 border border-gray-200 rounded-lg overflow-hidden"
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <div 
            className="faq-title-holder flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
            onClick={() => toggleFaq(index)}
          >
            <h3 className="faq-question text-lg font-semibold" itemProp="name">
              {faq.question}
            </h3>
            <div className={`faq-btn transition-transform duration-300 ${openFaq === index ? 'rotate-45' : 'rotate-0'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div 
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            className={`faq-answer overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="p-4 bg-gray-50" itemProp="text">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 