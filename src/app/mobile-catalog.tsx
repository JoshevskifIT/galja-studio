"use client";

import { useEffect, useRef, useState } from "react";
import s from "./mobile-catalog.module.css";

export const products = [
  { slug: "cards", name: "Честитки", title: "Честитки и картички", subtitle: "За секој роденден, прослава или посебен момент.", icon: "mail", crop: [394,115,263,136], thumb: [40,265,100,103] },
  { slug: "menus", name: "Менија", title: "Менија", subtitle: "Елегантни менија за вашата прослава.", icon: "glass", crop: [691,118,266,191], thumb: [149,265,101,103] },
  { slug: "thanks", name: "Thank you & Welcome cards", title: "Thank you & Welcome cards", subtitle: "", icon: "heart", crop: [40,858,204,135], thumb: [260,265,99,103] },
  { slug: "bridal", name: "Девојачки сетови (Bridal)", title: "Девојачки сетови (Bridal)", subtitle: "Сè што ви е потребно за совршена девојачка вечер.", icon: "rings", crop: [275,858,221,147], thumb: [40,435,100,112] },
  { slug: "birthday", name: "Роденденски сетови", title: "Роденденски сетови", subtitle: "Комплети за незаборавна роденденска прослава.", icon: "cake", crop: [527,858,227,141], thumb: [149,435,101,84] },
  { slug: "photos", name: "Фотографии", title: "Фотографии", subtitle: "Печатени спомени што траат.", icon: "camera", crop: [783,858,170,185], thumb: [260,435,99,84] },
] as const;

