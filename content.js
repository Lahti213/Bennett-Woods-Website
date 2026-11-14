/* =====================================================================
   BENNETT WOODS — SITE CONTENT
   ---------------------------------------------------------------------
   This is the one file to edit when you want to update the website.
   You don't need to touch the HTML.

   Rules of thumb:
   • Keep the quotes "" and the commas between items exactly as shown.
   • Dates are written "YYYY-MM-DD", e.g. "2026-12-06".
   • If a list is empty [ ], that section stays hidden on the site.
   • After editing, check the site still loads. A missing comma or quote
     is the usual culprit if a section disappears.
   ===================================================================== */

window.BW = {

    /* ---------- Social / group links ----------
       Shown in the footer and on the New Neighbors page.
       Example:
       { label: "Facebook group", url: "https://www.facebook.com/groups/..." },
       { label: "Nextdoor",       url: "https://nextdoor.com/neighborhood/..." },
    */
    social: [
    ],

    /* ---------- News ----------
       Newest first. Items older than `newsMaxAgeDays` are hidden
       automatically so the site never looks stale.
    */
    newsMaxAgeDays: 365,
    news: [
        {
            date: "2026-02-20",
            title: "Welcome, new neighbors",
            text: "Several new families have joined Bennett Woods! If you see unfamiliar faces, say hello and help them feel at home."
        },
        {
            date: "2026-02-10",
            title: "Neighborhood watch reminder",
            text: "Keep porch lights on in the evening and report suspicious activity to the Smyrna PD non-emergency line at (770) 434-6666. For emergencies, always call 911."
        }
    ],

    /* ---------- Events ----------
       date:  "YYYY-MM-DD", or leave as "" if the date isn't set yet ("Date TBA").
       time:  optional, e.g. "6:00 PM"
       Past events disappear automatically the day after.
       Dated events get an "Add to calendar" button.
    */
    events: [
        {
            date: "",
            time: "",
            title: "Annual Chili Cook-Off",
            place: "Bennett Woods",
            text: "Bring your best pot of chili or just bring an appetite. Hosted by the Garden Club."
        },
        {
            date: "",
            time: "",
            title: "Christmas Wreath Workshop",
            place: "Bennett Woods",
            text: "Make a fresh holiday wreath with neighbors. Materials and know-how provided by the Garden Club."
        },
        {
            date: "",
            time: "",
            title: "Floral Arranging Class",
            place: "Bennett Woods",
            text: "Learn seasonal arranging from fellow gardeners. All skill levels welcome."
        },
        {
            date: "",
            time: "",
            title: "Garden Club Meeting",
            place: "Bennett Woods",
            text: "Regular meeting of the Bennett Woods Garden Club. New members always welcome."
        }
    ],

    /* ---------- Photo gallery ----------
       1. Put photos in the  photos/  folder (about 1600px wide JPGs work well).
       2. Add a line for each one below.
       Only post photos you have permission to use, and avoid
       clearly showing house numbers, license plates or children's faces.
       Example:
       { src: "photos/entrance-spring.jpg", alt: "Azaleas at the Concord Road entrance", caption: "Spring at the main entrance", credit: "Jane D." },
    */
    photos: [
    ],

    /* ---------- Neighbor-recommended businesses ----------
       Only add businesses a resident has actually used and recommends.
       category examples: "Lawn & Landscaping", "Plumbing", "Electrical",
       "Painting", "Cleaning", "Pet Care", "HVAC", "Handyman", "Roofing".
       Example:
       { name: "Smith Lawn Care", category: "Lawn & Landscaping", phone: "(770) 555-0100", url: "https://...", note: "Reliable weekly mowing; used by several neighbors." },
    */
    services: [
    ]
};
