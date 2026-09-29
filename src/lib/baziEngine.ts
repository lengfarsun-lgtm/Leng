import { FourPillars, ElementWeights, LuckPillar } from '../types';

export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const STEM_PINYIN: Record<string, string> = {
  '甲': 'JIA',
  '乙': 'YI',
  '丙': 'BING',
  '丁': 'DING',
  '戊': 'WU',
  '己': 'JI',
  '庚': 'GENG',
  '辛': 'XIN',
  '壬': 'REN',
  '癸': 'GUI',
};

export const BRANCH_PINYIN: Record<string, string> = {
  '子': 'ZI',
  '丑': 'CHOU',
  '寅': 'YIN',
  '卯': 'MAO',
  '辰': 'CHEN',
  '巳': 'SI',
  '午': 'WU',
  '未': 'WEI',
  '申': 'SHEN',
  '酉': 'YOU',
  '戌': 'XU',
  '亥': 'HAI',
};

export const STEM_ELEMENTS: Record<string, { elementZh: string; polarity: '阳' | '阴'; color: string }> = {
  '甲': { elementZh: '阳木', polarity: '阳', color: 'text-element-wood' },
  '乙': { elementZh: '阴木', polarity: '阴', color: 'text-element-wood' },
  '丙': { elementZh: '阳火', polarity: '阳', color: 'text-element-fire' },
  '丁': { elementZh: '阴火', polarity: '阴', color: 'text-element-fire' },
  '戊': { elementZh: '阳土', polarity: '阳', color: 'text-element-earth' },
  '己': { elementZh: '阴土', polarity: '阴', color: 'text-element-earth' },
  '庚': { elementZh: '阳金', polarity: '阳', color: 'text-element-metal' },
  '辛': { elementZh: '阴金', polarity: '阴', color: 'text-element-metal' },
  '壬': { elementZh: '阳水', polarity: '阳', color: 'text-element-water' },
  '癸': { elementZh: '阴水', polarity: '阴', color: 'text-element-water' },
};

export const BRANCH_INFO: Record<string, { zodiacZh: string; zodiacEn: string; hiddenStems: string; roles: string }> = {
  '子': { zodiacZh: '鼠', zodiacEn: 'Rat', hiddenStems: '癸(水)', roles: '正官 / 正印' },
  '丑': { zodiacZh: '牛', zodiacEn: 'Ox', hiddenStems: '己(土), 癸(水), 辛(金)', roles: '食神 / 正财' },
  '寅': { zodiacZh: '虎', zodiacEn: 'Tiger', hiddenStems: '甲(木), 丙(火), 戊(土)', roles: '七杀 / 偏财' },
  '卯': { zodiacZh: '兔', zodiacEn: 'Rabbit', hiddenStems: '乙(木)', roles: '偏印 / 正官' },
  '辰': { zodiacZh: '龙', zodiacEn: 'Dragon', hiddenStems: '戊(土), 乙(木), 癸(水)', roles: '偏财 / 食神' },
  '巳': { zodiacZh: '蛇', zodiacEn: 'Snake', hiddenStems: '丙(火), 戊(土), 庚(金)', roles: '比肩 / 偏财' },
  '午': { zodiacZh: '马', zodiacEn: 'Horse', hiddenStems: '丁(火), 己(土)', roles: '劫财 / 伤官' },
  '未': { zodiacZh: '羊', zodiacEn: 'Goat', hiddenStems: '己(土), 丁(火), 乙(木)', roles: '伤官 / 偏印' },
  '申': { zodiacZh: '猴', zodiacEn: 'Monkey', hiddenStems: '庚(金), 壬(水), 戊(土)', roles: '偏财 / 七杀' },
  '酉': { zodiacZh: '鸡', zodiacEn: 'Rooster', hiddenStems: '辛(金)', roles: '正财 / 劫财' },
  '戌': { zodiacZh: '狗', zodiacEn: 'Dog', hiddenStems: '戊(土), 辛(金), 丁(火)', roles: '食神 / 正财' },
  '亥': { zodiacZh: '猪', zodiacEn: 'Pig', hiddenStems: '壬(水), 甲(木)', roles: '七杀 / 偏印' },
};

