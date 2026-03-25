# 🎨 Design & Animation Guide

## Overview

Your website features modern animations and design patterns implemented with Tailwind CSS and React. This guide explains what you see and how it works.

---

## 🎬 Animations & Transitions

### 1. Image Hover Zoom
**Where**: Cars page, Buses page, Packages page
**What Happens**: When you hover over an image, it smoothly scales up 110%
**Duration**: 700 milliseconds
**CSS Class**: `transition-transform duration-700 scale-110`

**Example**:
```jsx
<img className={hoveredId === car._id ? 'scale-110' : 'scale-100'} />
```

### 2. Card Elevation on Hover
**Where**: All service cards (packages, cars, buses)
**What Happens**: Card lifts up slightly with shadow effect
**Duration**: 300 milliseconds
**Classes**: `hover:shadow-2xl hover:-translate-y-2`

**Effect**:
- Shadow increases (shadow-md → shadow-2xl)
- Card moves up 2 pixels (translate-y-2)
- Creates "floating" effect

### 3. Fade & Slide Animations
**Where**: Form success messages, notifications
**What Happens**: Messages appear smoothly
**Duration**: 300-700 milliseconds
**Classes**: `transition-all duration-300`

### 4. Progress Bar Animation
**Where**: Booking form (multi-step)
**What Happens**: Blue progress bar fills as you complete steps
**Duration**: 300 milliseconds
**State-based**: Updates width based on current step

**Implementation**:
```jsx
<div style={{ width: `${(step / 3) * 100}%` }} className="transition-all duration-300" />
```

### 5. Bounce Animation
**Where**: Success screen (celebration emoji)
**What Happens**: Emoji bounces up and down
**CSS**: `animate-bounce` (Tailwind built-in)

### 6. Scale Effects
**Where**: Icon hover effects
**What Happens**: Icons grow when hovered
**Classes**: `group-hover:scale-110 transition-transform duration-300`

---

## 🎨 Color Schemes & Gradients

### Primary Colors Used:
- **Blue**: `#0066cc` - Main brand color, CTAs
- **Purple**: `#a855f7` - Accent color, gradients
- **Slate**: `#1e293b` - Text, dark elements
- **Green**: `#16a34a` - Success states, available badges
- **Orange/Red**: `#f97316` - Special offers, warnings

### Gradients Used:

1. **Blue to Purple** (Main CTA buttons)
```css
background: linear-gradient(to right, #0066cc, #a855f7)
```

2. **Gradient Backgrounds** (Hero sections)
```css
background: linear-gradient(to bottom right, #eff6ff, #faf5ff)
```

3. **Special Offer Gradient** (Contact page)
```css
background: linear-gradient(to right, #fb923c, #ef4444)
```

### Color Palette by Page:

**Home Page**:
- Blue theme with purple accents
- Hero section: Rich gradients
- Service cards: Soft backgrounds

**Contact Page**:
- Blue and purple theme
- Action buttons: Gradient backgrounds
- Success messages: Green theme

**Booking Page**:
- Blue progress indicators
- White forms with blue focus states
- Success screen: Green gradient

**Cars/Buses/Packages**:
- Slate gray text
- Colored badges for status
- Hover effects in brand colors

---

## 📐 Design Patterns

### 1. Card Component Pattern
All cards follow this structure:
```
┌─────────────────────┐
│   Image (hover)     │
├─────────────────────┤
│  Title              │
│  Description        │
│  Badge/Status       │
│  Call-to-Action     │
└─────────────────────┘
```

**Features**:
- Image area with hover zoom
- Text content below
- Status badges (green, blue, etc.)
- Action buttons (styled with brand colors)

### 2. Hero Section Pattern
**Elements**:
- Large heading (32-48px font)
- Supporting description (gray text)
- Call-to-action button
- Often with background image or gradient

**Example**:
```
╔═════════════════════════════════╗
║  Big Heading                    ║
║  Supporting description text    ║
║  [Primary Action Button]        ║
╚═════════════════════════════════╝
```

### 3. Feature Grid Pattern
**Layout**: 3-4 columns on desktop, 1 column on mobile
**Content**: Icon + Title + Description
**Alignment**: Center aligned

```
┌──────────┬──────────┬──────────┐
│  Icon    │  Icon    │  Icon    │
│  Title   │  Title   │  Title   │
│  Desc    │  Desc    │  Desc    │
└──────────┴──────────┴──────────┘
```

### 4. Form Pattern
**Structure**:
- Label (bold, dark color)
- Input/Textarea field
- Focus states (blue ring, outline removed)
- Error states (red borders)
- Submit button (gradient, larger padding)

### 5. Testimonial Pattern
```
┌────────────────────┐
│  Profile Image     │
│  ⭐⭐⭐⭐⭐      │
│  "Quote text"      │
│  Customer Name     │
│  Title/Role        │
└────────────────────┘
```

---

## 🔤 Typography

### Font Sizes Used:
- **Hero Headings**: 36-48px (md:text-4xl to md:text-5xl)
- **Page Headings**: 28-32px (text-2xl to text-3xl)
- **Card Titles**: 18-20px (text-lg to text-xl)
- **Body Text**: 16px (text-base)
- **Small Text**: 12-14px (text-sm to text-xs)

### Font Weights:
- **Headings**: Bold (font-bold)
- **Labels**: Semibold (font-semibold)
- **Body**: Regular (default)
- **Emphasis**: Semibold (font-semibold)

