"use client"
import Link from "next/link"
import Image from "next/image"

import { useCarrito, actualizarCarrito } from "@/lib/useCarrito"
import styles from "./page.module.css"


export default function Carrito() {
  const carrito = useCarrito()

 function cambiarCantidad(id, talla, cantidad) {
  const item = carrito.find((i) => i.id === id && i.talla === talla)
  if (cantidad > item.stock) return
  const nuevo = carrito.map((i) =>
    i.id === id && i.talla === talla
      ? { ...i, cantidad: Math.max(1, cantidad) }
      : i
  )
  actualizarCarrito(nuevo)
}

  function eliminarItem(id, talla) {
    const nuevo = carrito.filter(
      (item) => !(item.id === id && item.talla === talla)
    )
    actualizarCarrito(nuevo)
  }
  
function hacerPedido() {
    if (carrito.length === 0) return
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const mensaje = carrito
      .map((item) =>
        `- ${item.nombre} | Talla: ${item.talla} | Cantidad: ${item.cantidad} | $${(item.precio * item.cantidad).toLocaleString("es-CO")}`
      )
      .join("\n")
    const texto = `Hola, quiero hacer el siguiente pedido:\n\n${mensaje}\n\nTotal: $${total.toLocaleString("es-CO")}`
    const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank")
  }


  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.volverBtn}>← Volver</Link>
        <h1 className={styles.titulo}>Tu carrito</h1>
      </header>

     <div className={styles.contenido}>
        {carrito.length === 0 ? (
          <p className={styles.vacio}>Tu carrito está vacío</p>
        ) : (
          <>
             {carrito.map((item) => (
              <div key={`${item.id}-${item.talla}`} className={styles.item}>
                <div className={styles.itemImagen}>
                  {item.imagen && (
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      fill
                      className={styles.imagenImg}
                      sizes="64px"
                    />
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <p className={styles.itemNombre}>{item.nombre}</p>
                  <p className={styles.itemTalla}>Talla: {item.talla}</p>
                  <p className={styles.itemPrecio}>
                    ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                  </p>
                </div>

                <div className={styles.cantidadControl}>
                  <button
                    className={styles.cantidadBtn}
                    onClick={() => cambiarCantidad(item.id, item.talla, item.cantidad - 1)}
                  >-</button>
                  <span className={styles.cantidadNum}>{item.cantidad}</span>
                  <button
                    className={styles.cantidadBtn}
                    onClick={() => cambiarCantidad(item.id, item.talla, item.cantidad + 1)}
                  >+</button>
                </div>

                <button
                  className={styles.eliminarBtn}
                  onClick={() => eliminarItem(item.id, item.talla)}
                >×</button>
              </div>
            ))}

            <div className={styles.resumen}>
              <span className={styles.resumenLabel}>Total</span>
              <span className={styles.resumenTotal}>
                ${total.toLocaleString("es-CO")}
              </span>
            </div>

            <button className={styles.whatsappBtn} onClick={hacerPedido}>
              Hacer pedido por WhatsApp
            </button>
          </>
        )}
      </div>
    </main>
  )
}