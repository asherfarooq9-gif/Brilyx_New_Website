# Image prompt pack for the BRILYX website

Paste everything inside the big block below into your image tool (GPT Astra or any other). It generates 19 images with exact file names.

**After generating:**
1. Save every image into `D:\RoBo\incoming\` with the **exact file name** given (any of `.png`, `.jpg`, `.webp`).
2. In `D:\RoBo` run: `node scripts/import-images.mjs`. It crops each image to its slot, converts it to WebP and puts it in `public/images/...`.
3. Run `npm run build` (or restart `npm run dev`). The placeholders are replaced automatically.

Names that don't match a slot are skipped with a warning. Sizes and paths are also listed in `IMAGE_GUIDE.md`.

Note: AI-generated "team" or "studio" photos would imply a real team. The prompts below use empty workspaces with no people. Swap `studio.png`, `intro.png` and `approach.png` for real photos when you have them. The `*-project-*` images are placeholder concepts, not real client work.

---

## THE PROMPT (copy from here)

```
You are the art director and image generator for BRILYX, a premium digital engineering studio (custom-coded websites, apps, AI automation, chatbot integration). Generate 19 separate images for its website, one at a time. Give each image the exact file name listed. If you can save files, save them to that name; if not, output each image labelled with its file name. Do not merge images into a collage or a sheet.

BRAND LOOK (applies to every image)
- Premium, restrained, editorial. Think high-end architecture or product photography, not stock photography or tech clichés.
- Palette: deep indigo #19398D, dark navy #0E2258, near-black #0A0A0A, white and cool off-white #F3F5FB. One small accent of mid blue #3560BE at most. No other hues.
- Lighting: soft, directional, cinematic, matte surfaces, shallow depth of field, very fine film grain, generous calm negative space.
- Composition: keep the main subject inside the central 70% of the frame (images get cropped differently on mobile). Follow each image's "leave clear" note, because text is overlaid there.
- Photoreal or clean flat-UI renders only. Consistent look across all 19 images, as one coherent set.

HARD RULES
- NO readable text, letters, logos, brand names, lorem ipsum or numbers anywhere. Render every piece of text or UI copy as abstract grey bars and blocks.
- NO people, faces, hands, silhouettes or crowds.
- NO robots, glowing brains, circuit boards, holograms, floating icons, neon, purple or pink gradients, glowing blobs, lens flares, binary or matrix code, handshakes, globes.
- NO watermarks, borders, frames around the image, or signature.
- Screens and devices must look real (correct proportions, believable reflections), generic (no Apple/Google/Samsung marks) and show refined, minimal, well-spaced interfaces.

IMAGES
Aspect ratios are exact. Where a tool only offers fixed ratios, use the nearest and keep the subject centred.

1) hero-primary.png | 16:9 landscape
Where: full-width home hero background, under a dark indigo overlay. Headline is on the LEFT third, a card sits bottom-right. Leave clear: left third and bottom-right corner.
Prompt: Cinematic wide shot of a minimal studio desk at dusk. A large ultra-wide monitor shows an elegant abstract website interface in indigo and white (soft blocks, big empty space, no readable text). Matte black desk, slim keyboard, deep navy ambient light, shallow depth of field, subtle grain. Mood: calm, confident, premium. Mid-to-dark overall exposure.

2) intro.png | 4:3
Where: home "Who we are" section, right column.
Prompt: Three-quarter overhead view of a tidy workspace: an open notebook with abstract wireframe sketches (no readable writing), a laptop showing a blurred code editor as colour blocks, a ceramic cup, soft window light from the left, indigo and white palette, matte wood-free surfaces (grey concrete or dark laminate). No people.

3) approach.png | 4:3
Where: home "Our approach" sticky card image.
Prompt: Clean flat-lay design-process scene: printed website wireframes, a row of indigo and navy colour swatches, a pencil, a tablet showing an abstract layout grid, on a light cool-grey surface. Even soft daylight, precise alignment, lots of negative space.

4) studio.png | 4:3
Where: About page.
Prompt: A quiet, empty studio corner: two monitors on a matte desk, a simple shelf, one green plant, soft late-afternoon light, deep-navy wall. Screens show abstract UI blocks only. No people. Photographic, calm, slightly desaturated.

5) website-development.png | 16:10
Where: Service 01 (Website Development) slide and pages. Bottom third gets a dark gradient with white text: keep detail away from the bottom.
Prompt: Studio product shot of a laptop and a large display presenting a sophisticated editorial website in a clean browser window: oversized abstract headline blocks, asymmetric layout, generous whitespace, indigo and white. Soft shadow on a seamless cool-grey backdrop, subtle reflections.

