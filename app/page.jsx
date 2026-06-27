
import { client } from "@/lib/sanity"
import BotonCarrito from "@/components/BotonCarrito"
import Catalogo from "@/components/Catalogo"
import styles from "./page.module.css"
export default async function Home() {
  const productos = await client.fetch('*[_type == "producto"]')
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <div className={styles.logoNombre}>Urban Class</div>
          <div className={styles.logoSub}>Prendas exclusivas</div>
        </div>
        <BotonCarrito />
      </header>

      <div className={styles.hero}>
        <p className={styles.heroTag}>Coleccion 2026</p>
        <h1 className={styles.heroTitulo}>
          Viste con<br />
          <span className={styles.heroTituloAcento}>actitud</span>
        </h1>
        <p className={styles.heroSub}>Valledupar &mdash; Envios nacionales</p>
      </div>

      <Catalogo productos={productos} />
    </main>
  )
}