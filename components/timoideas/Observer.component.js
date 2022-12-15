import { useEffect, useRef } from "react";
export default function Observer({
  root = null,
  className = "",
  animation = false,
  onIntersect = () => {},
  threshold = 0.5,
  rootMargin = "0px",
  trackVisibility = true,
  children,
  ...props
}) {
  const refObserver = useRef();
  useEffect(() => {
    const target = refObserver.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation && (target.style.animation = animation);
            onIntersect(entry);
            if (!trackVisibility) {
              observer.unobserve(target);
            }
          } else {
            animation && (target.style.animation = "");
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
    if (target) {
      observer.observe(target);
    }
    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, trackVisibility, onIntersect, root]);
  return (
    <div ref={refObserver} className={className} {...props}>
      {children}
    </div>
  );
}
