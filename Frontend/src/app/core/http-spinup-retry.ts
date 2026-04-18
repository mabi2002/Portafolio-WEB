import { MonoTypeOperatorFunction, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

/**
 * Reintenta cuando el backend está despertando (Render free: 502/503/504 o red status 0).
 * Cuatro reintentos con espera creciente cubren ~30s de cold start sin tocar el servidor.
 */
export function retryWhileBackendSpinup<T>(): MonoTypeOperatorFunction<T> {
  return retry({
    count: 4,
    delay: (_err, attempt) => timer(Math.min(1600 * attempt, 9000)),
  });
}
