"use client";

import { useEffect } from "react";

const motionSelector = "[data-motion]";
const maxMotionIndex = 8;

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

    const assignMotionIndex = (element: Element) => {
      if (!(element instanceof HTMLElement) || element.style.getPropertyValue("--motion-index")) {
        return;
      }

      const parent = element.parentElement;

      if (!parent) {
        return;
      }

      const motionSiblings = Array.from(parent.querySelectorAll(`:scope > ${motionSelector}`));
      const index = motionSiblings.indexOf(element);

      if (index > 0) {
        element.style.setProperty("--motion-index", String(Math.min(index, maxMotionIndex)));
      }
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
      assignMotionIndex(element);

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

    const initialScanFrame = window.requestAnimationFrame(() => {
      scan(document);
    });

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
      window.cancelAnimationFrame(initialScanFrame);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
