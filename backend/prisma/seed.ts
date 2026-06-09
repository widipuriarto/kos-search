import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Buat Akun Admin Default
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  // Gunakan upsert agar tidak error jika script dijalankan berkali-kali
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kossearch.com' },
    update: {},
    create: {
      email: 'admin@kossearch.com',
      password: adminPassword,
      name: 'Super Admin',
      role: 'ADMIN',
      isVerified: true,
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // 2. Buat Master Data Fasilitas
  const facilities = [
    { name: 'AC', icon: 'snowflake' },
    { name: 'WiFi', icon: 'wifi' },
    { name: 'Kamar Mandi Dalam', icon: 'bath' },
    { name: 'Kasur', icon: 'bed' },
    { name: 'Lemari Pakaian', icon: 'archive' },
    { name: 'Meja Belajar', icon: 'book-open' },
    { name: 'Dapur Bersama', icon: 'utensils' },
    { name: 'Parkir Motor', icon: 'bike' },
    { name: 'Parkir Mobil', icon: 'car' },
    { name: 'Akses 24 Jam', icon: 'key' },
    { name: 'CCTV', icon: 'camera' },
  ];

  console.log('Menambahkan fasilitas...');
  let facilityRecords = [];
  for (const f of facilities) {
    const facility = await prisma.facility.upsert({
      where: { name: f.name },
      update: {},
      create: {
        name: f.name,
        icon: f.icon,
      },
    });
    facilityRecords.push(facility);
    console.log(`Fasilitas ditambahkan: ${facility.name}`);
  }

  // 3. Buat Akun Owner Dummy (Total 5 Owner)
  const ownerPassword = await bcrypt.hash('owner123', 10);
  
  const ownersData = [
    { email: 'owner@kossearch.com', name: 'Juragan Kos', phone: '081234567890' },
    { email: 'owner2@kossearch.com', name: 'Bapak Subagio', phone: '081234567891' },
    { email: 'owner3@kossearch.com', name: 'Ibu Ratna', phone: '081234567892' },
    { email: 'owner4@kossearch.com', name: 'Mas Dimas', phone: '081234567893' },
    { email: 'owner5@kossearch.com', name: 'Mbak Siti', phone: '081234567894' },
  ];

  const owners = [];
  for (const o of ownersData) {
    const owner = await prisma.user.upsert({
      where: { email: o.email },
      update: {},
      create: {
        email: o.email,
        password: ownerPassword,
        name: o.name,
        role: 'OWNER',
        isVerified: true,
        phone: o.phone
      },
    });
    owners.push(owner);
    console.log(`Created owner user: ${owner.email}`);
  }

  // 4. Generate 20 Dummy Kos Data untuk masing-masing Owner (Total 100 Kos)
  console.log('Mulai membuat 20 data Kos dummy untuk tiap owner (Total 100 Kos)...');
  
  const kosTypes = ['PUTRA', 'PUTRI', 'CAMPUR'];
  const cities = ['Semarang', 'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Malang', 'Bogor', 'Solo'];
  const kosNamesPrefix = [
    'Yellow', 'Farizsa', 'Arjuna', 'Prime', 'Beringin',
    'Tipuk', 'Paragon', 'Bintang', 'Kencana', 'Melati',
    'Pelangi', 'Bahagia', 'Harmoni', 'Indah', 'Mawar',
    'Sejahtera', 'Nusantara', 'Flamboyan', 'Cendana', 'Maharani'
  ];
  const kosNamesSuffix = ['Kost', 'Kos', 'Rooms', 'Residence', 'Griya', 'Wisma', 'Puri'];

  for (let ownerIndex = 0; ownerIndex < owners.length; ownerIndex++) {
    const owner = owners[ownerIndex];
    
    // Hapus data dummy lama agar tidak double
    await prisma.kos.deleteMany({ where: { ownerId: owner.id } });

    for (let i = 0; i < 20; i++) {
      const type = kosTypes[Math.floor(Math.random() * kosTypes.length)] as any;
      const city = cities[Math.floor(Math.random() * cities.length)];
      const price = Math.floor(Math.random() * 20 + 5) * 100000; // Harga 500rb - 2.5jt
      
      const pfx = kosNamesPrefix[Math.floor(Math.random() * kosNamesPrefix.length)];
      const sfx = kosNamesSuffix[Math.floor(Math.random() * kosNamesSuffix.length)];
      const kosName = `${sfx} ${pfx} ${city}`; // e.g. "Kost Mawar Bandung"

      const validUnsplashIds = [
        "1522708323590-d24dbb6b0267","1554995207-c18c203602cb","1522771739844-6a9f6d5f14af","1497366216548-37526070297c",
        "1560448204-e02f11c3d0e2","1513694203232-719a280e022f","1505691938895-1758d7feb511","1484154218962-a197022b5858",
        "1512918728675-ed5a9ecdebfd","1502005229762-cf1b2da7c5d6","1449844908441-8829872d2607","1505873242700-f289a29e1e0f",
        "1505692433770-36f19f51681d","1523699289804-55347c09047d","1503174971373-b1f69850bded","1521334884684-d80222895322",
        "1588880331179-aca9b1026cb5","1556228578-0d85b1a4d571","1501183638710-841b581c56ce","1598928500459-567caf54b3ee",
        "1522708323590-d24dbb6b0267","1595526114035-0d45ed16cfbf","1586105251261-70a48b3b3e60","1600121848594-d6a9a08e1a8a",
        "1540518614846-1536bc64a93d","1519710164239-01c0eb09689e","1493809842364-4638a1af04b6","1522771739844-6a9f6d5f14af"
      ];

      // Ambil index berdasarkan kombinasi owner dan i agar variasinya maksimal
      const imgIdx1 = (ownerIndex * 20 + i) % validUnsplashIds.length;
      const imgIdx2 = (ownerIndex * 20 + i + 7) % validUnsplashIds.length;

      const img1 = `https://images.unsplash.com/photo-${validUnsplashIds[imgIdx1]}?auto=format&fit=crop&q=80&w=800`;
      const img2 = `https://images.unsplash.com/photo-${validUnsplashIds[imgIdx2]}?auto=format&fit=crop&q=80&w=800`;

      // Pilih 3-5 fasilitas random
      const shuffledFacilities = facilityRecords.sort(() => 0.5 - Math.random());
      const selectedFacilities = shuffledFacilities.slice(0, Math.floor(Math.random() * 3) + 3);

      await prisma.kos.create({
        data: {
          name: kosName,
          description: `Kos ${type.toLowerCase()} yang sangat nyaman dan strategis di ${city}. Dekat dengan fasilitas umum, kampus, dan pusat perbelanjaan. Dilengkapi dengan berbagai fasilitas penunjang kenyamanan Anda.`,
          address: `Jalan Raya ${city} No. ${Math.floor(Math.random() * 100) + 1}, Kecamatan Tengah, ${city}`,
          city: city,
          price: price,
          type: type,
          availableRooms: Math.floor(Math.random() * 10) + 1,
          ownerId: owner.id,
          status: 'ACTIVE',
          images: {
            create: [
              { url: img1 },
              { url: img2 }
            ]
          },
          facilities: {
            create: selectedFacilities.map(f => ({
              facility: { connect: { id: f.id } }
            }))
          }
        }
      });
    }
    console.log(`Berhasil menambahkan 20 data Kos dummy untuk ${owner.name}.`);
  }

  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
