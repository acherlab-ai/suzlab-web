import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { TranslationSchema } from '../data/translations32';
import { SpotlightCard } from '../components/SpotlightCard';
import { Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  lang: string;
  translations: TranslationSchema;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  translations,
}) => {
  const t = translations.contact;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-14"
    >
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          DIRECT CHANNELS
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Official Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Email */}
        <SpotlightCard className="p-6 space-y-3">
          <div className="p-2.5 w-fit rounded-xl bg-cyan-500/10 text-cyan-400">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
            {t.emailLabel}
          </span>
          <a
            href="mailto:admin@acherlab.xyz"
            className="text-base font-bold text-white hover:text-cyan-400 transition-colors block break-all"
          >
            admin@acherlab.xyz
          </a>
          <p className="text-xs text-slate-400">
            Official technical inquiry & collaboration mailbox.
          </p>
        </SpotlightCard>

        {/* Ecosystem */}
        <SpotlightCard className="p-6 space-y-3">
          <div className="p-2.5 w-fit rounded-xl bg-sky-500/10 text-sky-400">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
            {t.ecosystemLabel}
          </span>
          <a
            href="https://acherlab.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold text-white hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>acherlab.xyz</span>
            <ExternalLink className="w-4 h-4 text-cyan-400" />
          </a>
          <p className="text-xs text-slate-400">
            Parent innovation and engineering collective.
          </p>
        </SpotlightCard>

        {/* Operating Model */}
        <SpotlightCard className="p-6 space-y-3">
          <div className="p-2.5 w-fit rounded-xl bg-teal-500/10 text-teal-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
            {t.locationLabel}
          </span>
          <div className="text-sm font-bold text-white">
            {t.locationValue}
          </div>
          <p className="text-xs text-slate-400">
            Distributed laboratory environment.
          </p>
        </SpotlightCard>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t.formTitle}
          </h2>
        </div>

        <ContactForm translations={translations} />
      </div>
    </motion.div>
  );
};
