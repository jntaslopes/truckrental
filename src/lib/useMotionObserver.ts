"use client";

import { useEffect } from "react";

const motionSelector = "[data-motion]";

export function useMotionObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observedElements = new WeakSet<Element>();
    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight * 0.92;
    };

    const reveal = (element: Element) => {
      element.classList.add("motion-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    const observe = (element: Element) => {
      if (observedElements.has(element)) {
        return;
      }

      observedElements.add(element);

      if (reducedMotion.matches) {
        reveal(element);
        return;
      }

      if (isInViewport(element)) {
        reveal(element);
        return;
      }

      observer.observe(element);
    };

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(motionSelector)) {
        observe(root);
      }

      root.querySelectorAll(motionSelector).forEach(observe);
    };

    scan(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            scan(node);
          }
        });
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
