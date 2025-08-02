
import React from 'react';
import { motion } from 'framer-motion';
import { useGrioModules } from '../hooks/useGrioModules';
import './GrioAcademyPage.css';

const GrioAcademyPage = () => {
  const { modules, completeModule, userRank, xp } = useGrioModules();

  return (
    <div className="grio-academy">
      <h2>🎓 Grio Academy</h2>
      <p>Rank: {userRank} | XP: {xp}</p>
      <div className="module-grid">
        {modules.map((mod) => (
          <motion.div
            className="grio-module-card"
            key={mod.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <h3>{mod.title}</h3>
            <p>{mod.description}</p>
            <p><i>Level: {mod.level} | Category: {mod.category}</i></p>
            {!mod.completed ? (
              <button onClick={() => completeModule(mod.id)}>Complete</button>
            ) : (
              <p className="complete-badge">✅ Completed</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GrioAcademyPage;
