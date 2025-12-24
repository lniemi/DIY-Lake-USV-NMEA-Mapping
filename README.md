# DIY-Lake-USV-NMEA-Mapping

A do-it-yourself project for mapping lake depths using an unmanned surface vehicle (USV) and **existing, NMEA-compatible fishfinder equipment**.

The core idea is simple:  
use the gear you already own for fishing, attach it temporarily to a small surface vehicle, collect depth data, and then remove it again for normal fishing use.

Map today. Unplug and fish tomorrow.

---

## Project goals

- Lower the barrier to lake bathymetry
- Reuse consumer fishfinders instead of specialized survey equipment
- Keep everything removable and non-destructive
- Focus on practical, repeatable DIY solutions
- Document the process clearly so others can try the same approach

This is not about building a perfect survey vessel.  
It is about showing that useful depth maps can be created with simple tools and existing hardware.

---

## Core concept

The project is built around a few key principles:

- **DIY USV**  
  A small, low-cost unmanned surface vehicle suitable for calm lakes.

- **NMEA-based integration**  
  Depth and position data is handled using standard NMEA messages, keeping the system vendor-agnostic.

- **Removable sensor setup**  
  The fishfinder and transducer are mounted in a way that allows quick removal without permanent modification.

- **Mapping, not modification**  
  The fishfinder remains a fishfinder. The project adapts the platform around it, not the other way around.

---

## What this project is

- Documentation of a DIY lake mapping approach
- Hardware mounting ideas and design notes
- USV setup considerations for calm inland waters
- Data collection and processing workflows
- Lessons learned from real-world testing

---

## What this project is not

- A commercial product
- A high-end hydrographic survey system
- A brand- or model-specific solution
- A requirement to permanently dedicate your fishfinder to mapping

---

## Intended audience

- Hobbyists with an existing fishfinder
- Makers interested in autonomous or semi-autonomous surface vehicles
- Anglers curious about mapping their local lakes
- Students and experimenters exploring bathymetry and navigation
- Anyone who wants to try lake mapping without specialized gear

---

## Repository structure (planned)

```text
docs/        Project documentation and guides
hardware/    Mounts, mechanical designs, and build notes
electronics/ Wiring, power, and integration notes
software/    Data logging, processing, and mapping tools
examples/    Example data sets and workflows
