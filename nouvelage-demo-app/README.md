# Nouvelage — patient app (demo build)

Expo / React Native, same stack as Mersal. Runs entirely on demo data — no Odoo
connection needed. Point it at the API when you're ready.

## See it on your phone in 3 minutes

```bash
npm install
npx expo start
```

Install **Expo Go** from Play Store, scan the QR shown in the terminal.
Phone and laptop must be on the same wifi. If not: `npx expo start --tunnel`.

## Build an APK

```bash
npm install -g eas-cli
eas login
eas init
eas build -p android --profile preview
```

Builds on Expo's servers, gives you a download link. No Android SDK needed.

## Screens

```
splash → onboarding (3) → register (phone → OTP → done) / login (+ Google, Apple)
tabs:  Home · Services · Sessions · Profile
Home:      next appointment · categories · popular treatments · countdown offer
           · package progress · top doctors
Services:  6 categories → category list → service detail (benefits, reviews, book)
Booking:   3 steps — date & time · doctor · review → confirmation
Doctors:   list with ratings → detail with bio, experience, branches, reviews
Sessions:  upcoming / last, session N of M, reschedule, cancel, rebook
Packages:  offers → package detail → card payment → success
Profile:   balance · points · my packages · notifications · location
           · edit profile · change password · logout
```

## What the data is

Branches, service names, prices, doctor names and the package figures are
**real values read from Odoo 18 production on 30 Aug 2026**, so the demo reads
truthfully when you show it.

Ratings, reviews, doctor bios, offer countdowns and the payment screen are
**invented** — none of them exist in Odoo yet.

The numbers deliberately include a real quirk: the balance is 6,706.94 credit,
the package shows 1,440 of 10,000 pulses left, and one past session is marked
completed while still showing an amount due. That last one is a genuine data
contradiction in Odoo, not a bug in the app.

## Wiring it to Odoo later

Install the `nvg_mobile_api` module, then replace `src/data/demo.ts` with calls
to `src/api/client.ts` from the earlier delivery. The demo objects already match
the API response shapes, so the screens don't change.

Three things need building in Odoo before every screen has real data:

| Screen | Blocker |
|---|---|
| My Points | 28,432 of 28,559 loyalty cards have no customer attached |
| Ratings & reviews | no model exists |
| Doctor bio / experience | no fields exist |
| Card payment | no payment gateway |

## Changing the look

Everything visual is in `src/theme/index.ts`. Change a colour there and it moves
across all 25 screens. Category and service images are icons for now — drop in
real photos and they slot straight in.
