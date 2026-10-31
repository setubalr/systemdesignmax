# Motion stack

Read this when you choose which library carries an effect, when the page is built in a framework rather
than static HTML, or before adding any dependency that moves things. `motion.md` says what to animate and
how fast. This file says what to animate it with, what each choice costs in licence and weight, and how it
is wired into the project.

## Contents

1. Choose by effect
2. Licences that change the decision
3. Install and pin
4. Framework wiring
5. What stays out
6. Checks before a library ships

## 1. Choose by effect

Start with the cheapest engine that does the job. Each row is a default, not a rule to force.

| Effect | Use | Fallback when it does not run |
| --- | --- | --- |
| Load sequence, reveals, line rises, press and hover, page transitions | CSS keyframes, `transition`, `@view-transition` (`motion.md` recipes) | The finished state is the default |
| Scroll-linked drift, progress, a scaling wordmark | CSS scroll timelines inside `@supports (animation-timeline: view())` | Static finished state |
| Component motion in a React app: layout changes, exits, gestures, shared elements | Motion (`motion/react`) | CSS for the same effect |
| Held scroll scenes, timelines, text splits, pinned sequences | GSAP with ScrollTrigger (SplitText when a scene splits text), through `stage.js` | Finished composition (`is-rest`) |
| Weighted wheel scrolling | Lenis, through `Stage.smooth()` | Native scrolling |
| A designer's After Effects animation, played as it was made | Lottie (lottie-web or the dotLottie player) | Poster frame |
| An interactive vector with states, made by a designer | Rive runtime | Poster frame |
| A 3D object in a scroll scene or a hero | React Three Fiber with drei in React; Three.js in plain JavaScript | Poster image |
| A shader field behind a section | Paper Shaders | Flat colour or a real picture |
| A clip of the subject's world | Muted loop from `assets.mjs --video`, with a poster frame | Poster frame |

Two rules hold across the table:

- **One engine per job on a page.** A React page may use Motion for components and GSAP for scenes,
  never both on the same element.
- **A shader field is a gradient in all but name.** The house rules ban gradients as backgrounds, so a
  shader field appears only where the dealt direction or style allows it, and never as a stand-in for a
  picture.

## 2. Licences that change the decision

| Library | Licence | Commercial use | Check before shipping |
| --- | --- | --- | --- |
| Motion | MIT | Yes | Motion+ is a separate paid product. Nothing in this file needs it. |
| GSAP, with ScrollTrigger, SplitText and MorphSVG | Standard "No Charge" licence, effective 30 April 2025 (Webflow). The former Club plugins are included | Yes | It excludes a no-code visual animation tool that competes with Webflow's own animation features. Read the licence text before shipping a page builder on GSAP. |
| Lenis | MIT | Yes | None for the site. |
| Lottie player | MIT, per index metadata | Yes | Confirm the LICENSE in the repository. The animation file comes from the designer and needs its own check. |
| Rive | Runtimes MIT. The editor is free to learn with. Exports for production need a paid plan, per Rive's October 2025 pricing change as reported by third parties | Depends on plan | Confirm current pricing on rive.app. Work made on the free plan is not cleared by this file. |
| React Three Fiber and drei | MIT | Yes | `react-three-fiber` is deprecated. Use `@react-three/fiber`. |
| Three.js | MIT, not re-checked for this file | Yes | Confirm the LICENSE in the repository. |
| Paper Shaders | Apache-2.0 | Yes | Pre-1.0. Pin the exact version. |
| Theatre.js | Core Apache-2.0. Studio AGPL-3.0 | Core: yes | The Studio is a design-time tool and never ships in the bundle. Confirm on the repository. |
| Remotion | Source-available, not open source. Free for individuals, nonprofits and organisations of up to 3 people. Company licence from 4 people. No resale of derivatives | Depends on size | Not for the site runtime. Its licence changes in version 5.0; check the version you install. |
| Spline | Proprietary. The free plan adds a watermark to web exports | Depends on plan | The runtime loads from Spline's servers, and each re-export changes the scene URL. |

