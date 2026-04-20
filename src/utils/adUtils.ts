import {
  showFullScreenAd,
} from '@apps-in-toss/framework';

/** 네트워크 상태 감지 */
const isOnline = (): boolean =>
  typeof navigator !== 'undefined' ? (navigator.onLine ?? true) : true;

/**
 * 리워드 광고 안전 래퍼
 * - 오프라인: 광고 없이 보상 지급 (UX 우선)
 * - 광고 실패(네트워크): 보상 지급
 * - 유저 취소: 보상 없음
 */
export const safeShowRewardedAd = async (
  adGroupId: string,
  onSuccess: () => void,
  onFail?: () => void,
): Promise<void> => {
  if (!isOnline()) {
    onSuccess();
    return;
  }

  return new Promise<void>((resolve) => {
    const cleanup = showFullScreenAd({
      options: { adGroupId },
      onEvent: (event) => {
        if (event.type === 'dismissed') {
          onSuccess();
          resolve();
        }
      },
      onError: (e: unknown) => {
        const message = e instanceof Error ? e.message : '';
        const isCancelled = message.includes('cancel') || message.includes('USER_CANCELED');
        if (!isCancelled) {
          onSuccess(); // 광고 실패지만 보상 지급
        } else {
          onFail?.(); // 유저가 직접 닫음
        }
        resolve();
      },
    });
    void cleanup;
  });
};

