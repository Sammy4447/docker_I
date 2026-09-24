import { useEffect, useState } from 'react'
import Steamer from './Steamer.jsx'
import Logo from './Logo.jsx'
import { varieties, chutneys, recipes } from './data.js'
import credits from './credits.json'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Logo size={42} />
        <nav>
          <a href="#varieties">Varieties</a>
          <a href="#chutneys">Chutneys</a>
          <a href="#recipes">Recipes</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-text">
        <p className="eyebrow">Welcome to Sammy&rsquo;s Momo House</p>
        <h1>Hand-folded, steamed, and served hot.</h1>
        <p className="lead">
          A small guide to momo: the kinds you'll find on the street, the
          chutneys that go with them, and how to make a batch at home.
        </p>
        <div className="hero-links">
          <a href="#varieties" className="btn">See the varieties</a>
          <a href="#recipes" className="link">Jump to recipes &rarr;</a>
        </div>
      </div>
      <div className="hero-art">
        <Steamer />
      </div>
    </section>
  )
}

function Varieties() {
  return (
    <section id="varieties" className="section wrap">
      <div className="section-head reveal">
        <h2>Varieties</h2>
        <p>Same dumpling, many ways to cook it.</p>
      </div>
      <div className="grid">
        {varieties.map((v, i) => (
          <article key={v.name} className="card reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
            <div className="card-img">
              <img src={`/images/${v.img}.jpg`} alt={v.name} loading="lazy" />
            </div>
            <div className="card-top">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="tag">{v.tag}</span>
            </div>
            <h3>{v.name}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Heat({ level }) {
  return (
    <span className="heat" aria-label={`Heat ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= level ? 'dot on' : 'dot'} />
      ))}
    </span>
  )
}

function Chutneys() {
  return (
    <section id="chutneys" className="section band">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Chutneys</h2>
          <p>Momo without achar is only half a plate.</p>
        </div>
        <div className="chutney-photos reveal">
          <figure>
            <img src="/images/jhol-achar.jpg" alt="Veg momo sitting in orange jhol achar" loading="lazy" />
            <figcaption>Veg momo in jhol achar</figcaption>
          </figure>
          <figure>
            <img src="/images/chutney.jpg" alt="Plate of momo with a bowl of red chilli chutney" loading="lazy" />
            <figcaption>Homemade momo with chilli chutney</figcaption>
          </figure>
        </div>
        <ul className="chutney-list">
          {chutneys.map((c) => (
            <li key={c.name} className="chutney reveal">
              <div>
                <h3>{c.name}</h3>
                <span className="sub">{c.sub}</span>
              </div>
              <p>{c.text}</p>
              <Heat level={c.heat} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Recipe({ r }) {
  const [done, setDone] = useState([])
  const toggle = (i) =>
    setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))

  return (
    <article className="recipe reveal">
      <img className="recipe-img" src={`/images/${r.img}.jpg`} alt={r.name} loading="lazy" />
      <header className="recipe-head">
        <h3>{r.name}</h3>
        <div className="meta">
          <span>{r.time}</span>
          <span>{r.serves}</span>
        </div>
      </header>
      <div className="recipe-body">
        <div>
          <h4>Ingredients</h4>
          <ul className="ingredients">
            {r.ingredients.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Method</h4>
          <ol className="steps">
            {r.steps.map((s, i) => (
              <li key={i} className={done.includes(i) ? 'done' : ''}>
                <button type="button" onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
                  <span className="step-n">{i + 1}</span>
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="hint">Tap a step to mark it done.</p>
        </div>
      </div>
    </article>
  )
}

function Recipes() {
  return (
    <section id="recipes" className="section wrap">
      <div className="section-head reveal">
        <h2>Recipes</h2>
        <p>Start with the dough, end with the achar.</p>
      </div>
      <div className="recipes">
        {recipes.map((r) => (
          <Recipe key={r.name} r={r} />
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo size={48} className="brand-lg" />
        <span>Made with flour, water and a lot of patience.</span>
      </div>
      <details className="wrap credits">
        <summary>Photo credits (Wikimedia Commons)</summary>
        <ul>
          {credits.map((c) => (
            <li key={c.image}>
              <a href={c.source} target="_blank" rel="noreferrer">{c.image}</a> by {c.author}, {c.license}
            </li>
          ))}
        </ul>
      </details>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Varieties />
        <Chutneys />
        <Recipes />
      </main>
      <Footer />
    </>
  )
}
