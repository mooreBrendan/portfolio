const k1=[//kind
  [1,6,0,0,0,8,0,3,0],
  [7,4,2,0,0,9,0,0,8],
  [0,0,8,2,5,0,1,0,4],
  [0,0,0,6,0,2,0,0,5],
  [0,1,0,4,0,3,7,0,9],
  [8,0,9,0,7,0,3,4,0],
  [0,5,0,0,6,0,2,8,7],
  [0,3,4,8,0,0,0,9,0],
  [2,0,0,9,1,5,0,6,0]
];

const e1=[//ele
  [0,0,8,0,0,0,4,0,0],
  [7,0,0,5,0,0,0,2,0],
  [0,0,0,9,0,0,0,6,3],
  [0,0,6,0,8,0,0,0,5],
  [2,0,0,7,0,4,0,0,1],
  [3,9,0,0,5,0,0,0,0],
  [9,5,0,0,6,0,0,0,0],
  [0,4,0,0,2,1,0,0,0],
  [0,1,0,0,0,0,8,3,7]
];

const h1=[//HS
  [2,8,0,0,4,0,0,7,0],
  [0,5,1,0,0,0,3,0,0],
  [0,0,0,0,0,6,8,1,0],
  [0,0,0,0,0,0,0,2,0],
  [5,6,0,3,0,0,4,0,0],
  [0,3,0,0,8,1,0,0,9],
  [0,1,0,0,3,0,0,0,0],
  [0,0,7,0,6,0,0,0,5],
  [0,0,0,0,0,8,0,0,0]
];

const c1=[//coll
  [0,0,0,3,9,8,0,0,0],
  [0,0,3,0,0,0,0,0,9],
  [0,0,0,0,0,7,0,0,0],
  [0,7,0,0,0,0,5,0,0],
  [0,6,0,0,0,9,4,1,0],
  [0,0,9,0,8,6,7,0,0],
  [6,0,0,0,3,0,0,0,5],
  [0,0,4,7,0,0,0,8,0],
  [1,0,0,0,0,0,0,2,4]
];

const g1=[//grad
  [0,8,0,7,4,0,0,0,0],
  [5,0,4,0,9,3,0,0,0],
  [0,6,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,9,0],
  [0,0,0,3,6,0,0,7,0],
  [3,0,0,0,5,0,8,0,0],
  [0,0,0,0,0,0,0,8,0],
  [0,4,1,0,0,0,0,2,6],
  [0,0,7,0,1,0,0,0,5]
];

const k2=[
  [9,0,0,0,6,8,0,4,3],
  [0,3,5,7,2,0,0,0,0],
  [0,7,0,9,0,4,0,1,5],
  [1,6,0,0,8,7,0,3,0],
  [0,0,4,0,5,0,0,2,6],
  [2,0,0,4,0,0,8,0,9],
  [0,9,0,0,4,0,6,5,7],
  [0,2,8,0,0,3,4,0,0],
  [6,0,0,1,9,0,0,0,0]
];

const e2=[
  [2,0,1,0,7,3,0,0,0],
  [0,0,0,1,0,5,4,0,0],
  [0,0,0,0,2,0,0,6,0],
  [4,0,0,0,0,0,0,0,2],
  [8,9,5,3,0,0,1,0,0],
  [0,0,0,7,9,0,8,0,0],
  [0,2,6,0,0,0,5,4,0],
  [0,0,3,0,0,8,0,0,0],
  [0,7,0,6,1,0,0,0,9]
];

const h2=[
  [3,0,6,9,0,8,7,5,0],
  [0,0,0,0,5,0,0,0,1],
  [0,0,0,0,0,4,0,0,0],
  [0,0,0,0,0,0,0,0,2],
  [0,0,7,0,3,1,0,0,0],
  [5,1,0,0,7,9,0,6,0],
  [0,6,0,4,2,0,5,0,0],
  [0,0,0,0,0,5,0,0,0],
  [8,3,0,0,0,0,0,0,0]
];

const c2=[
  [7,6,0,0,0,0,0,8,0],
  [0,0,0,9,0,0,0,0,1],
  [8,0,0,0,0,0,6,0,0],
  [0,0,0,0,0,0,0,3,0],
  [0,0,6,0,3,0,0,1,4],
  [0,1,0,0,0,4,5,0,8],
  [0,8,4,5,0,0,0,0,7],
  [0,5,0,2,0,0,0,0,0],
  [0,0,0,0,1,0,2,0,0]
];

