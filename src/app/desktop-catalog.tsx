"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon, products } from "./mobile-catalog";
import s from "./desktop-catalog.module.css";

const instagram = "https://www.instagram.com/galja.studio/";
const galleries = [
  ["desktop-greeting.webp", "greeting-folded.png", "greeting-flat.png"],
  ["home-menus-hd.webp", "menu-food-hd.webp", "menu-drinks-hd.webp"],
  ["home-thanks-hd.webp", "thanks-banner.png"],
  ["home-bridal-hd.webp", "bridal-detail.webp"],
  ["home-birthday-hd.webp", "home-birthday.webp"],
  ["photos-detail.png", "home-photos.webp"],
];
const dimensions = [
  [["A7", "74 × 105 mm"], ["A6", "105 × 148 mm"], ["A5", "148 × 210 mm"]],
  [["A6", "105 × 148 mm"], ["A5", "148 × 210 mm"], ["A4", "210 × 297 mm"]],
  [["Мал", "3 на A5"], ["A6", "105 × 148 mm"], ["A5", "148 × 210 mm"]],
];

function Table({ headers, rows, active, column }: { headers: string[]; rows: string[][]; active?: number; column?: number }) {
  return <table className={s.table}><thead><tr>{headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={row[0]} data-active={i === active}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j} data-selected={j === column && i === active}>{cell}</td>)}</tr>)}</tbody></table>;
}

