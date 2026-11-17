const paths = {
 document: "M5 3h10l4 4v14H5zM9 11h6M9 15h6M9 7h3",
 user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a8 8 0 0 1 16 0v3",
 post: "M3 5h18v14H3zM3 5l9 8 9-8",
 transfer: "M3 8h17l-4-4M21 16H4l4 4",
 settings: "M4 7h16M4 17h16M8 3v8M16 13v8",
 key: "M14 8a5 5 0 1 1-5 5L3 19v3h3v-3h3l3-3"
};
export default function Icon({kind='document'}) {return <svg className="workspace-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind] || paths.document}/></svg>;}
