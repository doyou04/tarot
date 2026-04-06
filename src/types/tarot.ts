export type FateCategory = '연애' | '직업' | '금전' | '건강' | '오늘의 운세';

export interface FateArchiveItem {
  id: string;
  date: string; // ISO 8601 형식
  category: FateCategory;
  summary: string;
}

export interface ChuruInfo {
  count: number;
}

export interface DonationInfo {
  totalAmount: number; // KRW
}

export interface UserSession {
  id: string;
  name: string; // '김집사'
  profileIcon: string; // '🐈‍⬛'
  lang: 'EN' | 'KO'; // 'EN'
}

export interface MyPageData {
  user: UserSession;
  churu: ChuruInfo;
  donation: DonationInfo;
  archive: FateArchiveItem[];
}