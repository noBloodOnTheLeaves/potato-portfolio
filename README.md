# Potato's portfolio

<img src="./public/images/about/camera.png" alt="MarineGEO circle logo" style="height: 200px; width:200px;"/>

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```
Don't forget create .env file

**NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=** \
**CLOUDINARY_API_KEY=** \
**CLOUDINARY_API_SECRET=** \
**CLOUDINARY_FOLDER=**
**PANTRY_API_ID=**
**PANTRY_SCHEDULED_PHOTOS_BASKET_NAME=**
**NEXT_PUBLIC_CLOUDINARY_API_KEY=**

Note about pantry:
- if it will be too little requests, they will delete your account
- need to register new token and create basket **scheduled_photoshoots**. It should be json array with **date** key
- JSON structure and date format 
`
  {
  "bookedDays": [
  {
  "date": "2024-09-25T00:00:00",
  },
  {
  "date": "2024-09-14T00:00:00"
  }
  ]
  }
`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Some content is from data folder. This folder contains .json config files with data.

### #TODO

 - [ ] optimization for different devices - kinda
 - [X] pages prefetch -> getStaticProps refactoring
 - [ ] change banner
 - [ ] seo
 - [ ] vercel deploy

---
[Based on Next.js](https://nextjs.org/docs) \
Deploy [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) \
[Next.js deployment documentation](https://nextjs.org/docs/deployment)