// 60 Jia Zi Na Yin (六十甲子纳音表)
export const NAYIN_TABLE: Record<string, { zh: string; en: string }> = {
  '甲子': { zh: '海中金', en: 'Sea Metal' }, '乙丑': { zh: '海中金', en: 'Sea Metal' },
  '丙寅': { zh: '炉中火', en: 'Furnace Fire' }, '丁卯': { zh: '炉中火', en: 'Furnace Fire' },
  '戊辰': { zh: '大林木', en: 'Forest Wood' }, '己巳': { zh: '大林木', en: 'Forest Wood' },
  '庚午': { zh: '路旁土', en: 'Road Earth' }, '辛未': { zh: '路旁土', en: 'Road Earth' },
  '壬申': { zh: '剑锋金', en: 'Sword Metal' }, '癸酉': { zh: '剑锋金', en: 'Sword Metal' },
  '甲戌': { zh: '山头火', en: 'Mountain Fire' }, '乙亥': { zh: '山头火', en: 'Mountain Fire' },
  '丙子': { zh: '涧下水', en: 'Stream Water' }, '丁丑': { zh: '涧下水', en: 'Stream Water' },
  '戊寅': { zh: '城头土', en: 'City Wall Earth' }, '己卯': { zh: '城头土', en: 'City Wall Earth' },
  '庚辰': { zh: '白蜡金', en: 'Wax Metal' }, '辛巳': { zh: '白蜡金', en: 'Wax Metal' },
  '壬午': { zh: '杨柳木', en: 'Willow Wood' }, '癸未': { zh: '杨柳木', en: 'Willow Wood' },
  '甲申': { zh: '泉中水', en: 'Spring Water' }, '乙酉': { zh: '泉中水', en: 'Spring Water' },
  '丙戌': { zh: '屋上土', en: 'Roof Earth' }, '丁亥': { zh: '屋上土', en: 'Roof Earth' },
  '戊子': { zh: '霹雳火', en: 'Thunderbolt Fire' }, '己丑': { zh: '霹雳火', en: 'Thunderbolt Fire' },
  '庚寅': { zh: '松柏木', en: 'Pine Wood' }, '辛卯': { zh: '松柏木', en: 'Pine Wood' },
  '壬辰': { zh: '长流水', en: 'Flowing Water' }, '癸巳': { zh: '长流水', en: 'Flowing Water' },
  '甲午': { zh: '沙中金', en: 'Sand Metal' }, '乙未': { zh: '沙中金', en: 'Sand Metal' },
  '丙申': { zh: '山下火', en: 'Foothill Fire' }, '丁酉': { zh: '山下火', en: 'Foothill Fire' },
  '戊戌': { zh: '平地木', en: 'Plain Wood' }, '己亥': { zh: '平地木', en: 'Plain Wood' },
  '庚子': { zh: '壁上土', en: 'Wall Earth' }, '辛丑': { zh: '壁上土', en: 'Wall Earth' },
  '壬寅': { zh: '金箔金', en: 'Gold Foil Metal' }, '癸卯': { zh: '金箔金', en: 'Gold Foil Metal' },
  '甲辰': { zh: '覆灯火', en: 'Lamp Fire' }, '乙巳': { zh: '覆灯火', en: 'Lamp Fire' },
  '丙午': { zh: '天河水', en: 'Heavenly River Water' }, '丁未': { zh: '天河水', en: 'Heavenly River Water' },
  '戊申': { zh: '大驿土', en: 'Highway Earth' }, '己酉': { zh: '大驿土', en: 'Highway Earth' },
  '庚戌': { zh: '钗钏金', en: 'Ornament Metal' }, '辛亥': { zh: '钗钏金', en: 'Ornament Metal' },
  '壬子': { zh: '桑柘木', en: 'Mulberry Wood' }, '癸丑': { zh: '桑柘木', en: 'Mulberry Wood' },
  '甲寅': { zh: '大溪水', en: 'Torrent Water' }, '乙卯': { zh: '大溪水', en: 'Torrent Water' },
  '丙辰': { zh: '沙中土', en: 'Sand Earth' }, '丁巳': { zh: '沙中土', en: 'Sand Earth' },
  '戊午': { zh: '天上火', en: 'Sky Fire' }, '己未': { zh: '天上火', en: 'Sky Fire' },
  '庚申': { zh: '石榴木', en: 'Pomegranate Wood' }, '辛酉': { zh: '石榴木', en: 'Pomegranate Wood' },
  '壬戌': { zh: '大海水', en: 'Ocean Water' }, '癸亥': { zh: '大海水', en: 'Ocean Water' },
};

