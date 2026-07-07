// All customer-facing text in English and Tamil.
// Edit wording here — the same key drives both language versions.

export const CATEGORY_NAMES = {
  All: { en: "All", ta: "அனைத்தும்" },
  "Rice & Grains": { en: "Rice & Grains", ta: "அரிசி & தானியம்" },
  "Dals & Pulses": { en: "Dals & Pulses", ta: "பருப்பு வகைகள்" },
  Oils: { en: "Oils", ta: "எண்ணெய்" },
  "Spices & Masala": { en: "Spices & Masala", ta: "மசாலா பொருட்கள்" },
  "Snacks & Beverages": { en: "Snacks & Beverages", ta: "தின்பண்டம் & பானம்" },
  Household: { en: "Household", ta: "வீட்டு உபயோகம்" },
};

export function catName(category, lang) {
  return CATEGORY_NAMES[category]?.[lang] ?? category;
}

export const T = {
  en: {
    // header & footer
    navHome: "Home",
    navProducts: "Products",
    navContact: "Contact",
    navAdmin: "Admin",
    myList: "My list",
    announce: "மொத்தம் & சில்லறை · Wholesale & Retail · Doorstep Delivery · Quality First since",
    footerServices: "Wholesale & Retail · Doorstep Delivery · Quality First",
    hours: "Open daily 7.00 am – 9.00 pm",
    // landing
    sinceLine: "Since {since} · {place}",
    heroPara:
      "A family-run paruppu mill and provision store serving Perundurai since {since} — dals milled fresh in-house at direct mill prices, everyday provisions, chekku oils, and honest loose-item weighing.",
    ctaStock: "See today's stock & prices",
    ctaWhatsApp: "WhatsApp us",
    badges: ["Wholesale & Retail", "Doorstep Delivery", "Quality First"],
    statYears: "years in Perundurai",
    statItems: "items listed with today's price",
    statOpen: "open every day, 7 am to 9 pm",
    statBus: "from the bus stand",
    servicesTitle: "How we serve you",
    svc1Title: "Wholesale & Retail",
    svc1Text:
      "From a 100 g packet to bulk sacks at direct mill prices — one shop for households and businesses. Special wholesale rates for hotels, mess kitchens, hostels, and function orders — call us for a bulk quote.",
    svc2Title: "Doorstep Delivery",
    svc2Text:
      "Free doorstep delivery in and around Perundurai for orders above ₹500 — same-day for lists sent before 5 pm. Send your list on WhatsApp and stay home — we'll come to you.",
    svc3Title: "Quality Matters Most",
    svc3Text:
      "Every sack is hand-checked before it reaches the shelf — certified weighing, fresh grinding, and if anything isn't right, we replace it. No questions asked.",
    svc4Title: "India & Worldwide Courier",
    svc4Text:
      "Not in Perundurai? Order on WhatsApp from anywhere — we pack securely and send by courier across India and abroad. Packing and courier charges extra at actuals.",
    stepsTitle: "Order in 3 easy steps",
    step1Title: "Browse & add",
    step1Text: "See today's stock and prices, and add what you need to your list.",
    step2Title: "Send on WhatsApp",
    step2Text: "One tap sends your list to the shop — add your address if you want delivery.",
    step3Title: "Pickup or delivery",
    step3Text: "Collect your packed order at the shop, or we bring it to your doorstep.",
    whyTitle: "Why Perundurai shops with us",
    features: [
      {
        title: "From our own paruppu mill",
        text: "Toor, urad and moong dal milled in-house — from the mill to the shelf in days, not months. You taste the freshness in every sambar.",
      },
      {
        title: "Chekku oils",
        text: "Cold-pressed gingelly and groundnut oil from the marachekku — no refining, full taste.",
      },
      {
        title: "Erode turmeric & local sources",
        text: "Turmeric from Erode farms, jaggery from a nearby unit, murukku made fresh each morning by a local maker.",
      },
      {
        title: "Loose items, fair weighing",
        text: "Buy exactly what you need — 100 g or 5 kg — weighed in front of you on a certified scale.",
      },
      {
        title: "Order on WhatsApp",
        text: "Send your list before you leave home. We pack it and keep it ready — no waiting at the counter.",
      },
      {
        title: "Prices you can check",
        text: "Today's rates for every item are on this site — what you see here is what you pay at the shop.",
      },
    ],
    highlightsTitle: "Today's highlights",
    seeAll: "See all items →",
    visitTitle: "Visit us",
    callBtn: "Call {phone}",
    msgWhatsApp: "Message on WhatsApp",
    // products page
    productsTitle: "Today's stock & prices",
    productsPara:
      "Search in English or Tamil, filter by category, and add items to your list — send it on WhatsApp and we'll keep your order ready.",
    searchPlaceholder: "Search — rice, பருப்பு, oil, soap…",
    sortLabel: "Sort",
    sortFeatured: "Featured",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",
    sortName: "Name A–Z",
    inStockOnly: "● In stock only",
    itemsCount: "{n} items",
    itemsCountIn: "{n} items in {cat}",
    emptyNote: "Nothing matches. Try a different search or category.",
    inStock: "In stock",
    soldOut: "Sold out",
    // detail page
    detailsTitle: "Details",
    brandSource: "Brand / source",
    priceLabel: "Price",
    perUnit: "per",
    availability: "Availability",
    availIn: "In stock at the shop today",
    availOut: "Out of stock right now",
    addToList: "Add to my list",
    onlyLeft: "Only {n} left today",
    outOfStock: "Out of stock",
    askCounter: "Ask at the counter for arrival date",
    addedToList: "Added {qty} × {name} to your list",
    // list page
    listTitle: "My shopping list",
    listEmpty: "Your list is empty.",
    browseProducts: "Browse products",
    each: "each",
    per: "per",
    approxTotal: "Approx. total",
    sendOrder: "Send order on WhatsApp",
    orCall: "Or call",
    remove: "Remove",
    listNote:
      "We'll pack your order and keep it ready for pickup — or mention your address in the WhatsApp message for doorstep delivery. Free delivery in and around Perundurai above ₹500. Outside Perundurai? We courier across India and abroad — packing and courier charges extra at actuals. Final billing is done at handover; prices for loose items may vary slightly by weight.",
    // contact page
    contactEyebrow: "We reply on WhatsApp within minutes",
    contactTitle: "Contact & visit us",
    contactPara:
      "{name} is on Main Road, 2 minutes from the bus stand. Call, message, or just walk in — open daily 7.00 am – 9.00 pm.",
    talkTitle: "Talk to us",
    callShop: "Call the shop",
    addressSub: "Address",
    deliverySub: "Doorstep delivery",
    wholesaleSub: "Wholesale orders",
    courierSub: "Courier orders — India & abroad",
    hoursSub: "Shop hours",
    monSat: "Monday – Saturday",
    sunday: "Sunday",
    festival: "Festival days",
    festivalVal: "Open — call to confirm hours",
    hoursVal: "7.00 am – 9.00 pm",
    getDirections: "Get directions",
    writeReview: "Write a review on Google",
    basedOn: "Based on {n} customer reviews",
    msgTitle: "Send us a message",
    yourName: "Your name",
    yourMsg: "Your message",
    namePlaceholder: "e.g. Senthil",
    msgPlaceholder: "Do you have fresh toor dal today?",
    sendWA: "Send on WhatsApp",
    msgNote:
      "Opens WhatsApp with your message ready to send — we usually reply within minutes during shop hours.",
    address: "Main Road, Perundurai, Erode District – 638052",
    landmark: "2 minutes from the bus stand",
    deliveryNote:
      "Free doorstep delivery in and around Perundurai for orders above ₹500 — same-day for lists sent before 5 pm.",
    wholesaleNote:
      "Special wholesale rates for hotels, mess kitchens, hostels, and function orders — call us for a bulk quote.",
    courierNote:
      "We take WhatsApp orders from anywhere in India and abroad — securely packed and sent by courier. Packing and courier charges extra at actuals.",
  },

  ta: {
    // header & footer
    navHome: "முகப்பு",
    navProducts: "பொருட்கள்",
    navContact: "தொடர்பு",
    navAdmin: "நிர்வாகம்",
    myList: "என் பட்டியல்",
    announce: "மொத்தம் & சில்லறை · வீடு தேடி டெலிவரி · தரமே முதன்மை ·",
    footerServices: "மொத்தம் & சில்லறை · வீடு தேடி டெலிவரி · தரமே முதன்மை",
    hours: "தினமும் காலை 7.00 – இரவு 9.00 வரை",
    // landing
    sinceLine: "{since} முதல் · பெருந்துறை",
    heroPara:
      "{since} முதல் பெருந்துறையில் சேவை செய்யும் குடும்ப பருப்பு மில் & மளிகைக் கடை — எங்கள் மில்லில் புதிதாக அரைத்த பருப்புகள் நேரடி மில் விலையில், அன்றாட மளிகை சாமான்கள், செக்கு எண்ணெய், நேர்மையான எடை.",
    ctaStock: "இன்றைய சரக்கு & விலை பார்க்க",
    ctaWhatsApp: "வாட்ஸ்அப் செய்யுங்கள்",
    badges: ["மொத்தம் & சில்லறை", "வீடு தேடி டெலிவரி", "தரமே முதன்மை"],
    statYears: "ஆண்டுகள் பெருந்துறையில்",
    statItems: "பொருட்கள் இன்றைய விலையுடன்",
    statOpen: "தினமும் காலை 7 – இரவு 9",
    statBus: "பஸ் ஸ்டாண்டில் இருந்து",
    servicesTitle: "நாங்கள் தரும் சேவைகள்",
    svc1Title: "மொத்தம் & சில்லறை",
    svc1Text:
      "100 கிராம் பாக்கெட் முதல் மூட்டை வரை நேரடி மில் விலையில் — வீட்டிற்கும் வியாபாரத்திற்கும் ஒரே கடை. ஹோட்டல், மெஸ், விடுதி, விசேஷ ஆர்டர்களுக்கு சிறப்பு மொத்த விலை — அழைத்து கேளுங்கள்.",
    svc2Title: "வீடு தேடி டெலிவரி",
    svc2Text:
      "₹500-க்கு மேல் பெருந்துறை சுற்றுவட்டாரத்தில் இலவச டெலிவரி — மாலை 5 மணிக்குள் அனுப்பும் பட்டியலுக்கு அன்றே டெலிவரி. வாட்ஸ்அப்பில் பட்டியல் அனுப்பி வீட்டிலேயே இருங்கள்.",
    svc3Title: "தரமே முதன்மை",
    svc3Text:
      "ஒவ்வொரு மூட்டையும் கடைக்கு வரும் முன் கையால் சரிபார்க்கப்படுகிறது — சான்றளிக்கப்பட்ட தராசு, புதிய அரைவை. பொருள் சரியில்லை என்றால் கேள்வி இல்லாமல் மாற்றித் தருகிறோம்.",
    svc4Title: "இந்தியா & வெளிநாடு கூரியர்",
    svc4Text:
      "பெருந்துறையில் இல்லையா? எங்கிருந்தும் வாட்ஸ்அப்பில் ஆர்டர் செய்யுங்கள் — பத்திரமாக பேக் செய்து இந்தியா முழுவதும் வெளிநாடுகளுக்கும் கூரியர் அனுப்புகிறோம். பேக்கிங் & கூரியர் கட்டணம் தனி.",
    stepsTitle: "3 எளிய படிகளில் ஆர்டர் செய்யுங்கள்",
    step1Title: "பார்த்து சேருங்கள்",
    step1Text: "இன்றைய சரக்கையும் விலையையும் பார்த்து, தேவையானதை பட்டியலில் சேருங்கள்.",
    step2Title: "வாட்ஸ்அப்பில் அனுப்புங்கள்",
    step2Text: "ஒரே தட்டில் பட்டியல் கடைக்கு வரும் — டெலிவரி வேண்டுமெனில் முகவரியும் சேருங்கள்.",
    step3Title: "பிக்-அப் அல்லது டெலிவரி",
    step3Text: "கட்டி வைத்த ஆர்டரை கடையில் வாங்குங்கள், அல்லது வீடு தேடி கொண்டு வருகிறோம்.",
    whyTitle: "பெருந்துறை எங்களை நம்பக் காரணம்",
    features: [
      {
        title: "எங்கள் சொந்த பருப்பு மில்",
        text: "துவரம், உளுந்து, பாசிப்பயறு — எங்கள் மில்லிலேயே அரைத்து சில நாட்களில் கடை அலமாரிக்கு. சாம்பாரில் புத்துணர்வு தெரியும்.",
      },
      {
        title: "செக்கு எண்ணெய்",
        text: "மரச்செக்கில் ஆட்டிய நல்லெண்ணெய் & கடலை எண்ணெய் — சுத்திகரிப்பு இல்லை, முழு சுவை.",
      },
      {
        title: "ஈரோடு மஞ்சள் & உள்ளூர் பொருட்கள்",
        text: "ஈரோடு விவசாயிகளின் மஞ்சள், அருகிலுள்ள ஆலை வெல்லம், தினமும் காலை புதிய முறுக்கு.",
      },
      {
        title: "நேர்மையான எடை",
        text: "தேவையானதை மட்டும் வாங்குங்கள் — 100 கிராம் ஆனாலும் 5 கிலோ ஆனாலும், கண் முன்னே சான்றளிக்கப்பட்ட தராசில்.",
      },
      {
        title: "வாட்ஸ்அப்பில் ஆர்டர்",
        text: "வீட்டில் இருந்தே பட்டியல் அனுப்புங்கள். நாங்கள் கட்டி வைத்திருக்கிறோம் — கவுண்டரில் காத்திருப்பு இல்லை.",
      },
      {
        title: "வெளிப்படையான விலை",
        text: "ஒவ்வொரு பொருளின் இன்றைய விலையும் இந்த தளத்தில் — இங்கு பார்க்கும் விலையே கடையிலும்.",
      },
    ],
    highlightsTitle: "இன்றைய சிறப்பு பொருட்கள்",
    seeAll: "எல்லா பொருட்களும் →",
    visitTitle: "எங்களை வந்து பாருங்கள்",
    callBtn: "{phone} அழையுங்கள்",
    msgWhatsApp: "வாட்ஸ்அப்பில் அனுப்ப",
    // products page
    productsTitle: "இன்றைய சரக்கு & விலைகள்",
    productsPara:
      "தமிழிலோ ஆங்கிலத்திலோ தேடுங்கள், வகை வாரியாக பிரித்துப் பாருங்கள் — பட்டியலை வாட்ஸ்அப்பில் அனுப்பினால் ஆர்டரை தயாராக வைத்திருக்கிறோம்.",
    searchPlaceholder: "தேடுங்கள் — அரிசி, பருப்பு, எண்ணெய்…",
    sortLabel: "வரிசை",
    sortFeatured: "சிறப்பு",
    sortPriceAsc: "விலை: குறைவு → அதிகம்",
    sortPriceDesc: "விலை: அதிகம் → குறைவு",
    sortName: "பெயர் வரிசை",
    inStockOnly: "● கையிருப்பு மட்டும்",
    itemsCount: "{n} பொருட்கள்",
    itemsCountIn: "{cat} — {n} பொருட்கள்",
    emptyNote: "எதுவும் கிடைக்கவில்லை. வேறு வார்த்தையில் அல்லது வகையில் தேடிப் பாருங்கள்.",
    inStock: "கையிருப்பில்",
    soldOut: "தீர்ந்தது",
    // detail page
    detailsTitle: "விவரங்கள்",
    brandSource: "பிராண்ட் / மூலம்",
    priceLabel: "விலை",
    perUnit: "ஒரு",
    availability: "கிடைக்கும் நிலை",
    availIn: "இன்று கடையில் உள்ளது",
    availOut: "தற்போது கையிருப்பில் இல்லை",
    addToList: "பட்டியலில் சேர்",
    onlyLeft: "இன்று {n} மட்டுமே உள்ளது",
    outOfStock: "தீர்ந்துவிட்டது",
    askCounter: "வரும் தேதிக்கு கடையில் கேளுங்கள்",
    addedToList: "{qty} × {name} பட்டியலில் சேர்க்கப்பட்டது",
    // list page
    listTitle: "என் பட்டியல்",
    listEmpty: "உங்கள் பட்டியல் காலியாக உள்ளது.",
    browseProducts: "பொருட்களை பார்க்க",
    each: "ஒன்றுக்கு",
    per: "ஒரு",
    approxTotal: "மொத்தம் (தோராயம்)",
    sendOrder: "வாட்ஸ்அப்பில் ஆர்டர் அனுப்ப",
    orCall: "அல்லது அழைக்க",
    remove: "நீக்கு",
    listNote:
      "ஆர்டரை கட்டி தயாராக வைத்திருக்கிறோம் — வீடு தேடி டெலிவரி வேண்டுமெனில் வாட்ஸ்அப் செய்தியில் முகவரியை சேருங்கள். ₹500-க்கு மேல் பெருந்துறை சுற்றுவட்டாரத்தில் இலவச டெலிவரி. வெளியூரா? இந்தியா முழுவதும் வெளிநாடுகளுக்கும் கூரியர் செய்கிறோம் — பேக்கிங் & கூரியர் கட்டணம் தனி. இறுதி பில் ஒப்படைக்கும்போது — நிறுவைப் பொருட்களின் விலை எடைக்கு ஏற்ப சிறிது மாறலாம்.",
    // contact page
    contactEyebrow: "வாட்ஸ்அப்பில் சில நிமிடங்களில் பதில்",
    contactTitle: "தொடர்பு & வருகை",
    contactPara:
      "{name} மெயின் ரோட்டில், பஸ் ஸ்டாண்டில் இருந்து 2 நிமிடத்தில் உள்ளது. அழையுங்கள், செய்தி அனுப்புங்கள், அல்லது நேரடியாக வாருங்கள் — தினமும் காலை 7 முதல் இரவு 9 வரை.",
    talkTitle: "எங்களிடம் பேசுங்கள்",
    callShop: "கடையை அழைக்க",
    addressSub: "முகவரி",
    deliverySub: "வீடு தேடி டெலிவரி",
    wholesaleSub: "மொத்த ஆர்டர்கள்",
    courierSub: "கூரியர் ஆர்டர்கள் — இந்தியா & வெளிநாடு",
    hoursSub: "கடை நேரம்",
    monSat: "திங்கள் – சனி",
    sunday: "ஞாயிறு",
    festival: "பண்டிகை நாட்கள்",
    festivalVal: "திறந்திருக்கும் — நேரத்தை அழைத்து உறுதி செய்யவும்",
    hoursVal: "காலை 7.00 – இரவு 9.00",
    getDirections: "வழி காட்ட",
    writeReview: "கூகுளில் மதிப்புரை எழுத",
    basedOn: "{n} வாடிக்கையாளர் மதிப்புரைகளின் அடிப்படையில்",
    msgTitle: "எங்களுக்கு செய்தி அனுப்புங்கள்",
    yourName: "உங்கள் பெயர்",
    yourMsg: "உங்கள் செய்தி",
    namePlaceholder: "உதா. செந்தில்",
    msgPlaceholder: "இன்று புதிய துவரம் பருப்பு உள்ளதா?",
    sendWA: "வாட்ஸ்அப்பில் அனுப்ப",
    msgNote:
      "உங்கள் செய்தியுடன் வாட்ஸ்அப் திறக்கும் — கடை நேரத்தில் பொதுவாக சில நிமிடங்களில் பதில் தருகிறோம்.",
    address: "மெயின் ரோடு, பெருந்துறை, ஈரோடு மாவட்டம் – 638052",
    landmark: "பஸ் ஸ்டாண்டில் இருந்து 2 நிமிடம்",
    deliveryNote:
      "₹500-க்கு மேல் பெருந்துறை சுற்றுவட்டாரத்தில் இலவச வீடு தேடி டெலிவரி — மாலை 5 மணிக்குள் அனுப்பும் பட்டியலுக்கு அன்றே டெலிவரி.",
    wholesaleNote:
      "ஹோட்டல், மெஸ், விடுதி, விசேஷ ஆர்டர்களுக்கு சிறப்பு மொத்த விலை — மொத்த விலைக்கு எங்களை அழையுங்கள்.",
    courierNote:
      "இந்தியாவில் எங்கிருந்தும் வெளிநாட்டில் இருந்தும் வாட்ஸ்அப்பில் ஆர்டர் செய்யலாம் — பத்திரமாக பேக் செய்து கூரியரில் அனுப்புகிறோம். பேக்கிங் & கூரியர் கட்டணம் தனி (உண்மை செலவில்).",
  },
};

export function getT(lang) {
  return T[lang] ?? T.en;
}

export function fmt(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}
