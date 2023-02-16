import type { ReportCallback } from 'web-vitals'

/**
 * @see https://github.com/GoogleChrome/web-vitals
 */
export const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(
      ({ onCLS, onFCP, onFID, onLCP, onTTFB, onINP }) => {
        onCLS(onPerfEntry)
        onFID(onPerfEntry)
        onFCP(onPerfEntry)
        onFCP(onPerfEntry)
        onLCP(onPerfEntry)
        onINP(onPerfEntry)
        onTTFB(onPerfEntry)
      }
    )
  }
}
