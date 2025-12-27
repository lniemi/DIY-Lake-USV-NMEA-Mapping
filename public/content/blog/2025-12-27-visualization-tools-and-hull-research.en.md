# New Visualization Tools and Hull Type Research

Two new sections have been added to this documentation site: a knowledge graph and a 3D model viewer.

## Knowledge Graph

The knowledge graph is intended to visualize relationships between different components of the USV system, data flow, and the mapping process. It could serve as a reference for both development and documentation. Currently it does not quite work as intended, but the feature remains in place for potential future refinement.

## 3D Model Viewer

The 3D model viewer is more immediately useful. It displays design options for the USV hull and components.

When approaching the 3D modeling question, there were two paths: use external CAD software and export models for viewing, or attempt to do the modeling directly within this web application. The second approach was chosen, though with important caveats.

This is not a CAD software replacement. The viewer lacks standard CAD tools entirely—it is simply a Three.js viewer with some additional features. The workflow involves prompting an LLM to create and modify React components in the `src/components/usv-viewer/models` folder, then observing changes in the browser via hot module replacement. The models themselves are not traditional CAD files but React components that use Three.js to generate 3D geometry.

This approach is admittedly unconventional, but it works for current needs. When it comes to exporting, Three.js supports common 3D formats, so models should be exportable to standard CAD formats if more advanced modeling or manufacturing files become necessary.

Three models have been added to demonstrate the concept:

- Two catamaran hull designs (small and large variants)
- One trimaran hull design

These models are basic and lack fine details. They demonstrate the concept rather than representing finished designs. Once all required modules are in place—hull, GNSS module, fishfinder, battery box, motor, propeller, and so forth—the models can be refined to include more realistic details, such as propeller blades instead of simple cylinders.

## Hull Type Research

A review of existing literature on small USV design provided useful context for the hull type decision. The paper "Small Unmanned Surface Vessels—A Review and Critical Analysis of Relations to Safety and Safety Assurance of Larger Autonomous Ships" (Bolbot et al., 2023) surveyed 84 small USVs under 100 kg displacement.

### Why Multi-Hulls Dominate Small USVs

Nearly half of the surveyed vessels (41 out of 85) used catamaran or trimaran configurations rather than traditional monohulls. The authors explain why:

**Stability with sensors:** Small USVs need to carry sensors that are often mounted high—cameras, LiDAR, or in this project's case, a fishfinder transducer and GNSS unit. On a small monohull, this creates stability problems due to the high center of gravity on a narrow platform. Catamarans and trimarans provide a wider beam relative to their size, keeping the vessel stable even with top-heavy sensor packages.

**Deck space:** Multi-hulls offer more usable deck area for their displacement. When fitting navigation electronics, batteries, sampling equipment, and communication gear onto something kayak-sized, that extra space matters.

### Operating Environment Considerations

The review notes that most small USV research has been conducted in calm water conditions, with few exceptions testing adverse weather. The authors frame this as a limitation for autonomous ship safety validation. However, for this project—which explicitly targets calm Finnish inland lakes—this finding is encouraging. Most existing small USV design choices were made for conditions similar to the intended operating environment.

### Bathymetry as a Common Application

The review found that 14% of surveyed small USVs were used specifically for bathymetry, and 18% for water sampling. This project's use case sits within a well-established application domain for these platforms.

### The DIY Angle

One finding worth noting: 70% of the USVs in the review appeared in only a single publication, meaning most were purpose-built for a specific application rather than becoming ongoing research platforms. The "build something that works for your task, document it, move on" approach appears to be the norm rather than the exception.

## References

Bolbot, V., et al. (2023). Small Unmanned Surface Vessels—A Review and Critical Analysis of Relations to Safety and Safety Assurance of Larger Autonomous Ships. *Journal of Marine Science and Engineering*, 11(12), 2387. https://www.mdpi.com/2077-1312/11/12/2387
