export default function recordConversion() {
  console.log('Will fire conversion events');
  window.gtag &&
    window.gtag('event', 'conversion', {
      send_to: 'AW-557434647/ZQWfCIOv-ZQYEJeO54kC',
    });
  window.lintrk && window.lintrk('track', { conversion_id: 12933769 });
}
