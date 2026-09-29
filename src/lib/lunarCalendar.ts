import solarLunar from 'solarlunar';
import { getYearStemBranch, getMonthStemBranch, getHourStemBranch } from './baziEngine';

export interface SolarToLunarResult {
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeap: boolean;
  lunarYearZh: string;
  lunarMonthZh: string;
  lunarDayZh: string;
  fullLunarZh: string;
  gzYear: string;
  gzMonth: string;
  gzDay: string;
  zodiac: string;
  solarTerm: string;
  solarDateStr: string;
}

export interface LunarToSolarResult {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  solarDateStr: string;
  fullLunarZh: string;
  gzYear: string;
  gzMonth: string;
  gzDay: string;
  zodiac: string;
}

/**
 * Converts a Solar (阳历/公历/西历) date into Chinese Lunar (阴历/农历) date (1900-2026)
 */
export function convertSolarToLunar(
  solarYear: number,
  solarMonth: number,
  solarDay: number
): SolarToLunarResult {
  try {
    const res = (solarLunar as any).solar2lunar(solarYear, solarMonth, solarDay);
    if (res && res !== -1) {
      const yearSB = getYearStemBranch(res.lYear);
      return {
        lunarYear: res.lYear,
        lunarMonth: res.lMonth,
        lunarDay: res.lDay,
        isLeap: Boolean(res.isLeap),
        lunarYearZh: `${res.gzYear || yearSB.stemBranch}年 (${res.animal || yearSB.zodiacZh}年 · ${yearSB.naYinZh})`,
        lunarMonthZh: res.monthCn || `${res.isLeap ? '闰' : ''}${res.lMonth}月`,
        lunarDayZh: res.dayCn || `初${res.lDay}`,
        fullLunarZh: `农历 ${res.gzYear || yearSB.stemBranch}年 ${res.monthCn || `${res.lMonth}月`}${res.dayCn || `${res.lDay}日`}`,
        gzYear: res.gzYear || yearSB.stemBranch,
        gzMonth: res.gzMonth || '壬午',
        gzDay: res.gzDay || '辛未',
        zodiac: res.animal || yearSB.zodiacZh,
        solarTerm: res.term || (res.isTerm ? '节气交节' : '常候吉日'),
        solarDateStr: `${solarYear}年${solarMonth}月${solarDay}日`,
      };
    }
  } catch (err) {
    console.warn('solar2lunar conversion fallback', err);
  }

  // Fallback
  const yearSB = getYearStemBranch(solarYear);
  const monthSB = getMonthStemBranch(yearSB.stem, solarMonth);
  return {
    lunarYear: solarYear,
    lunarMonth: solarMonth,
    lunarDay: solarDay,
    isLeap: false,
    lunarYearZh: `${yearSB.stemBranch}年 (${yearSB.zodiacZh}年 · ${yearSB.naYinZh})`,
    lunarMonthZh: `${solarMonth}月`,
    lunarDayZh: `初${solarDay}`,
    fullLunarZh: `农历 ${yearSB.stemBranch}年 ${solarMonth}月初${solarDay}日`,
    gzYear: yearSB.stemBranch,
    gzMonth: monthSB.stemBranch,
    gzDay: '辛未',
    zodiac: yearSB.zodiacZh,
    solarTerm: '常候吉日',
    solarDateStr: `${solarYear}年${solarMonth}月${solarDay}日`,
  };
}

/**
 * Converts a Chinese Lunar (阴历/农历) date into Solar (阳历/公历) date (1900-2026)
 */
export function convertLunarToSolar(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
  isLeap: boolean = false
): LunarToSolarResult {
  try {
    const res = (solarLunar as any).lunar2solar(lunarYear, lunarMonth, lunarDay, isLeap);
    if (res && res !== -1) {
      const yearSB = getYearStemBranch(lunarYear);
      return {
        solarYear: res.cYear,
        solarMonth: res.cMonth,
        solarDay: res.cDay,
        solarDateStr: `${res.cYear}年${res.cMonth}月${res.cDay}日`,
        fullLunarZh: `农历 ${res.gzYear || yearSB.stemBranch}年 ${res.monthCn || `${lunarMonth}月`}${res.dayCn || `${lunarDay}日`}`,
        gzYear: res.gzYear || yearSB.stemBranch,
        gzMonth: res.gzMonth || '壬午',
        gzDay: res.gzDay || '辛未',
        zodiac: res.animal || yearSB.zodiacZh,
      };
    }
  } catch (err) {
    console.warn('lunar2solar conversion fallback', err);
  }

  // Fallback
  const yearSB = getYearStemBranch(lunarYear);
  return {
    solarYear: lunarYear,
    solarMonth: lunarMonth,
    solarDay: lunarDay,
    solarDateStr: `${lunarYear}年${lunarMonth}月${lunarDay}日`,
    fullLunarZh: `农历 ${yearSB.stemBranch}年 ${lunarMonth}月初${lunarDay}日`,
    gzYear: yearSB.stemBranch,
    gzMonth: '壬午',
    gzDay: '辛未',
    zodiac: yearSB.zodiacZh,
  };
}
