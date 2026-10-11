# Bonbuch

A receipt-scanning expense tracker who shop in more than one country. Take a photo of a receipt, and it reads the total, items, sorts them into categorizes and keeps a monthly log. All locally! No account, no server,no LLM, no receipt image ever leaving the device itself.

>  **Status: working prototype.** The core flow works end to end, but it's not production-ready yet --> see [Known issues](#known-issues) below. 

## Why I built it

Expense apps either want a subscription, want us to upload photos of our receipts to someone else's cloud, or both. I wanted the opposite: scan a receipt, get it logged and categorized, and have the data stay on my own machine. Bonbuch does that. Everything runs client-side, so the spending data is nobody's business but ours.

It also handles receipts in **German, English and Danish**, which matters if your receipts don't all come from the same country. Thus, it also converts DKK to EUR using the exchange rate of the receipt's date. 

## Features

- **Scan & read** — pull the total (and where possible, line items) straight from a receipt image via OCR. It is also possible to confirm or correct what was read.
- **Categories & subscriptions** — current categories are: produces, meat, dairy and so on; plus household items, hardware, pets, with custom categories and dictionary entries. I also integrated a Deposit/return handling for bottles
- **DKK --> EUR conversion** Integration of a toggle between the original and translated view
- **Budgets** There is a month-over-month comparison, as well as subscriptions the user can include and toggle on/off for the current month as they may get cancelled
**
- **Incoome** Salary and other income can be included with a balance against expenses
- **Installable** — works as a PWA, so it behaves like an app on desktop or phone
- **Multilingual** — DE / EN / DK receipt handling
- **CSV/JSON** export and backup 


## How the data is stored

There are two modes, and the difference matters:

| | Where the data is stored | Advantage |
|---|---|---|
| **Laptop/PC version** (Node server) | Plain files in a `daten/` folder next to the app: `bonbuch.json` (entries, budgets, categories), `belege/` (receipt photos as `.jpg`), `sicherungen/` (automatic daily backup, last 60 days) | The main version. Survives clearing the browser, works with any browser, easy to copy or sync |
| **Browser-only version** (hosted on Vercel, or opened without the server) | The browser's IndexedDB | Quick use on a phone. Data is tied to that browser and is lost if the browser data is cleared, so use the backup export regularly |

I started with browser storage only and moved the laptop version to files after realising how easily it can disappear (cleared cache, different browser, no way to get at the data without the app), which is a huge disadvantage in my opinion. 


## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL the dev server prints. Internet is needed for the first scan (OCR language data) and for the daily exchange rate. 

# Tech

HTML, CSS and JavaScript · [Tesseract.js](https://github.com/naptha/tesseract.js) for OCR · service worker (PWA) · IndexedDB (browser mode) · small Node.js server using only built-in modules (file mode)

## Challenges I ran into

Reading receipts reliably does not yet work reliably. Every shop prints a different layout, thus the total might be labelled "SUMME", "TOTAL", "I ALT", or just sit at the bottom with no label at all. Getting the OCR to find the right number across three languages and dozens of formats is still a work in progress (see below). It turned out to be much less "call an OCR library and done" than I expected, and most of the real work is in the parsing *after* the text comes back.

Keeping data safe across devices was a nuisance. The first version stored everything in the browser, which is too fragile. Separating code from data means, I can update the app without touching existing entries.

## Known issues


- **Currency switching isn't reliable yet** — switching between EUR / DKK sometimes doesn't apply consistently across the log.
- **OCR accuracy unfortunately varies by receipt** — faded or unusually formatted receipts often need manual correction, so there's still more manual entry than I'd like. I would like it to be more automated. "Scan & Go" if you will. 
- Line-item parsing works better on some receipt layouts than others.

## Features to come: 

- Improve the currency handling
- Improve the receipt parser (more layouts, better total-detection heuristics) thus less manual work
- Localization & alignment with international standards

