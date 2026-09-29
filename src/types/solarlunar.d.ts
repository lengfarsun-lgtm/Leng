declare module 'solarlunar' {
  export interface SolarLunarData {
    lYear: number;
    lMonth: number;
    lDay: number;
    isLeap: boolean;
    cYear: number;
    cMonth: number;
    cDay: number;
    gzYear: string;
    gzMonth: string;
    gzDay: string;
    isToday: boolean;
    isTerm: boolean;
    term: string;
    animal: string;
    monthCn: string;
    dayCn: string;
    ncWeek: string;
  }

  export function solar2lunar(year: number, month: number, day: number): SolarLunarData | -1;
  export function lunar2solar(year: number, month: number, day: number, isLeap?: boolean): SolarLunarData | -1;

  const solarLunar: {
    solar2lunar: typeof solar2lunar;
    lunar2solar: typeof lunar2solar;
  };

  export default solarLunar;
}
