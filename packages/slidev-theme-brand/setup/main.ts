import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(() => {
  if (typeof window === 'undefined')
    return
  const root = document.documentElement
  // Exports and the og-image capture load slides with ?print
  if (new URLSearchParams(window.location.search).has('print'))
    root.classList.add('slidev-print')
  // Slidev 53.1 only clears its "Caching for offline…" badge on the first install,
  // so on later visits it never goes away. A controlling worker means the deck is already cached.
  if (navigator.serviceWorker?.controller)
    root.classList.add('slidev-pwa-cached')
})
