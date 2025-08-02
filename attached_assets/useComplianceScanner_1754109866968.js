
import { useState } from 'react';

export const useComplianceScanner = () => {
  const [complianceFlags] = useState([
    {
      id: '101',
      issueType: 'HIPAA Violation',
      platform: 'Instagram',
      description: 'Photo posted without patient consent',
      severity: 'High'
    }
  ]);

  const [complianceScore] = useState(76);

  return { complianceFlags, complianceScore };
};
