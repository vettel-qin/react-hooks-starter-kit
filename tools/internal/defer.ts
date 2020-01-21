class Defer<T = void> {
  public readonly promise: Promise<T>;
  public resolve!: (value?: T | Promise<T>) => void;
  public reject!: (reason?: any) => void;

  /**
   * Initialize deferred promise
   */
  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default Defer;
