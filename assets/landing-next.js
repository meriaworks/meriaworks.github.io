(() => {
  const selector = ".reveal,.rv,.rvl,.rvs,[data-reveal]";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("mw-reveal-ready");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in-view", "show", "seen");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -6%", threshold: 0.06 });

  document.querySelectorAll(selector).forEach((element) => observer.observe(element));
})();
