// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원할 언어 목록
  locales: ['ko', 'en'],
  
  // 기본 언어 (사용자의 브라우저 언어가 locales에 없을 때 폴백되는 언어)
  defaultLocale: 'ko',

  // 🌟 핵심: 자동 감지(locale detection)를 켤지 말지 설정 (기본값이 true입니다)
  localeDetection: true,
  localePrefix: 'as-needed'
});

// 미들웨어가 작동할 경로 설정 (API, _next/static, 이미지 파일 등은 제외)
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};