### Text Colors:
- **Headings**: Slate-900 (#1e293b)
- **Body**: Slate-600 (#475569)
- **Secondary**: Slate-500 (#64748b)
- **Links**: Blue-600 (#2563eb)
- **Disabled**: Slate-400 (#94a3b8)

---

## 📱 Responsive Design

### Breakpoints Used:
- **Mobile**: 320-640px (default styles)
- **Tablet**: 641-1024px (md: prefix)
- **Desktop**: 1025px+ (lg: prefix)

### Responsive Examples:

**Grid Layout**:
```jsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

**Text Size**:
```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  {/* 30px on mobile, 36px on tablet, 48px on desktop */}
</h1>
```

**Padding**:
```jsx
<div className="p-4 md:p-8 lg:p-12">
  {/* 16px on mobile, 32px on tablet, 48px on desktop */}
</div>
```

---

## 🎯 Interactive Elements

### Buttons

**Primary Button** (Brand gradient):
```jsx
<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg">
```
- Gradient blue-purple
- White text
- Shadow on hover
- 3px padding (top/bottom), 6px (left/right)

**Secondary Button** (Border):
```jsx
<button className="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50">
```
- Border style
- Subtle background change on hover

**Disabled Button**:
```jsx
<button disabled className="bg-slate-400 cursor-not-allowed">
```
- Gray color
- Not-allowed cursor
- No hover effects

### Input Fields

**Focus State**:
```jsx
<input className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
```
- Blue ring on focus
- Outline removed
- Smooth transition

**Hover State**:
- Subtle shadow
- No color change

---

## 🎨 Styling Conventions

### Spacing Scale:
- **p-2**: 8px
- **p-4**: 16px
- **p-6**: 24px
- **p-8**: 32px
- **p-12**: 48px

### Gap Scale (between elements):
- **gap-2**: 8px
- **gap-4**: 16px
- **gap-6**: 24px
- **gap-8**: 32px

### Border Radius:
- **rounded-lg**: 8px (cards, inputs)
- **rounded-2xl**: 16px (large cards)
- **rounded-full**: 9999px (pills, circles)

### Shadows:
- **shadow-sm**: Light shadow
- **shadow-md**: Medium shadow (default cards)
- **shadow-lg**: Larger shadow
- **shadow-2xl**: Extra large (hover effects)

---

## 🌟 Advanced Features

### 1. Hover State Management (React)
```jsx
const [hoveredId, setHoveredId] = useState(null);

<div onMouseEnter={() => setHoveredId(id)} onMouseLeave={() => setHoveredId(null)}>
```
- Tracks which element is hovered
- Applies conditional styles
- Smooth transitions

### 2. Step-Based UI (Booking Form)
```jsx
const [step, setStep] = useState(1);

{step === 1 && <Step1Form />}
{step === 2 && <Step2Form />}
{step === 3 && <ReviewForm />}
```
- Shows/hides content based on step
- Progress indicator updates
- Back/Next navigation

### 3. Form Validation
```jsx
const isStep1Complete = form.name && form.phone && form.email;

<button disabled={!isStep1Complete}>
```
- Checks field values
- Disables button until valid
- Provides visual feedback

### 4. Conditional Styling
```jsx
className={`${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}
```
- Different styles based on state
- Dynamic CSS classes
- Smooth transitions

---

## 🎬 Animation Performance Tips

### Best Practices Implemented:
1. **Use `transition` instead of animations** for performance
2. **GPU-accelerated properties**: transform, opacity
3. **Avoid animating**: width, height, position (use transform instead)
4. **Reasonable durations**: 300-700ms for smoothness
5. **Mobile-friendly**: Reduced animations on lower-end devices

### Performance Checklist:
- ✅ All animations use transition-all or specific properties
- ✅ Duration matches user expectations (300-700ms)
- ✅ No animation lag on scroll
- ✅ Smooth 60fps animations
- ✅ Mobile responsive (works on all devices)

---

## 🔧 How to Modify Design

### Change Primary Color:
1. Open any page file (e.g., `Home.jsx`)
2. Replace `from-blue-600` with your color
3. Tailwind color options:
   - `from-blue-600` → `from-purple-600`, `from-green-600`, etc.
   - Suffix: 400 (light), 500 (medium), 600 (dark), 700 (very dark)

### Change Animation Duration:
1. Find `duration-300` or `duration-700`
2. Replace with `duration-500`, `duration-1000`, etc.
3. Available: 75, 100, 150, 200, 300, 500, 700, 1000

### Add New Animation:
```jsx
<div className="transition-all duration-300 hover:scale-110 hover:shadow-lg">
```

### Customize Spacing:
```jsx
<div className="p-8 md:p-12 gap-6">
  {/* p-8: 32px padding, p-12: 48px on tablets, gap-6: 24px between children */}
</div>
```

---

## 📊 Design System Summary

| Element | Styles | Example |
|---------|--------|---------|
| Card | rounded-2xl shadow-md border | `.rounded-2xl .shadow-md .border` |
| Button Primary | gradient, text-white, py-3 | `.from-blue-600 .to-purple-600` |
| Button Secondary | border, hover:bg-slate-50 | `.border .hover:bg-slate-50` |
| Input | border-slate-300, focus:ring-blue | `.focus:ring-2 .focus:ring-blue` |
| Heading | font-bold, text-slate-900 | `.font-bold .text-slate-900` |
| Badge | px-3 py-1, rounded-full, text-xs | `.px-3 .text-xs .rounded-full` |

---

**Last Updated**: January 2024  
**Tailwind CSS Version**: Used via Vite  
**Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
