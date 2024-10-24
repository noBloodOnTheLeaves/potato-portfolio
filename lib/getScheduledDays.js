export default async function getScheduledDays() {
   const res = await fetch(
       `https://getpantry.cloud/apiv1/pantry/${process.env.PANTRY_API_ID}/basket/${process.env.PANTRY_SCHEDULED_PHOTOS_BASKET_NAME}`
   )
   return  await res.json()
}
