import { motion } from 'framer-motion';

export default function FloatingContact() {
  const phoneNumber = '+919742100545';
  const whatsappNumber = '919742100545';
  const whatsappText = encodeURIComponent('Hi, I want to know about trip plans from Jyothu Travels!');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp FAB — visible on all, prominent on mobile */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Book Now via WhatsApp"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
        className="flex items-center gap-2 bg-green-500 text-white shadow-[0_0_24px_rgba(34,197,94,0.55)] rounded-full px-4 py-3 font-semibold text-sm hover:bg-green-400 transition-colors"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.33.97 2.62 1.11 2.8.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.54.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
          <path d="M16.03 3C8.85 3 3 8.85 3 16.03c0 2.31.6 4.56 1.75 6.55L3 29l6.6-1.72a12.98 12.98 0 0 0 6.43 1.69h.01C23.2 28.97 29 23.12 29 15.94 29 8.75 23.2 3 16.03 3zm0 23.55h-.01c-2.06 0-4.07-.55-5.82-1.59l-.42-.25-3.91 1.02 1.04-3.81-.27-.43a10.55 10.55 0 0 1-1.63-5.61C5.03 9.95 10 4.99 16.03 4.99c6.03 0 10.98 4.96 10.98 10.95 0 5.99-4.95 10.61-10.98 10.61z" />
        </svg>
        <span className="hidden sm:inline">Book via WhatsApp</span>
      </motion.a>

      {/* Phone FAB */}
      <motion.a
        href={`tel:${phoneNumber}`}
        aria-label="Call us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 300 }}
        className="h-12 w-12 rounded-full bg-primary/20 text-white border border-primary/50 shadow-[0_0_20px_rgba(108,99,255,0.6)] backdrop-blur-md grid place-items-center hover:bg-primary/40 hover:border-primary hover:scale-[1.05] transition-all"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
        </svg>
      </motion.a>
    </div>
  );
}
