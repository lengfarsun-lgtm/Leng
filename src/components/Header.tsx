import React, { useState } from 'react';
import { AppUser, UserRole } from '../types';
import { AvatarModal } from './AvatarModal';

interface HeaderProps {
  currentUser: AppUser | null;
  currentRole: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  onUpdateAvatar?: (newPhotoURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentRole,
  currentView,
  onNavigate,
  onOpenAuth,
  onSwitchRole,
  onLogout,
  onUpdateAvatar,
}) => {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const roleLabels: Record<UserRole, { zh: string; color: string }> = {
    owner: { zh: 'Owner (老板)', color: 'bg-primary-container text-on-primary' },
    management: { zh: 'Management (风水管理师)', color: 'bg-primary-container text-on-primary' },
    logistic: { zh: 'Logistic (物流专员)', color: 'bg-element-earth text-on-primary' },
    client: { zh: 'Client (客资端)', color: 'bg-surface-container-high text-on-surface' },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-margin-mobile lg:px-margin pt-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[1280px] h-20 bg-surface-container-lowest/90 backdrop-blur-2xl rounded-full shadow-[0_4px_24px_rgba(10,10,12,0.06)] border border-border-subtle/60 flex items-center justify-between px-space-lg transition-all relative">
        {/* Left: Brand Monogram & Title with Founder Master Leng Avatar */}
        <div
          className="flex items-center gap-space-sm cursor-pointer select-none group"
          onClick={() => onNavigate('home')}
        >
          <div className="relative shrink-0">
            <img
              alt="Master Leng"
              className="w-12 h-12 rounded-full object-cover shadow-[0_2px_12px_rgba(235,94,40,0.35)] ring-2 ring-accent-gold-bright group-hover:scale-105 transition-all"
              src="/leng_master_avatar.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-element-fire text-on-primary flex items-center justify-center text-[9px] shadow-sm ring-1 ring-white">
              <span className="material-symbols-outlined text-[10px]">verified</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm leading-tight tracking-tight text-on-surface font-bold group-hover:text-element-fire transition-colors">
                Master Leng · 风水工具
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-accent-gold-bright/20 text-secondary font-bold text-[10px] tracking-wide">
                METAVOX
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider text-[11px] flex items-center gap-1">
              <span>Master Leng · 紫微八字 · 居家风水</span>
              <span className="hidden md:inline text-accent-gold-bright text-[10px]">· 马六甲</span>
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-xs bg-surface-container-low/60 p-1 rounded-full border border-border-subtle/40">
          <button
            onClick={() => onNavigate('home')}
            className={`px-space-md py-1.5 transition-colors font-label-md text-label-md rounded-full ${
              currentView === 'home'
                ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            首页 Home
          </button>
          <button
            onClick={() => onNavigate('intake')}
            className={`px-space-md py-1.5 transition-colors font-label-md text-label-md rounded-full ${
              currentView === 'intake'
                ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            八字测算 BaZi Consultation
          </button>
          <button
            onClick={() => onNavigate('report')}
            className={`px-space-md py-1.5 transition-colors font-label-md text-label-md rounded-full ${
              currentView === 'report'
                ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            排盘结果 Report
          </button>
          <a
            href="https://founder-profile-gold.lengengchee.chatgpt.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-space-md py-1.5 transition-colors font-label-md text-label-md rounded-full text-on-surface-variant hover:text-element-fire flex items-center gap-1 hover:bg-surface-container"
          >
            <span>创办人简介 ↗</span>
          </a>
          <button
            onClick={() => onNavigate('ops')}
            className={`px-space-md py-1.5 transition-colors font-label-md text-label-md rounded-full flex items-center gap-1 ${
              currentView === 'ops'
                ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>协同中枢 Internal Ops</span>
          </button>
        </nav>

        {/* Right side: Language, Malaysia badge, CTA, and Profile */}
        <div className="flex items-center gap-space-sm">
          {/* Language Toggle */}
          <div className="hidden sm:flex items-center bg-surface-container-low rounded-full p-0.5 border border-border-subtle/50">
            <button
              onClick={() => setLang('zh')}
              className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm transition-all ${
                lang === 'zh'
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.04)] font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              中文
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm transition-all ${
                lang === 'en'
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.04)] font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              EN
            </button>
          </div>

          {/* Timezone Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-space-sm py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-element-wood animate-pulse"></span>
            <span>Malaysia UTC+8</span>
          </div>

          {/* Start Reading CTA Button */}
          <button
            onClick={() => onNavigate('intake')}
            className="hidden sm:inline-flex items-center justify-center px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md tracking-wide shadow-[0_4px_16px_rgba(255,124,53,0.25)] hover:bg-element-fire active:scale-95 transition-all font-semibold"
          >
            开始排盘测算 Start Reading
          </button>

          {/* User Profile / Login Avatar */}
          <div className="relative">
            {currentUser ? (
              <div
                className="flex items-center gap-1 pl-space-xs cursor-pointer select-none"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  alt={currentUser.displayName}
                  className="w-9 h-9 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-2 ring-element-fire/30"
                  src={
                    currentUser.photoURL ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCviCDOjYzI5PCFLtxl5H5AFx83iSDIOmHZBJQ4cW6nR96_1uSBT7TkWNsSbteOx2zJruHcuvkfg_VW7ADmjYvCIK2aP0jByDnPZ5NAaBfc1Gbga9gHnRc2oIeqKH2szmrz1SAWX8tffCvClYNSpomjFUh-SjrPe_uGC5ROyomTcxvjIBhVjFk4c9icvJPqhAJhaNQ5a_yjn0zLjZlLk9gbSdQaPUp5_4w24UsPkxlMrgt6xCUh_DRBXg'
                  }
                  referrerPolicy="no-referrer"
                />
                <span className="material-symbols-outlined text-on-surface-variant text-base">
                  expand_more
                </span>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-space-md py-2 rounded-full bg-surface-container text-text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>登录 / 注册</span>
              </button>
            )}

            {/* Profile & Role Switcher Dropdown */}
            {profileDropdownOpen && currentUser && (
              <div className="absolute right-0 mt-3 w-72 bg-surface-container-lowest rounded-2xl shadow-2xl border border-border-subtle p-3 flex flex-col gap-2 z-50">
                <div className="p-2.5 bg-surface-warm rounded-2xl flex flex-col gap-2 border border-border-subtle/60">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative group cursor-pointer shrink-0"
                      title="点击更换头像 (Click to change avatar)"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setAvatarModalOpen(true);
                      }}
                    >
                      <img
                        alt={currentUser.displayName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-element-fire/40 shadow-sm group-hover:brightness-90 transition-all"
                        src={currentUser.photoURL || '/master_avatar.jpg'}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] backdrop-blur-[1px]">
                        <span className="material-symbols-outlined text-base">photo_camera</span>
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-label-md text-label-md font-bold text-text-primary truncate">
                        {currentUser.displayName}
                      </span>
                      <span className="font-label-sm text-label-sm text-text-muted truncate text-[11px]">
                        {currentUser.email}
                      </span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleLabels[currentRole].color}`}>
                          {roleLabels[currentRole].zh}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prominent Change Avatar Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setAvatarModalOpen(true);
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 border border-border-subtle/80 hover:border-element-fire/60 transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-sm text-element-fire">add_a_photo</span>
                    <span>更换个人头像 (Change Avatar)</span>
                  </button>
                </div>

                {/* Quick Role Switcher for seamless testing */}
                <div className="flex flex-col gap-1 pt-1 border-t border-border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted px-2 py-1">
                    切换测试角色 (Quick Switch Role):
                  </span>
                  <button
                    onClick={() => {
                      onSwitchRole('owner');
                      setProfileDropdownOpen(false);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                      currentRole === 'owner' ? 'bg-primary-container text-on-primary font-semibold' : 'hover:bg-surface-container text-text-primary'
                    }`}
                  >
                    <span>Owner (老板/合伙人)</span>
                    <span className="material-symbols-outlined text-sm">shield_person</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('management');
                      setProfileDropdownOpen(false);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                      currentRole === 'management' ? 'bg-primary-container text-on-primary font-semibold' : 'hover:bg-surface-container text-text-primary'
                    }`}
                  >
                    <span>Management (风水管理师)</span>
                    <span className="material-symbols-outlined text-sm">psychology</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('logistic');
                      setProfileDropdownOpen(false);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                      currentRole === 'logistic' ? 'bg-primary-container text-on-primary font-semibold' : 'hover:bg-surface-container text-text-primary'
                    }`}
                  >
                    <span>Logistic (物流专员)</span>
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('client');
                      setProfileDropdownOpen(false);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                      currentRole === 'client' ? 'bg-primary-container text-on-primary font-semibold' : 'hover:bg-surface-container text-text-primary'
                    }`}
                  >
                    <span>Client (客户本人)</span>
                    <span className="material-symbols-outlined text-sm">person</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-border-subtle flex justify-between items-center px-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenAuth();
                    }}
                    className="text-xs text-primary-container hover:underline font-medium"
                  >
                    切换账户
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="text-xs text-error hover:underline font-medium"
                  >
                    退出登录 Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full hover:bg-surface-container text-on-surface"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-24 left-4 right-4 bg-surface-container-lowest rounded-2xl shadow-2xl p-4 flex flex-col gap-2 z-50 pointer-events-auto border border-border-subtle">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md"
          >
            首页 Home
          </button>
          <button
            onClick={() => {
              onNavigate('intake');
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md"
          >
            八字测算 BaZi Consultation
          </button>
          <button
            onClick={() => {
              onNavigate('report');
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md"
          >
            排盘结果 Report
          </button>
          <a
            href="https://founder-profile-gold.lengengchee.chatgpt.site/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md text-element-fire font-semibold flex items-center justify-between"
          >
            <span>创办人简介 (Master Leng Profile)</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
          <button
            onClick={() => {
              onNavigate('ops');
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md font-semibold text-element-fire"
          >
            综合运营协同中枢 Internal Ops
          </button>
        </div>
      )}

      {/* Profile Avatar Studio Modal */}
      <AvatarModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentUser={currentUser}
        onSaveAvatar={(newUrl) => onUpdateAvatar?.(newUrl)}
      />
    </header>
  );
};
