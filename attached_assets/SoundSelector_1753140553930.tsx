
import React, { useEffect, useState } from "react";
import { fetchAvailableSounds, suggestSoundByContentType } from "../modules/SoundLibraryFetcher";

const SoundSelector = ({ platform, contentType, onSelect }) => {
  const [sounds, setSounds] = useState([]);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    async function loadSounds() {
      const all = await fetchAvailableSounds(platform);
      const recs = suggestSoundByContentType(contentType);
      setSounds(all);
      setSuggested(recs);
    }
    loadSounds();
  }, [platform, contentType]);

  return (
    <div>
      <h4>🎵 Select a Sound for {contentType}</h4>
      <p>ViVi Suggests: {suggested.join(", ")}</p>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option>Select a sound</option>
        {sounds.map((s, i) => (
          <option key={i} value={s.name}>{s.name} ({s.usageCount} uses)</option>
        ))}
      </select>
    </div>
  );
};

export default SoundSelector;
