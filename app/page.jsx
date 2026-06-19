import { client, urlFor } from "@/lib/sanity"
import TarjetaProducto from "@/components/TarjetaProducto"
import styles from "./page.module.css"
import Link from "next/link"
export default async function Home() {
  const productos = await client.fetch('*[_type == "producto"]')
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <div className={styles.logoNombre}>Urban Class</div>
          <div className={styles.logoSub}>Prendas exclusivas</div>
        </div>
        <Link href="/carrito" className={styles.carritoBtn}>
          Ver carrito
        </Link>
      </header>

      <div className={styles.hero}>
        <p className={styles.heroTag}>Coleccion 2026</p>
        <h1 className={styles.heroTitulo}>
          Viste con<br />
          <span className={styles.heroTituloAcento}>actitud</span>
        </h1>
        <p className={styles.heroSub}>Valledupar &mdash; Envios nacionales</p>
      </div>

      <section className={styles.catalogo}>
        {productos.map((producto) => (
          <TarjetaProducto key={producto._id} producto={producto} />
        ))}
      </section>
    </main>
  )
}