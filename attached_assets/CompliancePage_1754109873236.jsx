
import React from 'react';
import { motion } from 'framer-motion';
import { useComplianceScanner } from '../hooks/useComplianceScanner';
import './CompliancePage.css';

const CompliancePage = () => {
  const { complianceFlags, complianceScore } = useComplianceScanner();

  return (
    <div className="compliance-page">
      <h2>Compliance Dashboard</h2>
      <motion.div
        className="compliance-meter"
        initial={{ strokeDashoffset: 440 }}
        animate={{ strokeDashoffset: 440 - (complianceScore * 4.4) }}
        transition={{ duration: 1 }}
      >
        <p>Compliance Score: {complianceScore}</p>
      </motion.div>
      <div className="flag-list">
        {complianceFlags.map((flag) => (
          <motion.div
            key={flag.id}
            className="compliance-flag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.01 }}
          >
            <p><strong>{flag.issueType}</strong> on {flag.platform}</p>
            <p>{flag.description}</p>
            <p>Risk Level: {flag.severity}</p>
            <button>Fix with ViVi</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompliancePage;
