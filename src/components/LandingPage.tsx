import React, { useState } from 'react';

interface LandingPageProps {
  onStartReading: () => void;
  onExploreModule: (moduleType: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartReading, onExploreModule }) => {
  const [quickName, setQuickName] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartReading();
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION: Architectural Deep Monolith with Celestial Bagua Rings */}
      <section className="relative w-full -mt-20 overflow-hidden bg-text-primary text-on-error pt-32 pb-24 lg:pt-40 lg:pb-32 px-margin-mobile lg:px-margin">
        {/* Ambient Celestial Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
          <svg
            className="absolute -right-32 -top-32 w-[720px] h-[720px] lg:w-[980px] lg:h-[980px] text-element-fire/15"
            fill="none"
            viewBox="0 0 800 800"
          >
            <circle cx="400" cy="400" r="390" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1" />
            <circle cx="400" cy="400" r="310" stroke="currentColor" strokeDasharray="12 12" strokeWidth="1.5" />
            <circle cx="400" cy="400" opacity="0.6" r="230" stroke="currentColor" strokeWidth="1" />
            <circle cx="400" cy="400" r="150" stroke="currentColor" strokeDasharray="2 6" strokeWidth="2" />
            <path
              d="M400 10 L400 790 M10 400 L790 400 M124 124 L676 676 M124 676 L676 124"
              opacity="0.4"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </svg>
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-element-fire/10 blur-[120px]"></div>
          <div className="absolute -bottom-20 right-1/3 w-[500px] h-[500px] rounded-full bg-secondary-fixed-dim/10 blur-[140px]"></div>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left Column: Editorial Manifesto & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full bg-surface-container-highest/20 backdrop-blur-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-element-fire animate-ping"></span>
              <span className="w-2 h-2 -ml-3 rounded-full bg-element-fire"></span>
              <span className="font-label-sm text-label-sm text-surface-variant uppercase tracking-widest text-[11px]">
                Period 9 Li Qi Metaphysics · 离九运火局
              </span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-surface-muted/80 tracking-widest uppercase">
                Geomantic Algorithmic Architecture
              </span>
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero leading-tight text-surface-base font-semibold tracking-tight">
                ALIGN YOUR DESTINY,{' '}
                <span className="text-element-fire drop-shadow-[0_0_28px_rgba(255,124,53,0.55)]">
                  PROSPER.
                </span>
                <br />
                <span className="font-headline-lg text-headline-md lg:text-headline-lg text-surface-container-high font-normal">
                  顺应天命，启耀繁盛。
                </span>
              </h1>
            </div>

            <p className="font-body-lg text-body-lg text-surface-variant/90 max-w-2xl leading-relaxed">
              Malaysia's premier algorithmic BaZi engine & Gemini-powered Feng Shui consultancy.
              Deterministic solar term calculations paired with certified master verification under strict
              ISO-grade precision.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs">
              <button
                onClick={onStartReading}
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-4 rounded-full bg-element-fire text-on-error font-headline-sm text-headline-sm tracking-wide shadow-[0_8px_32px_rgba(255,124,53,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-200 font-semibold"
              >
                <span>立即开始排盘测算 · Start Free BaZi</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-4 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/15 backdrop-blur-md text-surface-base font-label-md text-label-md tracking-wider border border-white/10 transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-lg text-accent-gold-bright">schema</span>
                <span>查看计算原理 · How It Works</span>
              </a>
            </div>

            {/* Coordinates Metrology Stamp */}
            <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs pt-space-sm font-label-sm text-label-sm text-surface-muted/70">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-element-fire">verified</span> True Solar Time GMT+8
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-element-fire">my_location</span> Peninsular & East Malaysia Ephemeris
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-element-fire">lock</span> PDPA 2010 Cryptographic Vault
              </span>
            </div>
          </div>

          {/* Right Column: Translucent Glass Verification Module */}
          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="relative rounded-2xl p-space-lg lg:p-space-xl bg-surface-container-lowest/10 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex flex-col gap-space-lg">
              {/* Glass Panel Header */}
              <div className="flex items-center justify-between pb-space-md border-b border-white/10 -mx-space-lg -mt-space-lg lg:-mx-space-xl lg:-mt-space-xl p-space-md rounded-t-2xl bg-white/5">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-accent-gold-bright">vital_signs</span>
                  <span className="font-label-sm text-label-sm text-surface-base uppercase tracking-widest text-[11px] font-semibold">
                    METAVOX Real-Time Matrix
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-element-wood/30 text-surface-base font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-element-wood animate-pulse"></span>
                  <span>Node Active</span>
                </div>
              </div>

              {/* 4 Live Verifiable Indicators */}
              <div className="grid grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-0.5 p-space-md rounded-xl bg-surface-container-lowest/5 border border-white/5">
                  <span className="font-display-hero text-headline-lg lg:text-headline-lg text-element-fire font-semibold tracking-tight">
                    12,840+
                  </span>
                  <span className="font-label-md text-label-md text-surface-base font-medium">测算案例</span>
                  <span className="font-label-sm text-label-sm text-surface-muted text-xs">Completed Readings</span>
                </div>
                <div className="flex flex-col gap-0.5 p-space-md rounded-xl bg-surface-container-lowest/5 border border-white/5">
                  <span className="font-display-hero text-headline-lg lg:text-headline-lg text-accent-gold-bright font-semibold tracking-tight">
                    Period 9
                  </span>
                  <span className="font-label-md text-label-md text-surface-base font-medium">九运火局</span>
                  <span className="font-label-sm text-label-sm text-surface-muted text-xs">Current 20-Yr Cycle</span>
                </div>
                <div className="flex flex-col gap-0.5 p-space-md rounded-xl bg-surface-container-lowest/5 border border-white/5">
                  <span className="font-display-hero text-headline-lg lg:text-headline-lg text-surface-base font-semibold tracking-tight">
                    10
                  </span>
                  <span className="font-label-md text-label-md text-surface-base font-medium">专业解决领域</span>
                  <span className="font-label-sm text-label-sm text-surface-muted text-xs">Consultation Domains</span>
                </div>
                <div className="flex flex-col gap-0.5 p-space-md rounded-xl bg-surface-container-lowest/5 border border-white/5">
                  <span className="font-display-hero text-headline-lg lg:text-headline-lg text-element-wood font-semibold tracking-tight">
                    100%
                  </span>
                  <span className="font-label-md text-label-md text-surface-base font-medium">节气严谨</span>
                  <span className="font-label-sm text-label-sm text-surface-muted text-xs">True Solar Li Chun</span>
                </div>
              </div>

              {/* Micro Chart: Five-Element Equilibrium Monitor */}
              <div className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-lowest/5 border border-white/5">
                <div className="flex justify-between items-center text-surface-base font-label-sm text-label-sm">
                  <span>Today's Cosmic Resonance (Kuala Lumpur)</span>
                  <span className="text-element-fire font-medium">丙午日 · Fire Dominant</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-container-highest/20 overflow-hidden flex">
                  <div className="h-full bg-element-wood w-[22%]" title="Wood 木 22%"></div>
                  <div className="h-full bg-element-fire w-[38%]" title="Fire 火 38%"></div>
                  <div className="h-full bg-element-earth w-[16%]" title="Earth 土 16%"></div>
                  <div className="h-full bg-element-metal w-[14%]" title="Metal 金 14%"></div>
                  <div className="h-full bg-element-water w-[10%]" title="Water 水 10%"></div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-surface-muted text-[10px] pt-1">
                  <span>木 Wood 22%</span>
                  <span>火 Fire 38%</span>
                  <span>土 Earth 16%</span>
                  <span>金 Metal 14%</span>
                  <span>水 Water 10%</span>
                </div>
              </div>

              {/* Master Verification Signature Tag */}
              <div className="flex items-center gap-space-sm pt-space-xs border-t border-white/10">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-accent-gold-bright"
                  alt="Master Leng"
                  src="/leng_master_avatar.jpg"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-surface-base font-semibold">
                    Master Leng (创始人 · Founder)
                  </span>
                  <span className="font-label-sm text-label-sm text-surface-muted text-xs">
                    紫微斗数 · 居家风水 · “知命而行，安心而居”
                  </span>
                </div>
                <span className="material-symbols-outlined ml-auto text-accent-gold-bright text-2xl">
                  verified_user
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 'Your Life Is Not A Standard Chart / 命格如指纹，因人而异' */}
      <section className="w-full py-space-xl lg:py-28 px-margin-mobile lg:px-margin bg-surface-warm">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-space-lg">
          <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest text-[11px] font-semibold">
            <span className="material-symbols-outlined text-sm text-element-fire">fingerprint</span>
            <span>Deterministic Individuality</span>
          </div>

          <div className="flex flex-col gap-space-xs max-w-3xl">
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-text-primary font-semibold">
              命格如指纹，因人而异
              <br />
              <span className="font-headline-md text-headline-sm lg:text-headline-md text-tertiary font-normal">
                Your Life Is Not A Standard Chart
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-space-xs">
              Universal horoscope columns fail because destiny is a multi-dimensional intersection of your birth coordinate, exact lunar minute, and residential magnetic spatial axes. We decode the distinct elemental blueprint unique to only you.
            </p>
          </div>

          {/* Scattered Floating Interactive Preview Matrix */}
          <div className="flex flex-wrap justify-center items-center gap-space-md max-w-4xl pt-space-sm">
            <div className="flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-border-subtle text-text-primary hover:shadow-md transition-shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-element-fire"></span>
              <span className="font-label-md text-label-md font-semibold">阳宅气场 Home Qi Resonance</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-border-subtle text-text-primary hover:shadow-md transition-shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-gold-bright"></span>
              <span className="font-label-md text-label-md font-semibold">商业财运 Wealth Luck & Liquidity</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-border-subtle text-text-primary hover:shadow-md transition-shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-element-water"></span>
              <span className="font-label-md text-label-md font-semibold">姻缘调和 Marriage Harmonization</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-border-subtle text-text-primary hover:shadow-md transition-shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-element-wood"></span>
              <span className="font-label-md text-label-md font-semibold">职场晋升 Career Trajectory Timing</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-border-subtle text-text-primary hover:shadow-md transition-shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-element-earth"></span>
              <span className="font-label-md text-label-md font-semibold">大运交替 10-Year Pillar Inflections</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3 Interactive Tall Category Focus Cards */}
      <section className="w-full py-space-xl lg:py-28 px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-element-fire font-bold uppercase tracking-widest text-[11px]">
                Targeted Geomancy Solutions
              </span>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-text-primary font-semibold">
                专项咨询矩阵与命理突破
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Focus your inquiry through mathematical rigor tailored to high-stakes life decisions.
              </p>
            </div>
            <button
              onClick={onStartReading}
              className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>Explore All 10 Consultation Modules</span>
              <span className="material-symbols-outlined text-base">east</span>
            </button>
          </div>

          {/* 3 Tall Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1: Wealth & Career */}
            <div className="flex flex-col justify-between p-space-lg lg:p-space-xl rounded-2xl bg-surface-base shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="flex flex-col gap-space-md">
                <div className="flex justify-between items-center">
                  <span className="font-headline-sm text-headline-sm text-accent-gold-bright font-semibold">
                    I · 财业
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-accent-gold-bright/15 text-secondary font-label-sm text-label-sm font-semibold">
                    Metal / Water Flow
                  </span>
                </div>
                <div className="h-44 rounded-xl overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Wealth and career setting in Kuala Lumpur"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsceQh_ivISYjEO8S5hY66nVOrT9LjY-R607zrSf8KCJVN8mYsDkRs-ib2pyyqDsQ2rtkpMe7zjMq_enIFas612-TyblRr1l81S9tfil_2RQwSyqdab7fQEq-3LcZKmGaqDjg-5uQRcBTyBd6z5xbTEevn1kxJ_DgR3QL4DkasJfXEg_d5NelfjhjMVrvS2SnbulH8Ryf7u9rvFz7kJWgDFa1AllbLqabbOzMPVw9aQmqeJONbZKuW0Q"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/75 via-transparent to-transparent flex items-end p-space-md">
                    <span className="font-label-sm text-label-sm text-on-error uppercase tracking-wider text-xs font-semibold">
                      Enterprise & Capital Positioning
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-md text-headline-sm text-text-primary font-semibold">
                    财运 & 事业 · Wealth & Career
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Pinpoint your authentic wealth star (正财/偏财) within the natal matrix. Discover favorable expansion periods, opportune partnership archetypes, and geographical vectors for maximum liquidity.
                  </p>
                </div>
                <ul className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Favorable industry element assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>5-Year financial cashflow inflection roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Angel investor & partner BaZi synastry</span>
                  </li>
                </ul>
              </div>
              <div className="pt-space-lg">
                <button
                  onClick={() => onExploreModule('wealth')}
                  className="w-full py-3 rounded-full bg-surface-container-high hover:bg-element-fire hover:text-on-error text-text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>预约此项分析 · Begin</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: Marriage & Harmony */}
            <div className="flex flex-col justify-between p-space-lg lg:p-space-xl rounded-2xl bg-surface-base shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="flex flex-col gap-space-md">
                <div className="flex justify-between items-center">
                  <span className="font-headline-sm text-headline-sm text-element-fire font-semibold">
                    II · 姻缘
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-element-fire/15 text-primary-container font-label-sm text-label-sm font-semibold">
                    Spouse Palace (日支)
                  </span>
                </div>
                <div className="h-44 rounded-xl overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Marriage and domestic tranquility"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWnALBOuHawWMq_3v6PYfEl6dkwLSySLZQ_SStRS3_H1UlKgobdh3a0-6ATCOZ9SL1hRErr8obEI9onie6zmqkqUSeZjgBAs4mjpeo1V9hm0CQvzDD8o5DA-uAopZx8QASnN_dCbJp4E9mjLbriJY4617DN5GY-0Hny0GrLdnw_SZff_3bIwYpHOnrjJkktFN6-Oq5A4wKOeC3uOTN9SQFY_d0VblojN4Zev30ZrxFxnod72XeTBeqaA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/75 via-transparent to-transparent flex items-end p-space-md">
                    <span className="font-label-sm text-label-sm text-on-error uppercase tracking-wider text-xs font-semibold">
                      Relational Energetics
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-md text-headline-sm text-text-primary font-semibold">
                    姻缘 & 家庭 · Marriage & Harmony
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Harmonize the spouse palace. Analyze relational clashing pillars (子午相冲, 寅巳申三刑), prospective wedding date selection, and bedroom energy vortexes to cultivate lasting equilibrium.
                  </p>
                </div>
                <ul className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Two-chart astrological synastry & clashing roots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Spouse palace conflict de-escalation remedies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Favorable union & commitment year windows</span>
                  </li>
                </ul>
              </div>
              <div className="pt-space-lg">
                <button
                  onClick={() => onExploreModule('relationship')}
                  className="w-full py-3 rounded-full bg-surface-container-high hover:bg-element-fire hover:text-on-error text-text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>预约此项分析 · Begin</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 3: Home & Office Feng Shui */}
            <div className="flex flex-col justify-between p-space-lg lg:p-space-xl rounded-2xl bg-surface-base shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border-subtle hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="flex flex-col gap-space-md">
                <div className="flex justify-between items-center">
                  <span className="font-headline-sm text-headline-sm text-element-wood font-semibold">
                    III · 堪舆
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-element-wood/15 text-element-wood font-label-sm text-label-sm font-semibold">
                    San Yuan Xuan Kong
                  </span>
                </div>
                <div className="h-44 rounded-xl overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="San Yuan Flying Star Feng Shui space"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6na6mP4bJQXYbBVBXuQmdoGjWu1V6CH48EyjphzpHm9vcEteotgurm24XU25j-wCEBl5W1HxwzMv92IfKok-_ZBdKhnjMx6FRS5WWvGxN8mEEurza9bwMQ-Z-Ja77C7GDqASDrGYJcO2qQxM5WsxLh-CSoBl4RSSJJXMrqxmJ92-2kLKlK74eVFyhWOrhdWsfAjfwZD1x90rrb9ZFLUHb_6bXzE03ARzTLK2B8haHwP373Wr2RiLwNQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/75 via-transparent to-transparent flex items-end p-space-md">
                    <span className="font-label-sm text-label-sm text-on-error uppercase tracking-wider text-xs font-semibold">
                      Spatial Flying Star Alignment
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-md text-headline-sm text-text-primary font-semibold">
                    阳宅 & 办公室 · Home & Office Feng Shui
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Period 9 Flying Star (九运玄空飞星) audit for residences and corporate headquarters. Precision door alignments, cashier positions, water feature activation, and energetic sha elimination.
                  </p>
                </div>
                <ul className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Period 9 South/North energetic axis optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Cashier & main foyer Qi collector placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-element-fire">check_circle</span>
                    <span>Digital on-site master inspection with CAD review</span>
                  </li>
                </ul>
              </div>
              <div className="pt-space-lg">
                <button
                  onClick={() => onExploreModule('fengshui_home')}
                  className="w-full py-3 rounded-full bg-surface-container-high hover:bg-element-fire hover:text-on-error text-text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>预约此项分析 · Begin</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: '4-Step Implementation Process / 严谨测算流程' */}
      <section className="w-full py-space-xl lg:py-28 px-margin-mobile lg:px-margin bg-surface-warm" id="how-it-works">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col items-center text-center gap-space-xs max-w-2xl mx-auto">
            <span className="font-label-sm text-label-sm text-element-fire font-bold uppercase tracking-widest text-[11px]">
              End-to-End Methodology
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-text-primary font-semibold">
              严谨测算流程 · 4-Step Process
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Where pure deterministic astronomical calculations meet the intuitive discernment of certified lineage practitioners.
            </p>
          </div>

          {/* 4 Horizontal Process Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter relative">
            {/* Step 1 */}
            <div className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-subtle relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-display-hero text-headline-lg text-element-fire/30 font-bold">01</span>
                <span className="material-symbols-outlined text-element-fire text-2xl">calendar_month</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                  Step I · Input
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  农历输入 · Birth Data
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Enter Gregorian or Lunar birth date. Automated leap month verification and solar time engine calculates true shichen based on your exact Malaysian birth location.
              </p>
              <div className="mt-auto pt-space-xs">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-element-wood font-medium">
                  <span className="material-symbols-outlined text-xs">tune</span> Automatic Solar Conversion
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-subtle relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-display-hero text-headline-lg text-accent-gold-bright/30 font-bold">02</span>
                <span className="material-symbols-outlined text-accent-gold-bright text-2xl">calculate</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                  Step II · Computational Engine
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  严密排盘 · Four Pillars
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Precision ephemeris generation based on Li Chun boundary. Computes Four Pillars (四柱), Ten Gods (十神), Hidden Stems (藏干), and current 10-Year Major Luck Cycles (大运).
              </p>
              <div className="mt-auto pt-space-xs">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-accent-gold-bright font-medium">
                  <span className="material-symbols-outlined text-xs">memory</span> Deterministic Algorithm
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-subtle relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-display-hero text-headline-lg text-element-water/30 font-bold">03</span>
                <span className="material-symbols-outlined text-element-water text-2xl">psychology</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                  Step III · Dual Review
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  智能与大师复审 · Synthesis
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Gemini structured reasoning surfaces elemental clashing vectors, cross-referenced and signed off by certified Malaysian senior practitioners before advisory issuance.
              </p>
              <div className="mt-auto pt-space-xs">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-element-water font-medium">
                  <span className="material-symbols-outlined text-xs">verified</span> Dual Peer-Checked
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-subtle relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-display-hero text-headline-lg text-element-wood/30 font-bold">04</span>
                <span className="material-symbols-outlined text-element-wood text-2xl">local_shipping</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                  Step IV · Deployment
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  吉物落地与追踪 · Remedies
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Tangible implementation plan. High-frequency natural crystals, specific spatial orientation guides, and consecrated remediation tools delivered straight to your door.
              </p>
              <div className="mt-auto pt-space-xs">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-element-wood font-medium">
                  <span className="material-symbols-outlined text-xs">package_2</span> Tracked Doorstep Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Live Interactive Demo Preview Pill Bar */}
          <div className="p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-element-fire/10 flex items-center justify-center text-element-fire shrink-0">
                <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  Instant BaZi Chart Sandbox
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Preview how the Four Pillars render with our live engine right now.
                </span>
              </div>
            </div>
            <button
              onClick={onStartReading}
              className="px-space-lg py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-element-fire active:scale-95 transition-all shadow-[0_4px_16px_rgba(255,124,53,0.2)]"
            >
              Open Calculation Terminal
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: Trust, Authority & Malaysian Compliance */}
      <section className="w-full py-space-xl lg:py-28 px-margin-mobile lg:px-margin bg-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col items-center text-center gap-space-xs max-w-2xl mx-auto">
            <span className="font-label-sm text-label-sm text-element-wood font-bold uppercase tracking-widest text-[11px]">
              Authority & Credibility
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-text-primary font-semibold">
              马来西亚权威认证与真实口碑
              <br />
              <span className="font-headline-md text-headline-sm lg:text-headline-md text-tertiary font-normal">
                Certified Lineage & Verified Outcomes
              </span>
            </h2>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-warm border border-border-subtle">
              <span className="material-symbols-outlined text-3xl text-accent-gold-bright mb-2">workspace_premium</span>
              <span className="font-label-md text-label-md text-text-primary font-semibold">Certified Geomancers</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Malaysian Feng Shui Society</span>
            </div>
            <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-warm border border-border-subtle">
              <span className="material-symbols-outlined text-3xl text-element-fire mb-2">shield</span>
              <span className="font-label-md text-label-md text-text-primary font-semibold">PDPA 2010 Protected</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Zero-Knowledge Data Vault</span>
            </div>
            <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-warm border border-border-subtle">
              <span className="material-symbols-outlined text-3xl text-element-water mb-2">military_tech</span>
              <span className="font-label-md text-label-md text-text-primary font-semibold">30+ Years Lineage</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Authentic San Yuan Heritage</span>
            </div>
            <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-warm border border-border-subtle">
              <span className="material-symbols-outlined text-3xl text-element-wood mb-2">balance</span>
              <span className="font-label-md text-label-md text-text-primary font-semibold">Transparent Pricing</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">No Hidden Religious Coercion</span>
            </div>
          </div>

          {/* Founder Master Leng Authority Showcase */}
          <div className="rounded-3xl bg-gradient-to-br from-surface-warm via-surface-base to-accent-gold-bright/10 p-space-lg md:p-space-xl border-2 border-accent-gold-bright/40 shadow-lg flex flex-col lg:flex-row items-center gap-space-xl">
            <div className="relative shrink-0 group">
              <div className="w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-accent-gold-bright bg-gradient-to-b from-[#251b18] via-[#1a1311] to-[#0e0c0b] flex items-end justify-center relative p-1.5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
                <img
                  src="/founder-cutout.png"
                  alt="Master Leng 手持罗盘真实照片"
                  className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-element-fire text-on-primary px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 ring-2 ring-white">
                <span className="material-symbols-outlined text-sm">verified</span>
                馆主 · 创办人
              </div>
            </div>

            <div className="flex flex-col gap-space-sm flex-1 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-element-fire text-on-primary font-label-sm text-label-sm font-bold text-xs uppercase tracking-wider shadow-xs">
                  Founder & Principal Geomancer · 创办人领衔
                </span>
                <span className="text-secondary font-semibold text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-gold-bright/20 border border-accent-gold-bright/30">
                  紫微斗数 · 居家风水 · 三元玄空
                </span>
              </div>

              <h3 className="font-headline-md text-headline-sm md:text-headline-md text-text-primary font-bold flex items-center gap-2">
                <span>Master Leng</span>
              </h3>

              <div className="p-3 bg-surface-container-low/80 rounded-xl border border-border-subtle/80 text-sm font-medium text-text-primary italic">
                “知命而行，安心而居。听得懂，心才会定。”
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                本应用创办人 Master Leng 驻所马来西亚马六甲，深耕紫微斗数命盘推演与现代居家纳气环境学。坚持用平实质朴、切中生活的语言解析命理玄机，拒绝故弄玄虚与繁琐强迫，引导每一位有缘人厘清人生关键抉择、构建舒适宜居的能量磁场。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border-subtle/60 text-xs">
                <div className="flex items-center gap-1.5 text-text-primary">
                  <span className="material-symbols-outlined text-element-fire text-base">location_on</span>
                  <span>驻所: 27, Jalan AP10, Taman Ara Permai, Batu Berendam, Melaka</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-primary">
                  <span className="material-symbols-outlined text-element-earth text-base">chat</span>
                  <span>WhatsApp: <a href="https://wa.me/60165205364" target="_blank" rel="noopener noreferrer" className="text-element-fire font-bold hover:underline">016-520 5364</a></span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://founder-profile-gold.lengengchee.chatgpt.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-highest hover:bg-surface-container text-text-primary font-label-md text-xs font-semibold border border-border-subtle hover:border-element-fire transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm text-element-fire">public</span>
                  <span>访问创办人 Master Leng 官方介绍页 ↗</span>
                </a>
                <a
                  href="https://wa.me/60165205364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container hover:bg-element-fire text-on-primary font-label-md text-xs font-semibold transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>直接 WhatsApp 预约 Master Leng</span>
                </a>
              </div>
            </div>
          </div>

          {/* Distinguished Senior Consultant Master Raymond Tang Showcase (Different Person) */}
          <div className="rounded-2xl bg-surface-base p-space-md md:p-space-lg border border-border-subtle flex flex-col md:flex-row items-center gap-space-lg">
            <div className="relative shrink-0">
              <div className="w-28 md:w-32 aspect-square rounded-2xl overflow-hidden shadow-md ring-2 ring-primary-container/40">
                <img
                  src="/raymond_tang_portrait.jpg"
                  alt="Master Raymond Tang 郑道长"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                特邀顾问
              </div>
            </div>
            <div className="flex flex-col gap-1 text-left flex-1">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-sm font-bold text-text-primary">
                  Master Raymond Tang (郑道长)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-semibold text-text-muted">
                  三元玄空飞星第24代传人 · 特邀资深顾问
                </span>
              </div>
              <p className="font-body-sm text-xs text-text-muted leading-relaxed">
                精研三元九运离火大局与真太阳时天文学经度推算，与林师父联合复核把关排盘算法与高层阳宅纳气逻辑，确保每份测算兼备古法严谨与现代算法精准。
              </p>
            </div>
          </div>

          {/* Testimonials Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-space-xs">
            {/* Testimonial 1 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent-gold-bright">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-xs">
                    Tech Founder · Bangsar
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  "METAVOX cleared up the ambiguity that traditional fortune tellers gave me. Master Raymond used the Period 9 framework to reposition our corporate entrance in Mid Valley. Within 4 months, our Series A round closed smoothly."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md border-t border-border-subtle/50 mt-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Marcus Liew"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOUOyk3sCxV3lKYFr41LhBo46RSi-hzbteCoN9a330yJB9uN81i2x1JFgYWDuzRi9MyZo8Qvy3S-7Zv70jHbyzC1Bu0fEQHbZZrZdWyO4X-1jSUpiuzroBLOfcxRTuj6L8cyfzCyecM1Yxq3-A5PE4hdizKxGUtwruLDohCZwcOxu1W9qWsYsNyiYuH-3_EuNebEEhASq7yTzSOT6InneCe_fg6NCbJav8eMqmIL_qL0mmhdyuILaZnA"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-text-primary font-semibold">Marcus Liew (刘振豪)</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Managing Director, FinTech Horizon</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent-gold-bright">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-xs">
                    Homeowner · Mont Kiara
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  "The digital CAD report pinpointed why my husband and I felt perpetually exhausted after shifting to our new condominium. The Flying Star 2-5 sickness star was right in the kitchen. The remediation suggestions were tasteful and non-intrusive."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md border-t border-border-subtle/50 mt-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Elena Tan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX3W_uTRVUmo2_tzc8FEV6WmfMjmO5XgeDvr-o_EqsOyBNW51wlhgkffnY3Qtz3-ZmYC08xvfP0Pb0qi9w2BkKPzWbTg7Pf98nAfnwixPU5PYbdMkSZ9Li8BWYA3WGbk2tqEQ52wrFoGQ3WKfG20uZcUo3JABHUPmsY6POL57NB5O4y0Hont4iag-awQKv3_ZY4-lt4EFvTdXh4zUMc4Qp_KQogh4zIXO6EilNvp8yr04nQ6aqp9M71Q"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-text-primary font-semibold">Elena Tan (陈美玲)</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Interior Architect & Homeowner</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-base shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent-gold-bright">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-xs">
                    BaZi Client · Penang
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  "Having the automated True Solar Time recalculation tailored to Penang's coordinates made a night and day difference in my hour pillar (时柱). Finally understood the transition timing of my 10-year luck pillar."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md border-t border-border-subtle/50 mt-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Kelvin Goh"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrfJAARkyK43JEdJst41hpj4awm4cYMkCsoq2uHX4sE8u9OSGqGV96EursZT1K1xVsm_yjxihlm0lf8HYelflLzcC4yDqcPDTkYdNgFPDuCOTIL7Lyh-twx1nFs7s39oTF7oeCpygr7fP1RPerSDWUoaZjNKILauh4DBSMoHdnpaK7IgJbFmmNm444HPtHPZ2cejjszAT72rV9lHiVItbw4k79aMN6ebnkzxO0iTPXxV_1Dp37c6wqfA"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-text-primary font-semibold">Kelvin Goh (吴宇恒)</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Venture Associate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Final High-Impact Conversion Band */}
      <section className="w-full py-space-xl lg:py-28 px-margin-mobile lg:px-margin bg-text-primary text-on-error relative overflow-hidden">
        {/* Ambient Gold & Solar Fire Gradients */}
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-element-fire/15 blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-accent-gold-bright/15 blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center gap-space-lg">
          <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-highest/20 backdrop-blur-xl text-surface-base font-label-sm text-label-sm uppercase tracking-widest text-[11px] font-semibold border border-white/10">
            <span className="w-2 h-2 rounded-full bg-element-fire"></span>
            <span>Deterministic Blueprint Ready in 60 Seconds</span>
          </div>

          <div className="flex flex-col gap-space-xs max-w-3xl">
            <h2 className="font-display-hero text-headline-lg lg:text-display-hero leading-tight text-surface-base font-semibold tracking-tight">
              LET'S TALK ABOUT YOUR FORTUNE, SPECIFICALLY.
              <br />
              <span className="text-element-fire">开启专属您的运势解析</span>
            </h2>
            <p className="font-body-lg text-body-lg text-surface-variant/90 leading-relaxed pt-space-xs">
              Stop navigating major financial, career, and spatial decisions in the dark. Receive a verified, actionable Four Pillars dossier paired with certified master verification today.
            </p>
          </div>

          {/* Conversion Interactive Widget Pill */}
          <form
            onSubmit={handleQuickSubmit}
            className="w-full max-w-xl p-2 rounded-2xl bg-surface-container-lowest/10 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-space-md py-3 w-full rounded-xl bg-surface-container-lowest/10 text-surface-base font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-element-fire text-base">person</span>
              <input
                className="bg-transparent text-surface-base placeholder-surface-muted/60 focus:outline-none w-full font-body-sm text-body-sm"
                placeholder="您的姓名 / Your Preferred Name"
                type="text"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-space-xl py-3.5 rounded-xl bg-element-fire text-on-error font-headline-sm text-headline-sm tracking-wide shadow-[0_4px_20px_rgba(255,124,53,0.35)] hover:scale-105 active:scale-95 transition-transform duration-200 whitespace-nowrap flex items-center justify-center gap-2 font-semibold"
            >
              <span>立即测算</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-space-lg text-surface-muted/70 font-label-sm text-label-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-element-wood">check</span> Free Instant Natal Assessment
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-element-wood">check</span> Zero Spam Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-element-wood">check</span> PDPA 2010 Encryption
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
