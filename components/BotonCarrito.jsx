"use client"
import Link from "next/link"
import { useCarrito} from "@/lib/useCarrito"
import styles from "./BotonCarrito.module.css"

export default function BotonCarrito() {
    const carrito = useCarrito()
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    return (
        <Link href="/carrito" className={styles.btn}>
            Ver carrito {total > 0 && <span className={styles.badge}>{total}</span>}
        </Link>
    )


}