Read the LICENSE file of the installed version before a release. Record the licence of each library in the
report next to the other credits.

## 3. Install and pin

Pin exact versions everywhere a version appears: CDN URLs, `package.json` and the lockfile. Never
`@latest`, a caret, a tilde or a bare major. `stage.js` pins `gsap@3.15.0` and `lenis@1.3.26`.

```bash
npm install --save-exact gsap@3.15.0 lenis@1.3.26
npm install --save-exact motion@<the version you tested>
```

Run `npm view motion version` to see the current release, then pin the one you tested. The same rule
applies to the other packages in this file:

- Paper Shaders: `@paper-design/shaders-react@<version>`. Its own docs use `0.0.72` as the example pin.
- Spline: `@splinetool/react-spline` in React, `@splinetool/runtime` in plain JavaScript.
- Rive in React: `rive-react`.
- 3D in React: `@react-three/fiber`, `@react-three/drei`, `three`.
- Lottie: check the player's package name on npm before installing. The lottie-web and dotLottie names differ.

## 4. Framework wiring

**Static HTML.** Use `stage.js` and the CDN lines in `scenes.md` section 2. Nothing else is needed.

**React and Next.js.**

- Render the finished state on the server. A hidden starting state (`opacity: 0`, a shifted transform) set
  in JSX goes into the HTML and stays there if the script never runs. Put hidden states behind the `html.js`
  gate in CSS, or set them only after mount, so the page reads without JavaScript.
- GSAP inside components: build timelines in `useLayoutEffect` inside `gsap.context()`, and call
  `ctx.revert()` in the cleanup. This survives React StrictMode's double mount. Register plugins once per
  module, not once per component.
- Motion in the Next.js App Router: keep animated components in files marked `"use client"`. Layout
  animations and `AnimatePresence` belong in client components; server components render the finished markup.
- Lenis: create one instance in a top-level client component, call `lenis.destroy()` in the cleanup, and
  drive it from the GSAP ticker as `stage.js` does.
- Scenes: a scene's `build(tl, ctx)` function is plain code and ports unchanged. Keep the `Scenes` registry
  and the reduced-motion `gsap.matchMedia` logic from `stage.js`; neither depends on the framework.
- 3D: set `frameloop="demand"` on `<Canvas>` while the object is off screen or the tab is hidden. Cap the
  pixel ratio with `dpr={[1, 2]}`. Show the poster until the first frame is ready. Dispose geometries and
  textures on unmount.
- Refresh ScrollTrigger after fonts and pictures load, as `Stage.ready()` does in the plain version.

**Vue, Svelte, Astro.**

- Vue: start GSAP in `onMounted` and revert it in `onUnmounted`. Hidden states stay behind the `html.js` gate.
- Svelte: start in `onMount` and return the cleanup from it.
- Astro: the static output already carries the finished page. Hydrate a scene component with
  `client:visible`, so its code loads only when the scene nears the screen.

## 5. What stays out

- Scroll-hijacking libraries that replace native scrolling. Scrolling is native, weighted only through `Stage.smooth()`.
- Custom cursors and cursor trails.
- Preloader libraries. The first frame is the HTML.
- A second smooth-scroll library next to Lenis.
- Motion+ or any other paid motion pack as a dependency.
- Remotion or any video renderer in the site runtime.
- Spline or Three.js for a scene that a poster and a clip can carry.
- Lottie or Rive for interface controls that CSS or Motion already handle.
- Any library loaded at `@latest`.

## 6. Checks before a library ships

1. The licence is read on the installed version and recorded in the report.
2. The version is pinned everywhere it appears, and matches the pin in `stage.js` when it is a CDN file.
3. `inspect.mjs` passes at 1440, 768 and 390. Its `still-page` and `reduced-hidden` checks apply.
4. `scenes.mjs` passes when a scene uses the library.
5. The page is viewed with JavaScript disabled. The headline, the picture and the action show, and a scene
   shows its finished composition.
6. The page's transferred weight is recorded before and after the library is added, and the report says what it cost.
7. Under reduced motion the finished state shows and no loop runs.
