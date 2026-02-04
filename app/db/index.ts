import Dexie from "dexie";

export interface Lead {
  id?: number;
  name: string;
  phone: string;
  source: string;
  status: string;
  createdAt: number;
}

export class MyDatabase extends Dexie {
  leads!: Dexie.Table<Lead, number>; // 👈 แบบนี้

  constructor() {
    super("CRM_Database");

    super.version(1).stores({
      leads: "++id, name, phone, status, createdAt",
    });
  }
}

export const db = new MyDatabase();
