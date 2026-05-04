export type Issue = {
  id: string;
  label: string;
  price: number;
  turnaround: string;
};

export type Device = {
  id: string;
  label: string;
  shortLabel: string;
  issues: Issue[];
};

export const repairs: Device[] = [
  {
    id: "ps5",
    label: "PlayStation 5",
    shortLabel: "PS5",
    issues: [
      { id: "hdmi", label: "HDMI Port Repair", price: 200, turnaround: "Same day" },
      { id: "power", label: "No Power / Won't Turn On", price: 180, turnaround: "1–2 days" },
      { id: "disc", label: "Disc Drive Issue", price: 150, turnaround: "1–2 days" },
      { id: "overheat", label: "Overheating / Loud Fan", price: 120, turnaround: "Same day" },
      { id: "controller", label: "Controller Sync Issue", price: 60, turnaround: "Same day" },
    ],
  },
  {
    id: "xbox",
    label: "Xbox Series X",
    shortLabel: "Xbox",
    issues: [
      { id: "hdmi", label: "HDMI Port Repair", price: 190, turnaround: "Same day" },
      { id: "power", label: "No Power", price: 160, turnaround: "1–2 days" },
      { id: "disc", label: "Disc Drive Issue", price: 140, turnaround: "1–2 days" },
      { id: "overheat", label: "Overheating", price: 110, turnaround: "Same day" },
    ],
  },
  {
    id: "switch",
    label: "Nintendo Switch",
    shortLabel: "Switch",
    issues: [
      { id: "screen", label: "Cracked Screen", price: 130, turnaround: "Same day" },
      { id: "charging", label: "Won't Charge", price: 80, turnaround: "Same day" },
      { id: "joycon", label: "Joy-Con Drift", price: 50, turnaround: "Same day" },
      { id: "hdmi", label: "Dock / HDMI Issue", price: 90, turnaround: "1–2 days" },
    ],
  },
  {
    id: "joycon",
    label: "Joy-Con Only",
    shortLabel: "Joy-Con",
    issues: [
      { id: "drift", label: "Analog Stick Drift", price: 45, turnaround: "Same day" },
      { id: "button", label: "Button Not Working", price: 40, turnaround: "Same day" },
      { id: "charge", label: "Won't Charge", price: 40, turnaround: "Same day" },
    ],
  },
];

export const BUSINESS = {
  phone: "(682) 708-7506",
  phoneHref: "tel:+16827087506",
  address: "5425 S Hulen St, Fort Worth, TX 76132",
  mapsUrl: "https://maps.google.com/?q=5425+S+Hulen+St,+Fort+Worth,+TX+76132",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.4!2d-97.4!3d32.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7c!2s5425+S+Hulen+St+Fort+Worth+TX!5e0!3m2!1sen!2sus!4v1",
  hours: [
    { day: "Mon", hours: "11 AM – 8 PM" },
    { day: "Tue", hours: "11 AM – 8 PM" },
    { day: "Wed", hours: "11 AM – 8 PM" },
    { day: "Thu", hours: "11 AM – 8 PM" },
    { day: "Fri", hours: "11 AM – 8 PM" },
    { day: "Sat", hours: "11 AM – 8 PM" },
    { day: "Sun", hours: "12 PM – 6 PM" },
  ],
  hoursShort: "Mon–Sat 11AM–8PM · Sun 12–6PM",
};
