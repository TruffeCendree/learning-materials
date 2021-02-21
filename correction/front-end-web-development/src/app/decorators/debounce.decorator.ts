/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 * 
 * See https://blog.bitsrc.io/3-ways-to-debounce-http-requests-in-angular-c407eb165ada
 * 
 * Usage:
 * @Debounce(750)
 * static methodToDebound (args: any) {}
 */
export default function Debounce (ms: number) {
  return function(target: any, key: any, descriptor: any) {
    const oldFunc = descriptor.value;
    const newFunc = debounce(oldFunc, ms);
    descriptor.value = function() {
      return newFunc.apply(this, arguments);
    };
  };
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 * See more at https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore.
 */
function debounce<F extends Function>(func: F, wait: number, immediate = false): F {
  let timeout: number | null;

  return function() {
    // @ts-ignore
    let context = this, args = arguments;

    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);

    if (immediate && !timeout) func.apply(context, args);
  } as any;
}
