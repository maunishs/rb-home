# Ritchie Bros Homepage - High Fidelity Prototype

A modern, high-fidelity prototype of the Ritchie Bros auction homepage built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Components**: 
  - Carousel with navigation arrows and dots
  - Tab navigation in header
  - Filter buttons
  - Hover effects and transitions
- **Modern UI**: Clean, professional design with smooth animations
- **All Sections from Wireframe**:
  - Header with RB logo and LIVE NOW badge
  - Navigation tabs (All, Auctions, BIN, salvage)
  - Bids/VOL section with notifications
  - Complete outbid and Closing Now alerts
  - Main carousel display
  - Filter sections (Near you, Price, Deal of the day)
  - Trust section
  - Watchlist and Recent sections
  - Upcoming Events with event cards
  - Services section
  - Footer

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons

## Project Structure

```
rb-ai/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Header with navigation
│   ├── QuickActions.tsx # Outbid and Closing Now alerts
│   ├── Carousel.tsx    # Main carousel component
│   ├── Filters.tsx     # Filter sections
│   ├── TrustSection.tsx # Trust banner
│   ├── UserSections.tsx # Watchlist and Recent
│   ├── UpcomingEvents.tsx # Events section
│   ├── Services.tsx    # Services section
│   └── Footer.tsx      # Footer component
└── package.json
```

## Customization

The design uses a primary color scheme that can be customized in `tailwind.config.ts`. All components are modular and can be easily modified or extended.
