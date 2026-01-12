
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { RuleRegistry } from '../../src/types'; // Corrected import path

// Initialize Admin SDK - assume running in environment with credentials
admin.initializeApp();
const db = admin.firestore();

async function seed() {
  // Correctly resolve the path to the JSON file
  const dataPath = path.resolve('backend', 'seed', 'rule-registry-ya2026.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const rules: RuleRegistry[] = JSON.parse(rawData);

  console.log('🚀 Starting RuleRegistry seed...');
  
  const collectionRef = db.collection('RuleRegistry');

  for (const rule of rules) {
    if (!rule.ruleId) {
        console.warn('Skipping rule with missing ruleId:', rule);
        continue;
    }
    // Use ruleId as document ID for easy lookup in taxcompute.ts
    await collectionRef.doc(rule.ruleId).set({
      ...rule,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✅ Seeded rule: ${rule.ruleId}`);
  }
  
  console.log('✨ Seeding complete.');
}

seed().catch(console.error);
