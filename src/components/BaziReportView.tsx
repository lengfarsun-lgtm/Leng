import React from 'react';
import { BaziReport } from '../types';

interface BaziReportViewProps {
  report: BaziReport;
  onPrint?: () => void;
}

export const BaziReportView: React.FC<BaziReportViewProps> = ({ report, onPrint }) => {
  const { fourPillars } = report;

  const handleDownloadPdf = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Atmospheric Glow Backdrop */}
      <div className="relative w-full max-w-[1280px] mx-auto px-margin-mobile lg:px-margin pb-space-xl flex flex-col gap-space-lg">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-element-fire/10 via-accent-gold-bright/10 to-element-water/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* 0. Top Diagnostic Status Bar & Executive Breadcrumb */}
        <section className="w-full bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-2 bg-surface-container-low px-space-sm py-1 rounded-full border border-border-subtle/50">
              <span className="w-2 h-2 rounded-full bg-element-fire animate-ping"></span>
              <span className="font-label-sm text-label-sm text-text-primary tracking-wider font-semibold text-xs">
                REPORT #{report.id}
              </span>
            </div>
            <div className="h-4 w-px bg-surface-muted hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                {report.clientName}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {report.clientNameEn}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface text-xs font-medium">
                {report.gender === 'female' ? '女 Female · 坤造' : '男 Male · 乾造'}
              </span>
            </div>
            <div className="h-4 w-px bg-surface-muted hidden md:block"></div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-space-sm text-on-surface-variant font-label-md text-label-md text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-element-fire">calendar_today</span>
                公历: {report.solarBirthDate}
              </span>
              <span className="text-text-muted hidden sm:inline">/</span>
              <span className="text-on-surface">农历: {report.lunarBirthDate}</span>
            </div>
          </div>

          {/* Action & Stamp Verification */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-element-wood/10 text-element-wood font-label-sm text-label-sm font-semibold shadow-xs">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span>已由管理师复核 · Approved & Released</span>
            </div>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-space-md py-2 rounded-full bg-text-primary text-surface-base font-label-md text-label-md shadow-md hover:bg-element-fire active:scale-95 transition-all text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>下载高清报告 (PDF)</span>
            </button>
          </div>
        </section>

        {/* 1. BaZi 4 Pillars Core Analytical Grid */}
        <section className="w-full flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-element-fire/15 text-element-fire font-label-sm text-label-sm font-bold uppercase tracking-widest text-[11px]">
                  Core Metaphysics Engine
                </span>
                <span className="text-text-muted font-label-sm text-label-sm text-xs">
                  四柱八字核心天盘 · 真太阳时校正
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary mt-1">
                天干地支四柱排盘矩阵
              </h2>
            </div>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant text-xs">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-element-metal"></span>金
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-element-wood"></span>木
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-element-water"></span>水
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-element-fire"></span>火
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-element-earth"></span>土
            </div>
          </div>

          {/* Four Pillars Card Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 1: 时柱 Hour */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute -right-4 -bottom-4 font-headline-lg text-headline-lg text-surface-container-high/60 select-none pointer-events-none font-bold">
                IV
              </div>
              <div className="flex items-center justify-between pb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-bold text-xs">
                  {fourPillars.hour.nameZh} · {fourPillars.hour.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant text-xs">
                  晚运 / 事业归宿
                </span>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium text-xs">
                    {fourPillars.hour.tenGodZh} ({fourPillars.hour.tenGodEn})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-element-wood/15 text-element-wood font-label-sm text-label-sm text-xs font-semibold">
                    {fourPillars.hour.stemElementZh}
                  </span>
                </div>
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-wood">
                    {fourPillars.hour.stemZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 tracking-widest text-xs">
                    {fourPillars.hour.stemPinyin}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-fire">
                    {fourPillars.hour.branchZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 text-xs">
                    {fourPillars.hour.branchPinyin} · {fourPillars.hour.branchZodiacZh} {fourPillars.hour.branchZodiacEn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1 text-xs">
                  <span>支藏: {fourPillars.hour.hiddenStemsZh}</span>
                  <span>{fourPillars.hour.hiddenStemsRolesZh}</span>
                </div>
              </div>
              <div className="pt-space-xs flex flex-col gap-1 bg-surface-container-low/60 p-2 rounded-xl mt-space-xs text-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">纳音五行</span>
                  <span className="font-medium text-text-primary">{fourPillars.hour.naYinZh} {fourPillars.hour.naYinEn}</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">十二长生星运</span>
                  <span className="font-semibold text-element-fire">{fourPillars.hour.changShengZh} {fourPillars.hour.changShengEn}</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: 日柱 Day (Day Master - HIGHLIGHTED) */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-md shadow-md border border-element-fire/40 flex flex-col justify-between overflow-hidden ring-2 ring-element-fire/20">
              <div className="absolute -right-4 -bottom-4 font-headline-lg text-headline-lg text-element-fire/10 select-none pointer-events-none font-bold">
                III
              </div>
              <div className="flex items-center justify-between pb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-element-fire font-bold flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-sm">stars</span> {fourPillars.day.nameZh} · {fourPillars.day.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-element-fire text-on-primary font-label-sm text-label-sm font-semibold text-xs shadow-xs">
                  本命核心元神
                </span>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-element-fire font-semibold text-xs">
                    {fourPillars.day.tenGodZh}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-element-fire/20 text-element-fire font-label-sm text-label-sm font-bold text-xs">
                    {fourPillars.day.stemElementZh}
                  </span>
                </div>
                <div className="flex items-baseline justify-center py-2 bg-element-fire/10 rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-fire">
                    {fourPillars.day.stemZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-element-fire font-semibold ml-2 tracking-widest text-xs">
                    {fourPillars.day.stemPinyin} · 太阳火
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-earth">
                    {fourPillars.day.branchZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 text-xs">
                    {fourPillars.day.branchPinyin} · {fourPillars.day.branchZodiacZh} {fourPillars.day.branchZodiacEn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1 text-xs">
                  <span>支藏: {fourPillars.day.hiddenStemsZh}</span>
                  <span>{fourPillars.day.hiddenStemsRolesZh}</span>
                </div>
              </div>
              <div className="pt-space-xs flex flex-col gap-1 bg-surface-container-low/60 p-2 rounded-xl mt-space-xs text-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">纳音五行</span>
                  <span className="font-medium text-text-primary">{fourPillars.day.naYinZh} {fourPillars.day.naYinEn}</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">十二长生星运</span>
                  <span className="font-semibold text-element-earth">{fourPillars.day.changShengZh} {fourPillars.day.changShengEn}</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: 月柱 Month */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute -right-4 -bottom-4 font-headline-lg text-headline-lg text-surface-container-high/60 select-none pointer-events-none font-bold">
                II
              </div>
              <div className="flex items-center justify-between pb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-bold text-xs">
                  {fourPillars.month.nameZh} · {fourPillars.month.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant text-xs">
                  提纲令神 / 青年运
                </span>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium text-xs">
                    {fourPillars.month.tenGodZh}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-element-water/15 text-element-water font-label-sm text-label-sm text-xs font-semibold">
                    {fourPillars.month.stemElementZh}
                  </span>
                </div>
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-water">
                    {fourPillars.month.stemZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 tracking-widest text-xs">
                    {fourPillars.month.stemPinyin}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-fire">
                    {fourPillars.month.branchZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 text-xs">
                    {fourPillars.month.branchPinyin} · {fourPillars.month.branchZodiacZh} (当令)
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1 text-xs">
                  <span>支藏: {fourPillars.month.hiddenStemsZh}</span>
                  <span>{fourPillars.month.hiddenStemsRolesZh}</span>
                </div>
              </div>
              <div className="pt-space-xs flex flex-col gap-1 bg-surface-container-low/60 p-2 rounded-xl mt-space-xs text-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">纳音五行</span>
                  <span className="font-medium text-text-primary">{fourPillars.month.naYinZh} {fourPillars.month.naYinEn}</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">十二长生星运</span>
                  <span className="font-semibold text-element-fire">{fourPillars.month.changShengZh} {fourPillars.month.changShengEn}</span>
                </div>
              </div>
            </div>

            {/* Pillar 4: 年柱 Year */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute -right-4 -bottom-4 font-headline-lg text-headline-lg text-surface-container-high/60 select-none pointer-events-none font-bold">
                I
              </div>
              <div className="flex items-center justify-between pb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-bold text-xs">
                  {fourPillars.year.nameZh} · {fourPillars.year.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant text-xs">
                  祖荫根基 / 早运
                </span>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium text-xs">
                    {fourPillars.year.tenGodZh} ({fourPillars.year.tenGodEn})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-element-metal/30 text-text-primary font-label-sm text-label-sm text-xs font-semibold">
                    {fourPillars.year.stemElementZh}
                  </span>
                </div>
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    {fourPillars.year.stemZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 tracking-widest text-xs">
                    {fourPillars.year.stemPinyin}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs my-space-xs">
                <div className="flex items-baseline justify-center py-2 bg-surface-container-low rounded-xl">
                  <span className="font-headline-lg text-headline-lg font-bold text-element-fire">
                    {fourPillars.year.branchZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-text-muted ml-2 text-xs">
                    {fourPillars.year.branchPinyin} · {fourPillars.year.branchZodiacZh}
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1 text-xs">
                  <span>支藏: {fourPillars.year.hiddenStemsZh}</span>
                  <span>{fourPillars.year.hiddenStemsRolesZh}</span>
                </div>
              </div>
              <div className="pt-space-xs flex flex-col gap-1 bg-surface-container-low/60 p-2 rounded-xl mt-space-xs text-xs">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">纳音五行</span>
                  <span className="font-medium text-text-primary">{fourPillars.year.naYinZh} {fourPillars.year.naYinEn}</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-text-muted">十二长生星运</span>
                  <span className="font-semibold text-element-fire">{fourPillars.year.changShengZh} {fourPillars.year.changShengEn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Equilibrium Dashboard & Five Elements Gauge */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col lg:flex-row gap-space-lg items-center justify-between">
            {/* Day Master Balance State */}
            <div className="flex flex-col gap-space-xs w-full lg:w-5/12">
              <div className="flex items-center gap-space-sm">
                <span className="px-3 py-1 rounded-full bg-element-fire/15 text-element-fire font-label-md text-label-md font-bold text-xs">
                  {report.patternJudgmentZh}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                  {report.patternStatusZh}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {report.patternSummaryZh}
              </p>
              <div className="grid grid-cols-2 gap-space-sm mt-space-xs">
                <div className="p-space-sm rounded-xl bg-element-water/10 border border-element-water/20 flex flex-col">
                  <span className="font-label-sm text-label-sm text-element-water font-bold uppercase tracking-wider text-[10px]">
                    喜神 / 用神 (Beneficial)
                  </span>
                  <span className="font-body-md text-body-md font-semibold text-element-water mt-0.5 text-xs">
                    {report.beneficialElementsZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    {report.beneficialNoteZh}
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-element-fire/10 border border-element-fire/20 flex flex-col">
                  <span className="font-label-sm text-label-sm text-element-fire font-bold uppercase tracking-wider text-[10px]">
                    忌神 / 仇神 (Avoidance)
                  </span>
                  <span className="font-body-md text-body-md font-semibold text-element-fire mt-0.5 text-xs">
                    {report.avoidanceElementsZh}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    {report.avoidanceNoteZh}
                  </span>
                </div>
              </div>
            </div>

            {/* Five Elements Balance Visual Matrix */}
            <div className="w-full lg:w-7/12 flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl border border-border-subtle/60">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-text-primary font-semibold text-xs">
                  五行能量分布权重比 (Five Elements Vector Weight)
                </span>
                <span className="font-label-sm text-label-sm text-text-muted text-[11px]">
                  总和 100% 相对动能
                </span>
              </div>
              {/* Stacked Bar */}
              <div className="w-full h-7 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="h-full bg-element-fire flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold text-xs"
                  style={{ width: `${report.elementWeights.fire}%` }}
                  title={`火 ${report.elementWeights.fire}%`}
                >
                  火 {report.elementWeights.fire}%
                </div>
                <div
                  className="h-full bg-element-water flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold text-xs"
                  style={{ width: `${report.elementWeights.water}%` }}
                  title={`水 ${report.elementWeights.water}%`}
                >
                  水 {report.elementWeights.water}%
                </div>
                <div
                  className="h-full bg-element-metal flex items-center justify-center text-text-primary font-label-sm text-label-sm font-bold text-xs"
                  style={{ width: `${report.elementWeights.metal}%` }}
                  title={`金 ${report.elementWeights.metal}%`}
                >
                  金 {report.elementWeights.metal}%
                </div>
                <div
                  className="h-full bg-element-wood flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold text-xs"
                  style={{ width: `${report.elementWeights.wood}%` }}
                  title={`木 ${report.elementWeights.wood}%`}
                >
                  木 {report.elementWeights.wood}%
                </div>
                <div
                  className="h-full bg-element-earth flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold text-xs"
                  style={{ width: `${report.elementWeights.earth}%` }}
                  title={`土 ${report.elementWeights.earth}%`}
                >
                  土 {report.elementWeights.earth}%
                </div>
              </div>

              {/* Elemental Breakdown Chips */}
              <div className="grid grid-cols-5 gap-2 text-center pt-space-xs font-label-sm text-label-sm">
                <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl border border-border-subtle/50">
                  <span className="font-semibold text-element-fire text-xs">火 Fire</span>
                  <span className="text-text-primary font-bold text-headline-sm">{report.elementWeights.fire}%</span>
                  <span className="text-element-fire font-bold text-[10px]">极重 · 耗泄</span>
                </div>
                <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl border border-border-subtle/50">
                  <span className="font-semibold text-element-water text-xs">水 Water</span>
                  <span className="text-text-primary font-bold text-headline-sm">{report.elementWeights.water}%</span>
                  <span className="text-element-water font-bold text-[10px]">贵神 · 调候</span>
                </div>
                <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl border border-border-subtle/50">
                  <span className="font-semibold text-text-primary text-xs">金 Metal</span>
                  <span className="text-text-primary font-bold text-headline-sm">{report.elementWeights.metal}%</span>
                  <span className="text-text-muted font-medium text-[10px]">偏财 · 待生</span>
                </div>
                <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl border border-border-subtle/50">
                  <span className="font-semibold text-element-wood text-xs">木 Wood</span>
                  <span className="text-text-primary font-bold text-headline-sm">{report.elementWeights.wood}%</span>
                  <span className="text-text-muted font-medium text-[10px]">正印 · 适中</span>
                </div>
                <div className="flex flex-col items-center bg-surface-container-lowest p-2 rounded-xl border border-border-subtle/50">
                  <span className="font-semibold text-element-earth text-xs">土 Earth</span>
                  <span className="text-text-primary font-bold text-headline-sm">{report.elementWeights.earth}%</span>
                  <span className="text-text-muted font-medium text-[10px]">食伤 · 虚缺</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Structured AI & Master Analysis (Gemini + Geomancer Co-Sign) */}
        <section className="w-full flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-accent-gold-bright/20 text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-widest text-[11px]">
                  Master & AI Dual Review
                </span>
                <span className="text-text-muted font-label-sm text-label-sm text-xs">
                  Gemini Metaphysical Engine + Master Tan Cheng Lok 亲笔复验
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary mt-1">
                深度流年断语与生涯决策研判
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-space-sm py-1 rounded-full text-on-surface-variant font-label-sm text-label-sm text-xs">
              <span className="material-symbols-outlined text-sm text-element-fire">verified_user</span>
              <span>非宿命论指引 · 遵循周易时中之道</span>
            </div>
          </div>

          {/* Bento Layout of Inquiries */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
            {/* Executive Reading Banner */}
            <div className="lg:col-span-12 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col md:flex-row gap-space-lg items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent-gold-bright/30 to-element-fire/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-element-fire text-3xl">psychology_alt</span>
              </div>
              <div className="flex flex-col gap-space-xs flex-1">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-element-fire font-bold tracking-wider uppercase text-xs">
                    EXECUTIVE OVERVIEW / 综论纪要
                  </span>
                  <span className="text-text-muted font-label-sm text-label-sm text-xs">· 2026—2035 黄金十年</span>
                </div>
                <p className="font-body-md text-body-md text-text-primary leading-relaxed">
                  {report.executiveOverviewZh}
                </p>
              </div>
            </div>

            {/* Pillar Inquiry 1: 财运与生意专项 (7 cols) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-gold-bright/15 text-accent-gold-bright flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">payments</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                      {report.wealthSectionZh.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium text-xs">
                    Period 9 Resonance
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-2">
                  {report.wealthSectionZh.analysis}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col">
                    <span className="font-label-sm text-label-sm text-text-muted text-[11px]">生旺方位 (Optimal Directions)</span>
                    <span className="font-body-md text-body-md font-semibold text-text-primary mt-1 text-xs">
                      {report.wealthSectionZh.optimalDirections}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-[11px]">
                      {report.wealthSectionZh.optimalDirectionsNote}
                    </span>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col">
                    <span className="font-label-sm text-label-sm text-text-muted text-[11px]">财星激活窗口 (Wealth Activation)</span>
                    <span className="font-body-md text-body-md font-semibold text-element-fire mt-1 text-xs">
                      {report.wealthSectionZh.activationTiming}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-[11px]">
                      {report.wealthSectionZh.activationTimingNote}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm bg-surface-container-low/60 p-space-sm rounded-xl">
                <span className="material-symbols-outlined text-element-water text-lg">water_drop</span>
                <span className="font-label-sm text-label-sm text-text-primary font-medium text-xs">
                  {report.wealthSectionZh.breakthroughNote}
                </span>
              </div>
            </div>

            {/* Pillar Inquiry 2: 事业晋升与岁运关口 (5 cols) */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-element-water/15 text-element-water flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">trending_up</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                      {report.careerSectionZh.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium text-xs">
                    Milestone Years
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm mt-2">
                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-border-subtle/50">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-semibold text-text-primary text-xs">
                        2026 丙午流年 · 岁驾伏吟
                      </span>
                      <span className="px-2 py-0.5 rounded bg-element-fire/15 text-element-fire font-label-sm text-label-sm font-bold text-[10px]">
                        重点防范
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      {report.careerSectionZh.currentYearAnalysis}
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 border border-border-subtle/50">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-semibold text-text-primary text-xs">
                        2027 丁未流年 · 六合转运
                      </span>
                      <span className="px-2 py-0.5 rounded bg-element-wood/15 text-element-wood font-label-sm text-label-sm font-bold text-[10px]">
                        生机爆发
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      {report.careerSectionZh.nextYearAnalysis}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant pt-2 text-xs">
                <span>最佳行业属性: {report.careerSectionZh.bestIndustries}</span>
              </div>
            </div>

            {/* 10-Year Luck Cycle Timeline (Full Span) */}
            <div className="lg:col-span-12 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                    十年大运生命周期动态轨线 (10-Year Luck Cycle)
                  </h4>
                  <p className="font-label-sm text-label-sm text-text-muted mt-0.5 text-xs">
                    根据起运岁数每十年一步大运，色彩标示五行主导能级
                  </p>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-element-fire/10 text-element-fire font-semibold text-xs">
                  当前所在大运: 丙戌 (2022—2031)
                </span>
              </div>

              {/* Timeline grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm pt-2">
                {report.luckPillars.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-space-sm rounded-xl flex flex-col gap-1 border transition-all ${
                      p.isActive
                        ? 'bg-element-fire/10 border-element-fire ring-1 ring-element-fire shadow-xs'
                        : 'bg-surface-container-low border-border-subtle opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-label-sm text-label-sm text-[11px] ${p.isActive ? 'text-element-fire font-bold' : 'text-text-muted'}`}>
                        {p.yearsRange} ({p.ageRange})
                      </span>
                      {p.isActive && <span className="w-2 h-2 rounded-full bg-element-fire"></span>}
                    </div>
                    <span className={`font-headline-sm text-headline-sm font-bold ${p.isActive ? 'text-element-fire' : 'text-text-primary'}`}>
                      {p.stemBranch}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      {p.tenGod}
                    </span>
                    <span className="text-[11px] text-text-muted">{p.summary}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Consecrated Feng Shui Physical Remedies & Fulfillment Logistics */}
        <section className="w-full flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-element-water/15 text-element-water font-label-sm text-label-sm font-bold uppercase tracking-widest text-[11px]">
                  Section 5.6 Hardware Integration
                </span>
                <span className="text-text-muted font-label-sm text-label-sm text-xs">
                  空间气场调和实体法器与马来西亚专线配送
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary mt-1">
                专属开光风水调和法物与物流追踪
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-1 rounded-full text-xs">
              吉隆坡中心仓已完成能量校正与净晦封签
            </span>
          </div>

          {/* Remedies Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {report.remedies.map((rem) => (
              <div
                key={rem.id}
                className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col sm:flex-row gap-space-md"
              >
                <div className="w-full sm:w-44 h-44 rounded-xl overflow-hidden shrink-0 bg-surface-container-high relative">
                  <img
                    alt={rem.name}
                    className="w-full h-full object-cover"
                    src={rem.image}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-element-water text-on-primary font-label-sm text-label-sm font-semibold text-[11px]">
                    {rem.category}
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-element-water font-bold tracking-wider text-xs">
                        {rem.category.toUpperCase()}
                      </span>
                      <span className="font-label-sm text-label-sm text-text-muted text-xs">Code: {rem.code}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm font-semibold text-text-primary mt-0.5">
                      {rem.name}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed text-xs">
                      {rem.description}
                    </p>
                  </div>
                  <div className="p-space-xs bg-surface-container-low rounded-xl flex flex-col gap-1 border border-border-subtle/50 text-xs">
                    <div className="flex items-center gap-1.5 text-text-primary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-sm text-element-fire">explore</span>
                      <span>安放方位: {rem.placementZh}</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant pl-5 text-[11px]">
                      {rem.instructionsZh}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logistics Fulfillment Tracking Module */}
          {report.logisticsTask && (
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-xs">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-text-primary">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                        专人私密配送派发进度
                      </span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs">
                        Task ID: #{report.logisticsTask.id}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-text-muted text-xs">
                      {report.logisticsTask.serviceCategory}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-element-fire/15 text-element-fire font-label-sm text-label-sm font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-element-fire animate-pulse"></span>
                  已指派物流人员 · {report.logisticsTask.assignedStaff}
                </div>
              </div>

              {/* Stepper */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm pt-2">
                {report.logisticsTask.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className={`p-space-sm rounded-xl flex flex-col gap-1 border text-xs ${
                      st.status === 'in_progress'
                        ? 'bg-element-fire/10 border-element-fire ring-1 ring-element-fire shadow-xs'
                        : st.status === 'completed'
                        ? 'bg-surface-container-low border-border-subtle'
                        : 'bg-surface-container-low/60 border-border-subtle opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-label-sm text-label-sm font-bold ${st.status === 'in_progress' ? 'text-element-fire' : 'text-text-primary'}`}>
                        {st.stepNumber}. {st.title}
                      </span>
                      {st.status === 'completed' && (
                        <span className="material-symbols-outlined text-element-wood text-sm">check_circle</span>
                      )}
                      {st.status === 'in_progress' && (
                        <span className="material-symbols-outlined text-element-fire text-sm animate-spin">sync</span>
                      )}
                      {st.status === 'pending' && (
                        <span className="material-symbols-outlined text-text-muted text-sm">radio_button_unchecked</span>
                      )}
                    </div>
                    <span className="text-[11px] text-text-muted">{st.time}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">{st.description}</span>
                  </div>
                ))}
              </div>

              {/* Destination Address */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-xl text-on-surface-variant font-label-sm text-label-sm text-xs border border-border-subtle/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-element-fire">location_on</span>
                  <span className="text-text-primary font-semibold">收件地址:</span>
                  <span>{report.logisticsTask.address}</span>
                </div>
                <div className="flex items-center gap-space-md">
                  <span>收件人: {report.logisticsTask.clientName} ({report.logisticsTask.clientPhone})</span>
                  <button className="text-element-fire hover:underline font-semibold" type="button">
                    修改配送时间
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Master Stamp, Verification Seal & Statutory Disclaimer */}
        <section className="w-full bg-surface-container-low/60 rounded-2xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md mt-space-sm border border-border-subtle">
          <div className="flex items-center gap-space-md">
            <div className="relative shrink-0">
              <img
                alt="Master Raymond Tang"
                className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-accent-gold-bright"
                src="/master_avatar.jpg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest p-0.5 shadow-sm border border-border-subtle">
                <img
                  alt="Master Cinnabar Seal"
                  className="w-full h-full rounded-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqam0W-zRTj4-fCuBG9jIhappKI849zMAEDZ7khiaIcPOM3qtC91Lm30N8NRYh1EFzjWbE5Tj4IMbfjigk7BKDqRVEsAyLmS5IZ73XqkVsefxef2coOiERBCFEe8keBhcVBoAnWsJgP_D-a44MqZERdo2jkoT-s0Pu8adYfypeoHExe7d9pTIqRjxWDWbY3AW9k5aOPyb7qM_UCYwtKzw1EcXxNZdcgfSEghiiig5iTrng-mJHSWirGw"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-text-primary">
                  {report.approvedBy || 'Master Raymond Tang (郑道长 · 执业大师签发)'}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-on-surface text-xs font-semibold">
                  {report.masterLicense || 'Lic. MY-FS-8812'}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                马来西亚三元地理研学院常务理事 · 审核生效时间: {report.approvedDate || '2026-09-29 18:00 (KL Time)'}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-element-wood font-semibold text-xs">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Zero-Knowledge Encrypted Assessment</span>
            </div>
            <span className="font-label-sm text-label-sm text-text-muted font-mono text-[11px]">
              {report.sha256Verification}
            </span>
          </div>
        </section>

        {/* Metaphysical Legal Disclaimer */}
        <div className="text-center px-space-md py-space-sm">
          <p className="font-label-sm text-label-sm text-text-muted leading-relaxed max-w-4xl mx-auto text-xs">
            本报告基于传统子平八字与周易数理演算，旨在提供人生规划与气场调和建议，不构成就医、财务投资或法律保证。吉凶由天，成事在人，谨守中庸，顺时顺势。
          </p>
        </div>
      </div>
    </div>
  );
};
