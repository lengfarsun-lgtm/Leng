import React, { useState } from 'react';
import { UserRole, ConsultationSubmission, LogisticsTask, AuditLogItem, InventoryItem } from '../types';

interface ManagementDashboardProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  submissions: ConsultationSubmission[];
  tasks: LogisticsTask[];
  inventory: InventoryItem[];
  auditLogs: AuditLogItem[];
  onOpenReport: (submissionId: string) => void;
  onApproveReport: (submissionId: string) => void;
  onReleaseReport: (submissionId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: 'in_transit' | 'delivered') => void;
  onUploadProofPhoto: (taskId: string) => void;
  onAttachRemedy: (submissionId: string) => void;
}

export const ManagementDashboard: React.FC<ManagementDashboardProps> = ({
  currentRole,
  onSwitchRole,
  submissions,
  tasks,
  inventory,
  auditLogs,
  onOpenReport,
  onApproveReport,
  onReleaseReport,
  onUpdateTaskStatus,
  onUploadProofPhoto,
  onAttachRemedy,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'review' | 'approved'>('review');

  const filteredSubmissions = submissions.filter((sub) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'draft') return sub.status === 'draft' || sub.status === 'processing';
    if (activeTab === 'review') return sub.status === 'in_review';
    if (activeTab === 'approved') return sub.status === 'approved' || sub.status === 'delivered';
    return true;
  });

  return (
    <div className="w-full max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-md flex flex-col gap-space-lg">
      {/* Portal Control Sub-Header & Role Switcher Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md p-space-md bg-surface-container-low rounded-2xl shadow-xs border border-border-subtle">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                METAVOX 综合运营协同中枢
              </span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-element-fire/15 text-element-fire font-semibold text-xs">
                INTERNAL OPS
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Owner, Master Geomancer & Logistics Execution Workspace · PRD Sec 2 & 5.6-5.8
            </p>
          </div>
        </div>

        {/* Role Switcher Control Strip */}
        <div className="flex items-center flex-wrap gap-space-xs bg-surface-container-lowest p-1.5 rounded-full shadow-xs border border-border-subtle">
          <span className="font-label-sm text-label-sm text-on-surface-variant px-space-sm font-semibold text-xs">
            当前视角:
          </span>
          <button
            onClick={() => onSwitchRole('management')}
            type="button"
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 text-xs ${
              currentRole === 'management'
                ? 'bg-primary-container text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>Management (风水管理师)</span>
          </button>
          <button
            onClick={() => onSwitchRole('owner')}
            type="button"
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 text-xs ${
              currentRole === 'owner'
                ? 'bg-primary-container text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">shield_person</span>
            <span>Owner (老板/合伙人)</span>
          </button>
          <button
            onClick={() => onSwitchRole('logistic')}
            type="button"
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 text-xs ${
              currentRole === 'logistic'
                ? 'bg-primary-container text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>Logistic (物流专员)</span>
          </button>
        </div>
      </div>

      {/* 1. Operational Metric KPI Cards (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* KPI 1: Reports Awaiting Review */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[11px]">
                PRD 5.4 审核队列
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-0.5">
                待审核排盘报告
              </span>
            </div>
            <span className="flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              加急处理
            </span>
          </div>
          <div className="mt-space-md flex items-baseline gap-space-xs">
            <span className="font-display-hero text-display-hero text-text-primary font-bold">14</span>
            <span className="font-headline-md text-headline-md text-on-surface-variant font-medium">份</span>
            <span className="ml-auto font-label-sm text-label-sm text-element-fire bg-element-fire/10 px-space-xs py-0.5 rounded text-xs">
              6份超4小时待批
            </span>
          </div>
          <div className="mt-space-sm w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* KPI 2: Today's Logistics Tasks */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[11px]">
                PRD 5.6 物流派送
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-0.5">
                本日吉物履约任务
              </span>
            </div>
            <span className="material-symbols-outlined text-element-earth">local_shipping</span>
          </div>
          <div className="mt-space-md flex items-baseline gap-space-xs">
            <span className="font-display-hero text-display-hero text-text-primary font-bold">28</span>
            <span className="font-headline-md text-headline-md text-on-surface-variant font-medium">单</span>
            <span className="ml-auto font-label-sm text-label-sm text-element-wood font-medium text-xs">
              已交付 18%
            </span>
          </div>
          <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs text-xs">
            <span className="flex items-center gap-1 text-element-earth">
              <span className="w-2 h-2 rounded-full bg-element-earth"></span> 8 运输中
            </span>
            <span className="flex items-center gap-1 text-element-wood">
              <span className="w-2 h-2 rounded-full bg-element-wood"></span> 5 已签收
            </span>
            <span className="flex items-center gap-1 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-surface-container-high"></span> 15 备料中
            </span>
          </div>
        </div>

        {/* KPI 3: Top Inquiries Distribution */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[11px]">
                需求分布模型
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-0.5">
                客户咨询分类占比
              </span>
            </div>
            <span className="material-symbols-outlined text-element-fire">analytics</span>
          </div>
          <div className="mt-space-sm flex items-center gap-space-sm">
            <svg className="w-16 h-16 shrink-0 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
              />
              <path
                className="text-element-fire"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="42, 100"
                strokeWidth="4.5"
              />
              <path
                className="text-element-earth"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="28, 100"
                strokeDashoffset="-42"
                strokeWidth="4.5"
              />
              <path
                className="text-element-wood"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="18, 100"
                strokeDashoffset="-70"
                strokeWidth="4.5"
              />
            </svg>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-label-sm text-label-sm flex-1 text-[11px]">
              <span className="text-text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-element-fire"></span>财运生意 42%
              </span>
              <span className="text-text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-element-earth"></span>阳宅风水 28%
              </span>
              <span className="text-text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-element-wood"></span>姻缘感情 18%
              </span>
              <span className="text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>择日流年 12%
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Metaphysical Computational Engine Status */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[11px]">
                Core AI & Ephemeris
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-0.5">
                测算模型集群状态
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-element-wood animate-pulse"></span>
          </div>
          <div className="mt-space-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low text-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                GenAI 命理推演
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-element-fire">
                Gemini Pro v2.4 Active
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low text-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                紫金山万年历核心
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-element-wood">
                Lunar Engine v1.8 Valid
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-1 text-[11px]">
            <span className="material-symbols-outlined text-xs text-element-wood">check_circle</span>
            真太阳时时区纠偏器运行正常 (MYT 101.69°E)
          </span>
        </div>
      </div>

      {/* 2. Two-Column Operations Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* LEFT PANEL: Client Submissions & Report Approval Queue [7 Cols] */}
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-space-md">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-border-subtle">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary-container text-2xl">fact_check</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-text-primary font-semibold">
                    咨询档案与审核工作台
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Client Submissions & Multi-Tier Report Review
                  </p>
                </div>
              </div>

              {/* Tab Pills */}
              <div className="flex items-center p-1 bg-surface-container-low rounded-full self-start sm:self-auto border border-border-subtle">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all text-xs ${
                    activeTab === 'all'
                      ? 'bg-surface-container-lowest text-text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  全部 All
                </button>
                <button
                  onClick={() => setActiveTab('draft')}
                  className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all text-xs ${
                    activeTab === 'draft'
                      ? 'bg-surface-container-lowest text-text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  待生成 Draft
                </button>
                <button
                  onClick={() => setActiveTab('review')}
                  className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all text-xs ${
                    activeTab === 'review'
                      ? 'bg-surface-container-lowest text-text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  待复核 Review (3)
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all text-xs ${
                    activeTab === 'approved'
                      ? 'bg-surface-container-lowest text-text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  已批准 Approved
                </button>
              </div>
            </div>

            {/* Submissions List */}
            <div className="flex flex-col gap-space-sm">
              {filteredSubmissions.map((sub) => {
                const isTan = sub.fullName.includes('陈慧敏');
                const isLee = sub.fullName.includes('李国强');
                const isWong = sub.fullName.includes('黄子涵');

                return (
                  <div
                    key={sub.id}
                    className="p-space-md rounded-2xl bg-surface-warm hover:bg-surface-container-low transition-colors flex flex-col gap-space-sm relative overflow-hidden border border-border-subtle"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        isTan
                          ? 'bg-element-fire'
                          : isLee
                          ? 'bg-element-wood'
                          : 'bg-element-water'
                      }`}
                    ></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pl-2">
                      <div className="flex items-center gap-space-xs">
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-headline-sm text-headline-sm font-semibold text-sm ${
                            isTan
                              ? 'bg-primary-container/15 text-primary-container'
                              : isLee
                              ? 'bg-element-wood/15 text-element-wood'
                              : 'bg-element-water/15 text-element-water'
                          }`}
                        >
                          {sub.fullName.charAt(0)}
                        </span>
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                              {sub.fullName}
                            </span>
                            <span
                              className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-semibold text-[10px] ${
                                isTan
                                  ? 'bg-element-fire/15 text-element-fire'
                                  : isLee
                                  ? 'bg-element-wood/15 text-element-wood'
                                  : 'bg-element-water/15 text-element-water'
                              }`}
                            >
                              {isTan ? 'Gemini Draft Ready' : isLee ? 'Master Reviewed' : 'In Progress (AI推演中)'}
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                            庚午年 闰五月初四 巳时 (1990-06-26 09:30) · 吉隆坡出生
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 self-start sm:self-auto">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm text-xs">
                          财运 / 阳宅规划
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-medium text-xs">
                          九运旺山旺向
                        </span>
                      </div>
                    </div>

                    {/* Quick Metaphysical Vector Bar */}
                    <div className="grid grid-cols-4 gap-2 pl-2 p-2 bg-surface-container-lowest rounded-xl font-label-sm text-label-sm text-xs border border-border-subtle/40">
                      <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px]">年柱 Year</span>
                        <span className="text-text-primary font-semibold">
                          庚午 <span className="text-element-metal font-normal">(金火)</span>
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px]">月柱 Month</span>
                        <span className="text-text-primary font-semibold">
                          壬午 <span className="text-element-water font-normal">(水火)</span>
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px]">日柱 Day (元神)</span>
                        <span className="text-element-fire font-semibold">
                          丙寅 <span className="text-element-wood font-normal">(火木·身旺)</span>
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px]">喜用神 Balance</span>
                        <span className="text-element-earth font-semibold">湿土 / 润金 / 蓄水</span>
                      </div>
                    </div>

                    {/* AI Draft preview text */}
                    {isTan && (
                      <div className="flex items-center gap-2 pl-2">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">auto_awesome</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate text-xs">
                          <span className="font-semibold text-text-primary">Gemini 命理初稿建议:</span> “2026丙午年岁运并临火炎土燥，建议于乾宫(西北)增设铜制法器与玄关引流活水...”
                        </p>
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-space-xs pl-2 pt-space-xs border-t border-border-subtle/50">
                      <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                        报告编号: #{sub.id} · 提交于 {sub.createdAt}
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <button
                          onClick={() => onOpenReport(sub.id)}
                          type="button"
                          className="px-space-sm py-1.5 rounded-full bg-surface-container text-text-primary hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all flex items-center gap-1 text-xs"
                        >
                          <span className="material-symbols-outlined text-sm">grid_view</span>
                          <span>查看八字排盘</span>
                        </button>

                        {isTan && (
                          <>
                            <button
                              onClick={() => onAttachRemedy(sub.id)}
                              type="button"
                              className="px-space-sm py-1.5 rounded-full bg-surface-container text-element-earth hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all flex items-center gap-1 text-xs"
                            >
                              <span className="material-symbols-outlined text-sm">add_circle</span>
                              <span>指派吉物 Attach Remedy</span>
                            </button>
                            <button
                              onClick={() => onApproveReport(sub.id)}
                              type="button"
                              className="px-space-md py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-element-fire shadow-xs transition-all flex items-center gap-1 text-xs"
                            >
                              <span className="material-symbols-outlined text-sm">verified</span>
                              <span>编辑并批准报告</span>
                            </button>
                          </>
                        )}

                        {isLee && (
                          <button
                            onClick={() => onReleaseReport(sub.id)}
                            type="button"
                            className="px-space-md py-1.5 rounded-full bg-element-wood text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 shadow-xs transition-all flex items-center gap-1 text-xs"
                          >
                            <span className="material-symbols-outlined text-sm">send</span>
                            <span>下发客户 Release Report</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination info */}
            <div className="flex items-center justify-between pt-space-sm text-on-surface-variant font-label-sm text-label-sm text-xs">
              <span>显示 3 / 14 份排队报告 · 每日自动归档</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded bg-surface-container text-text-primary font-medium hover:bg-surface-container-high">
                  1
                </button>
                <button className="px-2.5 py-1 rounded hover:bg-surface-container">2</button>
                <button className="px-2.5 py-1 rounded hover:bg-surface-container">3</button>
                <span className="px-1">...</span>
                <button className="px-2.5 py-1 rounded hover:bg-surface-container">5</button>
              </div>
            </div>
          </div>

          {/* PRD Section 5.8: Owner & High-Privilege Audit Log Snippet */}
          <div
            className={`bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-space-sm transition-opacity ${
              currentRole === 'owner' ? 'ring-2 ring-element-fire/30' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-sm text-element-earth">gavel</span>
                <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  安全审计与权限轨迹 (PRD 5.8 Audit Trace)
                </span>
                {currentRole === 'owner' && (
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold">
                    OWNER UNLOCKED
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px]">
                Zero-Knowledge Verification
              </span>
            </div>
            <div className="flex flex-col gap-2 font-label-sm text-label-sm text-xs">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface-variant border border-border-subtle/40"
                >
                  <span className="text-text-primary font-mono text-[11px]">
                    {log.action}
                  </span>
                  <span className="text-element-wood font-medium text-[11px]">{log.metadata}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Logistics & Fulfillment Control (PRD Section 5.6 & 5.7) [5 Cols] */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-border-subtle flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-border-subtle">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-element-earth text-2xl">inventory_2</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-text-primary font-semibold">
                    吉物物流调度与安装执行
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Logistics & Site Remediation Tasks
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-element-earth/15 text-element-earth font-semibold text-xs">
                8 In-Transit
              </span>
            </div>

            {/* Logistics Task Cards */}
            <div className="flex flex-col gap-space-sm">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-space-md rounded-2xl bg-surface-warm flex flex-col gap-space-sm relative overflow-hidden border border-border-subtle"
                >
                  <div className="flex items-start justify-between gap-space-xs">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                          {task.clientName}
                        </span>
                        {task.vipTag && (
                          <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold text-[10px]">
                            {task.vipTag}
                          </span>
                        )}
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-xs">
                        任务单号: #{task.id} · {task.scheduledTime}
                      </span>
                    </div>

                    <span
                      className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 text-xs ${
                        task.status === 'in_transit'
                          ? 'bg-element-earth/15 text-element-earth'
                          : 'bg-element-wood/15 text-element-wood'
                      }`}
                    >
                      {task.status === 'in_transit' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-element-earth animate-pulse"></span>
                          运输派送中
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-xs text-element-wood">done_all</span>
                          已签收 Delivered
                        </>
                      )}
                    </span>
                  </div>

                  {/* Spec */}
                  <div className="p-space-sm bg-surface-container-lowest rounded-xl flex items-center gap-space-sm border border-border-subtle/50">
                    <div className="w-12 h-12 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                      <img
                        alt={task.remedyName}
                        className="w-full h-full object-cover"
                        src={task.remedyImage}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 text-xs">
                      <span className="font-label-md text-label-md text-text-primary font-semibold truncate">
                        {task.remedyName}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                        服务类别: <strong className="text-text-primary font-medium">{task.serviceCategory}</strong>
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        执行专员: <strong className="text-element-earth font-medium">{task.assignedStaff}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Map Anchor Trigger View for task in-transit */}
                  {task.status === 'in_transit' && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-xs">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-element-fire">location_on</span>
                          {task.address}
                        </span>
                        <span className="text-primary-container font-semibold">距离现场 {task.distanceKm} km</span>
                      </div>

                      {/* Google Maps Visual Box */}
                      <div
                        className="w-full h-28 bg-cover bg-center rounded-xl relative overflow-hidden group shadow-inner border border-border-subtle"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbbIdlLeMCnJgKx4HYLiJTvUjvzRXmHd-h8iwqsl8L-3qQ72pJL7i8t9FSl1F98cWmLc9nRksRHzVMKURKTnAOtKP0MdUeUkXPu6C1Acy_ysazAv3xyHObYTHuasy_UPHQcUFWAnsdmGo6-XsrdSHP0QwNhJnGEsTx8SPkzjmT2zxpxwFVUbdk7EzMQpNhAb1_k4NjmojikoF77za2gkY-gze4ATMoKqfKxlTYGo-WMU7Sesx7U_EYKA')",
                        }}
                      >
                        <div className="absolute inset-0 bg-text-primary/20 backdrop-blur-[1px] group-hover:bg-text-primary/10 transition-colors flex items-center justify-center">
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(task.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-space-md py-1.5 rounded-full bg-surface-container-lowest text-text-primary font-label-sm text-label-sm font-semibold shadow-md flex items-center gap-1 hover:bg-surface-warm transition-transform active:scale-95 text-xs"
                          >
                            <span className="material-symbols-outlined text-sm text-element-fire">directions</span>
                            <span>打开谷歌导航 Open Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Logistic Action Buttons */}
                  <div className="flex items-center justify-between pt-space-xs border-t border-border-subtle/40">
                    <button
                      onClick={() => onUploadProofPhoto(task.id)}
                      type="button"
                      className="px-space-sm py-1.5 rounded-full bg-surface-container text-text-primary hover:bg-surface-container-high font-label-md text-label-md font-medium transition-all flex items-center gap-1 text-xs"
                    >
                      <span className="material-symbols-outlined text-sm">photo_camera</span>
                      <span>拍照上传凭证</span>
                    </button>
                    {task.status === 'in_transit' ? (
                      <button
                        onClick={() => onUpdateTaskStatus(task.id, 'delivered')}
                        type="button"
                        className="px-space-md py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-element-fire shadow-xs transition-all flex items-center gap-1 text-xs"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                        <span>完成安放打卡</span>
                      </button>
                    ) : (
                      <span className="text-element-wood font-medium text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        已完成送达
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Remedy Catalogue Stock Monitor (PRD 5.7) */}
            <div className="pt-space-xs flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  开光吉物即时库存 (Live Remedy Stock)
                </span>
                <span className="font-label-sm text-label-sm text-primary-container font-semibold text-xs">
                  入库管理
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {inventory.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-2.5 rounded-xl bg-surface-warm flex items-center justify-between border border-border-subtle/50"
                  >
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-text-primary">
                        {inv.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                        {inv.category}
                      </span>
                    </div>
                    <span
                      className={`font-headline-sm text-headline-sm font-bold ${
                        inv.alert ? 'text-element-fire' : 'text-element-wood'
                      }`}
                    >
                      {inv.stockCount} {inv.unit} {inv.alert && '(告急)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
