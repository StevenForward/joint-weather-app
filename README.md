# Joint Weather App 🌦️

A weather-based health companion that helps users understand how current atmospheric conditions may relate to joint and bone discomfort.

---

## Inspiration

This project was inspired by watching a close family member struggle with unpredictable joint discomfort — never quite knowing whether a given day would be a good one or a difficult one. The goal was simple: give people a sense of predictability and control, even in a small way.

---

## What It Does

The app takes a user's location, fetches real-time weather data (barometric pressure, humidity, and temperature), and surfaces a plain-language risk outlook — low, moderate, or high — indicating whether today's conditions are historically associated with increased joint discomfort.

The emphasis is on **informed awareness**, not diagnosis. This app does not predict whether any individual will feel pain.

---

## The Core Challenge: Honest Science

The biggest design challenge was figuring out how to be genuinely useful without being misleading.

The research on weather and joint pain is real but imperfect. Studies suggest correlations — particularly around barometric pressure drops and high humidity — but individual responses vary significantly depending on the condition, the person, and a range of other factors. A blanket "you will feel pain today" would be irresponsible.

The solution was a **"soft expectations" model**: communicate increased probability using clear, hedged language, and pair every risk level with actionable guidance rather than just a data readout. The app is a tool for awareness, not a clinical prediction engine.

---

## Tech Stack

- **React + Vite** — frontend framework and build tool
- **Tailwind CSS** — utility-first styling
- **Open-Meteo API** — free, open weather data (no API key required)
- **i18next** — bilingual support (English / Spanish)

---

## Goals

- [ ] Refine the risk model based on peer-reviewed research
- [ ] Add bilingual (EN/ES) support for accessibility
- [ ] Add hourly forecast view
- [ ] Improve accessibility for non-technical users
- [ ] Deploy publicly

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/joint-weather-app.git
cd joint-weather-app
npm install
npm run dev
```

---

## Disclaimer

This app is not a medical device and is not intended to diagnose, treat, or predict any medical condition. Always consult a healthcare professional regarding joint health concerns.