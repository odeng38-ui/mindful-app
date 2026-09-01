---
name: Serene Path Dark
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1b1b1c'
  surface-container: '#1f1f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e2'
  on-surface-variant: '#c5c6cc'
  inverse-surface: '#e4e2e2'
  inverse-on-surface: '#303031'
  outline: '#8f9196'
  outline-variant: '#44474b'
  surface-tint: '#bfc7d5'
  primary: '#bfc7d5'
  on-primary: '#29313c'
  primary-container: '#121a24'
  on-primary-container: '#7b838f'
  inverse-primary: '#575f6b'
  secondary: '#a8c8ff'
  on-secondary: '#003061'
  secondary-container: '#114784'
  on-secondary-container: '#8cb6fb'
  tertiary: '#dbc2ad'
  on-tertiary: '#3d2d1f'
  tertiary-container: '#24170a'
  on-tertiary-container: '#947f6c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe3f1'
  primary-fixed-dim: '#bfc7d5'
  on-primary-fixed: '#141c26'
  on-primary-fixed-variant: '#3f4753'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a8c8ff'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#114784'
  tertiary-fixed: '#f8dec8'
  tertiary-fixed-dim: '#dbc2ad'
  on-tertiary-fixed: '#26190c'
  on-tertiary-fixed-variant: '#554334'
  background: '#131314'
  on-background: '#e4e2e2'
  surface-variant: '#353535'
  vibrant-lavender: '#d1b3ff'
  vibrant-mint: '#a8f0cc'
  vibrant-coral: '#ffadaa'
  surface-card: '#1c252f'
  surface-float: '#252f3a'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 40px
  card-padding: 20px
---

## Brand & Style

This design system is a translation of "Soft Minimalism" into a nocturnal environment. It retains the core philosophy of reducing cognitive load and fostering mindfulness, but shifts the emotional context from "airy and bright" to "quiet and restorative." The target audience remains individuals seeking emotional balance, now optimized for low-light evening reflection or early morning intention-setting.

The visual style is **Minimalism** with **Glassmorphism** influences. By using a deep navy foundation, the interface mimics the calmness of a night sky. The "Tactile" edge from the original system is preserved through subtle depth and soft roundedness, but hierarchy is now driven by luminescence rather than shadows. The emotional response is focused on stillness, introspection, and a sense of "unwinding."

## Colors

The palette is anchored by a deep **Charcoal Navy (#121a24)** background, providing a stable, high-contrast base for accessibility. The accent colors have been increased in vibrancy and lightness to ensure they "glow" effectively against the dark backdrop while maintaining a soothing quality.

- **Deep Navy Background (#121a24):** The primary surface for the entire application.
- **Serene Blue (#8ab4f8):** The primary action and focus color, adjusted for high legibility.
- **Vibrant Lavender (#D1B3FF):** Used for reflection and meditation categories.
- **Vibrant Mint (#A8F0CC):** Denotes completion, growth, and positive status.
- **Vibrant Coral (#FFADAA):** Used sparingly for alerts or missed goals to remain gentle yet visible.

Text follows a strict hierarchy: **#FFFFFF (95% opacity)** for primary titles, **#B0B8C1** for secondary body text, and **#747D88** for tertiary/disabled information.

## Typography

**Manrope** remains the typographic cornerstone, chosen for its modern geometry and approachable humanist qualities. In dark mode, tracking is slightly increased for body text to prevent characters from "bleeding" together on OLED screens.

- **Headlines:** Semi-Bold weights provide structural grounding. On dark backgrounds, these should always be the brightest elements (High-emphasis white).
- **Body Text:** Standard weight with a 1.5x line height. To reduce eye strain, body text uses a slightly desaturated off-white/grey.
- **Labels:** Small labels use medium weights and increased letter spacing to maintain clarity at smaller scales.

## Layout & Spacing

This design system utilizes a **Fluid Grid** that emphasizes "negative space" as a functional element of the user experience.

- **Grid:** A 12-column system for desktop and a 4-column system for mobile. 
- **The "Breath" Principle:** Vertical spacing (Section-gap) is maintained at 40px. This prevents the dark UI from feeling claustrophobic and ensures that each habit or data point is treated as an individual moment of focus.
- **Margins:** 24px side margins on mobile ensure content does not feel "stuck" to the edge of the device, reinforcing the pill-shaped container language.

## Elevation & Depth

In dark mode, depth is expressed through **Tonal Layers** rather than shadows. Higher elevation is indicated by lighter surface colors:

- **Level 0 (Background):** #121a24.
- **Level 1 (Cards/Containers):** #1c252f. This surface is used for most habit cards and navigation elements.
- **Level 2 (Floating/Modals):** #252f3a. Used for menus, sheets, and active inputs.
- **Inner Depth:** Use 1px low-opacity outlines (#FFFFFF at 5-10% opacity) instead of shadows to define the edges of containers. This creates a crisp, sophisticated "glass" look.
- **Backdrop Blur:** For overlays and navigation bars, use a 20px blur with a 70% opacity version of the Level 1 surface to maintain context without visual noise.

## Shapes

The shape language is strictly **Rounded**, following the "ROUND_EIGHT" (0.5rem base) philosophy. This removes visual "edges" from the experience.

- **Primary Cards:** 1rem (16px) corner radius.
- **Interactive Elements:** Buttons and tags use a fully pill-shaped (rounded-full) radius to signify "soft" touchpoints.
- **Progress Visuals:** All bars and track indicators must have rounded caps to avoid a rigid, industrial aesthetic.

## Components

### Buttons
- **Primary:** Serene Blue (#8ab4f8) background with Charcoal (#121a24) text. Full pill-shape.
- **Secondary:** Transparent background with a 1.5px Serene Blue outline.
- **Tertiary:** Subtle grey text with no background, used for "Cancel" or "Skip" actions.

### Cards
Cards use the **#1c252f** surface. Categorization is achieved via a subtle 4px vertical accent bar on the left edge in Blue, Lavender, or Mint.

### Input Fields
Inputs use the **#252f3a** surface (Level 2) to appear "lifted" from the card. On focus, the border glows with a soft 1px Serene Blue stroke.

### Progress Indicators
Circular and linear progress bars should use a "Track" color of **#252f3a** and a "Fill" color from the vibrant accent palette. Use rounded line-caps for all progress paths.

### Chips/Tags
Small, pill-shaped tags. Backgrounds are 15% opacity of the accent color (e.g., Mint), with the text being the 100% opacity vibrant accent color for maximum contrast and "glow."

### Iconography
Icons are 2px "Line" style with rounded joints. Active icons should take on the Serene Blue color, while inactive icons remain at the tertiary text opacity.
