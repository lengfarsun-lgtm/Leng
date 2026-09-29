import React, { useState, useRef } from 'react';
import { AppUser } from '../types';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AppUser | null;
  onSaveAvatar: (newPhotoURL: string) => void;
}

interface AvatarPreset {
  id: string;
  name: string;
  roleHint: string;
  url: string;
  description: string;
}

const PRESET_AVATARS: AvatarPreset[] = [
  {
    id: 'master-leng-avatar',
    name: '林师父本人真实头像 (Master Leng Eng Chee)',
    roleHint: '应用创始人 · 领衔导师',
    url: '/leng_master_avatar.jpg',
    description: '官网原图裁剪：手持罗盘，身穿红金传统服饰温和正气真容',
  },
  {
    id: 'master-leng-cutout',
    name: '林师父手持罗盘全身立像 (官网真照)',
    roleHint: '创办人官方透底真容',
    url: '/founder-cutout.png',
    description: '来自林师父官网 founder-cutout.png 高清去背真像',
  },
  {
    id: 'master-tang-square',
    name: 'Master Raymond Tang (郑道长)',
    roleHint: '特邀资深勘测顾问',
    url: '/raymond_tang_avatar.jpg',
    description: '深蓝云纹道袍，银须德高望重老道长法相',
  },
  {
    id: 'master-tang-portrait',
    name: 'Master Raymond Tang (道袍立像)',
    roleHint: '资深堪舆顾问 · 联合审定',
    url: '/raymond_tang_portrait.jpg',
    description: '执持纯铜风水罗盘，玄学古籍背景',
  },
  {
    id: 'client-female',
    name: '陈慧敏 (Tan Hui Min)',
    roleHint: '咨询客资端',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCviCDOjYzI5PCFLtxl5H5AFx83iSDIOmHZBJQ4cW6nR96_1uSBT7TkWNsSbteOx2zJruHcuvkfg_VW7ADmjYvCIK2aP0jByDnPZ5NAaBfc1Gbga9gHnRc2oIeqKH2szmrz1SAWX8tffCvClYNSpomjFUh-SjrPe_uGC5ROyomTcxvjIBhVjFk4c9icvJPqhAJhaNQ5a_yjn0zLjZlLk9gbSdQaPUp5_4w24UsPkxlMrgt6xCUh_DRBXg',
    description: '当代女性典雅商务职场形象',
  },
  {
    id: 'logistic-ah-ming',
    name: '阿明 (Ah Ming)',
    roleHint: '外勤与物流专员',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOUOyk3sCxV3lKYFr41LhBo46RSi-hzbteCoN9a330yJB9uN81i2x1JFgYWDuzRi9MyZo8Qvy3S-7Zv70jHbyzC1Bu0fEQHbZZrZdWyO4X-1jSUpiuzroBLOfcxRTuj6L8cyfzCyecM1Yxq3-A5PE4hdizKxGUtwruLDohCZwcOxu1W9qWsYsNyiYuH-3_EuNebEEhASq7yTzSOT6InneCe_fg6NCbJav8eMqmIL_qL0mmhdyuILaZnA',
    description: '专业物流外勤与开光物料交付',
  },
  {
    id: 'taiji-seal',
    name: '三元玄空 · 金印法徽',
    roleHint: '道学吉祥徽记',
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1UyTBbueriFExUOqeEFmnRiCe5j1uVIDlpIUOPR873qWCDIlgAX2dpbmeOL1bceYQL0BuxcVCIuR_3kwFfhcbGtr6kPXtf-0vX8gY0IC4oLkvOLVtg58K-K2vYGR3GRytMax8nkmEmlfEtQTlg16hlAC03YpFaOIiiqUgnkRb-UjXu9KqQV3UgNmvoFYLCRFs6y_Ppg47B6SvjKgiewlkjxXSoz0RX5klPsvPh6mi9gB33DYBl6ZGf80kVq',
    description: 'METAVOX 官方玄学开光认证法徽',
  },
];

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(currentUser?.photoURL || '/master_avatar.jpg');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('请选择有效的图片文件（JPG, PNG, WEBP）');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('图片大小不能超过 8MB');
      return;
    }
    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPreviewUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) {
      setUploadError('请输入有效的图片链接');
      return;
    }
    setUploadError('');
    setPreviewUrl(customUrl.trim());
  };

  const handleSave = () => {
    if (previewUrl) {
      onSaveAvatar(previewUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-space-md border-b border-border-subtle flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-element-fire/15 text-element-fire flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">account_box</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base md:text-lg font-bold text-text-primary">
                更换头像 · Update Profile Avatar
              </h3>
              <p className="font-label-sm text-xs text-text-muted">
                当前账号: {currentUser?.displayName || '访客用户'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-md overflow-y-auto flex flex-col gap-space-md">
          {/* Real-time Preview Area */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md p-space-md bg-surface-warm/60 rounded-2xl border border-border-subtle/80">
            <div className="relative shrink-0">
              <img
                src={previewUrl}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover shadow-md ring-4 ring-element-fire/30"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-element-fire text-on-primary flex items-center justify-center text-xs shadow-md">
                <span className="material-symbols-outlined text-sm">check</span>
              </span>
            </div>
            <div className="flex flex-col text-center sm:text-left gap-1">
              <span className="font-label-md text-xs font-bold text-text-primary uppercase tracking-wider">
                头像效果即时预览 (Live Preview)
              </span>
              <p className="font-body-sm text-xs text-text-muted">
                将在全站导航顶栏、个人资料卡、排盘审核签印及咨询记录中实时生效。
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-gold-bright/20 text-secondary">
                  1:1 圆形裁切
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-container text-text-muted">
                  高清矢量抗锯齿
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-xl border border-border-subtle/50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">upload</span>
              <span>本地上传</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>预设肖像</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">link</span>
              <span>图片链接</span>
            </button>
          </div>

          {/* Tab 1: Local Upload */}
          {activeTab === 'upload' && (
            <div className="flex flex-col gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-element-fire bg-element-fire/10'
                    : 'border-border-subtle hover:border-element-fire/60 bg-surface-container-low/40 hover:bg-surface-warm/50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-element-fire mb-2 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-text-primary">
                  点击选取或拖拽图片至此
                </span>
                <span className="font-body-sm text-xs text-text-muted mt-1">
                  支持 JPG、PNG、WEBP、GIF 格式（最大 8MB）
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Preset Library */}
          {activeTab === 'presets' && (
            <div className="flex flex-col gap-2.5">
              <span className="font-label-sm text-xs text-text-muted">
                点击一键应用大师法相或团队肖像：
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {PRESET_AVATARS.map((preset) => {
                  const isSelected = previewUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setPreviewUrl(preset.url)}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-element-fire bg-element-fire/10 shadow-xs ring-1 ring-element-fire'
                          : 'border-border-subtle bg-surface-container-low/50 hover:bg-surface-warm'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white/50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-xs font-bold text-text-primary truncate">
                          {preset.name}
                        </span>
                        <span className="font-label-sm text-[10px] text-element-fire font-semibold">
                          {preset.roleHint}
                        </span>
                        <span className="font-body-sm text-[10px] text-text-muted truncate">
                          {preset.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Direct URL */}
          {activeTab === 'url' && (
            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-xs font-semibold text-text-primary">
                输入图片直接访问链接 (HTTPS Image URL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-surface-container border border-border-subtle focus:border-element-fire focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-3 py-2 rounded-xl bg-surface-container-high text-text-primary font-label-md text-xs font-semibold hover:bg-surface-container-highest transition-colors"
                >
                  预览
                </button>
              </div>
              <span className="text-[11px] text-text-muted">
                提示: 请确保图片链接支持跨域访问并以 .jpg、.png、.webp 结尾。
              </span>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="p-2.5 rounded-xl bg-error/10 border border-error/30 text-error flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-space-md border-t border-border-subtle bg-surface-container-low/40 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-border-subtle bg-surface-container text-text-primary font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-element-fire transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">done</span>
            <span>保存并应用头像</span>
          </button>
        </div>
      </div>
    </div>
  );
};
