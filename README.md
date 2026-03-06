# Mossie Wipeout Deluxe

A tiny browser idle game inspired by the old paperclip-style nonsense loop.

## Play

- Open `index.html` in any modern browser.
- Click `Swat!` (or press `Space`) to squash mozzies.
- Claim bounty, buy absurd upgrades, train at the School of Swat, and adopt deeply overqualified pets.

## What Changed

- Reworked layout with responsive cards, clearer hierarchy, and better mobile behavior.
- Split code into `styles.css`, `app.js`, and a structured data file (`MozzieWipeOutWeapons.js`).
- Added autosave/manual save via `localStorage`.
- Added keyboard shortcut (`Space`), toasts, button states, and stronger number formatting.
- Added an achievements system with permanent rewards.
- Added multi-track challenges with progress bars and one-time bonuses.

## Rebalance

- Progression is now tuned for a short run: the campaign is designed to finish in under **20 minutes** with active play.
- If the run reaches the 20-minute cap, an emergency nonsense failsafe ends the campaign.

## Legacy Link

`MossieWipeOut.html` redirects to `index.html` for backward compatibility.