class ResizeObserverManager {
  private static instance: ResizeObserverManager;
  private observer: ResizeObserver;
  private callbacks = new Map<Element, (entry: ResizeObserverEntry) => void>();

  private constructor() {
    this.observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const callback = this.callbacks.get(entry.target);
        if (callback) callback(entry);
      });
    });
  }

  // 单例模式获取实例
  public static getInstance(): ResizeObserverManager {
    if (!ResizeObserverManager.instance) {
      ResizeObserverManager.instance = new ResizeObserverManager();
    }
    return ResizeObserverManager.instance;
  }

  // 注册监听
  public observe(
    element: Element,
    callback: (entry: ResizeObserverEntry) => void
  ) {
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  // 取消监听
  public unobserve(element: Element) {
    this.callbacks.delete(element);
    this.observer.unobserve(element);
  }
}
const globalResizeObserver = ResizeObserverManager.getInstance();

// 导出全局唯一实例
export default globalResizeObserver;
