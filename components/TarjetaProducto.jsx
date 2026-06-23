"use client"

import { useState } from "react"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { actualizarCarrito } from "@/lib/useCarrito"
import styles from "./TarjetaProducto.module.css"

export default function TarjetaProducto({ producto }) {
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null)
  const [agregado, setAgregado] = useState(false)

  const precioSeleccionado = tallaSeleccionada
    ? producto.tallas.find((t) => t.talla === tallaSeleccionada)?.precio
    : null

  const imagenUrl = producto.imagen ? urlFor(producto.imagen).width(400).url() : null

  function agregarAlCarrito() {
  if (!tallaSeleccionada) {
    alert("Selecciona una talla")
    return
  }

  const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
  const itemExistente = carritoActual.find(
    (item) => item.id === producto._id && item.talla === tallaSeleccionada
  )

  const cantidadActual = itemExistente ? itemExistente.cantidad : 0

  const tallaObj = producto.tallas.find((t) => t.talla === tallaSeleccionada)
  if (cantidadActual >= tallaObj.stock) {
    alert(`Solo hay ${tallaObj.stock} unidades disponibles en talla ${tallaSeleccionada}`)
    return
  }

  if (itemExistente) {
    itemExistente.cantidad += 1
  } else {
    carritoActual.push({
      id: producto._id,
      nombre: producto.nombre,
      precio: precioSeleccionado,
      talla: tallaSeleccionada,
      imagen: imagenUrl,
      cantidad: 1,
      stock: tallaObj.stock,
    })
  }

  actualizarCarrito(carritoActual)
  setAgregado(true)
  setTimeout(() => setAgregado(false), 2000)
}

  return (
    <div className={styles.card}>
      <div className={styles.imagen}>
        {imagenUrl && (
          <Image
            src={imagenUrl}
            alt={producto.nombre}
            fill
            className={styles.imagenImg}
            sizes="(max-width: 600px) 100vw, 400px"
          />
        )}
        {producto.badge && (
          <span className={styles.badge}>{producto.badge}</span>
        )}
      </div>

      <div className={styles.cuerpo}>
        <div>
          <p className={styles.nombre}>{producto.nombre}</p>
          <p className={styles.categoria}>{producto.categoria}</p>
          {producto.descripcion && (
            <p className={styles.descripcion}>{producto.descripcion}</p>
          )}
        </div>

            <div className={styles.tallas}>
              {producto.tallas.map(({ talla, precio, stock }) => (
      <div
        key={talla}
        onClick={() => stock > 0 && setTallaSeleccionada(talla)}
        className={`${styles.tallaFila} ${tallaSeleccionada === talla ? styles.tallaFilaSeleccionada : ""} ${stock === 0 ? styles.tallaAgotada : ""}`}
      >
        <span className={`${styles.tallaLabel} ${tallaSeleccionada === talla ? styles.tallaLabelSeleccionado : ""}`}>
          {talla}
        </span>
        <span className={styles.tallaPrecio}>
          {stock === 0 ? "Agotado" : `$${precio.toLocaleString("es-CO")}`}
        </span>
      </div>
    ))}
        </div>

        <button
          onClick={agregarAlCarrito}
          className={`${styles.boton} ${agregado ? styles.botonAgregado : ""}`}
        >
          {agregado ? "Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  )
}