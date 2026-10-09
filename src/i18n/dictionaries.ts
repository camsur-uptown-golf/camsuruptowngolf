import type { Locale } from "./config";

/**
 * Mga salin ng teksto ng site, isang key kada parirala.
 *
 * UNANG SLICE ITO: header/nav at homepage lang muna ang naka-key dito. Susunod
 * na passes ang magdadagdag ng iba pang pahina — kada bagong teksto, magdagdag
 * ng key sa `en` (siyang pinagbabatayan ng uri) saka isalin sa bawat wika.
 *
 * PROPER NOUNS (hindi isinasalin): "CamSur Uptown Golf Club", "IMG",
 * "Villa Del Rey", "Est. 2026", "Mt. Isarog" — mananatili sa orihinal sa lahat
 * ng wika.
 *
 * PAALALA SA QUALITY: AI-drafted ang mga salin (lalo ang Bikol) — kailangang
 * i-review/ipa-review sa club bago i-publish. Nakalagay dito para gumana agad
 * ang mechanism; madaling palitan ang string ng anumang key kada wika.
 */

/* Ang English ang batayan ng mga susi (keys). */
export const en = {
  "nav.golf": "Golf",
  "nav.clubhouse": "Clubhouse",
  "nav.packages": "Packages",
  "nav.events": "Events",
  "nav.experiences": "Experiences",
  "nav.accommodations": "Accommodations",
  "nav.home": "Home",
  "action.planVisit": "Plan Your Visit",
  "action.planRound": "Plan your round",
  "mobile.menu": "Menu",
  "mobile.explore": "Explore CamSur Uptown",
  "mega.highlights": "Highlights",
  "mega.goBack": "Go back",
  "mega.viewAll": "View all",
  "lang.select": "Select language",
  "home.designedBy": "Designed by",
  "home.imgTagline": "The Global Leader in Golf Course Design",
  "facts.holes": "Championship holes",
  "facts.par": "Course par",
  "facts.hectares": "Hectares",
  "facts.architect": "Course design",
  "course.eyebrow": "The Course",
  "course.holeNo": "Hole No.",
  "course.hole": "Hole",
  "course.holeProgressLabel": "Hole {current} of {total}",
  "action.explore": "Explore",
  "packages.ctaExplore": "Explore packages",
  "packages.ctaView": "View package",
  "carousel.next": "Next",
  "packages.blurbMain":
    "Choose a quick round, an overnight stay, or a golf trip with friends. Our packages make your visit easy to plan.",
  "packages.blurbStayPlay":
    "Enjoy two relaxing days at CamSur Uptown with one overnight stay and one full round of golf.",
  "packages.blurbGroup":
    "Spend three days golfing with friends. The package includes two overnight stays, two full rounds, and free time to relax together.",
} as const;

/** Bawat key sa site — hinango sa English para tiyak na kumpleto ang bawat wika. */
export type TranslationKey = keyof typeof en;

export type Dictionary = Record<TranslationKey, string>;

const fil: Dictionary = {
  "nav.golf": "Golf",
  "nav.clubhouse": "Clubhouse",
  "nav.packages": "Mga Package",
  "nav.events": "Mga Kaganapan",
  "nav.experiences": "Mga Karanasan",
  "nav.accommodations": "Matutuluyan",
  "nav.home": "Home",
  "action.planVisit": "Planuhin ang Pagbisita",
  "action.planRound": "Planuhin ang iyong laro",
  "mobile.menu": "Menu",
  "mobile.explore": "Tuklasin ang CamSur Uptown",
  "mega.highlights": "Mga Highlight",
  "mega.goBack": "Bumalik",
  "mega.viewAll": "Tingnan lahat",
  "lang.select": "Pumili ng wika",
  "home.designedBy": "Dinisenyo ng",
  "home.imgTagline": "Ang Pandaigdigang Lider sa Disenyo ng Golf Course",
  "facts.holes": "Championship holes",
  "facts.par": "Course par",
  "facts.hectares": "Ektarya",
  "facts.architect": "Disenyo ng course",
  "course.eyebrow": "Ang Golf Course",
  "course.holeNo": "Hole No.",
  "course.hole": "Butas",
  "course.holeProgressLabel": "Butas {current} sa {total}",
  "action.explore": "Tuklasin",
  "packages.ctaExplore": "Tuklasin ang mga package",
  "packages.ctaView": "Tingnan ang package",
  "carousel.next": "Susunod",
  "packages.blurbMain":
    "Pumili ng mabilisang laro, overnight stay, o golf trip kasama ang mga kaibigan. Ginagawang madaling planuhin ng aming mga package ang iyong pagbisita.",
  "packages.blurbStayPlay":
    "Mag-enjoy ng dalawang araw ng relaks sa CamSur Uptown na may isang overnight stay at isang buong round ng golf.",
  "packages.blurbGroup":
    "Gumugol ng tatlong araw na golf kasama ang mga kaibigan. Kasama sa package ang dalawang overnight stay, dalawang buong round, at libreng oras para magpahinga nang sama-sama.",
};

