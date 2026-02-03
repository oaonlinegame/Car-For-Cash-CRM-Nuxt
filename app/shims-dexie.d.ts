// app/shims-dexie.d.ts
declare module 'dexie' {
  import { Dexie } from 'dexie'
  export default Dexie
  export * from 'dexie'
}