export function Icon({ name }: { name: string }) {
  const paths: Record<string,string> = {
    mail: "M3 5h18v14H3z M3 6l9 7 9-7",
    heart: "M12 21S2 15 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 7-10 13-10 13Z",
    glass: "M5 3h14l-2 8-5 3-5-3Z M12 14v7 M8 21h8 M4 6h16",
    rings: "M14 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z M22 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z M8 3l4-2 4 2-4 4Z",
    cake: "M3 21h18v-9H3z M5 12V8h14v4 M8 8V5 M12 8V4 M16 8V5 M3 16c3 3 3-3 6 0s3-3 6 0 3-3 6 0",
    camera: "M3 3h18v18H3Z M3 17l6-6 4 4 3-3 5 5 M9 7h.01",
    premium: "M4 3h10v3 M4 3v18h14V11 M7 9h5 M7 13h3 M7 17h6 M17 1l1.5 4.5L23 7l-4.5 1.5L17 13l-1.5-4.5L11 7l4.5-1.5Z",
    bow: "M12 10C8-1 0 0 2 7c1 4 5 5 10 3Zm0 0c4-11 12-10 10-3-1 4-5 5-10 3ZM10 11 6 22l6-4 6 4-4-11Z",
    gift: "M3 8h18v4H3z M5 12v10h14V12 M12 8v14 M12 8C2 8 6-3 12 8c6-11 10 0 0 0Z",
    quality: "m12 1 8 5 2 9-10 8L2 15l2-9Z m-5 11 3 3 7-7",
    truck: "M2 5h12v12H2z M14 9h5l3 5v3h-8 M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z M20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    instagram: "M6 2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z M18 6h.01",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.heart}/></svg>;
}
function Logo() { return <span className={`${s.logo} ${s.brandLogo}`} role="img" aria-label="Galja Studio"/>; }
function PriceTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className={s.tableWrap}><table><thead><tr>{headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
function Formats({ type }: { type: "cards"|"menus"|"thanks" }) {
  const items = type === "cards" ? [["A7","74 × 105 mm"],["A6","105 × 148 mm"],["A5","148 × 210 mm"]] : type === "menus" ? [["A6","105 × 148 mm"],["A5","148 × 210 mm"],["A4","210 × 297 mm"]] : [["Мал формат","(3 на A5)"],["A6","105 × 148 mm"],["A5","148 × 210 mm"]];
  return <section><h2>Формати</h2><div className={s.formats}>{items.map(([name,size],i)=><div key={name}><div className={s.paper} style={{width: `${35+i*13}px`,height: `${48+i*20}px`}}/><span>{name}</span><small>{size}</small></div>)}</div></section>;
}
function Note({ children, icon = "heart" }: { children: React.ReactNode; icon?: string }) { return <aside className={s.note}><Icon name={icon}/><p>{children}</p></aside>; }
function Cards() { return <>
  <section><h2>Типови честитки</h2><div className={s.types}>{[{name: "Преклопувачки", image: "/images/greeting-folded.png"}, {name: "Непреклопувачки", image: "/images/greeting-flat.png"}].map(({name,image})=><div key={name}><div className={s.greetingTypePhoto} role="img" aria-label={name} style={{backgroundImage: `url(${image})`}}/><p>{name}</p></div>)}</div></section>
  <Formats type="cards"/>
  <section><h2>Материјали</h2><div className={s.greetingMaterials}><div><span className={s.satin}/><p>Glossy<small>Сјајна фото хартија</small></p></div><div><span className={s.matte}/><p>Satin<small>Премиум фото хартија</small></p></div></div></section>
  <section><h2>Ценовник</h2><PriceTable headers={["Тип / Формат","Сјајна","Сатен"]} rows={[["Преклопувачка A7","50 ден.","50 ден."],["Преклопувачка A6","100 ден.","120 ден."],["Преклопувачка A5","130 ден.","150 ден."],["Непреклопувачка A7","30 ден.","30 ден."],["Непреклопувачка A6","60 ден.","80 ден."],["Непреклопувачка A5","80 ден.","100 ден."]]}/></section>
  <Note>Секој дизајн може да се персонализира со име, порака или посебен текст.</Note>
 </>; }
function Menus() { return <>
  <Formats type="menus"/>
  <section><h2>Материјали</h2><div className={s.menuMaterials}>{[["Matte", "Мат фото хартија", s.matte], ["Glossy", "Сјајна фото хартија", s.glossy], ["Satin", "Премиум фото хартија", s.satin]].map(([name,description,texture])=><div key={name}><span className={texture}/><p>{name}<small>{description}</small></p></div>)}</div></section>
  <section><h2>Ценовник</h2><PriceTable headers={["Формат","Мат","Сјајна","Сатен"]} rows={[["A6","40 ден.","50 ден.","50 ден."],["A5","60 ден.","80 ден.","90 ден."],["A4","80 ден.","110 ден.","130 ден."]]}/></section>
  <Note icon="premium">За поголема нарачка може да добиете попуст. Побарајте понуда во DM на Instagram.</Note>
 </>; }
function Thanks() { return <>
  <section><h2>Формати</h2><div className={s.thanksFormats}>
    <div><div className={s.smallCardSheet} aria-label="Три мали картички на A5">{[1,2,3].map(n=><div key={n}><span><Icon name="bow"/></span><Icon name="heart"/><i/></div>)}</div><h3>Мал формат (3 на A5)</h3><p>Секоја картичка е со димензии<br/>9,8 × 21 cm (формат A5 / 3).</p></div>
    <div><div className={`${s.thanksFormatPhoto} ${s.thankYouPhoto}`} role="img" aria-label="Thank You картичка со рози"/><h3>A6</h3><p>105 × 148 mm</p></div>
    <div><div className={`${s.thanksFormatPhoto} ${s.welcomePhoto}`} role="img" aria-label="Welcome картичка со рози"/><h3>A5</h3><p>148 × 210 mm</p></div>
  </div></section>
  <section><h2>Материјали</h2><div className={s.thanksMaterials}>{[["Matte","Мат фото хартија",s.satin],["Glossy","Сјајна фото хартија",s.glossy],["Satin","Премиум фото хартија",s.matte]].map(([name,description,texture])=><div key={name}><span className={texture}/><p>{name}<small>{description}</small></p></div>)}</div></section>
  <section><h2>Ценовник <span>(цена по картичка)</span></h2><PriceTable headers={["Формат","Мат","Сјајна","Сатен"]} rows={[["Мал формат (3 на A5)","15 ден.","15 ден.","40 ден."],["A6","30 ден.","30 ден.","40 ден."],["A5","70 ден.","70 ден.","80 ден."]]}/></section>
  <section><h2>Количински попуст</h2><div className={s.thanksDiscounts}>{[100,200].map(quantity=><div className={s.thanksDiscount} key={quantity}><div className={s.discountLabel}><Icon name="gift"/><p>Над {quantity}<br/>парчиња</p></div><PriceTable headers={["Формат","Мат / Сјајна","Сатен"]} rows={quantity===100 ? [["Мал","13 ден.","—"],["A6","25 ден.","30 ден."],["A5","40 ден.","50 ден."]] : [["Мал","10 ден.","—"],["A6","20 ден.","25 ден."],["A5","30 ден.","40 ден."]]}/></div>)}</div><p className={s.thanksUnitNote}>* Цените се по картичка.</p></section>
 </>; }
function Party({ birthday = false }: { birthday?: boolean }) { return <>
  <section><h2>Што вклучува?</h2><ul className={s.includes}>{["Welcome cards",birthday ? "Картички со желби" : "Картички со совети и желби",birthday ? 'Игра „Who knows the birthday girl/boy best?“' : '„Who knows the bride?“ картички',"Картички со имиња"].map(text=><li key={text}>{text}</li>)}</ul></section>
  <section><h2>Поединечни картички <span>({birthday ? "A6, мат хартија" : "мат хартија"})</span></h2><PriceTable headers={[]} rows={[["Welcome card","30 ден."],[birthday ? "Картичка со желби" : "Advice card","30 ден."],[birthday ? "Who knows the birthday girl/boy?" : "Who knows the bride?","30 ден."],["Картичка со име (мал формат)","10 ден."]]}/></section>
  {!birthday && <Note icon="premium">За картичките што не се наменети за пишување, достапна е и премиум фото хартија.</Note>}
  <section className={s.packageSection}><h2>{birthday ? "Пакети за роденден" : "Пакети за девојачка"}</h2><div className={s.packages}>{[birthday ? "10 гости" : "10 девојки",birthday ? "20 гости" : "20 девојки",birthday ? "30 гости" : "30 девојки"].map((name,i)=><div key={name}><h3>{name}</h3><strong>{["1.000","1.800","2.800"][i]} ден.</strong><p><Icon name="gift"/><span><em>+1 GRATIS</em>мени {i===2 ? "A4" : "A5"}</span></p></div>)}</div></section>
  <Note>Може да се направи пакет и со повеќе менија вклучени. Побарајте понуда во DM на Instagram.</Note>
 </>; }
function Photos() { return <>
  <section><h2>Формати и цени</h2><PriceTable headers={["Формат","Цена"]} rows={[["10 × 15 cm","15 ден."],["13 × 18 cm","25 ден."]]}/></section>
  <aside className={s.photoQuality}><svg viewBox="0 0 64 54" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 9 38-6 6 36-38 6Z M10 14l27-4 4 23-27 4Z M15 31l8-13 12 11 M50 21l8 2-4 19 M34 42s-8-6-8-12c0-6 7-8 11-2 4-6 12-4 12 2 0 6-12 15-12 15Z"/><circle cx="32" cy="16" r="3"/></svg><p>Печатиме на квалитетна фотохартија за јасни и долготрајни спомени.</p></aside>
 </>; }
export function ProductDetails({ selected }: { selected: number }) {
  return selected===0 ? <Cards/> : selected===1 ? <Menus/> : selected===2 ? <Thanks/> : selected===3 ? <Party/> : selected===4 ? <Party birthday/> : <Photos/>;
}
// Supply the image URL returned by the back office when its API is connected.
export function ProductPhoto({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  if (!src) return <div className={`${s.productPhoto} ${s.emptyPhoto} ${className}`} aria-hidden="true"><Icon name="camera"/></div>;
  return <div className={`${s.productPhoto} ${className}`} role="img" aria-label={label} style={{backgroundImage: `url(${JSON.stringify(src)})`}}/>;
}
function MaterialPrices({ selected, satin }: { selected: number; satin: boolean }) {
  const cards = selected === 0;
  const thanks = selected === 2;
  const name = cards ? (satin ? "Satin Photo Paper" : "Glossy Photo Paper") : (satin ? "Satin Photo Paper" : "Мат");
  const rows = cards
    ? [["Преклопувачка A6 (со плико)", satin ? "120 ден." : "100 ден."], ["Преклопувачка A5 (со плико)", satin ? "150 ден." : "130 ден."], ["Непреклопувачка A6 (со плико)", satin ? "80 ден." : "60 ден."], ["Непреклопувачка A5 (со плико)", satin ? "100 ден." : "80 ден."], ["Непреклопувачка A7 (со плико)", "50 ден."]]
    : thanks
      ? [["A6 (со плико)", satin ? "40 ден." : "30 ден."], ["A5 (со плико)", satin ? "80 ден." : "60 ден."], ...(!satin ? [["Мали картички (3 на A5)", "15 ден."]] : [])]
      : [["A6", satin ? "50 ден." : "40 ден."], ["A5", satin ? "90 ден." : "70 ден."], ["A4", satin ? "130 ден." : "100 ден."]];
  return <section className={s.referenceMaterial}>
    <header className={s.referenceHeader}><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={satin ? "M15 3l3 9 9 3-9 3-3 10-3-10-9-3 9-3Z M30 22l2 5 5 2-5 2-2 6-2-6-5-2 5-2Z M31 2v10 M26 7h10" : "m5 15 15-12 15 12-15 12Z M5 22l15 12 15-12 M5 28l15 11 15-11 M17 9l5 4"}/></svg><div><h3>{name}</h3><p>{satin ? "Мат, елегантна завршница со професионален печат." : cards ? "Сјајна завршница со живи бои." : "Елегантна завршница со природен изглед."}</p></div></header>
    <div className={s.referenceBody}><PriceTable headers={[]} rows={rows}/><ProductPhoto label={products[selected].title} className={s.referenceArt}/></div>
    {thanks && <div className={s.quantityNote}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 3h10l8 8-10 10-8-8Z"/><circle cx="8" cy="8" r="1.5"/></svg><p><strong>100+ парчиња:</strong> {satin ? "A6 25 ден. / A5 40 ден." : "A6 20 ден. / A5 35 ден. / Мали 13 ден."}</p><span aria-hidden="true">•</span><p><strong>200+ парчиња:</strong> {satin ? "A6 20 ден. / A5 30 ден." : "A6 18 ден. / A5 30 ден. / Мали 10 ден."}</p></div>}
    <div className={s.unitNote}><span aria-hidden="true">ⓘ</span>Цените се по парче.</div>
  </section>;
}
export function DesktopProduct({ selected }: { selected: number }) {
  if (selected < 3) return <div className={`${s.detail} ${s.referenceDetail}`}>
    <div className={s.formatStrip}><Formats type={selected === 0 ? "cards" : selected === 1 ? "menus" : "thanks"}/></div>
    <MaterialPrices selected={selected} satin={selected===0}/><MaterialPrices selected={selected} satin={selected!==0}/>
    <Note>{selected === 0 ? "Секој дизајн може да се персонализира со име, порака или посебен текст." : selected === 1 ? "За поголема нарачка може да добиете попуст. Побарајте понуда во DM на Instagram." : "На A5 се собираат 3 мали картички (идеални за мали благодарници)."}</Note>
  </div>;
  if (selected === 5) return <div className={`${s.detail} ${s.desktopDetail}`}>
    <section><h2>Формати и цени</h2><PriceTable headers={["Формат", "Цена"]} rows={[["10 × 15 cm", "15 ден."], ["13 × 18 cm", "25 ден."]]}/><p className={s.photoCopy}>Печатиме на квалитетна фотохартија за јасни и долготрајни спомени.</p></section>
    <ProductPhoto label="Печатени фотографии"/>
  </div>;
  return <div className={`${s.detail} ${s.desktopDetail}`}><ProductDetails selected={selected}/></div>;
}
export function ProductThumbnail({ index }: { index: number }) {
  return <span className={s.desktopThumbnail} aria-hidden="true"><Icon name={products[index].icon}/></span>;
}
export default function MobileCatalog() {
  const [selected,setSelected] = useState(-1);
  const navigation = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(()=> {
    const sync = () => {
      const slug = window.location.hash.slice(1);
      const index = products.findIndex(p=>p.slug===slug);
      if (index < 0) window.scrollTo(0, 0);
      setSelected(index);
    };
    sync(); window.addEventListener("hashchange",sync); window.addEventListener("popstate",sync); return ()=>{ window.removeEventListener("hashchange",sync); window.removeEventListener("popstate",sync); };
  },[]);
  function navigate(index: number) {
    window.scrollTo(0, 0);
    setSelected(index); window.history.pushState(null, "", `#${index < 0 ? "home" : products[index].slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    if (index >= 0) requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}));
  }
  const product = products[selected];
  return <><header className={`${s.detailHeader} ${s.fixedNavbar} ${!product ? s.homeNavbar : ""}`}><button onClick={()=>navigate(-1)} aria-label="Назад кон категориите" style={product ? undefined : {visibility: "hidden"}}><svg className={s.backIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 4-12 12 12 12M4 16h25"/></svg></button><button onClick={()=>navigate(-1)} aria-label="Galja Studio почетна"><Logo/></button><button className={s.menuToggle} onClick={()=>navigation.current?.showModal()} aria-label="Отвори мени"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M3 7h26M3 16h26M3 25h26"/></svg></button></header><div className={`${s.mobile} ${product ? s.hasFixedOrder : s.homePage} ${selected===1 || selected===3 ? s.compactPage : ""} ${selected===1 ? s.menuPage : ""} ${selected===3 ? s.bridalPage : ""} ${selected===2 ? s.thanksPage : ""} ${selected===5 ? s.photosPage : ""} ${selected===0 ? s.greetingPage : ""}`}>
    {product ? <>

      <main className={`${s.detail} ${selected===5 ? s.photos : ""} ${selected===0 ? s.greetingDetail : ""} ${selected===3 ? s.bridalDetail : ""} ${selected===1 ? s.menuDetail : ""} ${selected===2 ? s.thanksDetail : ""}`}>
        <div className={s.intro}><h1 ref={heading} tabIndex={-1}>{product.title}</h1>{product.subtitle ? <p>{product.subtitle}</p> : null}</div>
        {selected===5 ? <div className={`${s.heroPhoto} ${s.printedPhotos}`} role="img" aria-label="Печатени фотографии со розова сатенска панделка и цвеќиња"/> : selected===3 ? <div className={`${s.heroPhoto} ${s.bridalPhoto}`} role="img" aria-label={product.title}/> : selected===1 ? <div className={`${s.heroPhoto} ${s.menuPhoto}`}><div className={s.menuGalleryImage} role="img" aria-label="Мени за храна" style={{backgroundImage: "url(/images/menu-food-hd.webp)"}}/><div className={s.menuGalleryImage} role="img" aria-label="Мени за пијалаци" style={{backgroundImage: "url(/images/menu-drinks-hd.webp)"}}/></div> : selected===4 ? <div className={`${s.heroPhoto} ${s.birthdayPhoto}`} role="img" aria-label="Роденденски сет со Welcome картичка, покана и картичка со име"/> : null}
        <ProductDetails selected={selected}/>
        <a className={`${s.order} ${s.inlineOrder}`} href="https://www.instagram.com/galja.studio/" target="_blank" rel="noopener noreferrer"><Icon name="instagram"/>Нарачај преку Instagram <span>→</span></a>
      </main>
    </> : <main className={s.home} data-home-screen="true">
      <section className={s.homeHero}>
        <h1 ref={heading} tabIndex={-1}>Мали детали<br/>за големи моменти</h1><p>Персонализирани печатени изработки<br/>со љубов</p><span className={s.heroHeart}><Icon name="heart"/></span>
      </section>
      <nav className={s.categories} aria-label="Категории на производи">{products.map((p,i)=><button key={p.slug} onClick={()=>navigate(i)}><div className={s.homePhoto} role="img" aria-label={p.name} style={{backgroundImage: p.slug === "photos" ? "url(/images/photos-detail.png)" : `url(/images/home-${p.slug}-hd.webp)`}}/><span className={s.categoryIcon}><Icon name={p.icon}/></span><span className={s.categoryName}>{p.slug === "bridal" ? <>Девојачки сетови<br/>(Bridal)</> : p.name}</span></button>)}</nav>
      <footer className={s.homeFooter}>{[["quality","Квалитетни материјали"],["heart","Персонализиран дизајн"],["truck","Брза изработка"],["gift","Создадено со љубов"]].map(([icon,label])=><div key={icon}><Icon name={icon}/><span>{icon === "truck" ? <>Брза<br/>изработка</> : label}</span></div>)}</footer>
    </main>}
    <dialog ref={navigation} className={s.dialog}><button className={s.close} onClick={()=>navigation.current?.close()} aria-label="Затвори">×</button><Logo/><nav aria-label="Категории на производи">{products.map((item,index)=><button key={item.slug} onClick={()=>{navigation.current?.close(); navigate(index);}}>{item.name}</button>)}</nav></dialog>
  </div>{product && <footer className={s.fixedOrder}><a className={s.order} href="https://www.instagram.com/galja.studio/" target="_blank" rel="noopener noreferrer"><Icon name="instagram"/>Нарачај преку Instagram <span aria-hidden="true">→</span></a></footer>}</>;
}
