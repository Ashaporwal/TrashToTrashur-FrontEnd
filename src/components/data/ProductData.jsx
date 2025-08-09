
const productData = [

  {
    id: 1,
    title: "Recycled Tote Bag",
    description: "Made from old jeans and eco-friendly fabrics.",
    price: 349,
    category: "Bags & Accessories",
    image: "/images/4.jpeg"
  },
  {
    id: 2,
    title: "Upcycled Backpack",
    description: "Sturdy backpack crafted from discarded canvas tents.",
    price: 799,
    category: "Bags & Accessories",
    image: "/images/backpack1.jpg"
  },
  {
    id: 3,
    title: "Eco Sling Bag",
    description: "Trendy sling bag from recycled polyester.",
    price: 499,
    category: "Bags & Accessories",
    image: "/images/sling1.jpg"
  },
  {
    id: 4,
    title: "Patchwork Handbag",
    description: "Handmade bag using fabric scraps.",
    price: 599,
    category: "Bags & Accessories",
    image: "/images/handbag1.jpg"
  },
  {
    id: 5,
    title: "Recycled Wallet",
    description: "Compact wallet made from tire tubes.",
    price: 299,
    category: "Bags & Accessories",
    image: "/images/wallet1.jpg"
  },
  {
    id: 6,
    title: "Bottle Cap Keychain",
    description: "Keychain crafted using colorful bottle caps.",
    price: 99,
    category: "Bags & Accessories",
    image: "/images/keychain1.jpg"
  },
  {
    id: 7,
    title: "Eco Sunglasses Case",
    description: "Protective case made from upcycled denim.",
    price: 249,
    category: "Bags & Accessories",
    image: "/images/case1.jpg"
  },
  {
    id: 8,
    title: "Recycled Fabric Belt",
    description: "Fashionable belt using old saree material.",
    price: 199,
    category: "Bags & Accessories",
    image: "/images/belt1.jpg"
  },
  {
    id: 9,
    title: "Cork Material Purse",
    description: "Mini purse made from natural cork waste.",
    price: 349,
    category: "Bags & Accessories",
    image: "/images/purse1.jpg"
  },
  {
    id: 10,
    title: "Upcycled Denim Cap",
    description: "Trendy cap crafted from old jeans.",
    price: 299,
    category: "Bags & Accessories",
    image: "/images/cap1.jpg"
  },

  // 🏠 Home Decor
  {
    id: 11,
    title: "Glass Bottle Lamp",
    description: "Decorative lamp made from waste glass bottles.",
    price: 499,
    category: "Home Decor",
    image: "/images/lamp1.jpg"
  },
  {
    id: 12,
    title: "Wooden Pallet Shelf",
    description: "Rustic shelf made from old shipping pallets.",
    price: 999,
    category: "Home Decor",
    image: "/images/shelf1.jpg"
  },
  {
    id: 13,
    title: "CD Wall Art",
    description: "Shiny wall art made using old CDs.",
    price: 299,
    category: "Home Decor",
    image: "/images/cd1.jpg"
  },
  {
    id: 14,
    title: "Plastic Bottle Planter",
    description: "Eco-friendly planter from cut plastic bottles.",
    price: 149,
    category: "Home Decor",
    image: "/images/planter1.jpg"
  },
  {
    id: 15,
    title: "Tyre Table",
    description: "Unique coffee table using old car tyre.",
    price: 1599,
    category: "Home Decor",
    image: "/images/tyretable1.jpg"
  },
  {
    id: 16,
    title: "Recycled Candle Holder",
    description: "Candle holder made from scrap metal.",
    price: 249,
    category: "Home Decor",
    image: "/images/candle1.jpg"
  },
  {
    id: 17,
    title: "Bottle Cap Coasters",
    description: "Set of 4 coasters made with bottle caps.",
    price: 199,
    category: "Home Decor",
    image: "/images/coaster1.jpg"
  },
  {
    id: 18,
    title: "Newspaper Basket",
    description: "Handwoven basket made from rolled newspapers.",
    price: 299,
    category: "Home Decor",
    image: "/images/basket1.jpg"
  },
  {
    id: 19,
    title: "Tin Can Flower Pot",
    description: "Upcycled tin can used as a flower pot.",
    price: 129,
    category: "Home Decor",
    image: "/images/tinpot1.jpg"
  },
  {
    id: 20,
    title: "Driftwood Photo Frame",
    description: "Rustic frame made from collected driftwood.",
    price: 399,
    category: "Home Decor",
    image: "/images/frame1.jpg"
  },

  // ✏️ Stationery & Art
  {
    id: 21,
    title: "Recycled Paper Notebook",
    description: "Notebook made from 100% recycled paper.",
    price: 149,
    category: "Stationery & Art",
    image: "/images/notebook1.jpg"
  },
  {
    id: 22,
    title: "Eco-Friendly Sketchbook",
    description: "Sketchbook using natural handmade paper.",
    price: 249,
    category: "Stationery & Art",
    image: "/images/sketchbook1.jpg"
  },
  {
    id: 23,
    title: "Cardboard Photo Album",
    description: "Photo album made from sturdy recycled cardboard.",
    price: 299,
    category: "Stationery & Art",
    image: "/images/album1.jpg"
  },
  {
    id: 24,
    title: "Bottle Cap Magnets",
    description: "Set of 5 fridge magnets made from bottle caps.",
    price: 129,
    category: "Stationery & Art",
    image: "/images/magnets1.jpg"
  },
  {
    id: 25,
    title: "Paper Bead Jewellery Kit",
    description: "DIY kit to make jewellery from paper beads.",
    price: 199,
    category: "Stationery & Art",
    image: "/images/jewellerykit1.jpg"
  },
  {
    id: 26,
    title: "Recycled Pen Holder",
    description: "Pen holder crafted from tin and rope.",
    price: 99,
    category: "Stationery & Art",
    image: "/images/penholder1.jpg"
  },
  {
    id: 27,
    title: "Upcycled Canvas Painting",
    description: "Abstract art on reused canvas boards.",
    price: 699,
    category: "Stationery & Art",
    image: "/images/painting1.jpg"
  },
  {
    id: 28,
    title: "Newspaper Pencil Set",
    description: "Pack of 10 pencils made from recycled newspaper.",
    price: 79,
    category: "Stationery & Art",
    image: "/images/pencil1.jpg"
  },
  {
    id: 29,
    title: "Bottle Art Vase",
    description: "Hand-painted vase made from glass bottles.",
    price: 349,
    category: "Stationery & Art",
    image: "/images/vase1.jpg"
  },
  {
    id: 30,
    title: "Eco-Friendly Scrapbook",
    description: "Scrapbook from recycled kraft paper.",
    price: 299,
    category: "Stationery & Art",
    image: "/images/scrapbook1.jpg"
  }
];

export default productData;
