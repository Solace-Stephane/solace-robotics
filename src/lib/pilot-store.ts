import { mkdir, readFile, appendFile } from "node:fs/promises";
import path from "node:path";

export type PilotSubmission = {
  name: string;
  email: string;
  company: string;
  robotType: string;
  notes: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "pilot-submissions.jsonl");

export async function savePilotSubmission(submission: PilotSubmission) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(FILE_PATH, `${JSON.stringify(submission)}\n`, "utf8");
}

export async function loadPilotSubmissions(): Promise<PilotSubmission[]> {
  const text = await readFile(FILE_PATH, "utf8").catch(() => "");

  if (!text.trim()) {
    return [];
  }

  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as PilotSubmission)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
