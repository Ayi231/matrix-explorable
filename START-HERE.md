# Matrix Arcade — revision 6: final layout refinements

Extract the ZIP, then open `docs/determinant/index.html`. Keep the fonts folder alongside it. The revised page needs no build or internet connection.

## What changed in revision 6

- All five demo actions fit on one row, with shorter labels and descriptive hover titles.
- Original-creator credit is inside section 15 and moves with its explanation.
- GitHub Pages-ready static output is in `docs/determinant/`; publish main /docs and append `determinant/` to your Pages URL.

## Previous revision

- Redesigned title lettering with bold dimensional Matrix and outlined Arcade.
- Opening scroll pans the perspective grid and carries the title upward before the lesson enters.
- Explanations stay pinned through their vector animations, with a reading hold after completion.
- The top-left indicator shows only the section count.
- Reflect mirrors the currently displayed matrix across the vertical axis, including partial transformations; clicking twice restores it.
- The playground automatically releases control when you scroll out and remembers your settings when you return. Resume story was removed.
- Original-explainer links open https://yizhe-ang.github.io/matrix-explorable/ in a new tab.

The introduction, original 2D teaching progression, determinant narrative, and original 3D continuation are retained.

## Scrolling and interaction

- The graph and each fitting explanation stay pinned while its animation completes. Longer passages scroll naturally on small screens.
- The active passage sets the visual layers and the matrix transition.
- Scrolling backward reverses the sequence; the determinant readout describes the currently displayed matrix.
- Determinant and area indicators appear only once the story introduces them.
- P = (0.5,0.5) and Q = (0,1.5) stay fixed through the guided invertibility and collapse sequence.
- The playground automatically enables manual controls within its section. Leaving it restores story control and stops playback.
- Mobile keeps a shorter graph pinned above the scrolling text.
- Reduced-motion preferences use discrete transformation states instead of continuous interpolation.

## Edit

Canonical source: `static/determinant/index.html` and its fonts folder.

```
node scripts/sync-determinant.mjs
python3 -m http.server 8000 --directory docs
```

Open http://localhost:8000/determinant/ . Sync after changing the canonical source.

## Verification

See VERIFICATION.md. Browser regression checks are in `scripts/test-browser.cjs`; they require Playwright and Chromium and a running local server on port 8000. Optional MATRIX_CHROMIUM_PATH selects an installed Chromium executable.

## Evidence

- `evidence/v1/first-version.html`: first implementation.
- `evidence/v2/source/`: exact prior chapter and fonts; v2 screenshots retained.
- `evidence/v3/`: prior screenshots and exact previous source in `source/`.
- `evidence/v4/`: previous screenshots and exact source.
- `evidence/v5/`: current title, camera pan, pinned explanation, collapse, and mobile screenshots.

The earlier ZIP files remain unchanged. These files support your own evaluation and writing; they are not a report draft.

## GitHub Pages

Create/fork your own repository, push the project while retaining LICENSE and attribution, and select branch main /docs in Settings → Pages. Use the resulting Pages URL followed by `determinant/` for this revision. The root page is still the original explainer with a link to this integrated revision. This project has not yet been pushed or published.
