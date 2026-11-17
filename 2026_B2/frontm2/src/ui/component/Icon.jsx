/* Authored 24px linework: documents, ballots, signatures and postal routes. */
const paths = {
  "transfer":"M3 8h17l-4-4M21 16H4l4 4",
  "pause":"M8 5v14M16 5v14",
  "play":"M6 3l15 9-15 9z",
  "document": "M5 3h10l4 4v14H5zM15 3v5h4M9 12h6M9 16h4",
  "user": "M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 21v-3a7 7 0 0 1 14 0v3M9 19h6",
  "post": "M3 5h18v14H3zM3 6l9 7 9-7M3 19l6-7M21 19l-6-7",
  "parcel": "M3 7l9-4 9 4v11l-9 4-9-4zM3 7l9 4 9-4M12 11v11M8 5l9 4v5",
  "vote": "M4 11l3-3M17 8l3 3v10H4V11M8 11h8M8 3h8v8H8zM10 6l2 2 3-3",
  "coin": "M12 3l8 5v8l-8 5-8-5V8zM15 8h-5v8h5v-4h-3",
  "delegate": "M3 7h5v5H3zM16 12h5v5h-5zM8 9h9l-3-3M16 15H7l3 3",
  "execute": "M5 3h10l4 4v14H5zM9 13l3 3 5-6",
  "cancel": "M5 3h10l4 4v14H5zM9 11l6 6M15 11l-6 6",
  "key": "M14 4a5 5 0 1 1-3 9l-7 7H2v-3l7-7a5 5 0 0 1 5-6ZM15 7h.01",
  "wallet": "M3 6l14-3v4M3 7h18v14H3zM21 12h-7v5h7M17 14h.01",
  "sun": "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  "moon": "M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z",
  "warning": "M12 3l10 18H2zM12 9v5M12 17h.01",
  "retry": "M20 10a8 8 0 1 0-1 8M20 3v7h-7",
  "check": "M4 12l5 5L20 6",
  "plus": "M12 4v16M4 12h16",
  "network": "M3 3h6v6H3zM15 15h6v6h-6zM15 3h6v6h-6zM6 9v9h9M12 6h3",
  "settings": "M4 7h16M4 17h16M8 3v8M16 13v8",
  "award": "M7 3h10v8l-5 4-5-4zM8 14l-2 8 6-3 6 3-2-8M10 7h4",
  "chart": "M4 3v18h17M8 17v-5M13 17V7M18 17V4",
  "against": "M4 6l16 14M4 20L20 4"
};

export default function Icon({kind="document"}) {return <svg className="workspace-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind] || paths.document}/></svg>;}
