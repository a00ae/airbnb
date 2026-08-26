export interface FooterLink {
  id: number;
  label: string;
  url: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: FooterLink[];
}

export const footerData: FooterColumn[] = [
  {
    id: 1,
    title: "Support",
    links: [
      { id: 101, label: "Help Centre", url: "#" },
      { id: 102, label: "Get help with a safety issue", url: "#" },
      { id: 103, label: "AirCover", url: "#" },
      { id: 104, label: "Anti-discrimination", url: "#" },
      { id: 105, label: "Disability support", url: "#" },
      { id: 106, label: "Cancellation options", url: "#" },
      { id: 107, label: "Report neighbourhood concern", url: "#" }
    ]
  },
  {
    id: 2,
    title: "Hosting",
    links: [
      { id: 201, label: "Airbnb your home", url: "#" },
      { id: 202, label: "Airbnb your experience", url: "#" },
      { id: 203, label: "Airbnb your service", url: "#" },
      { id: 204, label: "AirCover for Hosts", url: "#" },
      { id: 205, label: "Hosting resources", url: "#" },
      { id: 206, label: "Community forum", url: "#" },
      { id: 207, label: "Hosting responsibly", url: "#" },
      { id: 208, label: "Join a free hosting class", url: "#" },
      { id: 209, label: "Find a co-host", url: "#" },
      { id: 210, label: "Refer a host", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Airbnb",
    links: [
      { id: 301, label: "2026 Summer Release", url: "#" },
      { id: 302, label: "Newsroom", url: "#" },
      { id: 303, label: "Careers", url: "#" },
      { id: 304, label: "Investors", url: "#" },
      { id: 305, label: "Gift cards", url: "#" },
      { id: 306, label: "Airbnb.org emergency stays", url: "#" }
    ]
  }
];