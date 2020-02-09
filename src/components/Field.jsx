import React, { Fragment } from "react";
import { preferences } from "../state";
import { Border } from './Border';


export function Field() {
  let { fieldW, fieldH, minBubbleRadius } = preferences,
      gateRadius = minBubbleRadius + 1;

  return (
    <Fragment>
      <Border width={fieldW + 20} depth="5" height="4" x="0" y={fieldH / 2 + 3} />
      <Border width="5" depth={fieldH / 2 + 10 - gateRadius * 2} height="4" x={-fieldW / 2 - 3} y={(-fieldH - 20 - gateRadius * 4) / 4} />
      <Border width="5" depth={fieldH / 2 + 10 - gateRadius * 2} height="4" x={-fieldW / 2 - 3} y={(fieldH + 20 + gateRadius * 4) / 4} />
      <Border width="5" depth={fieldH + 20} height="4" x={fieldW / 2 + 3} y="0" />
      <Border width={fieldW + 20} depth="5" height="4" x="0" y={-fieldH / 2 - 3} />
    </Fragment>
  );
}
