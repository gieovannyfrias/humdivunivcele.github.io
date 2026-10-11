// app.js - Registro del Service Worker Corporativo
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Asegúrate de que el nombre aquí coincida exactamente con tu archivo físico
    navigator.serviceWorker
      .register('./service-worker.js') 
      .then(registration => {
        console.log('✅ Service Worker registrado con éxito en el alcance:', registration.scope);
      })
      .catch(err => {
        console.error('❌ Error crítico al registrar el Service Worker:', err);
      });
  });
}
