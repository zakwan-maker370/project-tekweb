import { useState } from "react";
import KostsData from "../data/KostsData";

export function useKosts() {
  const [kosts] = useState(KostsData);

  return { kosts };
}
