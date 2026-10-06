---
name: Joseph Vergara — Apple HIG Portfolio
description: An Apple iOS/macOS inspired personal engineering portfolio combining Cupertino glassmorphism, SF typography, System Settings layouts, and Xcode Instruments telemetry.
colors:
  system-background: "oklch(0.985 0.002 240)"
  system-background-secondary: "oklch(0.96 0.005 240)"
  system-grouped-background: "oklch(0.94 0.006 240)"
  label: "oklch(0.18 0.015 250)"
  secondary-label: "oklch(0.48 0.015 250)"
  tertiary-label: "oklch(0.68 0.012 250)"
  system-blue: "oklch(0.55 0.22 255)"
  system-tint: "oklch(0.58 0.21 250)"
  system-material-glass: "rgba(255, 255, 255, 0.72)"
  system-material-border: "rgba(0, 0, 0, 0.08)"
  dark-system-background: "oklch(0.12 0.01 260)"
  dark-system-background-secondary: "oklch(0.16 0.012 260)"
  dark-system-grouped-background: "oklch(0.09 0.008 260)"
  dark-label: "oklch(0.96 0.005 240)"
  dark-secondary-label: "oklch(0.68 0.012 250)"
  dark-system-blue: "oklch(0.65 0.20 255)"
  dark-system-material-glass: "rgba(26, 30, 38, 0.75)"
  dark-system-material-border: "rgba(255, 255, 255, 0.12)"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    letterSpacing: "-0.03em"
  title-1:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "0.8125rem"
    letterSpacing: "0.01em"
  mono:
    fontFamily: "'SF Mono', Menlo, Monaco, Consolas, monospace"
    fontSize: "0.8125rem"
rounded:
  squircle-sm: "10px"
  squircle-md: "16px"
  squircle-lg: "24px"
  squircle-xl: "32px"
  pill: "9999px"
---

# Apple iOS / macOS Design Specification

## Overview
A high-craft engineering portfolio styled with genuine Apple Human Interface Guidelines (HIG):
- **macOS Sonoma / Sequoia Menu Bar & Dynamic Island / Pill Dock**: Translucent frosted glass with `backdrop-filter: blur(24px) saturate(180%)`.
- **Cupertino Card Hierarchy**: Continuous squircle corners (`rounded-[20px]`), inner border stroke hairlines (`rgba(255,255,255,0.15)` in dark, `rgba(0,0,0,0.06)` in light), subtle diffuse ambient drop shadows.
- **Xcode Instruments & Activity Monitor Bench**: Precision hardware gauges, smooth segmented controls, and native macOS inspector panels.
- **Apple Wallet Passbook Cards**: Stacked, expandable certification passes with authentic sheen and lanyard badges.
- **iMessage & Siri AI Companion**: iOS 18 style iMessage thread with blue/green chat bubbles and native haptic springs.
