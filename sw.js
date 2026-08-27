/* 자폭 서비스 워커.
 *
 * 이 주소(ncs-exam-app)는 ncs-pass-app 으로 옮겼다. 그런데 예전에 방문한
 * 브라우저에는 **옛 서비스 워커가 남아 캐시에서 옛 앱을 계속 내준다** —
 * 리다이렉트 페이지를 올려도 그 화면이 보이지 않는다.
 *
 * 브라우저는 네비게이션 때 등록된 워커의 스크립트를 다시 받아 본다.
 * 그때 이 파일이 내려가 캐시를 전부 지우고 자신을 등록 해제하고,
 * 열려 있는 탭을 새로 고쳐 리다이렉트 페이지가 뜨게 한다.
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