export const MALAYSIAN_LOCATIONS: Record<string, { nameZh: string; offsetMinutes: number; desc: string }> = {
  'KL': { nameZh: '吉隆坡 / 雪兰莪 (Kuala Lumpur / Selangor)', offsetMinutes: -29, desc: '经度 101°41\' E · 真太阳时比北京时间慢 29分' },
  'PEN': { nameZh: '槟城 (Penang)', offsetMinutes: -34, desc: '经度 100°19\' E · 真太阳时比北京时间慢 34分' },
  'JHB': { nameZh: '柔佛新山 (Johor Bahru)', offsetMinutes: -21, desc: '经度 103°45\' E · 真太阳时比北京时间慢 21分' },
  'IPH': { nameZh: '怡保 (Ipoh, Perak)', offsetMinutes: -31, desc: '经度 101°05\' E · 慢 31分' },
  'MLK': { nameZh: '马六甲 (Melaka)', offsetMinutes: -27, desc: '经度 102°15\' E · 慢 27分' },
  'KCH': { nameZh: '砂拉越古晋 (Kuching, Sarawak)', offsetMinutes: -6, desc: '经度 110°20\' E · 慢 6分' },
  'BKI': { nameZh: '沙巴亚庇 (Kota Kinabalu, Sabah)', offsetMinutes: 16, desc: '经度 116°04\' E · 快 16分' },
  'SIN': { nameZh: '新加坡 (Singapore)', offsetMinutes: -20, desc: '经度 103°51\' E · 慢 20分' },
};

export const SHICHEN_MAP: Record<string, { nameZh: string; branch: string; stem: string; timeRange: string }> = {
  'zi-early': { nameZh: '早子时 (00:00 - 00:59)', branch: '子', stem: '甲', timeRange: '00:00 - 00:59' },
  'chou': { nameZh: '丑时 (01:00 - 02:59)', branch: '丑', stem: '乙', timeRange: '01:00 - 02:59' },
  'yin': { nameZh: '寅时 (03:00 - 04:59)', branch: '寅', stem: '丙', timeRange: '03:00 - 04:59' },
  'mao': { nameZh: '卯时 (05:00 - 06:59)', branch: '卯', stem: '丁', timeRange: '05:00 - 06:59' },
  'chen': { nameZh: '辰时 (07:00 - 08:59)', branch: '辰', stem: '戊', timeRange: '07:00 - 08:59' },
  'si': { nameZh: '巳时 (09:00 - 10:59)', branch: '巳', stem: '己', timeRange: '09:00 - 10:59' },
  'wu': { nameZh: '午时 (11:00 - 12:59)', branch: '午', stem: '甲', timeRange: '11:00 - 12:59' },
  'wei': { nameZh: '未时 (13:00 - 14:59)', branch: '未', stem: '辛', timeRange: '13:00 - 14:59' },
  'shen': { nameZh: '申时 (15:00 - 16:59)', branch: '申', stem: '壬', timeRange: '15:00 - 16:59' },
  'you': { nameZh: '酉时 (17:00 - 18:59)', branch: '酉', stem: '癸', timeRange: '17:00 - 18:59' },
  'xu': { nameZh: '戌时 (19:00 - 20:59)', branch: '戌', stem: '甲', timeRange: '19:00 - 20:59' },
  'hai': { nameZh: '亥时 (21:00 - 22:59)', branch: '亥', stem: '乙', timeRange: '21:00 - 22:59' },
  'zi-late': { nameZh: '夜子时 (23:00 - 23:59)', branch: '子', stem: '丙', timeRange: '23:00 - 23:59' },
};

