---
name: Smart Parking & Rental
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 16px
---

## Brand & Style
The design system focuses on utility, trust, and speed. It serves a dual-sided marketplace of commuters and property owners, requiring a UI that feels like a reliable infrastructure tool rather than a lifestyle app. 

The aesthetic is rooted in **Modern Minimalism** with a nod to **High-Contrast Functionalism**. By utilizing a "Shadcn-inspired" approach, the interface prioritizes clarity through generous whitespace, precise hairline borders, and a restricted color palette. The goal is to reduce cognitive load for users who are often in a hurry or in high-stress environments (driving, navigating). 

The emotional response should be one of **competence and security**. Every element is intentionally placed to facilitate a "glance-and-act" user behavior.

## Colors
This design system utilizes a high-contrast, neutral-heavy palette to maintain a professional "SaaS-like" feel.

- **Primary Action (#0F172A):** A deep navy/slate used for critical UI paths, primary buttons, and heavy headings. It provides the visual weight necessary for authority.
- **Emerald Green (#10B981):** Reserved strictly for "Success" states: active parking sessions, verified documents, available slots, and completed payments.
- **Background (#F8F9FA):** A very light cool gray that reduces screen glare and differentiates itself from pure white card surfaces.
- **Borders & Dividers (#E2E8F0):** Precise, light strokes that define structure without adding visual noise.

## Typography
We use **Hanken Grotesk** as the primary typeface for its exceptional legibility and modern, sharp terminals. It strikes a balance between a technical geometric sans and a friendly humanist face.

- **Headlines:** Use tight letter-spacing and bold weights to create a strong hierarchy.
- **Body:** Standard weight (400) for high readability in descriptions and instructions.
- **Labels:** Uppercase styles are used for slot IDs, license plate numbers, and status indicators.
- **Data:** For license plates and pricing, a monospaced font (Geist) may be used to ensure character alignment and a "technical" feel.

## Layout & Spacing
The layout follows a strict **8px grid system**. All dimensions, padding, and margins must be multiples of 8.

- **Desktop:** A 12-column fluid grid with 24px gutters. Sidebars are fixed at 280px.
- **Mobile:** A single-column layout with 16px horizontal margins.
- **Rhythm:** Use `md` (16px) for internal card padding and `lg` (24px) for spacing between major sections.
- **Alignment:** Content should be left-aligned to mimic the natural scanning pattern for lists of available parking slots.

## Elevation & Depth
This design system avoids heavy shadows, opting for **Tonal Layers** and **Crisp Outlines** to define hierarchy.

- **Level 0 (Background):** #F8F9FA.
- **Level 1 (Cards/Panels):** Pure white (#FFFFFF) with a 1px border (#E2E8F0).
- **Level 2 (Dropdowns/Modals):** Pure white with a very subtle, diffused shadow (0px 4px 12px rgba(0,0,0,0.05)) to indicate focus.
- **Interactive States:** On hover, a card border should darken to #CBD5E1 to provide immediate tactile feedback without shifting the layout.

## Shapes
A consistent **8px (0.5rem)** radius is applied to all interactive elements and containers.

- **Buttons & Inputs:** Exactly 8px. This provides a modern, approachable feel while remaining disciplined and professional.
- **Chips/Status Tags:** Use a slightly higher radius (16px/pill) to distinguish them from actionable buttons.
- **Icon Containers:** 8px rounded squares for consistency with the component library.

## Components

### Buttons
- **Primary:** Background #0F172A, Text #FFFFFF. No border.
- **Secondary:** White background, 1px Border #E2E8F0, Text #0F172A.
- **Active State:** When a slot is selected, the button transitions to Emerald Green (#10B981).

### Inputs
- **Search & Filter:** Large, white backgrounds with 1px border. Use 16px padding and left-aligned icons.
- **Focused State:** 1px border #0F172A with a subtle 2px outer glow of #E2E8F0.

### Cards (Parking Slots)
- Use white background, 1px border. 
- Top-right corner reserved for "Price/hr" in Bold Primary.
- Bottom section features a secondary-colored "Available" tag or a red "Occupied" tag.

### Chips & Badges
- **Available:** Background #D1FAE5 (Emerald tint), Text #065F46.
- **Occupied:** Background #F1F5F9, Text #64748B.
- **Verification:** Emerald Green checkmark icon next to property owner names.

### Lists
- For mobile, use "Detail-Value" pairs with 1px bottom borders. 
- Use Geist Mono for license plate data and transaction IDs for clarity.