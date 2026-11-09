# Copernicus seasonal photographs: letter print edition

[Two-page letter PDF](copernicus_seasonal_photos_2026_letter_pairs.pdf) · [Drive PDF](https://drive.google.com/file/d/1OamFD2KExhyCmt-HUdHHT0CQBebpjdzk/view?usp=drivesdk) · [All individual figures in Drive](https://drive.google.com/drive/folders/1PJe5TnOLzIlHTPmA_WxIf2wbSwm1kQPe)

This additional edition removes the San Francisco city annotation and enlarges axis titles and tick numbers for two figures side by side on portrait US Letter paper (8.5 × 11 inches). The original published figures and source imagery remain unchanged.

Print the paired PDF at **Actual size / 100%**. It has one-inch margins, two 3.1-inch-wide figures on each page and a 0.3-inch gap. For placement in another document, set each individual PNG/PDF to **3.1 inches wide**; axis titles will be **11 pt** and tick numbers **10 pt**. Individual figure height is 3.85 inches. PDFs retain vector text; PNGs are 1860 × 2310 pixels at 600 dpi.

| Reference date | Actual acquisition | Individual figures                                                                                                                         |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-01-01     | 2026-01-08         | [PNG](copernicus_photo_2026-01-01_print.png) · [PDF](copernicus_photo_2026-01-01_print.pdf) · [SVG](copernicus_photo_2026-01-01_print.svg) |
| 2026-04-01     | 2026-04-03         | [PNG](copernicus_photo_2026-04-01_print.png) · [PDF](copernicus_photo_2026-04-01_print.pdf) · [SVG](copernicus_photo_2026-04-01_print.svg) |
| 2026-07-01     | 2026-07-14         | [PNG](copernicus_photo_2026-07-01_print.png) · [PDF](copernicus_photo_2026-07-01_print.pdf) · [SVG](copernicus_photo_2026-07-01_print.svg) |
| 2026-10-01     | 2026-10-10         | [PNG](copernicus_photo_2026-10-01_print.png) · [PDF](copernicus_photo_2026-10-01_print.pdf) · [SVG](copernicus_photo_2026-10-01_print.svg) |

The full 200 × 200 km, north-up EPSG:32610 footprint is unchanged: easting 450–650 km and northing 4080–4280 km. Gray retains the original missing-data regions; clouds remain visible. The same aligned, checksum-verified 4000 × 4000 RGB assets are rendered at 600 dpi for this print size. This is a display resampling, not new imagery or a claim of native sensor resolution.

[Original acquisition, coverage, source and sampling details](../copernicus_seasonal_photos_2026/README.md). Contains modified Copernicus Sentinel data 2026, processed with Copernicus Browser.

## Reproduce and verify

Render in an isolated repository restoration containing the original checksum-verified aligned assets; published outputs are immutable.

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MPLCONFIGDIR=/tmp/fogcast-copernicus-print-mpl \
python experiments/daytime_clear_reference/shared_daytime_reference_support_20261006/scripts/render_copernicus_print_figures.py
```

[Generation](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/generation.json) · [Numeric/layout checks](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/verification.json) · [Visual review](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/review.json) · [Publication](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/publication.json) · [Drive verification](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/drive-verification.json)

All nine uploaded figures have verified Drive IDs, names, sizes, MIME types and destination parents. The paired PDF additionally passed whole-byte SHA256 readback. All 21 original report/source/renderer files retain their prior hashes.

## SVG versions

The four self-contained SVGs have the same 3.1 × 3.85 inch physical size as the reviewed PDFs. Labels and axes are vector paths for font-independent printing; the satellite photograph is an embedded 1332 × 1332 PNG (600 dpi at the map size). Text is outlined rather than editable as text. No external fonts or images are required.

[SVG publication](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/svg/publication.json) · [SVG review](../../../../../artifacts/daytime_clear_reference/copernicus_print_figures_20261022/svg/review.json). Exporter: `experiments/daytime_clear_reference/shared_daytime_reference_support_20261006/scripts/export_copernicus_print_svg.py`; it reads the frozen individual PDFs and leaves them unchanged.
