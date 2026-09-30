/* p5 instance mode keeps the generative artwork independent of other pages. */
(async () => {
  const host = document.getElementById("murmur-canvas");
  if (!host || !window.p5) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reducedMotion.matches;
  let pointer = { x: -1000, y: -1000 };
  const sentences = [
    "所有的自言自語構築了我們。",
    //遠走
    "那就遠走吧。",
    "世界再大也攔不住你的輕狂。",
    "多麽徬徨就看作是一個笑話。",
    "有我在等你回來。",
    //給你的光
    "但我早在你心裡面。",
    "倔強不被夜色淹滅。",
    "這次你就只管往前。",
    "我想我還沒辦法說再見。",
    "今後你就只管閃爍黑夜。",
    //Luna
    "你的花火之中世界便開始閃爍。",
    "奮不顧身為我保留。",
    "你的眼眸之中時間便從此永久。",
    "我會陪在你的身後。",
    "擁有你哪怕如果。",

    //宇宙裡的星點
    "昨天的夢裡有沒有未來。",
    "我多想知道你的一切。",
    "太多複雜與簡單在你眼底打轉。",
    "試圖在這星空發現你努力忽明忽暗。",
    "一閃而過也算完美。",
    "別急著說再見。",
    "你是星點在宇宙絢爛。",
    //我好想你
    "你是否把自己交給寂寞。",
    "我要擁抱追尋你的痕跡。",
    "請不要再說加油。",
    "要多少努力才能夠再遇見你。",
    "我已經很努力。",
    //共生
    "我不想再次和解。",
    "我要我們不再是一個我。",
    "是什麼留下什麼累積在腦海。",
    "你說我說你說我說你說我說...",
    //輾轉
    "渴望擁抱但遺失所有清澈。",
    "是什麼在不完整的夜翻滾。",
    "輾轉拼湊散落一地溫柔。",
    "倘若無可奈何就放手。",
    "日子斑駁在昨夜夢中。",
    //2.0
    "我多想了解你的悲傷。",
    "你看光陰消逝中相遇的你和我。",
    "但我有一百個故事想跟你說。",
    //海和花
    "我把思念融進了日常。",
    "用旋律穿越到你的身旁。",
    "在蔚藍的海邊開一朵鮮花。",
    "淹不過你的芬芳。",
    "循著你留下的微光。",
  ];
  // p5 treats textFont's string as one family, not a CSS fallback list.
  const nameStyle = getComputedStyle(document.querySelector(".chinese-name"));
  const sentenceFont = nameStyle.fontFamily
    .split(",")[0]
    .trim()
    .replace(/^['"]|['"]$/g, "");
  try {
    // Request every lyric glyph: Google Fonts serves CJK fonts in subsets.
    await document.fonts.load(
      `${nameStyle.fontWeight} 21px "${sentenceFont}"`,
      sentences.join("")
    );
  } catch {
    // Keep the animation available when the remote font is unavailable.
  }
  const accessibleLyrics = document.createElement("p");
  accessibleLyrics.className = "sr-only";
  accessibleLyrics.textContent = sentences.slice(1).join(" ");
  document.querySelector(".sentence-fallback")?.after(accessibleLyrics);
  let sentenceIndex = 0;
  let sentenceTime = 0;
  let time = 0;
  // The home shell appears during the fade, but the opening is still active.
  const openingIsActive = () =>
    document.documentElement.matches(".opening-pending, .opening-active");
  const sketch = new p5((p) => {
    p.setup = () => {
      const canvas = p.createCanvas(host.clientWidth, host.clientHeight);
      canvas.attribute("aria-hidden", "true");
      document
        .querySelector(".sentence-fallback")
        ?.classList.add("canvas-ready");
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(30);
      p.noFill();
      if (paused) p.noLoop();
    };
    p.draw = () => {
      p.clear();
      const w = p.width,
        h = p.height;
      // Open, horizontal contours layer into a quiet tidal surface.
      for (let strand = 0; strand < 38; strand++) {
        const depth = strand / 37;
        p.stroke(188, 223, 218, 12 + depth * 32);
        p.strokeWeight(0.6 + depth * 0.3);
        p.beginShape();
        for (let step = 0; step <= 130; step++) {
          const x = (step / 130) * w;
          const base = h * (0.48 + depth * 0.51);
          const swell =
            Math.sin((x / w) * 8 + time * 0.65 + depth * 5) * (7 + depth * 25);
          const drift =
            (p.noise(x * 0.002, depth * 2, time * 0.12) - 0.5) *
            (14 + depth * 42);
          const distance = Math.hypot(x - pointer.x, (base - pointer.y) * 1.6);
          const ripple =
            Math.sin(distance * 0.038 - time * 3) *
            Math.max(0, 1 - distance / 230) *
            15;
          p.vertex(x, base + swell + drift + ripple);
        }
        p.endShape();
      }
      if (!paused) time += 0.009;
      // Wait for the overlay to be fully dismissed before typing any lyrics.
      if (openingIsActive()) {
        sentenceIndex = 0;
        sentenceTime = 0;
        return;
      }
      // Type, linger, erase, then choose another of the original lyric fragments.
      const sentence = sentences[sentenceIndex];
      const typingDuration = sentence.length * 0.14;
      const holdDuration = 2.8;
      const eraseDuration = sentence.length * 0.08;
      let visible = sentence.length;
      if (!paused || sentenceTime > 0) {
        if (sentenceTime < typingDuration)
          visible = Math.floor(sentenceTime / 0.14);
        else if (sentenceTime > typingDuration + holdDuration) {
          visible = Math.max(
            0,
            sentence.length -
              Math.floor((sentenceTime - typingDuration - holdDuration) / 0.08)
          );
        }
      }
      p.push();
      p.noStroke();
      p.fill(224, 233, 228, 220);
      p.textFont(sentenceFont);
      p.textStyle(p.NORMAL);
      const textSize = h <= 500 && w > h ? 15 : w < 760 ? 18 : 21;
      p.textSize(Math.min(textSize, (w * 0.82) / sentence.length));
      p.textAlign(p.LEFT, p.CENTER);
      const fragment = sentence.slice(0, visible);
      // Center the visible glyphs, including punctuation, rather than the
      // font's advance box (which includes uneven side bearings).
      const context = p.drawingContext;
      context.textAlign = "left";
      const bounds = context.measureText(fragment);
      const left = bounds.actualBoundingBoxLeft ?? 0;
      const right = bounds.actualBoundingBoxRight ?? bounds.width;
      const textX = (w + left - right) / 2;
      p.text(fragment, textX, h * (h <= 500 ? 0.75 : w < 760 ? 0.7 : 0.75));
      p.pop();
      if (!paused) {
        sentenceTime += Math.min(p.deltaTime, 100) / 1000;
        if (
          sentenceTime >
          typingDuration + holdDuration + eraseDuration + 0.8
        ) {
          sentenceIndex =
            (sentenceIndex +
              1 +
              Math.floor(Math.random() * (sentences.length - 1))) %
            sentences.length;
          sentenceTime = 0;
        }
      }
    };
  }, host);
  function syncMotion() {
    if (paused || document.hidden) sketch.noLoop();
    else sketch.loop();
  }
  reducedMotion.addEventListener("change", (event) => {
    paused = event.matches;
    syncMotion();
  });
  document.addEventListener("visibilitychange", syncMotion);
  new MutationObserver(() => {
    if (openingIsActive()) {
      sentenceIndex = 0;
      sentenceTime = 0;
    }
    if (paused) sketch.redraw();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener(
    "pointermove",
    (event) => {
      const rect = host.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    },
    { passive: true }
  );
  document.addEventListener("pointerleave", () => {
    pointer = { x: -1000, y: -1000 };
  });
  new ResizeObserver(() => {
    sketch.resizeCanvas(host.clientWidth, host.clientHeight);
    if (paused) sketch.redraw();
  }).observe(host);
  syncMotion();
})();
