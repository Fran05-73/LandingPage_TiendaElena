document.addEventListener('DOMContentLoaded', () => {
  // Actualizar año automáticamente
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Observer para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Dejar de observar después de animar
      }
    });
  }, observerOptions);

  // Aplicar a todos los elementos con clase .fade-up
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
});