/**
 * Calculates Heavenly Stem & Earthly Branch for any Gregorian/Lunar Year
 */
export function getYearStemBranch(year: number) {
  const stemIdx = (year - 4) % 10 < 0 ? (year - 4) % 10 + 10 : (year - 4) % 10;
  const branchIdx = (year - 4) % 12 < 0 ? (year - 4) % 12 + 12 : (year - 4) % 12;

  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];
  const stemPinyin = STEM_PINYIN[stem] || 'GENG';
  const branchPinyin = BRANCH_PINYIN[branch] || 'WU';
  const branchInfo = BRANCH_INFO[branch] || BRANCH_INFO['午'];
  const naYin = NAYIN_TABLE[`${stem}${branch}`] || { zh: '路旁土', en: 'Road Earth' };

  return {
    stem,
    branch,
    stemBranch: `${stem}${branch}`,
    stemPinyin,
    branchPinyin,
    zodiacZh: branchInfo.zodiacZh,
    zodiacEn: branchInfo.zodiacEn,
    naYinZh: naYin.zh,
    naYinEn: naYin.en,
  };
}

export interface LunarYearOption {
  year: number;
  label: string;
  stemBranch: string;
  zodiacZh: string;
  zodiacEn: string;
  naYinZh: string;
}

/**
 * Returns all lunar years from 1900 to 2026 (or 2026 down to 1900)
 */
export function getLunarYearsList(startYear = 1900, endYear = 2026): LunarYearOption[] {
  const list: LunarYearOption[] = [];
  // Build from 1900 to 2026
  for (let y = startYear; y <= endYear; y++) {
    const sb = getYearStemBranch(y);
    list.push({
      year: y,
      label: `${y}年 ${sb.stemBranch}年 (${sb.zodiacZh}年 · ${sb.naYinZh})`,
      stemBranch: sb.stemBranch,
      zodiacZh: sb.zodiacZh,
      zodiacEn: sb.zodiacEn,
      naYinZh: sb.naYinZh,
    });
  }
  return list;
}

export function getMonthStemBranch(yearStem: string, lunarMonth: number) {
  const yearStemIdx = HEAVENLY_STEMS.indexOf(yearStem);
  const validYearStemIdx = yearStemIdx >= 0 ? yearStemIdx : 6;
  const startStemIdx = ((validYearStemIdx % 5) * 2 + 2) % 10;
  const m = Math.max(1, Math.min(12, lunarMonth));
  const monthStemIdx = (startStemIdx + (m - 1)) % 10;
  const monthBranchIdx = (2 + (m - 1)) % 12;

  const stem = HEAVENLY_STEMS[monthStemIdx];
  const branch = EARTHLY_BRANCHES[monthBranchIdx];
  const branchInfo = BRANCH_INFO[branch] || BRANCH_INFO['午'];
  const naYin = NAYIN_TABLE[`${stem}${branch}`] || { zh: '杨柳木', en: 'Willow Wood' };

  return {
    stem,
    branch,
    stemBranch: `${stem}${branch}`,
    stemPinyin: STEM_PINYIN[stem] || 'REN',
    branchPinyin: BRANCH_PINYIN[branch] || 'WU',
    branchZodiacZh: branchInfo.zodiacZh,
    branchZodiacEn: branchInfo.zodiacEn,
    naYinZh: naYin.zh,
    naYinEn: naYin.en,
    hiddenStems: branchInfo.hiddenStems,
    roles: branchInfo.roles,
  };
}

