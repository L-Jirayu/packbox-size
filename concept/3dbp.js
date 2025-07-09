// === 1. กล่อง ===
const boxSizes = [
  [14, 20, 6],
  [17, 25, 9],
  [20, 30, 11],
  [22, 35, 14],
  [24, 40, 17],
  [30, 45, 20],
  [31, 36, 26],
  [40, 45, 34],
  [45, 55, 40],
  [45, 45, 30],
];

// === 2. สินค้า ===
const items = [
  { name: 'MiniPerfume', size: [10, 15, 21] },
  { name: 'MiniSerum', size: [12, 12, 12] },
  { name: 'Soap-Bar', size: [12, 12, 12] },
  { name: 'LipBalm', size: [12, 12, 12] },
  { name: 'EyeCream', size: [12, 12, 12] },
  { name: 'SampleToner', size: [10, 15, 21] },
  { name: 'MiniPerfume', size: [12, 12, 12] },
  { name: 'MiniSerum', size: [12, 12, 12] },
  { name: 'LipBalm', size: [12, 12, 12] },
  { name: 'EyeCream', size: [14, 9.75, 6] },
  { name: 'MiniPerfume', size: [12, 12, 12] },
  { name: 'MiniSerum', size: [10, 15, 21] },
  { name: 'Soap-Bar', size: [17, 25, 9] },
  { name: 'LipBalm', size: [10, 15, 21] },
  { name: 'EyeCream', size: [12, 12, 12] },
  { name: 'MiniPerfume', size: [15, 15, 15] },
  { name: 'MiniSerum', size: [10, 15, 21] },
  { name: 'Soap-Bar', size: [10, 15, 21] },
  { name: 'LipBalm', size: [12, 12, 12] },
  { name: 'EyeCream', size: [8, 8, 27] }

];

// === 3. คำนวณปริมาตรรวมของสินค้า ===
//หา Vรวมของสินค้า โดยคำนวณจากขนาดของแต่ละชิ้น
const totalVolume = items.reduce((sum, item) => { //เหมือนกับ For Loop (Functional JS)
  const [w, h, d] = item.size;
  return sum + (w * h * d);
}, 0); 

const volumeThreshold = 1.10; // เผื่อ 10%

// === 4. หา box ที่ใหญ่พอ ===
//ได้ขนาดรวมแล้วก็หากล่องที่เหมาะกับ Vรวม ที่ได้
const candidateBoxes = boxSizes.filter(([w, h, d]) => {
  const boxVolume = w * h * d;
  return boxVolume >= totalVolume * volumeThreshold;
});

// === 5. เลือกกล่องแรกที่ใส่ได้ ===
//เลือกกล่องแรกที่เหมาะสมแล้วให้แสดงผลออกมาผ่าน Console Log
if (candidateBoxes.length > 0) {
  const [w, h, d] = candidateBoxes[0]; // เลือกกล่องแรกที่ผ่าน
  console.log(`✅ เลือกกล่อง: ${w} x ${h} x ${d} = ${w * h * d} cm³`);
} else {
  console.log('❌ ไม่มีกล่องไหนใส่ของทั้งหมดได้ → ส่ง Trollor แทน');
}
