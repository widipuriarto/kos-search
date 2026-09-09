const validUnsplashIds = [
  "1522708323590-d24dbb6b0267","1554995207-c18c203602cb","1522771739844-6a9f6d5f14af","1497366216548-37526070297c",
  "1560448204-e02f11c3d0e2","1513694203232-719a280e022f","1505691938895-1758d7feb511","1484154218962-a197022b5858",
  "1512918728675-ed5a9ecdebfd","1502005229762-cf1b2da7c5d6","1449844908441-8829872d2607","1505873242700-f289a29e1e0f",
  "1505692433770-36f19f51681d","1523699289804-55347c09047d","1503174971373-b1f69850bded","1521334884684-d80222895322",
  "1588880331179-aca9b1026cb5","1556228578-0d85b1a4d571","1501183638710-841b581c56ce","1598928500459-567caf54b3ee",
  "1522708323590-d24dbb6b0267","1595526114035-0d45ed16cfbf","1586105251261-70a48b3b3e60","1600121848594-d6a9a08e1a8a",
  "1540518614846-1536bc64a93d","1519710164239-01c0eb09689e","1493809842364-4638a1af04b6","1522771739844-6a9f6d5f14af"
];

async function checkUrls() {
  const badIds = [];
  for (const id of validUnsplashIds) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`Bad URL (${res.status}): ${url}`);
        badIds.push(id);
      }
    } catch (e) {
      console.log(`Error checking ${url}: ${e.message}`);
      badIds.push(id);
    }
  }
  console.log("Bad IDs:", JSON.stringify(badIds));
}

checkUrls();
