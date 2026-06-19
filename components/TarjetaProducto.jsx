"use client"

import { useState } from "react"
import { urlFor } from "@/lib/sanity"
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
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
    const itemExistente = carrito.find(
      (item) => item.id === producto._id && item.talla === tallaSeleccionada
    )
    if (itemExistente) {
      itemExistente.cantidad += 1
    } else {
      carrito.push({
        id: producto._id,
        nombre: producto.nombre,
        precio: precioSeleccionado,
        talla: tallaSeleccionada,
        imagen: imagenUrl,
        cantidad: 1,
      })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imagen}>
        {imagenUrl && (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className={styles.imagenImg}
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
        </div>

        <div className={styles.tallas}>
          {producto.tallas.map(({ talla, precio }) => (
            <div
              key={talla}
              onClick={() => setTallaSeleccionada(talla)}
              className={`${styles.tallaFila} ${tallaSeleccionada === talla ? styles.tallaFilaSeleccionada : ""}`}
            >
              <span className={`${styles.tallaLabel} ${tallaSeleccionada === talla ? styles.tallaLabelSeleccionado : ""}`}>
                {talla}
              </span>
              <span className={styles.tallaPrecio}>
                ${precio.toLocaleString("es-CO")}
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