import React from "react";
import TabsHome from "./TabsHome.jsx";
import NewHaikuButton from "./NewHaikuButton.jsx";

export default function Home() {

  return (
    <>
    <div className="main">
      <TabsHome />
    </div>
      <NewHaikuButton />
      </>
  );
}