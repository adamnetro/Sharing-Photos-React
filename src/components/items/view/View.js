// import style from "./view.module.css"

import { forwardRef } from "react";

function View(props, ref) {

  /* dr = flexDirection
  props : 
  dr = row / rowR / column / columnR / nullflex
  -row
  -rowR = row-reverse
  -column
  -columnR = column-reverse
  -nullflex = (without display = flex)
  */

  function flexDirection() {
    switch (props.dr) {
      case 'row': return "row";
      case 'rowR': return "row-reverse";
      case 'column': return "column";
      case 'columnR': return "column-reverse";
      default: return 'none';
    }
  }
  const style = {
    display: "flex",
    gap: props.gap,
    flexDirection: flexDirection()
  };


  return (
    <div ref={ref} onClick={props.onClick} style={style} className={props.className}>
      {props.children}
    </div>
  );
}

export default forwardRef(View);
