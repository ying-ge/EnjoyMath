/**
 * PWA 工具函数
 */

// 检查是否已安装为 PWA
export const isInstalled = (): boolean => {
  // @ts-ignore
  return window.matchMedia('(display-mode: standalone)').matches ||
         // @ts-ignore
         (window.navigator as any).standalone === true ||
         document.referrer.includes('android-app://');
};

// 显示安装提示
export const showInstallPrompt = (): void => {
  // 这个功能需要浏览器支持 beforeinstallprompt 事件
  // 通常由浏览器自动处理，不需要手动触发
};

// 检查是否在线
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// 监听网络状态变化
export const onNetworkStatusChange = (callback: (online: boolean) => void): (() => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // 返回清理函数
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// 添加桌面快捷方式
export const addToHomeScreen = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // iOS Safari
    if ((window.navigator as any).standalone === false) {
      // 显示提示
      alert('请点击分享按钮，然后选择"添加到主屏幕"');
      resolve();
      return;
    }

    // Android Chrome
    if ('serviceWorker' in navigator) {
      // Service Worker 已注册，浏览器会自动提示
      resolve();
      return;
    }

    reject(new Error('不支持添加到主屏幕'));
  });
};

