// src/lib/firestoreProjects.ts
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

/* ------------------------------------------------------------------ */
/*  Collection reference                                              */
/* ------------------------------------------------------------------ */
const projectsRef = collection(db, "projects");

/* ------------------------------------------------------------------ */
/*  TypeScript interface                                              */
/* ------------------------------------------------------------------ */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
  created_at: string;   // ISO string ("2025‑07‑14")

  /* optional links */
  link?: string;        // main URL (website / Play Store etc.)
  live?: string;        // legacy field you already used
  github?: string;      // source‑code link
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Convert Firestore Timestamp → "YYYY‑MM‑DD" string */
const toDateString = (value: any): string =>
  value instanceof Timestamp
    ? value.toDate().toISOString().split("T")[0]
    : value ?? "";

/** Get ALL projects */
export async function getAllProjects(): Promise<Project[]> {
  const snap = await getDocs(projectsRef);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      created_at: toDateString(data.created_at),
    } as Project;
  });
}

/** Add ONE project */
export async function addProject(
  data: Omit<Project, "id" | "created_at">
): Promise<Project> {
  const docRef = await addDoc(projectsRef, {
    ...data,
    created_at: serverTimestamp(),
  });
  const snap = await getDoc(docRef);
  const saved = snap.data()!;

  return {
    id: docRef.id,
    ...saved,
    created_at: toDateString(saved.created_at),
  } as Project;
}

/** Delete ONE project by ID */
export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

/** Update ONE project by ID */
export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<void> {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, data);
}