const bcl: Dictionary = {
  "nav.golf": "Golf",
  "nav.clubhouse": "Clubhouse",
  "nav.packages": "Mga Package",
  "nav.events": "Mga Kaganapan",
  "nav.experiences": "Mga Eksperyensya",
  "nav.accommodations": "Matuluyan",
  "nav.home": "Home",
  "action.planVisit": "Planuhon an Pagbisita",
  "action.planRound": "Planuhon an saimong laro",
  "mobile.menu": "Menu",
  "mobile.explore": "Eksplorahon an CamSur Uptown",
  "mega.highlights": "Mga Highlight",
  "mega.goBack": "Magbalik",
  "mega.viewAll": "Hilingon gabos",
  "lang.select": "Pumili nin lengguwahe",
  "home.designedBy": "Dinisenyo ni",
  "home.imgTagline": "An Pankinaban na Lider sa Disenyo nin Golf Course",
  "facts.holes": "Championship holes",
  "facts.par": "Course par",
  "facts.hectares": "Ektarya",
  "facts.architect": "Disenyo kan course",
  "course.eyebrow": "An Golf Course",
  "course.holeNo": "Hole No.",
  "course.hole": "Butas",
  "course.holeProgressLabel": "Butas {current} sa {total}",
  "action.explore": "Eksplorahon",
  "packages.ctaExplore": "Eksplorahon an mga package",
  "packages.ctaView": "Hilingon an package",
  "carousel.next": "Sunod",
  "packages.blurbMain":
    "Pumili nin madaling laro, sarong banggi na pagdagos, o golf trip kaiba an mga amigo. Ginigibong pasil planuhon kan samong mga package an saimong pagbisita.",
  "packages.blurbStayPlay":
    "Mag-enjoy nin duwang aldaw na relaks sa CamSur Uptown na may sarong banggi na pagdagos asin sarong bilog na round nin golf.",
  "packages.blurbGroup":
    "Gumamit nin tulong aldaw na golf kaiba an mga amigo. Kaiba sa package an duwang banggi na pagdagos, duwang bilog na round, asin libreng oras para magpahingalo na sararo.",
};

const ko: Dictionary = {
  "nav.golf": "골프",
  "nav.clubhouse": "클럽하우스",
  "nav.packages": "패키지",
  "nav.events": "이벤트",
  "nav.experiences": "체험",
  "nav.accommodations": "숙박",
  "nav.home": "홈",
  "action.planVisit": "방문 계획",
  "action.planRound": "라운드 예약",
  "mobile.menu": "메뉴",
  "mobile.explore": "CamSur Uptown 둘러보기",
  "mega.highlights": "하이라이트",
  "mega.goBack": "뒤로",
  "mega.viewAll": "모두 보기",
  "lang.select": "언어 선택",
  "home.designedBy": "설계",
  "home.imgTagline": "골프 코스 디자인의 글로벌 리더",
  "facts.holes": "챔피언십 홀",
  "facts.par": "코스 파",
  "facts.hectares": "헥타르",
  "facts.architect": "코스 디자인",
  "course.eyebrow": "코스",
  "course.holeNo": "홀",
  "course.hole": "홀",
  "course.holeProgressLabel": "전체 {total}홀 중 {current}번 홀",
  "action.explore": "둘러보기",
  "packages.ctaExplore": "패키지 둘러보기",
  "packages.ctaView": "패키지 보기",
  "carousel.next": "다음",
  "packages.blurbMain":
    "간단한 라운드, 1박 숙박, 또는 친구들과의 골프 여행 중에서 선택하세요. 저희 패키지로 방문 계획이 쉬워집니다.",
  "packages.blurbStayPlay":
    "1박 숙박과 골프 한 라운드로 CamSur Uptown에서 여유로운 이틀을 즐기세요.",
  "packages.blurbGroup":
    "친구들과 함께 3일간 골프를 즐기세요. 패키지에는 2박 숙박, 2라운드, 그리고 함께 쉴 수 있는 자유 시간이 포함됩니다.",
};

