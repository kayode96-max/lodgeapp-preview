# LodgeApp Preview

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Firestore Data Model Example

### Collection: `lodges`

Each document represents a lodge:

```
{
  name: "Peace Villa",
  location: "Gidan Kwano, Minna",
  pricePerYear: 350000, // ₦
  pricePerSemester: 180000, // ₦
  rating: 4.5,
  totalReviews: 23,
  images: ["/lodges/peacevilla1.jpg", "/lodges/peacevilla2.jpg"],
  amenities: ["Wifi", "Parking", "Generator", "Water"],
  isVerified: true,
  landlordName: "Mr. Musa Bello",
  distanceFromCampus: "5 min walk",
  lastUpdated: "2025-06-27T12:00:00Z"
}
```

- All prices are stored as integers in Nigerian Naira (₦).
- Use the `formatNaira` utility for display.
- Add more fields as needed for reviews, price history, etc.
