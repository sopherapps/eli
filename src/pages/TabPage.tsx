// Page that shows any tab
import React from "react";
import { useParams } from "react-router-dom";

export default function TabPage() {
  // @ts-ignore
  const { title } = useParams();
  return <div>Tab {title}</div>;
}
