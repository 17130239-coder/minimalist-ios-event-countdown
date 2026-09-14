import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { CountdownEvent } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CountdownEvent;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { t, getEventDetails } = useI18n();
  const eventDetails = getEventDetails(event.id, event.name, event.description);

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}#/event/${event.id}`
    : '';

  // Generate QR Code on mount / URL change
  useEffect(() => {
    if (!shareUrl || !isOpen) return;

    QRCode.toDataURL(shareUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0e0e10',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [shareUrl, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${eventDetails.name} — ${t.brand}`,
          text: `${t.shareTitle}: ${eventDetails.name}`,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.shareTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Frosted Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white dark:bg-[#161619] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl transition-all animate-modal-in flex flex-col items-center text-center"
      >
        {/* Header with Title & Close Button */}
        <div className="w-full flex items-center justify-between mb-5">
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {t.shareTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8e8e93] line-clamp-1 max-w-[260px]">
              {eventDetails.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-white/70 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* QR Code Card */}
        <div className="w-full bg-[#f2f2f7] dark:bg-[#0e0e10] rounded-2xl p-5 mb-5 flex flex-col items-center justify-center border border-black/5 dark:border-white/5 shadow-inner">
          <div className="p-3 bg-white rounded-xl shadow-md flex items-center justify-center">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Countdown QR Code"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
              />
            ) : (
              <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
              </div>
            )}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-white/50 font-medium mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
            {t.scanInstructions}
          </span>
        </div>

        {/* Link Box & Copy Action */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-[#f2f2f7] dark:bg-[#0e0e10] border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-white/40 shrink-0">
              link
            </span>
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs text-slate-700 dark:text-white/80 font-mono focus:outline-none truncate select-all"
            />
            <button
              id="copy-link-btn"
              type="button"
              onClick={handleCopyLink}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? t.copied : t.copyLink}</span>
            </button>
          </div>

          {/* Optional Native Web Share button if supported */}
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-full text-xs font-medium text-slate-600 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">ios_share</span>
              <span>{t.moreShareOptions}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
