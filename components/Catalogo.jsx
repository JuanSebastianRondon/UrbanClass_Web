"use client"

import {useState} from "react"

import TarjetaProducto from "./TarjetaProducto"
import styles from "./Catalogo.module.css"

const categorias = [
    { label: "Todos", value: null },
    { label: "Camisetas", value: "camisetas" },
    { label: "Sudaderas", value: "sudaderas" },
    { label: "Pantalones", value: "pantalones" },
    { label: "Gorras", value: "gorras" },
    { label: "Gafas", value: "gafas" },
    { label: "Relojes", value: "relojes" },
]

export default function Catalogo({ productos }) {
    const [categoriaActiva, setCategoriaActiva] = useState(null)
    const productosFiltrados = categoriaActiva
    ? productos.filter((p) =>p.categoria === categoriaActiva)
    :productos

    return (
        <>
        <div className={styles.filtros}>
            {categorias.map(({label, value}) => (
                <button
                    key={label}
                    onClick={() => setCategoriaActiva(value)}
                 className={`${styles.filtroBtn} ${categoriaActiva === value ? styles.filtroBtnActivo : ""}`}
                >
                    {label}
                </button>
            ))}
        </div>

        <div className={styles.grid}>
            {productosFiltrados.length === 0 ? (
                <p className={styles.vacio}>No se encontraron productos en esta categoría.</p>
            ) : (
                productosFiltrados.map((producto, index) => (
                    <TarjetaProducto key={producto._id} producto={producto} priority={index ===0} />
                ))
            )}
        </div>
        </>
    )
}