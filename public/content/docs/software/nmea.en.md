---
title: "NMEA Protocol"
---

# NMEA Protocol

NMEA 0183 is the communication standard that makes this project possible. It's the reason you can use almost any fishfinder with this system.

## What is NMEA 0183?

NMEA 0183 is a standard developed by the National Marine Electronics Association. It defines:
- Electrical signal levels (RS-422 or RS-232)
- Data transmission rate (typically 4800 baud)
- Message format (ASCII sentences)

## Key Sentences for Mapping

For bathymetric mapping, we primarily care about these sentence types:

### DBT - Depth Below Transducer

```
$SDDBT,12.5,f,3.8,M,2.1,F*checksum
```

- Field 1: Depth in feet
- Field 2: 'f' for feet
- Field 3: Depth in meters
- Field 4: 'M' for meters
- Field 5: Depth in fathoms
- Field 6: 'F' for fathoms

### GGA - GPS Fix Data

```
$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,47.0,M,,*47
```

This provides position and time data to correlate with depth readings.

## Capturing NMEA Data

You can capture NMEA data using:
1. **USB NMEA adapters** - Connect to a laptop
2. **Dedicated data loggers** - SD card storage
3. **Raspberry Pi/Arduino** - Custom logging solutions

## Data Processing

Once captured, the NMEA log can be processed to:
1. Parse depth and position data
2. Apply corrections (tide, transducer offset)
3. Generate point cloud data
4. Create contour maps

## Tips

- Always verify your fishfinder's NMEA output settings
- Test data capture before going on the water
- Log raw data - you can always process it later
- Include timestamps for data correlation
