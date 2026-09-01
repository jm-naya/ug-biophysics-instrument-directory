# UG Biophysics Instrument Directory

A searchable, browsable inventory of biophysics-relevant instrumentation available across the University of Ghana, compiled from a 2026 multi-facility survey.

**Live site:** https://jm-naya.github.io/ug-biophysics-instrument-directory/

## Overview

This tool consolidates equipment data from multiple UG labs and research facilities into a single searchable directory, making it easier for researchers, students, and collaborators to identify what instrumentation is available, where it's located, and how to access it.

## Features

- **Search** by instrument name, manufacturer, lab, or keyword — including synonyms and technique abbreviations (e.g. "FACS" or "flow cytometry" both find the flow cytometer, "nuclear" finds the NMR spectrometer)
- **Filter** by facility/school and by operational status
- Grouped view by facility, with instrument details including manufacturer/model, host lab, usage cost, and current status
- 59 instruments currently catalogued across participating facilities

## Data Source

Instrument data was collected via a 2026 survey of biophysics-relevant equipment across UG facilities, including the School of Engineering Sciences and WACCBIP. Data is stored in `src/data/instruments.js`.

## Tech Stack

- React (Vite)
- Plain CSS
- Deployed via GitHub Actions to GitHub Pages

## Running Locally

Requires [Node.js](https://nodejs.org) and [Git](https://git-scm.com/downloads) installed.

```bash
git clone https://github.com/jm-naya/ug-biophysics-instrument-directory.git
cd ug-biophysics-instrument-directory
npm install
npm run dev
```

Then open the local address shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
instrument-directory/
├── .github/
│   └── workflows/
│       └── deploy.yml        # auto-deploys to GitHub Pages on push to main
├── src/
│   ├── data/
│   │   └── instruments.js    # instrument records
│   ├── App.jsx                # main app logic (search, filters, rendering)
│   ├── App.css                 # styling
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
└── package.json
```

## Updating the Data

To add, edit, or correct an instrument entry, edit the relevant object in `src/data/instruments.js`. Each entry includes fields such as name, manufacturer, model, lab, facility, cost, status, and a `keywords` array used for search matching.

Any push to `main` automatically rebuilds and redeploys the live site within about a minute.

## Contributing

Corrections or additions to instrument records are welcome — open an issue or pull request, or contact the maintainer directly.

## License

All rights reserved.

## Contact

Maintained by [jm-naya](https://github.com/jm-naya).
