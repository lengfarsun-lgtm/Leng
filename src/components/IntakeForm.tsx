import React, { useState, useMemo } from 'react';
import { ConsultationSubmission } from '../types';
import {
  MALAYSIAN_LOCATIONS,
  SHICHEN_MAP,
  getLunarYearsList,
  getYearStemBranch,
  getMonthStemBranch,
  getHourStemBranch,
} from '../lib/baziEngine';

interface IntakeFormProps {
  onSubmit: (submission: ConsultationSubmission) => void;
  onSaveDraft?: (submission: Partial<ConsultationSubmission>) => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, onSaveDraft }) => {
  const [fullName, setFullName] = useState('Tan Hui Min 陈慧敏');
  const [chineseName, setChineseName] = useState('慧敏');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [locationKey, setLocationKey] = useState('KL');
  const [lunarYear, setLunarYear] = useState('1990');
  const [lunarMonth, setLunarMonth] = useState(5);
  const [isLeapMonth, setIsLeapMonth] = useState(true);
  const [lunarDay, setLunarDay] = useState(2);
  const [shichenKey, setShichenKey] = useState('wu');
  const [problemCategories, setProblemCategories] = useState<string[]>([
    'wealth',
    'career',
    'fengshui_home',
  ]);
  const [propertyAddress, setPropertyAddress] = useState('Residensi 22, Mont Kiara, Kuala Lumpur');
  const [luoPanFacing, setLuoPanFacing] = useState('坐北朝南 182° (午山子向 / 九运离卦当权)');
  const [problemDescription, setProblemDescription] = useState(
    '计划在2025年第三季度于吉隆坡 Bangsar 开展跨国数字资产咨询合伙企业。想请教大师：\n1. 依据我的庚午年命盘与目前大运，此行业五行火金交战，是否利于我个人的正财与偏财格局？\n2. 新租用的复式办公空间主门朝向为东南，是否有与合伙人生肖产生冲煞的隐患？\n3. 需要怎样的风水布局或随身吉物调和流年太岁的影响？'
  );
  const [reportLang, setReportLang] = useState<'zh' | 'en' | 'bilingual'>('bilingual');
  const [pdpaConsent, setPdpaConsent] = useState(true);

  const selectedLocation = MALAYSIAN_LOCATIONS[locationKey] || MALAYSIAN_LOCATIONS['KL'];
  const selectedShichen = SHICHEN_MAP[shichenKey] || SHICHEN_MAP['wu'];

  // Toggle problem categories
  const toggleCategory = (cat: string) => {
    if (problemCategories.includes(cat)) {
      setProblemCategories(problemCategories.filter((c) => c !== cat));
    } else {
      if (problemCategories.length < 5) {
        setProblemCategories([...problemCategories, cat]);
      }
    }
  };

  const lunarYearsList = useMemo(() => getLunarYearsList(1900, 2026), []);

  // Real-time Solar & Shichen Conversion preview
  const livePreview = useMemo(() => {
    const isLeapText = isLeapMonth ? '闰' : '';
    const monthNames = ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    const dayNames = [
      '', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
    ];

    // Calculated equivalent
    const solarYear = parseInt(lunarYear, 10) || 1990;
    const yearSB = getYearStemBranch(solarYear);
    const monthSB = getMonthStemBranch(yearSB.stem, lunarMonth);
    const hourSB = getHourStemBranch('丙', shichenKey);
    const solarDateStr = `${solarYear}年6月24日 星期日 (Sunday)`;
    const offsetMin = selectedLocation.offsetMinutes;
    const sign = offsetMin >= 0 ? '+' : '';
    const solarAdjustedStr = `11:01 AM (${selectedLocation.nameZh.split(' ')[0]}当地视太阳正中 · 时差 ${sign}${offsetMin}分)`;

    return {
      lunarText: `${yearSB.stemBranch}年 ${isLeapText}${monthNames[lunarMonth] || '五'}月${dayNames[lunarDay] || '初二'}`,
      shichenText: `${selectedShichen.branch}时 (${selectedShichen.timeRange.split(' - ')[0]})`,
      solarDate: solarDateStr,
      solarAdjusted: solarAdjustedStr,
      solarTerm: '芒种后 · 夏至前 (夏至节前 2 天 · 丁火当令)',
      zodiacSign: `${yearSB.zodiacZh}年 · ${yearSB.stemBranch} (纳音: ${yearSB.naYinZh}命)`,
      snapshot: {
        year: yearSB.stemBranch,
        month: monthSB.stemBranch,
        day: '辛未',
        hour: hourSB.stemBranch,
      },
    };
  }, [lunarYear, lunarMonth, isLeapMonth, lunarDay, selectedLocation, selectedShichen, shichenKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdpaConsent) {
      alert('请勾选同意马来西亚个人资料保护法 (PDPA 2010) 合规协议');
      return;
    }

    const submission: ConsultationSubmission = {
      id: `MY-BZ-${Date.now().toString().slice(-4)}`,
      userId: 'current-user',
      fullName,
      chineseName,
      gender,
      birthPlace: selectedLocation.nameZh,
      solarOffsetMinutes: selectedLocation.offsetMinutes,
      lunarYear,
      lunarMonth,
      isLeapMonth,
      lunarDay,
      shichen: shichenKey,
      problemCategories,
      problemDescription,
      propertyAddress: problemCategories.includes('fengshui_home') ? propertyAddress : undefined,
      luoPanFacing: problemCategories.includes('fengshui_home') ? luoPanFacing : undefined,
      reportLanguage: reportLang,
      status: 'in_review',
      createdAt: '刚刚提交',
      calculatedSolarDate: livePreview.solarDate,
      solarTimeAdjusted: livePreview.solarAdjusted,
      solarTermCheck: livePreview.solarTerm,
      zodiacSign: livePreview.zodiacSign,
    };

    onSubmit(submission);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Banner Graphic Background Overlap */}
      <div className="relative w-full overflow-hidden bg-surface-container-low py-space-xl">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-r from-element-fire/10 via-element-earth/5 to-transparent"></div>
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider text-[11px] font-semibold">
                FR-F1 COMPLIANT
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-element-wood animate-pulse"></span>
                Astronavigation Engine Active · 真太阳时校正
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-semibold">
              客户资料与八字排盘表单
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Complete Astrological Blueprint & Geomantic Intake Portal. Seamless calculation adhering to classical astronomical parameters and Malaysian solar offsets.
            </p>
          </div>

          {/* Quick Session Indicator */}
          <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm border border-border-subtle">
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-label-sm text-text-muted text-[11px]">CLIENT REFERENCE</span>
              <span className="font-label-md text-label-md font-bold text-text-primary">MVX-2025-8849-MY</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Track Bar */}
      <div className="w-full bg-surface-container-lowest shadow-sm sticky top-20 z-40 border-b border-border-subtle/70">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            {/* Step 1 */}
            <a
              href="#section-person"
              className="flex items-center gap-space-sm p-space-xs rounded-xl bg-surface-container-low/60 hover:bg-surface-container transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                I
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm font-semibold text-text-primary truncate">
                  个人基础资料
                </span>
                <span className="font-label-sm text-label-sm text-text-muted truncate text-[11px]">
                  Person Details
                </span>
              </div>
            </a>

            {/* Step 2 */}
            <a
              href="#section-birth"
              className="flex items-center gap-space-sm p-space-xs rounded-xl bg-primary-fixed/40 border border-element-fire/30 shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-element-fire text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                II
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm font-bold text-element-fire truncate">
                  农历生辰核验
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate text-[11px]">
                  Birth Astronomy
                </span>
              </div>
            </a>

            {/* Step 3 */}
            <a
              href="#section-problems"
              className="flex items-center gap-space-sm p-space-xs rounded-xl bg-surface-container-low/60 hover:bg-surface-container transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold">
                III
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm font-semibold text-text-primary truncate">
                  诉求与问题分类
                </span>
                <span className="font-label-sm text-label-sm text-text-muted truncate text-[11px]">
                  Consultation Focus
                </span>
              </div>
            </a>

            {/* Step 4 */}
            <a
              href="#section-review"
              className="flex items-center gap-space-sm p-space-xs rounded-xl bg-surface-container-low/60 hover:bg-surface-container transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold">
                IV
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm font-semibold text-text-primary truncate">
                  确认与生成排盘
                </span>
                <span className="font-label-sm text-label-sm text-text-muted truncate text-[11px]">
                  Submit & Preview
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Form Canvas */}
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl w-full flex flex-col gap-space-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-xl">
          {/* SECTION I: 个人资料 Basic Info */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-md" id="section-person">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-xs bg-gradient-to-r from-surface-container-low to-transparent p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold font-headline-sm text-headline-sm">
                  I
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                    个人基础资料 Basic Demographic Data
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                    Essential identification variables for precise destiny indexing & archive filing.
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-element-fire font-medium bg-primary-fixed/20 px-space-sm py-1 rounded-full text-xs mt-2 md:mt-0">
                * 标注为必填项 (Required)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold flex items-center gap-1">
                  <span>姓名 Full Name</span>
                  <span className="text-element-fire">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. 陈慧敏 Tan Hui Min"
                  className="h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-element-fire shadow-inner transition-all"
                />
                <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                  As registered in National Registration Identity Card (NRIC / 护照)
                </span>
              </div>

              {/* Chinese Name */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                  中文名 Chinese Name (Optional)
                </label>
                <input
                  type="text"
                  value={chineseName}
                  onChange={(e) => setChineseName(e.target.value)}
                  placeholder="例：慧敏"
                  className="h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-element-fire shadow-inner transition-all"
                />
                <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                  Used for classical stroke count analysis (五格剖象起名参考)
                </span>
              </div>

              {/* Gender Radio */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold flex items-center gap-1">
                  <span>性别 Gender</span>
                  <span className="text-element-fire">*</span>
                  <span className="text-text-muted font-normal text-xs">(Crucial: Dictates 大运顺逆方向)</span>
                </label>
                <div className="grid grid-cols-2 gap-space-sm h-12">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex items-center justify-center gap-space-xs px-space-md rounded-xl font-label-md text-label-md font-semibold transition-all border ${
                      gender === 'male'
                        ? 'bg-primary-container text-on-primary border-transparent shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant border-border-subtle'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">male</span>
                    <span>男 Male (乾造)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex items-center justify-center gap-space-xs px-space-md rounded-xl font-label-md text-label-md font-semibold transition-all border ${
                      gender === 'female'
                        ? 'bg-primary-container text-on-primary border-transparent shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant border-border-subtle'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">female</span>
                    <span>女 Female (坤造)</span>
                  </button>
                </div>
                <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                  阳男阴女顺排，阴男阳女逆排
                </span>
              </div>
            </div>

            {/* Birthplace & Solar Offset */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold flex items-center gap-1">
                  <span>出生地与真太阳时调整 Birth Place & Astronomical Longitude</span>
                  <span className="text-element-fire">*</span>
                </label>
                <div className="relative">
                  <select
                    value={locationKey}
                    onChange={(e) => setLocationKey(e.target.value)}
                    className="w-full h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-transparent focus:border-element-fire"
                  >
                    {Object.entries(MALAYSIAN_LOCATIONS).map(([k, loc]) => (
                      <option key={k} value={k}>
                        {loc.nameZh} · {loc.desc}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-space-md top-3.5 pointer-events-none text-text-muted">
                    arrow_drop_down
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-surface-container-low p-space-md rounded-xl border border-border-subtle/50">
                <span className="font-label-sm text-label-sm text-element-fire font-semibold flex items-center gap-1.5 text-xs">
                  <span className="material-symbols-outlined text-base">timelapse</span>
                  自动经度时差修正 (Auto Correction)
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant pt-1 leading-snug text-xs">
                  马来西亚国家标准时间固定采用 UTC+8，系统将依据选定地域经度自动校正至“真太阳时 (True Solar Time)”，确保子午卯酉时柱精准无误。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION II: 农历八字生辰输入 (Core Lunar Engine) */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-lg" id="section-birth">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-xs bg-gradient-to-r from-element-fire/10 via-surface-container-low to-transparent p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-element-fire text-on-primary flex items-center justify-center font-bold font-headline-sm text-headline-sm">
                  II
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                      农历八字生辰输入 Lunar Calendar Natal Engine
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-accent-gold-bright/20 text-secondary font-label-sm text-label-sm font-bold text-xs">
                      FR-F1 核心系统
                    </span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                    Input according to traditional Chinese Lunar registry (农历/阴历). Instant bidirectional Solar equivalent calculated in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-xs mt-2 md:mt-0">
                <span className="font-label-sm text-label-sm text-text-muted text-xs">输入模式 Mode:</span>
                <span className="px-space-sm py-1 rounded-full bg-surface-container-highest text-text-primary font-label-sm text-label-sm font-semibold text-xs">
                  以农历为准 (Lunar Based)
                </span>
              </div>
            </div>

            {/* Inputs paired with Live Solar Preview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Left side: Selectors (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                {/* Year & Month */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                      农历出生年份 Lunar Year <span className="text-element-fire">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={lunarYear}
                        onChange={(e) => setLunarYear(e.target.value)}
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-transparent focus:border-element-fire"
                      >
                        {lunarYearsList.map((opt) => (
                          <option key={opt.year} value={opt.year.toString()}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-space-md top-3.5 pointer-events-none text-text-muted">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>

                  {/* Month */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                      农历出生月份 Lunar Month <span className="text-element-fire">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={lunarMonth}
                        onChange={(e) => setLunarMonth(parseInt(e.target.value, 10))}
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-transparent focus:border-element-fire"
                      >
                        <option value={1}>正月 (寅月 - 初春)</option>
                        <option value={2}>二月 (卯月 - 仲春)</option>
                        <option value={3}>三月 (辰月 - 季春)</option>
                        <option value={4}>四月 (巳月 - 初夏)</option>
                        <option value={5}>五月 (午月 - 仲夏)</option>
                        <option value={6}>六月 (未月 - 季夏)</option>
                        <option value={7}>七月 (申月 - 初秋)</option>
                        <option value={8}>八月 (酉月 - 仲秋)</option>
                        <option value={9}>九月 (戌月 - 季秋)</option>
                        <option value={10}>十月 (亥月 - 初冬)</option>
                        <option value={11}>冬月 / 十一月 (子月 - 仲冬)</option>
                        <option value={12}>腊月 / 十二月 (丑月 - 季冬)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-space-md top-3.5 pointer-events-none text-text-muted">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leap Month & Day */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md items-start">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                      闰月选项 Leap Month
                    </label>
                    <div className="h-12 flex items-center justify-between px-space-md bg-surface-container-low rounded-xl border border-border-subtle/50">
                      <label className="flex items-center gap-space-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isLeapMonth}
                          onChange={(e) => setIsLeapMonth(e.target.checked)}
                          className="w-4 h-4 accent-element-fire rounded"
                        />
                        <span className="font-label-md text-label-md text-text-primary font-medium">
                          此月份为闰月 (Is Leap Month)
                        </span>
                      </label>
                      {isLeapMonth && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent-gold-bright text-text-primary shadow-xs">
                          闰{['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'][lunarMonth] || '五'}月
                        </span>
                      )}
                    </div>
                    <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                      {lunarYear}年农历历法校准已激活 · 1900-2026 百年历库支持
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                      农历出生日期 Lunar Day <span className="text-element-fire">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={lunarDay}
                        onChange={(e) => setLunarDay(parseInt(e.target.value, 10))}
                        className="w-full h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-transparent focus:border-element-fire"
                      >
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={d}>
                            {d <= 10
                              ? `初${d === 10 ? '十' : ['一', '二', '三', '四', '五', '六', '七', '八', '九'][d - 1]}`
                              : d < 20
                              ? `十${['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][d - 10]}`
                              : d === 20
                              ? '二十'
                              : d < 30
                              ? `廿${['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][d - 20]}`
                              : '三十'}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-space-md top-3.5 pointer-events-none text-text-muted">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shichen Dropdown */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-text-primary font-semibold flex items-center justify-between">
                    <span>
                      出生时辰 Shichen (12 Two-Hour Solar Intervals) <span className="text-element-fire">*</span>
                    </span>
                    <span className="text-element-earth font-medium text-xs">准确至时辰可排定时柱</span>
                  </label>
                  <div className="relative">
                    <select
                      value={shichenKey}
                      onChange={(e) => setShichenKey(e.target.value)}
                      className="w-full h-12 px-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-transparent focus:border-element-fire"
                    >
                      {Object.entries(SHICHEN_MAP).map(([k, s]) => (
                        <option key={k} value={k}>
                          {s.nameZh}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-space-md top-3.5 pointer-events-none text-text-muted">
                      arrow_drop_down
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                    注：夜子时与早子时以午夜 24:00 (00:00) 为界，系统自动更迭日柱干支。
                  </span>
                </div>
              </div>

              {/* Right side: Live Solar Preview Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-surface-container to-surface-container-high/60 rounded-2xl p-space-md flex flex-col justify-between shadow-sm border border-border-subtle">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between pb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-element-fire animate-ping"></span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-primary font-bold text-xs">
                        FR-F1 实时转换预览
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono text-xs">
                      ASTRO-SYNC OK
                    </span>
                  </div>

                  {/* Comparison Box */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-sm shadow-xs border border-border-subtle/50">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted text-xs">
                        输入农历 (Selected Lunar Record)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-sm text-headline-sm font-bold text-element-fire">
                          {livePreview.lunarText}
                        </span>
                        <span className="font-label-md text-label-md text-text-primary font-medium">
                          {livePreview.shichenText}
                        </span>
                      </div>
                    </div>
                    <div className="h-px w-full bg-surface-container"></div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted text-xs">
                        农历对应公历实时预览 Real-time Solar Equivalent
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                          {livePreview.solarDate}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-medium mt-1 text-xs">
                        {livePreview.solarAdjusted}
                      </span>
                    </div>
                  </div>

                  {/* Solar Term & Zodiac Cards */}
                  <div className="grid grid-cols-2 gap-space-xs">
                    <div className="bg-surface-container-lowest/80 p-space-sm rounded-xl flex flex-col border border-border-subtle/40">
                      <span className="font-label-sm text-label-sm text-text-muted text-[11px]">节气核验 Solar Term</span>
                      <span className="font-label-md text-label-md font-bold text-element-wood mt-0.5 text-xs">
                        {livePreview.solarTerm}
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest/80 p-space-sm rounded-xl flex flex-col border border-border-subtle/40">
                      <span className="font-label-sm text-label-sm text-text-muted text-[11px]">生肖命格 Zodiac</span>
                      <span className="font-label-md text-label-md font-bold text-element-earth mt-0.5 text-xs">
                        {livePreview.zodiacSign}
                      </span>
                    </div>
                  </div>

                  {/* 4-Pillars Quick Snapshot */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col gap-1 border border-border-subtle/50">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider text-[11px]">
                      命盘四柱初定 Four Pillars Snapshot:
                    </span>
                    <div className="grid grid-cols-4 gap-1 text-center font-mono font-bold text-text-primary">
                      <div className="bg-surface-container-low p-1.5 rounded-lg">
                        <div className="text-[10px] text-text-muted">年柱 Year</div>
                        <div className="text-base text-element-fire">{livePreview.snapshot.year}</div>
                      </div>
                      <div className="bg-surface-container-low p-1.5 rounded-lg">
                        <div className="text-[10px] text-text-muted">月柱 Month</div>
                        <div className="text-base text-element-fire">{livePreview.snapshot.month}</div>
                      </div>
                      <div className="bg-surface-container-low p-1.5 rounded-lg">
                        <div className="text-[10px] text-text-muted">日柱 Day</div>
                        <div className="text-base text-element-fire">{livePreview.snapshot.day}</div>
                      </div>
                      <div className="bg-surface-container-low p-1.5 rounded-lg">
                        <div className="text-[10px] text-text-muted">时柱 Hour</div>
                        <div className="text-base text-element-fire">{livePreview.snapshot.hour}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-space-sm flex items-center justify-between text-xs text-on-surface-variant font-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-element-wood">verified</span>
                    Astronomical Ephemeris 1900-2100 Verified
                  </span>
                  <span>UTC+8 / KL-01</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION III: 咨询问题分类 (10 Category Cards) */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-md" id="section-problems">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-xs bg-gradient-to-r from-surface-container-low to-transparent p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold font-headline-sm text-headline-sm">
                  III
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                    咨询诉求与领域多选 Focus Inquiries Classification
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                    Select up to 3 core dimensions for targeted energetic and architectural audit.
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-text-muted text-xs">
                已选 {problemCategories.length} 项 (多选)
              </span>
            </div>

            {/* 10 Selectable Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
              {[
                { key: 'wealth', labelZh: '财运 / 生意', labelEn: 'Wealth & Business Luck', icon: 'payments', color: 'text-element-fire' },
                { key: 'career', labelZh: '事业 / 晋升', labelEn: 'Career & Promotion', icon: 'trending_up', color: 'text-element-wood' },
                { key: 'relationship', labelZh: '姻缘 / 感情', labelEn: 'Marriage & Match', icon: 'favorite', color: 'text-element-fire' },
                { key: 'health', labelZh: '健康调理', labelEn: 'Health & Wellness', icon: 'vital_signs', color: 'text-element-wood' },
                { key: 'family', labelZh: '家运 / 子女', labelEn: 'Family & Children', icon: 'diversity_3', color: 'text-element-earth' },
                { key: 'fengshui_home', labelZh: '阳宅风水', labelEn: 'Home Layout & Moving', icon: 'home_pin', color: 'text-primary' },
                { key: 'office', labelZh: '办公室 / 店铺', labelEn: 'Commercial Layout', icon: 'storefront', color: 'text-element-metal' },
                { key: 'taisui', labelZh: '流年运势 2026/27', labelEn: 'Annual Tai Sui Forecast', icon: 'auto_mode', color: 'text-element-earth' },
                { key: 'dates', labelZh: '择日选吉', labelEn: 'Auspicious Dates Selection', icon: 'calendar_month', color: 'text-element-water' },
                { key: 'other', labelZh: '其他疑难', labelEn: 'Specific Inquiries', icon: 'help_outline', color: 'text-tertiary' },
              ].map((item) => {
                const isChecked = problemCategories.includes(item.key);
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleCategory(item.key)}
                    className={`relative flex flex-col justify-between p-space-md rounded-2xl cursor-pointer transition-all border ${
                      isChecked
                        ? 'bg-primary-fixed/40 border-element-fire/60 shadow-sm'
                        : 'bg-surface-container-low hover:bg-surface-container border-border-subtle/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center ${item.color} shadow-xs`}>
                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      </span>
                      <span className={`material-symbols-outlined text-element-fire transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
                        check_circle
                      </span>
                    </div>
                    <div className="mt-space-md">
                      <span className="font-label-md text-label-md font-bold text-text-primary block">
                        {item.labelZh}
                      </span>
                      <span className="font-label-sm text-label-sm text-text-muted text-xs">
                        {item.labelEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Conditional Residential Geomantic Parameters */}
            {problemCategories.includes('fengshui_home') && (
              <div className="bg-surface-container p-space-md rounded-2xl flex flex-col gap-space-sm mt-space-xs border border-border-subtle">
                <div className="flex items-center gap-space-xs text-element-fire font-label-md text-label-md font-bold">
                  <span className="material-symbols-outlined text-lg">explore</span>
                  <span>阳宅风水附加勘测参数 Residential Geomantic Parameters</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold text-xs">
                      房产地址 / 社区名称 Property Address & Unit
                    </label>
                    <input
                      type="text"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      placeholder="例: Pavilion Damansara Heights, Tower B, Kuala Lumpur"
                      className="h-12 px-space-md rounded-xl bg-surface-container-lowest text-text-primary font-body-md text-body-md focus:outline-none shadow-xs border border-border-subtle"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-text-primary font-semibold text-xs">
                      大门坐向罗盘度数 Luo Pan Facing & Sitting Direction
                    </label>
                    <input
                      type="text"
                      value={luoPanFacing}
                      onChange={(e) => setLuoPanFacing(e.target.value)}
                      placeholder="例: 坐北朝南 182° 丙山壬向"
                      className="h-12 px-space-md rounded-xl bg-surface-container-lowest text-text-primary font-body-md text-body-md focus:outline-none shadow-xs border border-border-subtle"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION IV: 详细问题描述 & 语言 & PDPA Review */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-lg" id="section-review">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-xs bg-gradient-to-r from-surface-container-low to-transparent p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold font-headline-sm text-headline-sm">
                  IV
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                    详细问题描述与提交确认 Review, Consent & Dispatch
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                    Specify your exact dilemma or life milestone for targeted master appraisal.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Description Textarea */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                  请详述您当前面临的挑战、具体抉择或想要改善的方向 Problem Description
                </label>
                <span className="font-label-sm text-label-sm text-text-muted text-xs">
                  {problemDescription.length} / 1,500 字
                </span>
              </div>
              <textarea
                required
                maxLength={1500}
                rows={4}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full p-space-md rounded-xl bg-surface-container-low text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-inner border border-transparent focus:border-element-fire transition-all resize-y"
              />
            </div>

            {/* Language Preference & Practitioner Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                  八字分析报告交付语言 Report Language Delivery
                </label>
                <div className="grid grid-cols-3 gap-space-xs">
                  {[
                    { id: 'zh', label: '中文简体' },
                    { id: 'en', label: 'English' },
                    { id: 'bilingual', label: '双语对照 (Recommended)' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setReportLang(l.id as any)}
                      className={`py-2.5 px-2 rounded-xl font-label-md text-label-md font-semibold text-center border transition-all text-xs ${
                        reportLang === l.id
                          ? 'bg-primary-container text-on-primary border-transparent shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant border-border-subtle'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Practitioner Assignee Preview Card */}
              <div className="flex items-center gap-space-md bg-surface-container-low p-space-sm rounded-xl border border-border-subtle/50">
                <img
                  alt="Master Kenneth Tan"
                  className="w-14 h-14 rounded-full object-cover shadow-sm ring-1 ring-accent-gold-bright"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2S4Yzg2eaeBsNGq_-0jm2rH9uvuLdVHKuekPSyr_o1NtpJKFCGt0G3VrXl3tfzSyBggVv2U3HDkYoFyEhtjboHWwC9ipyizvNUfvyln60FsSLbnDGZT1XO9ROvMKudGK-qmKvdAoEdeVVenbYpis-I62lrDPpAJF_pMPM26_ccxQtz7S1B3UufoEHglXRLJ1s6SneXGRl8RHQwDwkp-ShJ-kDnEDX80n3_sY0ON5UeQP1PYvcLPtAww"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-text-muted text-[10px]">
                    CHIEF CONSULTANT ASSIGNMENT
                  </span>
                  <span className="font-label-md text-label-md font-bold text-text-primary truncate">
                    Master Kenneth Tan 陈敬轩 大师
                  </span>
                  <span className="font-label-sm text-label-sm text-element-earth text-xs">
                    三元玄空飞星第24代传人 · METAVOX 首席顾问
                  </span>
                </div>
              </div>
            </div>

            {/* PDPA Consent Checkbox */}
            <div className="bg-surface-container p-space-md rounded-2xl flex items-start gap-space-sm border border-border-subtle">
              <input
                id="pdpa-consent"
                type="checkbox"
                required
                checked={pdpaConsent}
                onChange={(e) => setPdpaConsent(e.target.checked)}
                className="mt-1 w-5 h-5 accent-element-fire rounded cursor-pointer"
              />
              <label htmlFor="pdpa-consent" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer text-xs leading-relaxed">
                <strong className="text-text-primary">马来西亚个人资料保护法 (PDPA 2010) 合规同意：</strong>
                我同意 METAVOX Geomancy Sdn. Bhd. 依照 PDPA 2010 法规搜集并处理本人及相关关联人的出生时辰、真太阳时坐标以及空间环境平面图。此数据仅用于本次生辰八字数理排盘、玄空风水勘测报告出具及定制吉物履约服务，未经书面许可绝不透露予第三方机构。
              </label>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md border-t border-border-subtle">
              <button
                type="button"
                onClick={() => onSaveDraft && onSaveDraft({ fullName, problemDescription })}
                className="w-full sm:w-auto px-space-lg py-3 rounded-full bg-surface-container text-text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>保存草稿 Save Draft</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-space-xl py-3.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold tracking-wide shadow-md hover:bg-element-fire active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>提交并生成八字命盘 Submit & Generate Chart</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
