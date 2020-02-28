import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth().get('colors').then(res => {
  
      setColorList(res.data)
    })
    .catch(err => console.log(err))
  }, [update])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} update={setUpdate} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
