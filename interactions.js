(() => {
  const root = document.documentElement;
  const body = document.body;
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pointerFrame = 0;
  let lastPointerEvent;

  const setPointer = (event) => {
    lastPointerEvent = event;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      root.style.setProperty('--pointer-x', `${lastPointerEvent.clientX}px`);
      root.style.setProperty('--pointer-y', `${lastPointerEvent.clientY}px`);
      body.classList.add('has-pointer');
      pointerFrame = 0;
    });
  };

  if (supportsFinePointer && !prefersReducedMotion) {
    window.addEventListener('pointermove', setPointer, { passive: true });
  }

  const tiltTargets = document.querySelectorAll(
    '.feature-article, .article-card, .contributor-card, .mentor-card, .article-figure, .bio-placeholder'
  );

  tiltTargets.forEach((target) => {
    target.classList.add('tilt-card');
    if (!supportsFinePointer || prefersReducedMotion) return;

    target.addEventListener('pointermove', (event) => {
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((0.5 - (y / rect.height)) * 8);

      target.style.setProperty('--card-x', `${x}px`);
      target.style.setProperty('--card-y', `${y}px`);
      target.style.setProperty('--tilt-x', `${rotateY.toFixed(2)}deg`);
      target.style.setProperty('--tilt-y', `${rotateX.toFixed(2)}deg`);
    }, { passive: true });

    target.addEventListener('pointerleave', () => {
      target.style.setProperty('--tilt-x', '0deg');
      target.style.setProperty('--tilt-y', '0deg');
      target.style.setProperty('--card-x', '50%');
      target.style.setProperty('--card-y', '50%');
    });
  });

  const revealTargets = document.querySelectorAll([
    '.editors-note',
    '.section-block',
    '.feature-article',
    '.article-card',
    '.contributor-card',
    '.mentor-card',
    '.footer-grid > div',
    '.article-header',
    '.article-body > *',
    '.article-footer',
    '.bio-header',
    '.bio-placeholder',
    '.bio-nav'
  ].join(','));

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-item');
    target.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
  });

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  revealTargets.forEach((target) => observer.observe(target));
})();