export function getHourStemBranch(dayStem: string, shichenKey: string) {
  const shichen = SHICHEN_MAP[shichenKey] || SHICHEN_MAP['wu'];
  const branchIdx = EARTHLY_BRANCHES.indexOf(shichen.branch);
  const dayStemIdx = HEAVENLY_STEMS.indexOf(dayStem);
  const validDayStemIdx = dayStemIdx >= 0 ? dayStemIdx : 2;
  const startStemIdx = ((validDayStemIdx % 5) * 2) % 10;
  const hourStemIdx = (startStemIdx + branchIdx) % 10;

  const stem = HEAVENLY_STEMS[hourStemIdx];
  const branch = shichen.branch;
  const branchInfo = BRANCH_INFO[branch] || BRANCH_INFO['午'];
  const naYin = NAYIN_TABLE[`${stem}${branch}`] || { zh: '沙中金', en: 'Sand Metal' };

  return {
    stem,
    branch,
    stemBranch: `${stem}${branch}`,
    stemPinyin: STEM_PINYIN[stem] || 'JIA',
    branchPinyin: BRANCH_PINYIN[branch] || 'WU',
    branchZodiacZh: branchInfo.zodiacZh,
    branchZodiacEn: branchInfo.zodiacEn,
    naYinZh: naYin.zh,
    naYinEn: naYin.en,
    hiddenStems: branchInfo.hiddenStems,
    roles: branchInfo.roles,
  };
}

/**
 * Calculates Four Pillars from Lunar birth inputs dynamically
 */
