import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Sparkles, Smartphone, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    question: 'Videolar hangi kalitede indirilir?',
    answer:
      'YX Shot, içeriğin platforma yüklenmiş olan en yüksek çözünürlüklü orijinal video kaynağını (genellikle 1080p Full HD MP4) filigransız ve sıkıştırmasız olarak indirir.',
  },
  {
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    question: 'Kullanım ücretsiz ve güvenli mi?',
    answer:
      'Evet! YX Shot tamamen ücretsizdir. Kişisel verilerinizi toplamaz, hesap girişi veya şifre istemez. Tüm indirme geçmişi yalnızca kendi cihazınızın yerel hafızasında tutulur.',
  },
  {
    icon: <Download className="w-4 h-4 text-amber-400" />,
    question: 'Hangi bağlantı türlerini destekler?',
    answer:
      'Tüm Reels, Video, Gönderi (/p/) ve IGTV bağlantılarını destekler. Bağlantıyı kopyalayıp kutucuğa yapıştırmanız yeterlidir.',
  },
  {
    icon: <Smartphone className="w-4 h-4 text-purple-400" />,
    question: 'Gizli hesaplardaki videolar indirilebilir mi?',
    answer:
      'Gizlilik politikaları gereği yalnızca herkese açık (Public) profillerdeki Reels ve video içerikleri indirilebilir.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4 px-1">
        <HelpCircle className="w-4 h-4 text-pink-400" />
        <h3 className="font-bold text-sm sm:text-base text-white">Sıkça Sorulan Sorular</h3>
      </div>

      <div className="space-y-2.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all backdrop-blur-xl"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-gray-200 hover:text-pink-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 pr-2">
                  {faq.icon}
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-gray-400 ${
                    isOpen ? 'rotate-180 text-pink-500' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={`faq-content-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 pt-0 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
