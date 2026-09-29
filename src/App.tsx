/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppUser, UserRole, ConsultationSubmission, BaziReport, LogisticsTask } from './types';
import { DEMO_USERS, INITIAL_SUBMISSIONS, SAMPLE_REPORT, INITIAL_LOGISTICS_TASKS, INITIAL_INVENTORY, INITIAL_AUDIT_LOGS } from './data/dummyData';
import { calculateFourPillars, getDefaultElementWeights, getDefaultLuckPillars } from './lib/baziEngine';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { IntakeForm } from './components/IntakeForm';
import { BaziReportView } from './components/BaziReportView';
import { ManagementDashboard } from './components/ManagementDashboard';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const getInitialUser = (): AppUser => {
    const defaultUser = { ...DEMO_USERS['client'] };
    try {
      const saved = localStorage.getItem(`metavox_avatar_${defaultUser.uid}`);
      if (saved) {
        defaultUser.photoURL = saved;
      }
    } catch {
      // ignore
    }
    return defaultUser;
  };

  // Start with Demo Client by default, with easy switch/login
  const [currentUser, setCurrentUser] = useState<AppUser | null>(getInitialUser);
  const [currentRole, setCurrentRole] = useState<UserRole>('client');
  const [currentView, setCurrentView] = useState<'home' | 'intake' | 'report' | 'ops'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Dynamic application state initialized with realistic dummy data
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>(INITIAL_SUBMISSIONS);
  const [currentReport, setCurrentReport] = useState<BaziReport>(SAMPLE_REPORT);
  const [tasks, setTasks] = useState<LogisticsTask[]>(INITIAL_LOGISTICS_TASKS);
  const [inventory] = useState(INITIAL_INVENTORY);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false,
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3800);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (DEMO_USERS[newRole]) {
      const userObj = { ...DEMO_USERS[newRole] };
      try {
        const saved = localStorage.getItem(`metavox_avatar_${userObj.uid}`);
        if (saved) {
          userObj.photoURL = saved;
        }
      } catch {
        // ignore
      }
      setCurrentUser(userObj);
    }
    if (newRole === 'owner') {
      showToast('已切换至 [Owner 老板/合伙人] 视角：开放高阶审计及全权权限', 'shield_person');
      setCurrentView('ops');
    } else if (newRole === 'management') {
      showToast('已切换至 [Management 风水管理师] 视角：开启排盘审核工作流', 'psychology');
      setCurrentView('ops');
    } else if (newRole === 'logistic') {
      showToast('已切换至 [Logistic 物流专员] 视角：已高亮外勤与工单签收任务', 'local_shipping');
      setCurrentView('ops');
    } else {
      showToast('已切换至 [Client 客资端] 视角：可填写咨询并查看已批准报告', 'person');
      setCurrentView('report');
    }
  };

  const handleUpdateAvatar = (newPhotoURL: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, photoURL: newPhotoURL };
      setCurrentUser(updatedUser);
      if (DEMO_USERS[currentRole]) {
        DEMO_USERS[currentRole].photoURL = newPhotoURL;
      }
      try {
        localStorage.setItem(`metavox_avatar_${currentUser.uid}`, newPhotoURL);
      } catch {
        // ignore
      }
      showToast('头像已更新成功！', 'add_photo_alternate');
    }
  };

  const handleNavigate = (view: string) => {
    if (!currentUser && (view === 'intake' || view === 'report' || view === 'ops')) {
      setAuthModalOpen(true);
      return;
    }
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReading = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setCurrentView('intake');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreModule = (moduleType: string) => {
    showToast(`已选择 [${moduleType}] 专项咨询，正在加载预设参数...`, 'auto_fix_high');
    handleStartReading();
  };

  // Submit intake form -> computes real BaZi chart and saves
  const handleIntakeSubmit = (newSubmission: ConsultationSubmission) => {
    showToast('正在调用真太阳时紫金山天文历算法计算四柱八字...', 'calculate');

    const pillars = calculateFourPillars({
      lunarYear: newSubmission.lunarYear,
      lunarMonth: newSubmission.lunarMonth,
      isLeapMonth: newSubmission.isLeapMonth,
      lunarDay: newSubmission.lunarDay,
      shichenKey: newSubmission.shichen,
    });

    const newReport: BaziReport = {
      id: newSubmission.id,
      submissionId: newSubmission.id,
      clientName: newSubmission.fullName.split(' ')[0] || newSubmission.fullName,
      clientNameEn: newSubmission.fullName.includes('(') ? newSubmission.fullName.split('(')[1]?.replace(')', '') : 'Client',
      gender: newSubmission.gender,
      solarBirthDate: newSubmission.calculatedSolarDate || '1990-06-24 11:30',
      lunarBirthDate: `${newSubmission.lunarYear}年 ${newSubmission.isLeapMonth ? '闰' : ''}${newSubmission.lunarMonth}月${newSubmission.lunarDay}日`,
      status: 'in_review',
      approvedBy: 'Master Tan Cheng Lok (陈清禄 执业风水大师)',
      approvedDate: '2026-09-29 18:00 (KL Time)',
      masterLicense: 'Lic. MY-FS-8812',
      fourPillars: pillars,
      patternJudgmentZh: '身旺极强 (Strong Yang Fire 丙火)',
      patternStatusZh: '得令·得地·得势',
      patternSummaryZh: '夏月丙火，坐支戌土火库，三逢午火帝旺，火势炎赫如烈日当空。命格气魄宏大，决断力凌厉，急需壬水调候润泽，以湿土生金泄秀，始成水火既济之富贵格局。',
      beneficialElementsZh: '湿土 (Wet Earth) & 壬水 (Water)',
      beneficialNoteZh: '润土生金，官星伏火生财',
      avoidanceElementsZh: '丙丁火 (Fire) & 燥土 (Dry Earth)',
      avoidanceNoteZh: '火烈土焦，加剧劫财内耗',
      elementWeights: getDefaultElementWeights(),
      executiveOverviewZh: '命主命局构架极具开拓力，属典型的“商战领袖型”八字。适逢当前下元九运 (2024–2043 离火大运)，宇宙宏观离火与本命丙火形成强力共振。宜以“水法”引入柔性智囊与制度约束，使滔天烈焰转化为精炼纯熟之炼金真火。',
      wealthSectionZh: {
        title: '财运机运与商业扩张指引',
        analysis: '九运离火共振效应：离火主科技、数字化、美学及新能源。若涉足重资产直接制造易受原料波动裹挟；若转型至智慧供应链、跨境数字资产、现代高阶服务与美学咨询，借水泄火以护金，财帛充盈稳固。',
        optimalDirections: '正北 (坎水) / 西南 (坤土)',
        optimalDirectionsNote: '办公室坐北朝南或商务出海优先考量',
        activationTiming: '每年 农历七至八月 (申/酉金月)',
        activationTimingNote: '签约交易与大额配置之吉期',
        breakthroughNote: '破局心法：以“合伙人让利制”化解阳刃夺财，契约明晰胜于宗亲同事情分。',
      },
      careerSectionZh: {
        title: '事业突破与太岁航标',
        currentYearAnalysis: '2026 丙午流年 · 岁驾伏吟：流年与年支自刑并临，四午汇聚烈焰冲天。情绪波动与心血管防压，事业上宜以退为进。',
        nextYearAnalysis: '2027 丁未流年 · 六合转运：午未相合，太岁合绊羊刃化土生财，前期待定项目将在此年迎来官方背书。',
        bestIndustries: '现代冷链/水利、数据风控、法务合规',
      },
      luckPillars: getDefaultLuckPillars(),
      remedies: SAMPLE_REPORT.remedies,
      logisticsTask: SAMPLE_REPORT.logisticsTask,
      sha256Verification: `SHA-256: ${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
    };

    setSubmissions([newSubmission, ...submissions]);
    setCurrentReport(newReport);

    // Audit log
    setAuditLogs([
      {
        id: `log-${Date.now()}`,
        actor: `Client (${newSubmission.fullName.split(' ')[0]})`,
        action: `submitted new consultation intake #${newSubmission.id}`,
        target: `Intake #${newSubmission.id}`,
        timestamp: new Date().toLocaleTimeString(),
        metadata: 'Solar Term: Li Chun Calibrated ✓',
      },
      ...auditLogs,
    ]);

    setTimeout(() => {
      showToast('八字排盘与 Gemini 命理分析初稿生成完毕！已进入管理师审核队列。', 'verified');
      setCurrentView('report');
    }, 900);
  };

  const handleApproveReport = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'approved' } : s))
    );
    showToast(`大师签署验证通过！报告 #${submissionId} 已锁定并生成客户解密私钥`, 'verified');
    setAuditLogs([
      {
        id: `log-${Date.now()}`,
        actor: 'Management (Master Lam)',
        action: `approved report #${submissionId}`,
        target: `Report #${submissionId}`,
        timestamp: new Date().toLocaleTimeString(),
        metadata: 'Master Cinnabar Signature Verified ✓',
      },
      ...auditLogs,
    ]);
  };

  const handleReleaseReport = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'delivered' } : s))
    );
    showToast(`报告 #${submissionId} 已向客户端推送通知并同步微信提醒`, 'send');
  };

  const handleAttachRemedy = (submissionId: string) => {
    showToast(`为报告 #${submissionId} 匹配九运化煞吉物 (九运紫白飞星铜葫芦)`, 'inventory_2');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: 'in_transit' | 'delivered') => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`单号 #${taskId} 状态已更新为 [已签收 Delivered]，完成 GPS 地理校验！`, 'task_alt');
    setAuditLogs([
      {
        id: `log-${Date.now()}`,
        actor: 'Logistic (Ah Ming)',
        action: `marked task #${taskId} as ${newStatus}`,
        target: `Task #${taskId}`,
        timestamp: new Date().toLocaleTimeString(),
        metadata: 'GPS Proof Attached ✓',
      },
      ...auditLogs,
    ]);
  };

  const handleUploadProofPhoto = (taskId: string) => {
    showToast(`正在调用外勤设备上传现场安放凭证 (单号: #${taskId})`, 'photo_camera');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Top Floating Sticky Header */}
      <Header
        currentUser={currentUser}
        currentRole={currentRole}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onSwitchRole={handleSwitchRole}
        onUpdateAvatar={handleUpdateAvatar}
        onLogout={() => {
          setCurrentUser(null);
          setCurrentRole('client');
          showToast('您已安全登出系统', 'logout');
        }}
      />

      {/* Main View Router */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'home' && (
          <LandingPage
            onStartReading={handleStartReading}
            onExploreModule={handleExploreModule}
          />
        )}

        {currentView === 'intake' && (
          <IntakeForm
            onSubmit={handleIntakeSubmit}
            onSaveDraft={(draft) => showToast(`草稿已成功保存 (${draft.fullName || '客资'})`, 'save')}
          />
        )}

        {currentView === 'report' && (
          <BaziReportView
            report={currentReport}
            onPrint={() => window.print()}
          />
        )}

        {currentView === 'ops' && (
          <ManagementDashboard
            currentRole={currentRole}
            onSwitchRole={handleSwitchRole}
            submissions={submissions}
            tasks={tasks}
            inventory={inventory}
            auditLogs={auditLogs}
            onOpenReport={() => {
              setCurrentView('report');
              showToast('已加载陈慧敏的真太阳时四柱八字排盘报告', 'grid_view');
            }}
            onApproveReport={handleApproveReport}
            onReleaseReport={handleReleaseReport}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onUploadProofPhoto={handleUploadProofPhoto}
            onAttachRemedy={handleAttachRemedy}
          />
        )}
      </main>

      {/* Standard Universal Footer */}
      <Footer currentRole={currentRole} onSwitchRole={handleSwitchRole} />

      {/* Auth Modal for Login, Google Sign-in & Fast Role Switcher */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setCurrentRole(user.role);
          showToast(`欢迎回来，${user.displayName}！已以 [${user.role}] 角色登录`, 'verified');
          if (user.role === 'management' || user.role === 'owner' || user.role === 'logistic') {
            setCurrentView('ops');
          } else {
            setCurrentView('intake');
          }
        }}
      />

      {/* Fixed Toast Notifications */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none bg-text-primary text-on-error px-space-md py-space-sm rounded-2xl shadow-2xl flex items-center gap-space-xs font-label-md text-label-md border border-white/10 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-element-fire text-xl">{toast.icon}</span>
        <span className="text-xs font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
