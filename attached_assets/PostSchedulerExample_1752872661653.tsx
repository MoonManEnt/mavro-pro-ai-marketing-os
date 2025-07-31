
import React, { useEffect, useState } from "react";
import { useViVi } from "./ViViContext";

const PostSchedulerExample = () => {
  const vivi = useViVi();
  const [postScheduled, setPostScheduled] = useState(false);

  useEffect(() => {
    if (postScheduled) {
      vivi.generateContent("Flash Sale on Facials", "Instagram Post")
        .then(content => console.log("ViVi's Suggestion:", content));
    }
  }, [postScheduled]);

  return (
    <div>
      <button onClick={() => setPostScheduled(true)}>Schedule Post</button>
    </div>
  );
};

export default PostSchedulerExample;
