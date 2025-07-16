import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

/* ------------------------------------------------------------------ */
/*  Interface: everything a form can send                             */
/* ------------------------------------------------------------------ */
export interface Submission {
  id: string;                       // Firestore doc id
  name: string;
  email: string;
  message: string;

  /* optional extra fields collected in the form */
  company?: string;
  project?: string;
  budget?: string;

  /* system fields */
  status: 'new' | 'replied' | 'archived';
  createdAt?: Timestamp;            // serverTimestamp() result
}

/* ------------------------------------------------------------------ */
/*  Collection reference                                              */
/* ------------------------------------------------------------------ */
const submissionsRef = collection(db, 'submissions');

/* ------------------------------------------------------------------ */
/*  CRUD helpers                                                      */
/* ------------------------------------------------------------------ */

/** Save one submission */
export async function sendSubmission(
  data: Omit<Submission, 'id' | 'status' | 'createdAt'>
): Promise<void> {
  await addDoc(submissionsRef, {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

/** Get all submissions (newest first) */
export async function getAllSubmissions(): Promise<Submission[]> {
  const q = query(submissionsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Submission, 'id'>),
  }));
}

/** Update the status of a submission */
export async function updateSubmissionStatus(
  id: string,
  status: Submission['status'],
): Promise<void> {
  await updateDoc(doc(db, 'submissions', id), { status });
}

/** Delete a submission forever */
export async function deleteSubmission(id: string): Promise<void> {
  await deleteDoc(doc(db, 'submissions', id));
}
