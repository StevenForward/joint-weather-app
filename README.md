# JointCast 🌦️

A weather-based health companion that helps users understand how current atmospheric conditions may relate to joint and bone discomfort.

---

## Inspiration

After watching a family member struggle with unpredictable joint discomfort and some research on how weather conditions impacts joints, the goal was to give people a sense of predictability and control.

---

## What It Does

The app takes a user's location, fetches real-time weather data (barometric pressure, humidity, and temperature), and surfaces a plain-language risk outlook — low, moderate, or high — indicating whether today's conditions are historically associated with increased joint discomfort.

The emphasis is on **informed awareness**, not diagnosis. This app does not predict whether a person will feel pain.

---

## The Core Challenge: Honest Science

The biggest design challenge was figuring out how to be genuinely useful without being misleading.

The research on weather and joint pain is real but imperfect. Studies suggest correlations — particularly around barometric pressure drops and high humidity — but individual responses vary significantly depending on the condition, the person, and a range of other factors. A blanket "you will feel pain today" would be irresponsible.

The solution was a **"soft expectations" model**: communicate increased probability using clear, hedged language, and pair every risk level with actionable guidance rather than just a data readout. The app is a tool for awareness, not a clinical prediction engine.

---

## Tech Stack

- **React Native (Expo)** — cross-platform mobile framework, targeting iPhone (iOS)
- **Open-Meteo API** — free, open weather data (no API key required)
- **Open-Meteo Geocoding API** — city search / location lookup

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
git clone https://github.com/YOUR_USERNAME/jointcast.git
cd jointcast
npm install
npm start
```

Then scan the QR code from the terminal with the **Expo Go** app on your iPhone
(App Store) to run it on a real device — no Mac required for development.
To build a standalone iOS binary for the App Store, use
[EAS Build](https://docs.expo.dev/build/introduction/) (`npx eas build -p ios`).

---

## Disclaimer

This app is not a medical device and is not intended to diagnose, treat, or predict any medical condition. Always consult a healthcare professional regarding joint health concerns.