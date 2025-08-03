# Mavro Pro - Complete Color Palette & Design System

## Primary Brand Colors

### Core Purple Palette
- **Mavro Primary Purple**: `#8B5CF6` (hsl(262, 83%, 58%))
- **Mavro Purple Light**: `#A78BFA` (hsl(262, 83%, 65%))
- **Mavro Purple Accent**: `#DDD6FE` (hsl(262, 83%, 90%))
- **Mavro Purple Dark**: `#7C3AED` (hsl(262, 83%, 50%))

### Secondary Brand Colors
- **Mavro Gold**: `#EAB308` (hsl(45, 93%, 47%))
- **Mavro Green**: `#059669` (hsl(166, 83%, 30%))
- **Mavro Dark**: `#2D3748` (hsl(210, 25%, 25%))
- **Mavro Gray**: `#64748B` (hsl(215, 25%, 47%))

### Background & Surface Colors
- **Mavro White**: `#FFFFFF` (hsl(0, 0%, 100%))
- **Mavro Background**: `#FAFAFA` (hsl(0, 0%, 98%))
- **Mavro Surface**: `#FFFFFF` (hsl(0, 0%, 100%))
- **Mavro Card**: `#FFFFFF` (hsl(0, 0%, 100%))

## Extended Palette

### Status Colors
- **Success Green**: `#059669` (hsl(166, 83%, 30%))
- **Warning Yellow**: `#EAB308` (hsl(45, 93%, 47%))
- **Error Red**: `#EF4444` (hsl(0, 85%, 60%))
- **Info Blue**: `#3B82F6` (hsl(221, 83%, 60%))

### Text Colors
- **Primary Text**: `#1F2937` (hsl(210, 25%, 15%))
- **Secondary Text**: `#6B7280` (hsl(215, 25%, 47%))
- **Muted Text**: `#9CA3AF` (hsl(215, 20%, 65%))
- **Light Text**: `#D1D5DB` (hsl(215, 28%, 85%))

### Border & Accent Colors
- **Primary Border**: `#E5E7EB` (hsl(215, 28%, 91%))
- **Secondary Border**: `#D1D5DB` (hsl(215, 28%, 85%))
- **Accent Border**: `#DDD6FE` (hsl(262, 83%, 90%))
- **Focus Ring**: `#8B5CF6` (hsl(262, 83%, 58%))

## Platform-Specific Colors

### Social Media Brand Colors
- **Instagram**: `#E4405F` (hsl(350, 77%, 58%))
- **Facebook**: `#1877F2` (hsl(214, 89%, 53%))
- **LinkedIn**: `#0A66C2` (hsl(209, 92%, 40%))
- **Twitter/X**: `#1DA1F2` (hsl(203, 89%, 53%))
- **TikTok**: `#FF0050` (hsl(342, 100%, 50%))
- **YouTube**: `#FF0000` (hsl(0, 100%, 50%))

### Performance Indicators
- **HOT Badge**: `#EF4444` (Red - hsl(0, 85%, 60%))
- **TRENDING Badge**: `#F59E0B` (Orange - hsl(45, 93%, 51%))
- **RISING Badge**: `#F59E0B` (Orange - hsl(45, 93%, 51%))
- **STABLE Badge**: `#6B7280` (Gray - hsl(215, 25%, 47%))
- **LIVE Badge**: `#059669` (Green - hsl(166, 83%, 30%))

## Alpha Variations (Transparency)

### Purple Variations
- **Purple 10%**: `rgba(139, 92, 246, 0.1)`
- **Purple 20%**: `rgba(139, 92, 246, 0.2)`
- **Purple 30%**: `rgba(139, 92, 246, 0.3)`
- **Purple 40%**: `rgba(139, 92, 246, 0.4)`

### Background Overlays
- **White 10%**: `rgba(255, 255, 255, 0.1)`
- **White 20%**: `rgba(255, 255, 255, 0.2)`
- **Black 10%**: `rgba(0, 0, 0, 0.1)`
- **Black 20%**: `rgba(0, 0, 0, 0.2)`

## CSS Custom Properties

```css
:root {
  /* Primary Brand Colors */
  --mavro-primary: #8B5CF6;
  --mavro-secondary: #A78BFA;
  --mavro-accent: #DDD6FE;
  --mavro-gold: #EAB308;
  --mavro-green: #059669;
  --mavro-dark: #2D3748;
  --mavro-gray: #64748B;
  
  /* Background & Surface */
  --mavro-white: #FFFFFF;
  --mavro-bg: #FAFAFA;
  --mavro-surface: #FFFFFF;
  --mavro-card: #FFFFFF;
  
  /* Text Colors */
  --mavro-text: #1F2937;
  --mavro-text-secondary: #6B7280;
  --mavro-text-muted: #9CA3AF;
  
  /* Status Colors */
  --mavro-success: #059669;
  --mavro-warning: #EAB308;
  --mavro-error: #EF4444;
  --mavro-info: #3B82F6;
  
  /* Border & Accent */
  --mavro-border: #E5E7EB;
  --mavro-border-secondary: #D1D5DB;
  --mavro-border-accent: #DDD6FE;
  --mavro-focus: #8B5CF6;
}
```

## Tailwind CSS Color Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'mavro-purple': '#8B5CF6',
        'mavro-purple-light': '#A78BFA',
        'mavro-purple-accent': '#DDD6FE',
        'mavro-gold': '#EAB308',
        'mavro-green': '#059669',
        'mavro-dark': '#2D3748',
        'mavro-gray': '#64748B',
        'mavro-white': '#FFFFFF',
        'mavro-bg': '#FAFAFA'
      }
    }
  }
}
```

## Design System Notes

### Color Usage Guidelines
1. **Primary Purple**: Main brand actions, CTAs, active states
2. **Purple Light**: Hover states, secondary actions
3. **Purple Accent**: Backgrounds, subtle highlights
4. **Gold**: Warnings, special features, premium indicators
5. **Green**: Success states, positive metrics
6. **Gray Tones**: Text hierarchy, borders, inactive states

### Accessibility
- All color combinations meet WCAG AA contrast requirements
- Focus states use high-contrast ring colors
- Text colors provide clear hierarchy
- Status colors are distinguishable for colorblind users

### Animation & Transitions
- Use `transition: all 0.3s ease` for smooth color changes
- Hover states should include slight transforms: `translateY(-2px)`
- Gradient animations for premium feel
- Pulse animations for active states (voice recording, live indicators)