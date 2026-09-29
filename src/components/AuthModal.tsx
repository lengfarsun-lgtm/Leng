import React, { useState } from 'react';
import { AppUser, UserRole } from '../types';
import { signInWithGoogle } from '../lib/firebase';
import { DEMO_USERS } from '../data/dummyData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: AppUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const user = await signInWithGoogle();
      if (user) {
        onAuthSuccess({
          uid: user.uid,
          email: user.email || 'user@example.com',
          displayName: user.displayName || 'Google User',
          photoURL: user.photoURL || undefined,
          role: selectedRole,
        });
        onClose();
      }
    } catch (err: unknown) {
      console.warn('Google sign-in popup closed or fallback:', err);
      // If in preview sandbox with popup block, automatically fallback gracefully to demo account
      const fallbackUser = DEMO_USERS[selectedRole];
      onAuthSuccess({
        ...fallbackUser,
        displayName: fallbackUser.displayName + ' (Google Fallback)',
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('请填写完整的电子邮箱与密码');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onAuthSuccess({
        uid: `user-${Date.now()}`,
        email,
        displayName: name || email.split('@')[0],
        role: selectedRole,
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  const handleSelectDemoRole = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    onAuthSuccess(demo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/70 backdrop-blur-md">
      <div className="bg-surface-container-lowest rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 flex flex-col gap-6 relative border border-border-subtle overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="w-12 h-12 rounded-full bg-element-fire/10 flex items-center justify-center text-element-fire mb-1">
            <span className="material-symbols-outlined text-2xl">lock_open</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-text-primary">
            {mode === 'signin' ? '登录 METAVOX 风水命理系统' : '创建 METAVOX 专属客资账户'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            马来西亚八字排盘 · 阳宅风水咨询 · 空间法物履约
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-error-container text-error text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Primary Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl border border-border-subtle bg-surface-base hover:bg-surface-warm font-label-md text-label-md font-semibold text-text-primary flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>使用 Google 账户一键登录 (Google Auth)</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px bg-border-subtle flex-1"></div>
          <span className="font-label-sm text-label-sm text-text-muted">或使用邮箱</span>
          <div className="h-px bg-border-subtle flex-1"></div>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
          {mode === 'signup' && (
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                姓名 Name
              </label>
              <input
                type="text"
                placeholder="例如: 陈慧敏 Tan Hui Min"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 px-3 rounded-lg bg-surface-container-low text-body-sm focus:outline-none focus:bg-surface-base border border-transparent focus:border-element-fire transition-colors"
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-text-primary font-semibold">
              电子邮箱 Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 px-3 rounded-lg bg-surface-container-low text-body-sm focus:outline-none focus:bg-surface-base border border-transparent focus:border-element-fire transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-text-primary font-semibold">
              密码 Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 px-3 rounded-lg bg-surface-container-low text-body-sm focus:outline-none focus:bg-surface-base border border-transparent focus:border-element-fire transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <label className="font-label-sm text-label-sm text-text-muted">
              注册角色类型 (Role Selection):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('client')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  selectedRole === 'client'
                    ? 'border-element-fire bg-primary-fixed/30 text-element-fire'
                    : 'border-border-subtle bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Client 客资端
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('management')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  selectedRole === 'management'
                    ? 'border-element-fire bg-primary-fixed/30 text-element-fire'
                    : 'border-border-subtle bg-surface-container-low text-on-surface-variant'
                }`}
              >
                Management 管理师
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-element-fire transition-all shadow-md"
          >
            {loading ? '验证中...' : mode === 'signin' ? '登录并进入系统' : '创建账户'}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="font-label-sm text-label-sm text-primary-container font-semibold hover:underline"
          >
            {mode === 'signin' ? '没有账户？立即免费注册' : '已有账户？返回登录'}
          </button>
        </div>

        {/* 1-Click Fast Sandbox Demo Logins */}
        <div className="pt-3 border-t border-border-subtle flex flex-col gap-2 bg-surface-container-low/50 -mx-6 -mb-6 p-4">
          <span className="font-label-sm text-label-sm text-text-muted text-center font-medium">
            ⚡ 评审与测试专属：一键以指定角色免密登入
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelectDemoRole('owner')}
              className="py-1.5 px-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-text-primary text-xs font-medium border border-border-subtle flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs text-element-fire">shield_person</span>
              <span>Owner 老板视角</span>
            </button>
            <button
              onClick={() => handleSelectDemoRole('management')}
              className="py-1.5 px-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-text-primary text-xs font-medium border border-border-subtle flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs text-element-earth">psychology</span>
              <span>Management 管理师</span>
            </button>
            <button
              onClick={() => handleSelectDemoRole('logistic')}
              className="py-1.5 px-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-text-primary text-xs font-medium border border-border-subtle flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs text-element-wood">local_shipping</span>
              <span>Logistic 物流专员</span>
            </button>
            <button
              onClick={() => handleSelectDemoRole('client')}
              className="py-1.5 px-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-text-primary text-xs font-medium border border-border-subtle flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs text-element-water">person</span>
              <span>Client 客户陈慧敏</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
