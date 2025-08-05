// src/hooks/useSiteStats.ts
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useSiteStats = () => {
  const [stats, setStats] = useState<{ projectsDelivered: number; clientSatisfaction: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const docRef = doc(db, 'siteStats', 'general');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setStats({
          projectsDelivered: data.projectsDelivered || 0,
          clientSatisfaction: data.clientSatisfaction || 0,
        });
      }
    };

    fetchStats();
  }, []);

  return stats;
};