export default function DesktopCatalog() {
  const [selected, setSelected] = useState(0);
  const [folded, setFolded] = useState(true);
  const [format, setFormat] = useState(0);
  const [material, setMaterial] = useState("Satin");
  const [quantity, setQuantity] = useState(0);
  const [guests, setGuests] = useState(0);


  useEffect(() => {
    const sync = () => {
      const index = products.findIndex(p => p.slug === location.hash.slice(1));
      setSelected(index < 0 ? 0 : index); setFormat(0); setQuantity(0);
    };
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);

  const product = products[selected];
  const images = galleries[selected];
  const isParty = selected === 3 || selected === 4;
  const birthday = selected === 4;
  function choose(index: number) {
    setSelected(index); setFormat(0); setQuantity(0);
    history.pushState(null, "", `#${products[index].slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  let headers = selected === 0 ? ["Формат", "Сјајна", "Сатен"] : ["Формат", "Мат", "Сјајна", "Сатен"];
  let rows = selected === 0
    ? (folded ? [["A7", "50 ден.", "50 ден."], ["A6", "100 ден.", "120 ден."], ["A5", "130 ден.", "150 ден."]] : [["A7", "30 ден.", "30 ден."], ["A6", "60 ден.", "80 ден."], ["A5", "80 ден.", "100 ден."]])
    : selected === 1 ? [["A6", "40 ден.", "50 ден.", "50 ден."], ["A5", "60 ден.", "80 ден.", "90 ден."], ["A4", "80 ден.", "110 ден.", "130 ден."]]
    : [["Мал · 3 на A5", "15 ден.", "15 ден.", "40 ден."], ["A6", "30 ден.", "30 ден.", "40 ден."], ["A5", "70 ден.", "70 ден.", "80 ден."]];
  if (selected === 2 && quantity > 0) {
    headers = ["Формат", "Мат / Сјајна", "Сатен"];
    rows = quantity === 1 ? [["Мал · 3 на A5", "13 ден.", "—"], ["A6", "25 ден.", "30 ден."], ["A5", "40 ден.", "50 ден."]] : [["Мал · 3 на A5", "10 ден.", "—"], ["A6", "20 ден.", "25 ден."], ["A5", "30 ден.", "40 ден."]];
  }

  return <div className={s.page} data-desktop-catalog="true">
    <section className={s.hero} aria-labelledby="desktop-hero-title"><button className={s.logo} onClick={() => choose(0)} aria-label="Galja Studio почетна" /><h1 id="desktop-hero-title">Мали детали<br/>за големи моменти</h1><span className={s.flourish}><Icon name="heart"/></span><p>Персонализирани печатени изработки со љубов</p></section>
    <main className={s.main}>
      <nav className={s.categories} aria-label="Категории на производи">{products.map((p, i) => <button key={p.slug} className={s.category} aria-pressed={selected === i} onClick={() => choose(i)}><div className={s.categoryPhoto}><Image unoptimized src={`/images/${galleries[i][0]}`} alt={p.name} fill sizes="17vw" priority /></div><span className={s.categoryName}>{i === 2 ? "Thank you & Welcome" : i === 3 ? "Девојачки сетови" : p.name}</span></button>)}</nav>
      <section className={s.workspace} aria-label={product.title}>
        <div className={s.gallery}>
          <Image unoptimized key={selected} className={s.mainPhoto} src={`/images/${images[0]}`} alt={product.title} fill sizes="48vw" priority />
        </div>
        <div className={s.details} key={product.slug}>
          <div className={s.productHeading}><h2>{product.title}</h2><span className={s.flourish}><Icon name="heart"/></span></div>
          <p className={s.subtitle}>{product.subtitle || "Персонализирани картички за вашите посебни моменти."}</p>
          <div className={s.configuration}>
            {selected < 3 ? <>
              <div className={s.topControls}>
                {selected === 0 && <div><h3>Тип на картичка</h3><div className={s.choices}>{[true, false].map(value => <button key={String(value)} aria-pressed={folded === value} onClick={() => setFolded(value)}><span className={value ? s.foldedIcon : s.flatIcon}/>{value ? "Преклопувачки" : "Непреклопувачки"}</button>)}</div></div>}
                <div className={s.formatControls}><h3>Формат</h3><div className={s.choices}>{dimensions[selected].map(([label, size], i) => <button key={label} aria-pressed={format === i} onClick={() => setFormat(i)}><strong>{label}</strong><small>{size}</small></button>)}</div></div>
              </div>
              <div className={s.materialAndPrices}>
                <div className={s.materials}><h3>Материјал</h3><div className={s.swatches}>{(selected === 0 ? ["Glossy", "Satin"] : ["Matte", "Glossy", "Satin"]).map(name => <button key={name} aria-pressed={material === name} onClick={() => setMaterial(name)}><span className={s[name.toLowerCase()]} />{name}</button>)}</div></div>
                <div className={s.prices}><h3 tabIndex={-1}>Ценовник</h3>{selected === 2 && <div className={`${s.choices} ${s.quantity}`}>{["Редовни цени", "Над 100 парчиња", "Над 200 парчиња"].map((q, i) => <button key={q} aria-pressed={quantity === i} onClick={() => setQuantity(i)}>{q}</button>)}</div>}<Table headers={headers} rows={rows} active={format} column={selected === 0 ? (material === "Satin" ? 2 : 1) : selected === 2 && quantity > 0 ? (material === "Satin" ? 2 : 1) : material === "Satin" ? 3 : material === "Glossy" ? 2 : 1} />{selected === 2 && <small className={s.priceNote}>Цените се по картичка. Мал формат: 9,8 × 21 cm.</small>}</div>
              </div>
            </> : isParty ? <div className={s.party}>
              <div><h3>Што вклучува?</h3><ul><li>Welcome cards</li><li>{birthday ? "Картички со желби" : "Картички со совети и желби"}</li><li>{birthday ? "Who knows the birthday girl/boy?" : "Who knows the bride?"}</li><li>Картички со имиња</li></ul><h3 tabIndex={-1}>Поединечни картички · {birthday ? "A6, мат хартија" : "мат хартија"}</h3><Table headers={["Картичка", "Цена"]} rows={[["Welcome card", "30 ден."], [birthday ? "Картичка со желби" : "Advice card", "30 ден."], [birthday ? "Birthday game" : "Who knows the bride?", "30 ден."], ["Картичка со име · мал формат", "10 ден."]]} /></div>
              <div><h3>{birthday ? "Пакети за роденден" : "Пакети за девојачка"}</h3><div className={s.packages}>{[10, 20, 30].map((n, i) => <button key={n} aria-pressed={guests === i} onClick={() => setGuests(i)}><span>{n} {birthday ? "гости" : "девојки"}</span><strong>{["1.000", "1.800", "2.800"][i]} ден.</strong><small><Icon name="gift"/> +1 GRATIS мени {i === 2 ? "A4" : "A5"}</small></button>)}</div>{!birthday && <p className={s.priceNote}>За картичките што не се наменети за пишување, достапна е и премиум фото хартија.</p>}</div>
            </div> : <div className={s.photoDetails}><h3 tabIndex={-1}>Формати и цени</h3><div className={s.choices}>{["10 × 15 cm", "13 × 18 cm"].map((size, i) => <button key={size} aria-pressed={format === i} onClick={() => setFormat(i)}><strong>{size}</strong><span>{i === 0 ? "15" : "25"} ден.</span></button>)}</div><Table headers={["Формат", "Цена"]} rows={[["10 × 15 cm", "15 ден."], ["13 × 18 cm", "25 ден."]]} active={format} /><p>Печатиме на квалитетна фотохартија за јасни и долготрајни спомени.</p></div>}
          </div>
          <p className={s.note}>{selected === 0 || selected === 2 ? "Секој дизајн може да се персонализира со име, порака или посебен текст." : selected === 1 ? "За поголема нарачка може да добиете попуст. Побарајте понуда во DM на Instagram." : isParty ? "Може да се направи пакет и со повеќе менија вклучени. Побарајте понуда во DM на Instagram." : "Печатени спомени што траат."}</p>
          <a className={s.order} href={instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram"/>Нарачај преку Instagram<span>⟶</span></a>
        </div>
      </section>
    </main>
    <footer className={s.footer}>{[["quality", "Квалитетни материјали"], ["heart", "Персонализиран дизајн"], ["truck", "Брза изработка"], ["gift", "Создадено со љубов"]].map(([icon, label]) => <div key={icon}><Icon name={icon}/><span>{label}</span></div>)}<span className={s.signature}>Galja<small>STUDIO</small></span></footer>
  </div>;
}
