// src/hooks/useDashboardStats.ts
import { useEffect, useState } from 'react';
import {
  collection,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSubmissions: 0,
  });

  useEffect(() => {
    (async () => {
      const [projectsSnap, subsSnap] = await Promise.all([
        getCountFromServer(collection(db, 'projects')),
        getCountFromServer(collection(db, 'submissions')),
      ]);

      setStats({
        totalProjects: projectsSnap.data().count,
        totalSubmissions: subsSnap.data().count,
      });
    })();
  }, []);

  return stats;
};
