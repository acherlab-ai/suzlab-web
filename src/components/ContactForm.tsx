import React, { useState } from 'react';
import { TranslationSchema } from '../data/translations32';
import { Mail, Send, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactFormProps {
  translations: TranslationSchema;
}

export const ContactForm: React.FC<ContactFormProps> = ({ translations }) => {
  const t = translations.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = t.errors.messageShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsReceiptOpen(true);
    }
  };

  const getTopicLabel = (topicKey: string) => {
    switch (topicKey) {
      case 'collaboration':
        return t.topicCollaboration;
      case 'feedback':
        return t.topicProjectFeedback;
      case 'other':
        return t.topicOther;
      case 'general':
      default:
        return t.topicGeneral;
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[SuzLab Inquiry - ${getTopicLabel(formData.topic)}] from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${getTopicLabel(formData.topic)}\n\nMessage:\n${formData.message}\n\n---\nSent via SuzLab Showcase (Demo Form)`
    );
    return `mailto:admin@acherlab.xyz?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = () => {
    const fullText = `From: ${formData.name} <${formData.email}>\nTopic: ${getTopicLabel(formData.topic)}\n\n${formData.message}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl lab-glass border border-white/[0.08] p-6 sm:p-8">
      {/* Notice Banner */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-[13px] mb-6">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{t.formDemoNotice}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            {t.nameLabel} <span className="text-cyan-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            {t.emailInputLabel} <span className="text-cyan-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder={t.emailPlaceholder}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>

        {/* Topic Selector */}
        <div>
          <label htmlFor="contact-topic" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            {t.topicLabel}
          </label>
          <select
            id="contact-topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          >
            <option value="general">{t.topicGeneral}</option>
            <option value="collaboration">{t.topicCollaboration}</option>
            <option value="feedback">{t.topicProjectFeedback}</option>
            <option value="other">{t.topicOther}</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            {t.messageLabel} <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder={t.messagePlaceholder}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-slate-900 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{t.submitBtn}</span>
        </button>
      </form>

      {/* Submission Receipt Modal */}
      {isReceiptOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-[#0b1020] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Mail className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">{t.receiptTitle}</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.receiptDesc}
            </p>

            <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl text-xs space-y-1 font-mono text-slate-300">
              <div><strong className="text-slate-400 font-sans">To:</strong> admin@acherlab.xyz</div>
              <div><strong className="text-slate-400 font-sans">From:</strong> {formData.name} ({formData.email})</div>
              <div><strong className="text-slate-400 font-sans">Topic:</strong> {getTopicLabel(formData.topic)}</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getMailtoUrl()}
                className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.openMailtoBtn}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {copiedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMessage ? t.copiedToast : t.copyMessageBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsReceiptOpen(false)}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