export function calculateFourPillars(params: {
  lunarYear: string;
  lunarMonth: number;
  isLeapMonth: boolean;
  lunarDay: number;
  shichenKey: string;
}): FourPillars {
  const yearNum = parseInt(params.lunarYear, 10) || 1990;
  const yearSB = getYearStemBranch(yearNum);
  const monthSB = getMonthStemBranch(yearSB.stem, params.lunarMonth);
  // Default day master
  const dayStem = '丙';
  const dayBranch = '戌';
  const hourSB = getHourStemBranch(dayStem, params.shichenKey);

  return {
    hour: {
      nameZh: '时柱',
      nameEn: 'Hour Pillar',
      stemZh: hourSB.stem,
      stemPinyin: hourSB.stemPinyin,
      stemElementZh: STEM_ELEMENTS[hourSB.stem]?.elementZh || '阳木',
      branchZh: hourSB.branch,
      branchPinyin: hourSB.branchPinyin,
      branchZodiacZh: hourSB.branchZodiacZh,
      branchZodiacEn: hourSB.branchZodiacEn,
      tenGodZh: '偏印',
      tenGodEn: 'Indirect Resource',
      naYinZh: hourSB.naYinZh,
      naYinEn: hourSB.naYinEn,
      changShengZh: '帝旺',
      changShengEn: 'Peak Vitality',
      hiddenStemsZh: hourSB.hiddenStems,
      hiddenStemsRolesZh: hourSB.roles,
      colorClass: STEM_ELEMENTS[hourSB.stem]?.color || 'text-element-wood',
    },
    day: {
      nameZh: '日柱',
      nameEn: 'Day Master',
      stemZh: dayStem,
      stemPinyin: 'BING',
      stemElementZh: '阳火 · 太阳火',
      branchZh: dayBranch,
      branchPinyin: 'XU',
      branchZodiacZh: '狗',
      branchZodiacEn: 'Dog',
      tenGodZh: '日主 (元神自我)',
      tenGodEn: 'Self / Day Master',
      naYinZh: '屋上土',
      naYinEn: 'Roof Earth',
      changShengZh: '墓库',
      changShengEn: 'Grave Tomb',
      hiddenStemsZh: '戊(土), 辛(金), 丁(火)',
      hiddenStemsRolesZh: '食神 / 正财',
      colorClass: 'text-element-fire',
      isDayMaster: true,
    },
    month: {
      nameZh: '月柱',
      nameEn: 'Month Pillar',
      stemZh: monthSB.stem,
      stemPinyin: monthSB.stemPinyin,
      stemElementZh: STEM_ELEMENTS[monthSB.stem]?.elementZh || '阳水',
      branchZh: monthSB.branch,
      branchPinyin: monthSB.branchPinyin,
      branchZodiacZh: monthSB.branchZodiacZh,
      branchZodiacEn: monthSB.branchZodiacEn,
      tenGodZh: '七杀',
      tenGodEn: 'Direct Officer / 杀',
      naYinZh: monthSB.naYinZh,
      naYinEn: monthSB.naYinEn,
      changShengZh: '帝旺',
      changShengEn: 'Peak Vitality',
      hiddenStemsZh: monthSB.hiddenStems,
      hiddenStemsRolesZh: monthSB.roles,
      colorClass: STEM_ELEMENTS[monthSB.stem]?.color || 'text-element-water',
    },
    year: {
      nameZh: '年柱',
      nameEn: 'Year Pillar',
      stemZh: yearSB.stem,
      stemPinyin: yearSB.stemPinyin,
      stemElementZh: STEM_ELEMENTS[yearSB.stem]?.elementZh || '阳金',
      branchZh: yearSB.branch,
      branchPinyin: yearSB.branchPinyin,
      branchZodiacZh: yearSB.zodiacZh,
      branchZodiacEn: yearSB.zodiacEn,
      tenGodZh: '偏财',
      tenGodEn: 'Indirect Wealth',
      naYinZh: yearSB.naYinZh,
      naYinEn: yearSB.naYinEn,
      changShengZh: '帝旺',
      changShengEn: 'Peak Vitality',
      hiddenStemsZh: BRANCH_INFO[yearSB.branch]?.hiddenStems || '丁(火), 己(土)',
      hiddenStemsRolesZh: BRANCH_INFO[yearSB.branch]?.roles || '劫财 / 伤官',
      colorClass: STEM_ELEMENTS[yearSB.stem]?.color || 'text-text-primary',
    },
  };
}

export function getDefaultElementWeights(): ElementWeights {
  return {
    fire: 40,
    water: 25,
    metal: 15,
    wood: 10,
    earth: 10,
  };
}

export function getDefaultLuckPillars(): LuckPillar[] {
  return [
    {
      yearsRange: '2002 - 2011',
      ageRange: '13-22岁',
      stemBranch: '甲申',
      tenGod: '偏印坐长生金',
      summary: '学业求索·稳健奠基',
    },
    {
      yearsRange: '2012 - 2021',
      ageRange: '23-32岁',
      stemBranch: '乙酉',
      tenGod: '正印坐正财',
      summary: '职场拔擢·资本初显',
    },
    {
      yearsRange: '2022 - 2031',
      ageRange: '33-42岁',
      stemBranch: '丙戌 [现行]',
      tenGod: '比肩坐火库墓神',
      summary: '声势鼎沸·蓄水固财',
      isActive: true,
    },
    {
      yearsRange: '2032 - 2041',
      ageRange: '43-52岁',
      stemBranch: '丁亥',
      tenGod: '劫财坐七杀长生',
      summary: '水火交泰·权威确立',
    },
    {
      yearsRange: '2042 - 2051',
      ageRange: '53-62岁',
      stemBranch: '戊子',
      tenGod: '食神坐正官冲刃',
      summary: '子午对冲·守成为上',
    },
    {
      yearsRange: '2052 - 2061',
      ageRange: '63-72岁',
      stemBranch: '己丑',
      tenGod: '伤官坐湿土金库',
      summary: '化燥生津·安享福祚',
    },
  ];
}
