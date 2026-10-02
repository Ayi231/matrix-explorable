# Implementation and verification record

## Source and scope

Original Intro.svelte and Article.svelte were read from the upstream project. Opening paragraphs and original 2D passages were retained in the new sequence, with matrix notation rendered in HTML. The determinant content now follows the existing foundation rather than opening a separate conceptual lesson. Original code, MIT license, and 3D explainer are retained.

## New behavior

Fifteen narrative steps share one sticky SVG graph. A requestAnimationFrame-throttled scroll handler derives the active section and interpolation progress from document geometry. Each transition is deterministic in both scroll directions. Integer-scaled coefficients preserve exact zero-determinant checks at discrete scroll positions. Narrative transitions use scene-specific start and end matrices; free exploration retains its identity-to-target playback.

Guided collision examples keep the input pair fixed. In manual mode, the pair is selected for the current matrix as before. Manual controls are scoped to the playground section and release automatically when scrolling out.

## Browser checks passed

Chromium at desktop 1440×960 and mobile 390×844:

- Original opening content present before determinant instruction.
- Original vector example ends at (3,2), with determinant 4.
- Basis scene hides determinant indicators until area is introduced.
- Identity area 1, stretched area 2, negative determinant with positive area.
- Intermediate collapse values are nonzero; final line and point collapse have determinant zero.
- Fixed P and Q map to (1.5,0) in the line-collapse example.
- Reverse scrolling restores earlier states.
- Free controls retain their state within the playground; scrolling out restores the current narrative state.
- Reflection playback has a singular midpoint and an invertible endpoint.
- Mobile graph stays pinned, leaves text visible, and has no horizontal overflow.
- Reduced-motion preference selects endpoint states.
- No page JavaScript errors.

Screenshots were visually inspected for desktop and mobile layout.

## Remaining limits

- The unified 2D lesson uses SVG, not the original Threlte canvas. The original 3D lesson remains a linked continuation.
- Identity returns are animated; the 12→13 transition uses identity as an intermediate matrix before reflection.
- No original 3D camera, pan, or zoom controls in this 2D view.
- Manual numeric edits remain limited to [-2,2], in tenths. Reflect retains four-decimal precision for the currently displayed interpolated matrix.
- Degenerate basis handles can overlap; numeric controls resolve this.
- Graph coordinates round to two decimals; very close output markers can visually overlap.
- No GitHub push or Pages deployment, and no original Svelte production rebuild was performed.

## Revision 4 checks

Read the supplied title image and frames from the supplied short video before editing. Inspected generated title, basis, and mobile screenshots.

Browser regression tests additionally verified:
- Actual title canvas pixels change over time and stop changing when paused.
- Cyan and first basis vector lengths increase over multiple scroll positions.
- The last endpoint of section 7 exactly equals the first endpoint of section 8.
- Section 8 visits intermediate matrices before reaching identity.
- Section 13 starts at zero, visits a nonzero intermediate scale, returns to identity, and ends at reflection.
- Reverse scrolling reproduces the same intermediate vector coordinates.
- Basis label font size is 27.
- Existing determinant, original vector example, manual controls, mobile overflow, and reduced-motion checks still pass.

The title background is a custom canvas recreation of the reference's visual style, not the original WebGL renderer. It is decorative; the lesson's mathematical geometry remains in SVG.

## Revision 5 checks

Chromium checks passed at 1440×960 and 390×844. Verified scroll-driven opening canvas changes; pinned explanation remains fully visible through vector growth and matrix completion; section-count-only indicator; current-picture reflection, double reflection, and partial-scrub precision; automatic playground exit and saved state on return; cancellation of playback on exit; exact original live URL and new-tab link attributes; no mobile horizontal overflow or JavaScript errors. Desktop title, pinned vector explanation, and mobile basis screenshots were visually inspected.

The opening uses a custom perspective-canvas camera effect. On short/mobile viewports, passages too tall to fit below the graph scroll naturally rather than clipping their text.

## Revision 6 checks

All five demo buttons fit on one row without clipped text at viewport widths 1440, 1024, 900, and 390 pixels. The creator credit is nested inside section 15 and remains visible with its concluding explanation at 1440×960. Canonical source was synced to docs/determinant; local font paths and docs/.nojekyll are present. No GitHub deployment performed.
