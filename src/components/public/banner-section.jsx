import { useKeenSlider } from "keen-slider/react";
import { useSiteConfig } from "@/context/site-config-context";
import { useEffect } from "react";

export default function BannerSection() {
  const { siteConfig, loading } = useSiteConfig();

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 1,
      spacing: 0,
    },
    created(s) {
      // Setup autoplay logic here
      let timeout;
      let mouseOver = false;

      function clearNextTimeout() {
        clearTimeout(timeout);
      }

      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          s.next();
        }, 2000);
      }

      s.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      s.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });

      nextTimeout();

      // Also clear timeout on destroy
      s.on("destroyed", () => {
        clearNextTimeout();
      });
    },
    dragStarted(s) {
      // Stop autoplay while dragging
      clearTimeout(timeout);
    },
    animationEnded(s) {
      // Restart autoplay
      nextTimeout();
    },
    updated(s) {
      nextTimeout();
    },
  });

  if (loading || !siteConfig?.bannerImages?.length) return null;

  return (
    <section className="relative top-0">
      <div ref={sliderRef} className="keen-slider">
        {siteConfig.bannerImages.map((img, idx) => (
          <div key={idx} className="keen-slider__slide">
            <img
              src={img}
              alt={`Banner ${idx + 1}`}
              className="w-full h-[550px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
