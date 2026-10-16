import { HTML_LANG, type Locale } from "@/i18n/config";

/**
 * Mga pangungusap ng forecast, buo kada wika.
 *
 * Hindi ito iniiwan sa DomTranslator: binubuo ang mga pangungusap na ito
 * mula sa mga numero at pangalan ng buwan ("Typical December … 60% of days
 * … 5 years"), kaya kapag isinalin nang pira-piraso ay sira ang gramatika.
 * Kaya buong pangungusap ang bawat isa rito, at naka-`translate="no"` ang
 * ForecastDays para hindi na ito galawin ng DomTranslator.
 *
 * Walang sariling salin ang Bikol (nakatago pa sa selector) — English ang
 * gamit nito.
 */

type Phrases = {
  loading: string;
  unavailable: string;
  rain: (pct: number) => string;
  verdict: Record<"likely" | "chance" | "slight" | "dry", string>;
  sky: Record<"Clear" | "Partly cloudy" | "Cloudy" | "Fog" | "Storm" | "Rain" | "—", string>;
  beyond: (some: boolean) => string;
  typical: (month: string, pct: number, min: number, max: number, years: number) => string;
  checkBack: string;
  footnote: string;
};

const EN: Phrases = {
  loading: "Loading the forecast…",
  unavailable: "The forecast is unavailable right now. Please try again later.",
  rain: (p) => `${p}% rain`,
  verdict: { likely: "Rain likely", chance: "Chance of rain", slight: "Slight chance", dry: "Mostly dry" },
  sky: { Clear: "Clear", "Partly cloudy": "Partly cloudy", Cloudy: "Cloudy", Fog: "Fog", Storm: "Storm", Rain: "Rain", "—": "—" },
  beyond: (some) => `${some ? "Some of your dates are" : "Your dates are"} more than 16 days away, so there is no forecast yet.`,
  typical: (m, p, lo, hi, y) => `Typical ${m} at the club: rain on about ${p}% of days, ${lo}–${hi}°C (average of the last ${y} years).`,
  checkBack: "Check back closer to your visit for the day-by-day forecast.",
  footnote: "Forecast for Pili, Camarines Sur, updated daily. Weather data by Open-Meteo.",
};

