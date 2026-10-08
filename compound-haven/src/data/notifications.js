
const notifications = [
  {
    id: 1,
    type: "payment",
    title: "Service fee payment due",
    message:
      "Your monthly community service fee of $180 is due soon.",
    time: "Today",
    read: false,
  },
  {
    id: 2,
    type: "facility",
    title: "Reservation confirmed",
    message:
      "Your Garden Café reservation has been confirmed successfully.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "parking",
    title: "Parking availability updated",
    message:
      "Three new parking spaces are now available in Zone B.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    type: "community",
    title: "Community announcement",
    message:
      "The residents' lounge will host a community evening this Friday.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "security",
    title: "Security update",
    message:
      "Visitor access procedures have been updated at the main gate.",
    time: "5 days ago",
    read: true,
  },
];

export default notifications;

