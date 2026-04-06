import { MyPageData } from '@/src/types/tarot';

export const mockMyPageData: MyPageData = {
  // 1. 유저 세션 정보 (상단 바 및 프로필용)
  user: {
    id: 'user_shiba_0202',
    name: '김집사',
    profileIcon: '🐈‍⬛',
    lang: 'KO',
  },

  // 2. 츄르 보유 현황 (990원 단위의 포인트)
  churu: {
    count: 5, // 현재 5츄르 보유 중
  },

  // 3. 누적 기부 내역 (990원 결제 시마다 100원씩 적립된 가라 데이터)
  donation: {
    totalAmount: 1200, // 12번 유료 운세를 보셨군요!
  },

  // 4. 운세 아카이브 리스트 (양피지 스크롤에 들어갈 5개의 데이터)
  archive: [
    {
      id: 'fate_888',
      date: '2026-03-27T10:30:00Z',
      category: '금전',
      summary: '뜻밖의 츄르값이 들어올 운세입니다. 복권을 사보셔도 좋겠네요.',
    },
    {
      id: 'fate_777',
      date: '2026-03-26T14:20:00Z',
      category: '연애',
      summary: '질투심을 버리고 서로에 대한 신뢰를 회복해야 할 때입니다.',
    },
    {
      id: 'fate_666',
      date: '2026-03-26T09:15:00Z',
      category: '직업',
      summary: '갑작스러운 변화가 예상되나, 결과적으로는 안정적인 궤도에 오릅니다.',
    },
    {
      id: 'fate_555',
      date: '2026-03-25T22:00:00Z',
      category: '건강',
      summary: '무릎냥이와 함께하는 휴식이 보약입니다. 충분히 쉬어주세요.',
    },
    {
      id: 'fate_444',
      date: '2026-03-24T08:45:00Z',
      category: '오늘의 운세',
      summary: '오늘은 시크릿이 당신의 앞길을 꾹꾹이로 응원해주는 날입니다.',
    },
  ],
};