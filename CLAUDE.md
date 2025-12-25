# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DIY lake bathymetry mapping project using an unmanned surface vehicle (USV) with standard NMEA-compatible fishfinder equipment. The core principle is reusing existing consumer fishfinders (removable mounting, no permanent modifications) to create depth maps of inland lakes.

## Repository Status

This is an early-stage documentation project. The planned structure includes:
- `docs/` - Project documentation and guides
- `hardware/` - Mounts, mechanical designs, and build notes
- `electronics/` - Wiring, power, and integration notes
- `software/` - Data logging, processing, and mapping tools
- `examples/` - Example data sets and workflows

## Key Technical Context

- **NMEA Protocol**: All depth and position data uses standard NMEA 0183 messages for vendor-agnostic integration
- **Target Environment**: Calm inland lakes (not marine/ocean conditions)
- **Hardware Philosophy**: Fishfinder remains unmodified; the platform adapts around it
