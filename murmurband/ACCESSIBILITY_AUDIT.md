# Accessibility review — 2026-09-28

Scope: all 15 generated pages, shared components, active JavaScript, and responsive styles. Reference: WCAG 2.2 Level AA.

## Fixed

- Added missing main landmarks, level-one headings, page titles, navigation labels, image alternatives, and homepage/legacy skip navigation.
- Kept decorative images silent and removed duplicated cover-art announcements from release links; marked English passages and made the releases a semantic list.
- Strengthened keyboard focus indicators and kept footer focus outlines inside the viewport.
- Added intro dialog semantics, initial focus, contained Tab navigation, Escape dismissal, and focus restoration.
- Enabled the existing homepage animation pause button once the canvas loads. The continuous animation requires a stop mechanism under WCAG 2.2.2; no additional global control was introduced.
- Provided existing canvas lyric fragments as static screen-reader text without repeated live announcements. Preserved reduced-motion support and extended it to legacy CSS animations.
- Named and connected the legacy menu checkbox to its menu; corrected its target size and link contrast.
- Prevented header/footer crowding with enlarged text and kept the animation button clear of a wrapping footer.
- Corrected photographic text contrast: slightly darker homepage photo treatment, brighter canvas lyrics/footer text, and a solid backing behind the legacy Concert placeholder text.
- Fixed legacy image overflow and narrow-screen navigation overlap. Preserved existing typography, branding, artwork, and animation style.

## Verification

- Production build passed for all 15 routes.
- axe-core 4.10.3: 30 scans at 1440px and 320px, using WCAG 2 A/AA, 2.1 AA, 2.2 AA and best-practice rules; no reported violations after fixes. The final About layout adjustment also passed both widths.
- 26 scripted interaction/reflow checks passed: skip navigation, intro focus and Escape, keyboard pause and stable paused canvas, reduced motion, legacy menu, seven representative page types at a 200%-zoom-equivalent viewport, and doubled text at 320px.
- Generated HTML: each page has one main landmark and one h1; no duplicate IDs, missing image alt attributes, or positive tabindex values.
- Inspected desktop/mobile screenshots. Separately sampled photographic backgrounds where axe could not determine contrast: homepage navigation >=4.67:1, homepage footer text >=5.98:1, canvas lyric estimate >=5.05:1, and sampled inner-page text >=4.8:1. These samples are not exhaustive measurements of every animation frame.

## Remaining manual/content work

- Conduct a live VoiceOver/NVDA review and native browser zoom checks across supported browsers. The automated checks and simulated resizing do not certify full WCAG conformance.
- Verify captions, transcripts, and any necessary audio descriptions on linked external YouTube/music content. There are no active embedded audio/video players needing fabricated tracks. The intro video is muted decorative imagery with a working skip mechanism; the GIF asset is not referenced by active pages.
- The older Concert page still contains its existing “hello world” placeholder. Supply actual concert content if that page is intended for visitors.
- Photo alternatives were based on the visible images; no identities, captions, transcripts, or new descriptive facts were invented.

Reference: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

## Subsequent user-requested change

The homepage play/pause button and its related styles/handlers were removed at the owner’s request. Reduced-motion and background-tab pausing remain. The pause-button test results above describe the earlier audited version; continuous animation without a visitor stop mechanism remains an exception to WCAG 2.2.2.