const PHRASES: Partial<Record<Locale, Phrases>> = {
  EN,
  FIL: {
    loading: "Kinukuha ang forecast…",
    unavailable: "Hindi makuha ang forecast ngayon. Subukan ulit mamaya.",
    rain: (p) => `${p}% ulan`,
    verdict: { likely: "Malamang umulan", chance: "Posibleng umulan", slight: "Bahagyang tsansa", dry: "Halos walang ulan" },
    sky: { Clear: "Maaraw", "Partly cloudy": "Bahagyang maulap", Cloudy: "Maulap", Fog: "Mahamog", Storm: "Bagyo", Rain: "Ulan", "—": "—" },
    beyond: (some) => `${some ? "Ang ilan sa iyong petsa ay" : "Ang iyong petsa ay"} lampas 16 na araw pa, kaya wala pang forecast.`,
    typical: (m, p, lo, hi, y) => `Karaniwang ${m} sa club: umuulan sa mga ${p}% ng mga araw, ${lo}–${hi}°C (average ng huling ${y} taon).`,
    checkBack: "Bumalik malapit sa iyong pagbisita para sa forecast kada araw.",
    footnote: "Forecast para sa Pili, Camarines Sur, ina-update araw-araw. Datos mula sa Open-Meteo.",
  },
  KO: {
    loading: "예보를 불러오는 중…",
    unavailable: "지금은 예보를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.",
    rain: (p) => `강수 ${p}%`,
    verdict: { likely: "비 예상", chance: "비 가능성", slight: "약간의 가능성", dry: "대체로 맑음" },
    sky: { Clear: "맑음", "Partly cloudy": "구름 조금", Cloudy: "흐림", Fog: "안개", Storm: "뇌우", Rain: "비", "—": "—" },
    beyond: (some) => `${some ? "일부 날짜가" : "선택한 날짜가"} 16일 이후라 아직 예보가 없습니다.`,
    typical: (m, p, lo, hi, y) => `클럽의 평년 ${m}: 약 ${p}%의 날에 비, ${lo}–${hi}°C (최근 ${y}년 평균).`,
    checkBack: "방문일이 가까워지면 일별 예보를 다시 확인해 주세요.",
    footnote: "필리, 카마리네스수르 예보 · 매일 업데이트 · 날씨 데이터: Open-Meteo",
  },
  VI: {
    loading: "Đang tải dự báo…",
    unavailable: "Hiện không thể tải dự báo. Vui lòng thử lại sau.",
    rain: (p) => `${p}% mưa`,
    verdict: { likely: "Có thể mưa", chance: "Có khả năng mưa", slight: "Ít khả năng", dry: "Phần lớn khô ráo" },
    sky: { Clear: "Quang đãng", "Partly cloudy": "Ít mây", Cloudy: "Nhiều mây", Fog: "Sương mù", Storm: "Giông bão", Rain: "Mưa", "—": "—" },
    beyond: (some) => `${some ? "Một số ngày của bạn" : "Ngày của bạn"} còn hơn 16 ngày nữa, nên chưa có dự báo.`,
    typical: (m, p, lo, hi, y) => `${m} thường thấy tại câu lạc bộ: mưa khoảng ${p}% số ngày, ${lo}–${hi}°C (trung bình ${y} năm gần nhất).`,
    checkBack: "Hãy quay lại gần ngày đến để xem dự báo từng ngày.",
    footnote: "Dự báo cho Pili, Camarines Sur, cập nhật hằng ngày. Dữ liệu thời tiết từ Open-Meteo.",
  },
  ZH: {
    loading: "正在加载天气预报…",
    unavailable: "暂时无法获取天气预报，请稍后再试。",
    rain: (p) => `降雨概率 ${p}%`,
    verdict: { likely: "很可能下雨", chance: "可能下雨", slight: "略有可能", dry: "大致干燥" },
    sky: { Clear: "晴", "Partly cloudy": "局部多云", Cloudy: "多云", Fog: "雾", Storm: "雷暴", Rain: "雨", "—": "—" },
    beyond: (some) => `${some ? "部分日期" : "您选择的日期"}在 16 天之后，暂无天气预报。`,
    typical: (m, p, lo, hi, y) => `会所${m}的常年天气：约 ${p}% 的日子有雨，${lo}–${hi}°C（近 ${y} 年平均）。`,
    checkBack: "临近到访时请再来查看每日预报。",
    footnote: "Pili（南甘马粦省）天气预报，每日更新。天气数据来自 Open-Meteo。",
  },
  JA: {
    loading: "予報を読み込んでいます…",
    unavailable: "現在、予報を取得できません。しばらくしてから再度お試しください。",
    rain: (p) => `降水確率 ${p}%`,
    verdict: { likely: "雨の可能性大", chance: "雨の可能性あり", slight: "わずかに可能性", dry: "おおむね晴れ" },
    sky: { Clear: "晴れ", "Partly cloudy": "晴れ時々曇り", Cloudy: "曇り", Fog: "霧", Storm: "雷雨", Rain: "雨", "—": "—" },
    beyond: (some) => `${some ? "一部の日程は" : "ご指定の日程は"}16日以上先のため、まだ予報がありません。`,
    typical: (m, p, lo, hi, y) => `クラブの例年の${m}：約${p}%の日に雨、${lo}–${hi}°C（過去${y}年の平均）。`,
    checkBack: "ご来場が近づいたら、日ごとの予報をご確認ください。",
    footnote: "ピリ（南カマリネス州）の予報・毎日更新。気象データ：Open-Meteo",
  },
};

export function weatherPhrases(locale: Locale): Phrases {
  return PHRASES[locale] ?? EN;
}

/** BCP-47 para sa Intl (pangalan ng araw at buwan sa wika ng bisita). Bikol → English. */
export function weatherIntlLocale(locale: Locale): string {
  return locale === "BCL" ? "en" : HTML_LANG[locale];
}
