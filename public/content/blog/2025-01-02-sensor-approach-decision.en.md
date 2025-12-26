---
title: "Choosing the Sensor Approach: Commercial Fishfinder vs DIY Sonar"
date: "2025-01-02"
---

# Choosing the Sensor Approach: Commercial Fishfinder vs DIY Sonar

One of the first technical decisions in this project concerns how to acquire depth data. After researching various approaches, we've arrived at a decision that shapes the direction of this build.

## Two Fundamental Approaches

Depth sensing for bathymetric mapping can be categorized into two main strategies:

**Integrated Commercial Fishfinder**

Devices like the Garmin Striker Plus 4CV or Lowrance Hook2 4x provide an all-in-one solution: GNSS positioning, depth measurement, and data logging in a single weatherproof unit. These are proven, reliable devices designed for marine environments.

**DIY Sonar Stack**

Building a custom sonar system from discrete components: a sonar controller board, a transducer, a separate GNSS module, and custom logging software. This approach trades convenience for flexibility and lower cost.

## Pros and Cons

### Commercial Fishfinder

**Advantages:**
- Ready to use out of the box
- Proven reliability in marine conditions
- Integrated GNSS and data logging
- Well-documented NMEA output
- Typically includes display for real-time feedback

**Disadvantages:**
- Cost: 150-300 EUR for basic models with NMEA output
- Limited to manufacturer's frequency choices and pulse settings
- No access to raw echo data - only processed depth values
- The unit does more than we need (display, menus, fish icons)
- Harder to integrate with custom logging systems

### DIY Sonar Stack

**Advantages:**
- Lower cost potential (under 50 EUR for basic setup)
- Access to raw echo data for custom processing
- Full control over transmit frequency, pulse characteristics
- Educational value in understanding sonar principles
- Can be optimized specifically for shallow lake bathymetry

**Disadvantages:**
- Requires development and debugging time
- No waterproof enclosure provided
- Separate GNSS and logging systems needed
- Less proven in field conditions
- Steeper learning curve

## The Decision: Open Echo

After weighing these factors, we've decided to pursue the DIY route using the [Open Echo](https://github.com/open-echo/open-echo) project. Open Echo is an open-source Universal SONAR Controller and Development Stack that provides the foundation we need.

The decision was influenced by several factors:

1. **Cost efficiency**: A complete Open Echo setup with transducer can cost under 50 EUR, versus 150+ EUR for a fishfinder with NMEA output capability.

2. **Learning opportunity**: Building the sonar system provides deeper understanding of how depth measurement actually works.

3. **Raw data access**: Commercial fishfinders output processed depth values. With Open Echo, we can access the raw echo returns and experiment with our own signal processing.

4. **Optimization for shallow lakes**: Finnish inland lakes are typically shallow (under 30m). We can choose transducers and settings specifically suited to this environment rather than accepting general-purpose marine defaults.

## Inspiration: Neumi's Work

The Open Echo project is maintained by a developer known as "Neumi" who has published extensive documentation and examples. While researching this project, we came across [a YouTube video](https://www.youtube.com/watch?v=nWLPmjaNJ6I) where Neumi demonstrates mapping a small harbour using an early logging device and a small boat. This demonstration of practical bathymetric mapping with DIY hardware was a key inspiration for pursuing this approach.

Interestingly, this video had appeared in our research before, but it wasn't until revisiting it with the specific goal of lake mapping that its relevance became clear.

## The Hardware: TUSS4470 Shield

The core of the Open Echo system is the TUSS4470 Arduino Shield, which the project describes as the main development board. This shield is available from [Elecrow](https://www.elecrow.com/open-echo-tuss4470-development-shield.html) and provides the ultrasonic transmit/receive circuitry needed for sonar operation.

## Transducer Selection

Open Echo supports various transducers. The project documentation lists several options with their characteristics:

| Transducer | Frequency | Range (Water) | Price | Notes |
|------------|-----------|---------------|-------|-------|
| NASA Seafarer 150kHz | 150kHz | >50m | 50-100 EUR | Marine-grade in-hull transducer |
| Raymarine CPT-S | 50+200kHz | >50m | 200 EUR | Dual-frequency, high quality |
| Lowrance Tripleshot | 200/455/600kHz | >20m | 200 EUR | Sidescan capable |
| Cheap Bathymetry 200kHz | 200kHz | >30m | 25 EUR | Good value, harder to source |
| Water flow sensor transducer | 1000kHz | >10m | 16 EUR (5pcs) | Very narrow beam (~5 deg) |

For initial testing, we're considering the **water flow sensor transducers**. Despite the narrow 5-degree beam and limited 10m range, these characteristics may actually be advantageous for shallow lake mapping:

- **Narrow beam**: Provides more precise position-to-depth correlation
- **Limited range**: Most Finnish lakes we're targeting are under 10m deep in many areas
- **Low cost**: At roughly 3 EUR per transducer, we can afford to experiment and potentially damage units during development
- **Quick iteration**: Fast shipping means rapid testing cycles

The hypothesis is that in shallow lake environments, these limitations become acceptable trade-offs for the cost and experimentation benefits.

## Related Research

During the research phase, we reviewed several academic papers on low-cost USV bathymetry systems:

- **"Design and Implementation of a Low-Cost Intelligent Unmanned Surface Vehicle"** ([MDPI Sensors, 2024](https://www.mdpi.com/1424-8220/24/10/3254)) - Proposes a sub-1000 EUR approach with interesting design choices.

- **"Development of low-cost Unmanned Surface Vehicle system for bathymetric measurements"** ([IOP Earth and Environmental Science](https://iopscience.iop.org/article/10.1088/1755-1315/684/1/012033/pdf)) - Describes methods and hardware selection for budget bathymetry.

- **"An autonomous surface vehicle for acoustic tracking, bathymetric and photogrammetric surveys"** ([ScienceDirect, 2025](https://www.sciencedirect.com/science/article/pii/S002980182500914X)) - A more comprehensive (8000+ EUR) system with features beyond our scope, but contains useful design insights.

Finnish research institutions have also conducted DIY bathymetric surveys; we may update this post with specific references as we locate them.

## Next Steps

With the sensor approach decided, the immediate tasks are:

1. Order the TUSS4470 shield from Elecrow
2. Order a batch of water flow sensor transducers for testing
3. Set up the Arduino development environment
4. Begin bench testing with the Open Echo firmware

Future posts will document the results of these tests and any modifications needed for our specific use case.