const g2=[
  [4,0,0,3,0,0,6,0,0],
  [0,1,6,0,0,7,0,9,8],
  [0,0,0,5,0,0,0,0,0],
  [0,0,0,0,6,0,4,0,0],
  [0,8,0,0,0,0,0,0,3],
  [0,0,0,0,0,0,0,7,1],
  [7,0,0,0,0,3,0,0,0],
  [0,0,4,1,8,0,3,0,0],
  [0,0,1,0,0,0,0,0,5]
];

const c3=[
  [0,0,0,0,6,0,3,0,0],
  [0,9,0,0,5,0,0,0,1],
  [0,0,2,4,0,0,0,5,0],
  [3,2,1,0,0,0,0,0,0],
  [0,0,9,0,0,1,0,0,4],
  [0,0,0,2,0,0,7,0,0],
  [0,0,0,1,0,0,0,8,5],
  [0,0,0,5,0,6,0,0,7],
  [7,0,3,0,0,0,0,0,0]
];

const c4=[
  [0,2,0,0,0,0,9,0,0],
  [9,0,0,5,0,0,7,0,0],
  [0,0,0,0,0,8,1,6,0],
  [0,1,0,0,0,0,0,0,2],
  [0,0,0,0,0,3,0,0,0],
  [3,0,6,4,0,9,0,0,0],
  [7,4,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,7,0],
  [8,0,0,1,0,0,5,0,3]
];

const g3=[
  [0,3,0,0,4,0,0,8,0],
  [0,0,0,9,1,0,6,0,2],
  [0,4,0,8,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1],
  [8,0,1,0,6,0,0,0,0],
  [0,0,0,7,0,0,3,2,0],
  [0,2,0,0,0,0,5,0,0],
  [0,0,0,0,0,0,0,0,0],
  [4,8,0,6,0,0,9,0,0]
];

const c5=[
  [0,0,0,0,0,0,0,0,1],
  [2,0,0,0,0,9,0,8,0],
  [0,0,0,0,0,1,0,5,0],
  [0,0,6,7,0,0,0,0,0],
  [4,0,7,0,0,0,2,0,0],
  [0,0,0,3,6,0,0,0,8],
  [0,7,5,0,4,0,0,0,0],
  [0,6,0,0,0,8,1,2,0],
  [9,0,0,0,0,0,0,3,5]
];

const c6=[
  [4,0,0,0,1,0,0,3,6],
  [0,7,0,5,6,0,0,0,0],
  [0,0,0,0,7,0,0,0,8],
  [0,0,8,0,0,0,0,0,5],
  [0,0,0,0,0,2,6,0,0],
  [0,3,0,1,0,0,0,0,7],
  [0,6,0,0,3,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,5,1,0,0,6,2,9,0]
];

const g4=[
  [3,0,0,8,0,0,0,0,0],
  [0,6,0,0,0,0,0,0,0],
  [0,0,2,9,6,7,0,0,0],
  [0,0,8,6,0,0,0,0,7],
  [2,0,0,0,0,0,0,0,0],
  [5,4,0,0,0,0,3,0,0],
  [8,0,0,0,2,1,4,0,0],
  [0,0,0,0,0,0,0,3,0],
  [0,0,7,0,0,3,9,2,5]
];

const g5=[
  [0,9,0,0,0,0,0,0,5],
  [0,3,5,0,0,0,0,0,7],
  [0,0,0,0,0,0,1,4,8],
  [0,0,0,0,0,0,0,0,4],
  [2,8,0,0,1,0,0,0,0],
  [9,0,0,0,4,0,8,2,0],
  [0,0,6,3,7,0,0,0,0],
  [0,0,0,0,0,5,0,0,6],
  [0,0,3,0,0,0,4,0,0]
];

const g6=[
  [0,0,5,1,0,0,2,0,0],
  [0,4,7,8,0,0,0,6,0],
  [0,0,0,0,0,0,0,0,0],
  [7,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,5,0,0,4],
  [0,0,0,0,9,4,3,0,8],
  [3,0,0,0,0,0,5,1,0],
  [0,2,0,0,0,0,0,0,6],
  [9,0,0,0,0,3,0,0,0]
];
