/**
 * @file UtilityToolFactory 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

/**
 * UtilityToolFactory 模块
 * @module module:utilityToolFactory
 * @exports module:utilityToolFactory.UtilityToolFactory
 */

export default class UtilityToolFactory {
  /**
   * wait for a certain time
   * @memberof UtilityToolFactory
   * @public
   * @param {number} [time=1000] - the time for wait
   * @returns {Promise}
   * @static
   */
  static wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  /**
   * create a throttled function that only invokes func at most once per every wait milliseconds
   * @memberof UtilityToolFactory
   * @public
   * @param {Function} func - the function to be invoked
   * @param {number} [threshold=160] - the interval time
   * @returns {Function}
   * @static
   */
  static throttle(func, threshold = 160) {
    let id;
    let startTime = new Date();

    return function() {
      const context = this;
      const args = arguments;
      const currentTime = new Date() - 0; // Date.now() or new Date().getTime()

      clearTimeout(id);
      if (currentTime - startTime >= threshold) {
        func.apply(context, args);
        startTime = currentTime;
      } else {
        id = setTimeout(() => func.apply(context, args), threshold);
      }
    };
  }
}
