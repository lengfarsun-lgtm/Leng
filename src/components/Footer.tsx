import React from 'react';
import { UserRole } from '../types';

interface FooterProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentRole, onSwitchRole }) => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(0,0,0,0.02)] mt-space-xl border-t border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl flex flex-col gap-space-lg">
        {/* Role Perspective Quick Switch Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md pb-space-lg bg-surface-container-low/50 p-space-md rounded-2xl border border-border-subtle">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
              Role Perspective 角色视角:
            </span>
            <div className="flex items-center gap-space-xs">
              <button
                onClick={() => onSwitchRole('client')}
                className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm text-xs transition-all ${
                  currentRole === 'client'
                    ? 'bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                Client 客资端
              </button>
              <button
                onClick={() => onSwitchRole('management')}
                className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm text-xs transition-all ${
                  currentRole === 'management'
                    ? 'bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                Practitioner 执业师
              </button>
              <button
                onClick={() => onSwitchRole('owner')}
                className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm text-xs transition-all ${
                  currentRole === 'owner'
                    ? 'bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                Management 管理台
              </button>
              <button
                onClick={() => onSwitchRole('logistic')}
                className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm text-xs transition-all ${
                  currentRole === 'logistic'
                    ? 'bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                Logistic 物流外勤
              </button>
            </div>
          </div>

          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm text-primary-container">location_on</span>
            <span>The Boulevard, Mid Valley City, 59200 Kuala Lumpur, Malaysia</span>
          </div>
        </div>

        {/* 3 Pillar Statements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg text-xs">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <img
                alt="Feng Shui BaZi Logo"
                className="h-6 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UyTBbueriFExUOqeEFmnRiCe5j1uVIDlpIUOPR873qWCDIlgAX2dpbmeOL1bceYQL0BuxcVCIuR_3kwFfhcbGtr6kPXtf-0vX8gY0IC4oLkvOLVtg58K-K2vYGR3GRytMax8nkmEmlfEtQTlg16hlAC03YpFaOIiiqUgnkRb-UjXu9KqQV3UgNmvoFYLCRFs6y_Ppg47B6SvjKgiewlkjxXSoz0RX5klPsvPh6mi9gB33DYBl6ZGf80kVq"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                METAVOX MY
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Architectural Geomancy & Contemporary BaZi Wealth Dynamics. Grounded in Classical San Yuan Flying Stars and Computational Four Pillars metaphysics.
            </p>
          </div>

          <div className="flex flex-col gap-space-xs bg-surface-container-low/50 p-space-md rounded-2xl border border-border-subtle">
            <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">
              Metaphysical Advisory Disclaimer
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              文化与传统数理指引，非医疗/法律/金融建议。All geomantic assessments and destiny readings are mathematical projections derived from classical cosmological models and intended solely for life planning and personal alignment.
            </p>
          </div>

          <div className="flex flex-col gap-space-xs bg-surface-container-low/50 p-space-md rounded-2xl border border-border-subtle">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wider uppercase">
              Data Privacy & Governance
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Compliant with the Personal Data Protection Act 2010 (PDPA) Malaysia. Exact astronomical coordinates, birth timelines, and spatial layouts are encrypted under zero-knowledge architectural protocols.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md text-on-surface-variant font-label-sm text-label-sm text-xs border-t border-border-subtle">
          <div className="flex items-center gap-space-sm">
            <span>© 2025 METAVOX Geomancy Sdn. Bhd. (1492041-V). All rights reserved.</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span>Kuala Lumpur</span>
            <span>Singapore</span>
            <span>Penang</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
