const productos = [
  {
    id: 1,
    nombre: "Camiseta Oversize",
    tallas: [
      { talla: "S", precio: 45000 },
      { talla: "M", precio: 50000 },
      { talla: "L", precio: 55000 },
      { talla: "XL", precio: 60000 },
    ],
    categoria: "camisetas",
    descripcion: "Camiseta oversize de algodón 100%",
    imagen: "/img/camiseta-oversize.jpg"
  },
  {
    id: 2,
    nombre: "Jean Slim",
    tallas: [
      { talla: "28", precio: 89000 },
      { talla: "30", precio: 89000 },
      { talla: "32", precio: 92000 },
      { talla: "34", precio: 92000 },
    ],
    categoria: "pantalones",
    descripcion: "Jean slim fit color azul oscuro",
    imagen: "/img/jean-slim.jpg"
  },
  {
    id: 3,
    nombre: "Sudadera con capucha",
    tallas: [
      { talla: "S", precio: 75000 },
      { talla: "M", precio: 75000 },
      { talla: "L", precio: 78000 },
      { talla: "XL", precio: 78000 },
      { talla: "XXL", precio: 80000 },
    ],
    categoria: "sudaderas",
    descripcion: "Sudadera unisex con bolsillo canguro",
    imagen: "/img/sudadera.jpg"
  }
]

export default productos