6) app-development.png | 16:10
Where: Service 02 (App Development). Keep the bottom third quiet.
Prompt: Two generic smartphones, one upright in front and one offset behind for depth, showing a refined mobile app: abstract cards, a simple chart drawn as shapes, tab bar as dots. Minimal deep-indigo backdrop, soft rim light, realistic glass reflections, no hands.

7) ai-automation.png | 16:10
Where: Service 03 (AI Automation). Keep the bottom third quiet.
Prompt: A clear, elegant workflow diagram: rounded white cards connected by thin precise lines with small round nodes, flowing left to right on a deep navy background, one card highlighted in mid blue. Flat, minimal, crisp, generous spacing, faint depth shadow. Cards contain only abstract grey bars, no text or icons.

8) chatbot.png | 16:10
Where: Service 04 (Chatbot Integration). Keep the bottom third quiet.
Prompt: A realistic browser window on a soft indigo-grey backdrop showing a tasteful website with a small chat widget open at the bottom right: conversation bubbles drawn as abstract lines and rounded blocks, a rounded input bar. Clean, modern, believable UI, subtle shadow.

9) why-band.png | 16:9
Where: dark background band ("Why BRILYX") and the header of every inner page, under a 70% navy overlay with centred white text. Leave clear: the whole centre.
Prompt: Abstract atmospheric background: deep indigo fading to near-black navy, very fine architectural lines and soft diagonal light streaks, extremely low contrast, subtle grain, large calm centre. No objects.

10) cta.png | 16:9
Where: final call-to-action band, under a dark overlay with centred text. Leave clear: the whole centre.
Prompt: Dark navy abstract background with a faint wide diagonal beam of light, soft film grain and a barely visible fine grid, low contrast, elegant and quiet. Different composition from image 9, same palette. No objects.

11) featured-concept.png | 16:10
Where: home "Featured digital experience" section, inside a browser frame (a flat interface, not a device photo).
Prompt: A flat, full-frame screenshot-style mockup of a premium concept website for a fictional brand: huge abstract headline blocks, an asymmetric editorial grid, one large dark-indigo image panel, small rounded buttons, lots of whitespace, indigo and near-black on off-white. No text, no logos.

12) website-project-one.png | 3:2
Where: project card, "Website Project One" (placeholder concept).
Prompt: Front-on view of a large monitor showing a bold abstract website hero: dark indigo panel with a huge block headline and a pill button, on a clean light surface. Studio light, soft shadow.

13) website-project-two.png | 3:2
Where: project card, "Website Project Two".
Prompt: Laptop at a slight angle on a grey surface showing a light, airy, editorial multi-column website (abstract image tiles and text bars, indigo accents). Crisp, minimal, soft window light.

14) app-project-one.png | 3:2
Where: project card, "App Project One".
Prompt: A single generic smartphone floating slightly above a soft indigo gradient surface, screen showing a dashboard-style app with rounded cards and a line chart as shapes. Soft shadow beneath, clean and minimal.

15) app-project-two.png | 3:2
Where: project card, "App Project Two".
Prompt: Three generic phone screens side by side, slightly overlapping, showing onboarding, list and detail views of a refined app (abstract blocks only), on a pale cool-grey backdrop with soft light.

16) automation-project-one.png | 3:2
Where: project card, "Automation Project One".
Prompt: A clean process map: four rounded cards linked by thin lines branching into two paths, on a near-black navy background, one node in mid blue, subtle depth. Abstract bars only, no text.

17) automation-project-two.png | 3:2
Where: project card, "Automation Project Two".
Prompt: Top-down view of a matte desk with a large tablet showing a tidy workflow board (columns of rounded cards as abstract blocks, one highlighted in blue), a pen beside it, soft daylight, indigo and white.

18) chatbot-project-one.png | 3:2
Where: project card, "Chatbot Project One".
Prompt: A phone-sized chat interface in a soft indigo panel: alternating message bubbles as abstract rounded blocks, a rounded input bar, gentle shadow, minimal and believable, cool light background.

19) chatbot-project-two.png | 3:2
Where: project card, "Chatbot Project Two".
Prompt: A website page in a browser with a chat widget expanded at the right showing a short conversation as abstract bubbles and a suggestion chip row, dark-mode variant in navy and indigo, crisp and modern.

After each image, reply with only: the file name, the aspect ratio you used, and "done". Start with image 1 now and continue through 19 without asking questions.
```

---

## Tips
- If the tool can only make one image per message, paste the block once, then send `continue` for each next image.
- If an image contains readable text or a person, ask: "Regenerate {file name} with no text and no people, same composition."
- For a different look on images 9 and 10, change only the words "diagonal beam" or "architectural lines". They are backgrounds and should stay quiet.