const vi: Dictionary = {
  "nav.golf": "Golf",
  "nav.clubhouse": "Nhà câu lạc bộ",
  "nav.packages": "Gói dịch vụ",
  "nav.events": "Sự kiện",
  "nav.experiences": "Trải nghiệm",
  "nav.accommodations": "Chỗ ở",
  "nav.home": "Trang chủ",
  "action.planVisit": "Lên kế hoạch tham quan",
  "action.planRound": "Lên kế hoạch cho vòng chơi",
  "mobile.menu": "Menu",
  "mobile.explore": "Khám phá CamSur Uptown",
  "mega.highlights": "Nổi bật",
  "mega.goBack": "Quay lại",
  "mega.viewAll": "Xem tất cả",
  "lang.select": "Chọn ngôn ngữ",
  "home.designedBy": "Thiết kế bởi",
  "home.imgTagline": "Người dẫn đầu toàn cầu về thiết kế sân golf",
  "facts.holes": "Hố đấu vô địch",
  "facts.par": "Par sân",
  "facts.hectares": "Héc-ta",
  "facts.architect": "Thiết kế sân golf",
  "course.eyebrow": "Sân golf",
  "course.holeNo": "Lỗ",
  "course.hole": "Hố",
  "course.holeProgressLabel": "Hố {current} trên {total}",
  "action.explore": "Khám phá",
  "packages.ctaExplore": "Khám phá gói dịch vụ",
  "packages.ctaView": "Xem gói",
  "carousel.next": "Tiếp theo",
  "packages.blurbMain":
    "Chọn một vòng chơi nhanh, một đêm nghỉ, hoặc một chuyến golf cùng bạn bè. Các gói của chúng tôi giúp bạn dễ dàng lên kế hoạch cho chuyến thăm.",
  "packages.blurbStayPlay":
    "Tận hưởng hai ngày thư giãn tại CamSur Uptown với một đêm nghỉ và một vòng golf đầy đủ.",
  "packages.blurbGroup":
    "Dành ba ngày chơi golf cùng bạn bè. Gói bao gồm hai đêm nghỉ, hai vòng chơi đầy đủ và thời gian rảnh để thư giãn cùng nhau.",
};

const zh: Dictionary = {
  "nav.golf": "高尔夫",
  "nav.clubhouse": "会所",
  "nav.packages": "套餐",
  "nav.events": "活动",
  "nav.experiences": "体验",
  "nav.accommodations": "住宿",
  "nav.home": "首页",
  "action.planVisit": "规划您的行程",
  "action.planRound": "规划您的球局",
  "mobile.menu": "菜单",
  "mobile.explore": "探索 CamSur Uptown",
  "mega.highlights": "亮点",
  "mega.goBack": "返回",
  "mega.viewAll": "查看全部",
  "lang.select": "选择语言",
  "home.designedBy": "设计",
  "home.imgTagline": "全球高尔夫球场设计的领导者",
  "facts.holes": "锦标赛球洞",
  "facts.par": "球场标准杆",
  "facts.hectares": "公顷",
  "facts.architect": "高尔夫球场设计",
  "course.eyebrow": "球场",
  "course.holeNo": "球洞",
  "course.hole": "球洞",
  "course.holeProgressLabel": "第 {current} 洞，共 {total} 洞",
  "action.explore": "探索",
  "packages.ctaExplore": "探索套餐",
  "packages.ctaView": "查看套餐",
  "carousel.next": "下一项",
  "packages.blurbMain": "选择快速一局、过夜住宿，或与朋友的高尔夫之旅。我们的套餐让您的行程轻松规划。",
  "packages.blurbStayPlay": "在 CamSur Uptown 享受轻松的两天，包含一晚住宿和一整场高尔夫。",
  "packages.blurbGroup": "与朋友共度三天高尔夫时光。套餐包含两晚住宿、两整场高尔夫，以及一起放松的自由时间。",
};

const ja: Dictionary = {
  "nav.golf": "ゴルフ",
  "nav.clubhouse": "クラブハウス",
  "nav.packages": "パッケージ",
  "nav.events": "イベント",
  "nav.experiences": "体験",
  "nav.accommodations": "宿泊",
  "nav.home": "ホーム",
  "action.planVisit": "訪問を計画する",
  "action.planRound": "ラウンドを計画する",
  "mobile.menu": "メニュー",
  "mobile.explore": "CamSur Uptown を見る",
  "mega.highlights": "ハイライト",
  "mega.goBack": "戻る",
  "mega.viewAll": "すべて見る",
  "lang.select": "言語を選択",
  "home.designedBy": "設計",
  "home.imgTagline": "ゴルフコース設計のグローバルリーダー",
  "facts.holes": "チャンピオンシップホール",
  "facts.par": "コースパー",
  "facts.hectares": "ヘクタール",
  "facts.architect": "ゴルフコース設計",
  "course.eyebrow": "コース",
  "course.holeNo": "ホール",
  "course.hole": "ホール",
  "course.holeProgressLabel": "全{total}ホール中、第{current}ホール",
  "action.explore": "見る",
  "packages.ctaExplore": "パッケージを見る",
  "packages.ctaView": "パッケージを見る",
  "carousel.next": "次へ",
  "packages.blurbMain":
    "気軽な1ラウンド、1泊のご宿泊、または友人とのゴルフ旅行からお選びください。当パッケージでご訪問の計画が簡単になります。",
  "packages.blurbStayPlay":
    "1泊のご宿泊とゴルフ1ラウンドで、CamSur Uptown での寛ぎの2日間をお楽しみください。",
  "packages.blurbGroup":
    "友人と3日間ゴルフを満喫。パッケージには2泊のご宿泊、2ラウンド、そして一緒に寛ぐ自由時間が含まれます。",
};

export const DICTIONARIES: Record<Locale, Dictionary> = {
  EN: en,
  FIL: fil,
  BCL: bcl,
  KO: ko,
  VI: vi,
  ZH: zh,
  JA: ja,
};
