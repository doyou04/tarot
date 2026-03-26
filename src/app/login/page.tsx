'use client';

import { signIn } from 'next-auth/react';
import "@/styles/logo.css";
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('login.welcome')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('login.description')}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* 구글 로그인 (해외 유저용) */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="gsi-material-button flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
  <div className="gsi-material-button-state"></div>
  <div className="gsi-material-button-content-wrapper">
    <div className="gsi-material-button-icon">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </svg>
    </div>
    <span className="gsi-material-button-contents">{t('login.google')}</span>
  </div>
          </button>

          {/* 카카오 로그인 (국내 유저용) */}
          <button
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className="flex w-full items-center justify-between gap-3 rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-semibold text-[#191919] transition hover:bg-[#FADA0A]"
          >
            <img src="/images/kakao-icon.png" alt="Kakao" className="h-5 w-5" />
            <span className="text-center flex-grow">{t('login.kakao')}</span>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          {t('login.terms', {
            terms: t('login.termsLink'),
            privacy: t('login.privacyLink'),
          })}
        </p>
      </div>
    </div>
  );
}