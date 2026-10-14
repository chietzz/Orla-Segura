import { useEffect, useRef, useState } from "react";
import fotoOrla from "./orla.jpg";

/* =========================================================
   Orla Segura — componentes e telas do site.
   Seções: 1) dados  2) peças reutilizáveis  3) telas  4) App
   ========================================================= */

/* ---------- 1) DADOS (demonstrativos — edite aqui) ---------- */

const PRAIAS = [
  { nome: "Piedade", nivel: "seguro", rotulo: "Seguro", resumo: "Mar calmo e sem alertas ativos.", cta: "VER DETALHES →", destino: "praias" },
  { nome: "Candeias", nivel: "atencao", rotulo: "Atenção", resumo: "Correnteza moderada em alguns trechos.", cta: "VER NO MAPA →", destino: "mapa" },
  { nome: "Barra de Jangada", nivel: "alto", rotulo: "Alto risco", resumo: "Evite o banho de mar neste momento.", cta: "VER NO MAPA →", destino: "mapa" },
];

const ALERTA_PRINCIPAL = "Corrente de retorno identificada em Candeias — procure um trecho sinalizado.";

const ALERTAS_RECENTES = [
  { praia: "Candeias", texto: "Correnteza moderada detectada às 08:41." },
  { praia: "Barra de Jangada", texto: "Ondulação forte e risco elevado às 08:37." },
];

// Posição de cada pin no mapa (ilustração de 804 x 510). Só o de Piedade é clicável.
const PINS = [
  { nome: "Piedade", cor: "seguro", top: 120, href: "#/praias" },
  { nome: "Candeias", cor: "atencao", top: 245 },
  { nome: "Barra de Jangada", cor: "alto", top: 382, pequeno: true },
];

const STATS = [
  { rotulo: "Nível de risco", valor: "Baixo", cor: "verde" },
  { rotulo: "Correnteza", valor: "Fraca", cor: "azul" },
  { rotulo: "Visibilidade", valor: "Boa", cor: "ciano" },
  { rotulo: "Última atualização", valor: "08:52", cor: "escuro" },
];

const ORIENTACOES = [
  "Prefira áreas próximas aos pontos de apoio.",
  "Mantenha crianças sempre ao alcance.",
  "Observe a sinalização antes de entrar no mar.",
  "Evite nadar sozinho em áreas mais profundas.",
];

const ULTIMOS_ALERTAS = [
  { hora: "08:12", situacao: "Atenção", texto: "Ondulação aumentou por alguns minutos." },
  { hora: "07:40", situacao: "Normalizado", texto: "Correnteza voltou ao nível seguro." },
];

const PASSOS = [
  { titulo: "Saia da área de risco", texto: "Afaste-se do mar e procure um ponto seguro." },
  { titulo: "Sinalize sua localização", texto: "Informe praia, trecho e um ponto de referência." },
  { titulo: "Aguarde orientação", texto: "Siga as instruções da equipe de atendimento." },
];

const CONTATOS = [
  { nome: "Defesa Civil", numero: "199", cor: "azul" },
  { nome: "SAMU", numero: "192", cor: "verde" },
  { nome: "Bombeiros", numero: "193", cor: "vermelho" },
];

// destino = para onde a dica leva ao clicar (igual ao protótipo). Sem destino = não clicável.
const DICAS = [
  { titulo: "Corrente de retorno", texto: "Não tente nadar contra a corrente. Nade paralelo à praia até sair do fluxo.", destino: "mapa" },
  { titulo: "Crianças", texto: "Mantenha supervisão constante e combine um ponto de encontro." },
  { titulo: "Sinalização", texto: "Respeite bandeiras, avisos sonoros e orientações das equipes.", destino: "mapa" },
  { titulo: "Mar agitado", texto: "Evite entrar na água quando houver ondas fortes ou alertas ativos." },
  { titulo: "Hidratação", texto: "Leve água, use protetor solar e procure sombra nos horários mais quentes." },
  { titulo: "Emergência", texto: "Ao notar alguém em risco, acione ajuda profissional e evite resgates improvisados.", destino: "emergencia", perigo: true },
];

const MENU = [
  ["inicio", "Início"],
  ["mapa", "Mapa"],
  ["praias", "Praias"],
  ["emergencia", "Emergência"],
  ["dicas", "Dicas"],
];

/* ---------- 2) PEÇAS REUTILIZÁVEIS ---------- */

// Pílula colorida. cor: seguro | atencao | alto | azul | claro | escuro
const Pill = ({ cor, textoEscuro, children }) => (
  <span className={`pill pill--${cor}${textoEscuro ? " pill--texto-escuro" : ""}`}>{children}</span>
);

// Botão do protótipo. Com href vira link; sem href é só visual (dentro de cards que já são links).
const Cta = ({ href, variante = "claro", children }) =>
  href ? (
    <a className={`cta cta--${variante}`} href={href}>{children}</a>
  ) : (
    <span className={`cta cta--${variante}`}>{children}</span>
  );

const Nota = () => <p className="nota">Protótipo conceitual • dados demonstrativos</p>;

const Header = ({ rotaAtual }) => (
  <header className="header">
    <a className="marca" href="#/inicio" aria-label="Orla Segura, ir para o início">
      <span className="marca__ponto" aria-hidden="true" />
      <span className="marca__nome">ORLA SEGURA</span>
    </a>
    <nav className="nav" aria-label="Navegação principal">
      {MENU.map(([id, rotulo]) => (
        <a
          key={id}
          href={`#/${id}`}
          className={`nav__link${rotaAtual === id ? " nav__link--ativo" : ""}`}
          aria-current={rotaAtual === id ? "page" : undefined}
        >
          {rotulo}
        </a>
      ))}
    </nav>
  </header>
);

/* ---------- 3) TELAS ---------- */

// 01 · Início
function Inicio() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <svg className="hero__ondas" viewBox="0 0 520 300" aria-hidden="true">
          <circle cx="425" cy="58" r="110" fill="#fff" fillOpacity="0.05" />
          <path d="M-40 125 C70 70 200 190 340 130 S520 80 575 100 V245 H-40 Z" fill="#fff" fillOpacity="0.05" />
          <path d="M-20 165 C100 120 220 215 350 165 S520 135 570 150 V270 H-20 Z" fill="#fff" fillOpacity="0.06" />
        </svg>

        <a className="hero__status" href="#/mapa">
          <p className="hero__rotulo">STATUS DA ORLA</p>
          <Pill cor="seguro">● RISCO BAIXO</Pill>
          <h1 id="hero-titulo" className="hero__titulo">Condições favoráveis no momento</h1>
          <p className="hero__atualizacao">Última atualização: agora</p>
        </a>

        <img
          className="hero__foto"
          src={fotoOrla}
          alt="Vista aérea da orla com prédios, faixa de areia e mar de águas claras"
        />
      </section>

      <section className="praias" aria-label="Situação por praia">
        {PRAIAS.map((p) => (
          <a key={p.nome} className="card card--praia" href={`#/${p.destino}`}>
            <div className="card__topo">
              <span className="card__nome">{p.nome}</span>
              <Pill cor={p.nivel}>{p.rotulo}</Pill>
            </div>
            <p className="card__texto">{p.resumo}</p>
            <p className="leitura">
              <span className="leitura__ponto" aria-hidden="true" />
              Monitoramento ativo • dados demonstrativos
            </p>
            <Cta>{p.cta}</Cta>
          </a>
        ))}
      </section>

      <a className="alerta" href="#/mapa">
        <Pill cor="atencao" textoEscuro>⚠ ALERTA</Pill>
        <p className="alerta__texto">{ALERTA_PRINCIPAL}</p>
        <Cta>VER NO MAPA →</Cta>
      </a>

      <Nota />
    </>
  );
}

// 02 · Mapa
function Pin({ nome, cor, top, href, pequeno }) {
  const estilo = { top: `calc(${(top / 510) * 100}% + 5px)` };
  const conteudo = (
    <>
      <span className={`pin__ponto pin__ponto--${cor}`} aria-hidden="true" />
      <span className={`pin__nome${pequeno ? " pin__nome--pequeno" : ""}`}>{nome}</span>
    </>
  );
  return href ? (
    <a className="pin pin--link" style={estilo} href={href} aria-label={`${nome}: ver detalhes`}>{conteudo}</a>
  ) : (
    <div className="pin" style={estilo}>{conteudo}</div>
  );
}

function Mapa() {
  return (
    <>
      <Pill cor="claro">MAPA DE RISCO</Pill>
      <h1 className="titulo-pagina">Veja a situação de cada trecho da orla</h1>
      <p className="sub-pagina">As cores indicam o nível de atenção necessário em cada área monitorada.</p>

      <div className="mapa-layout">
        <section className="mapa-painel" aria-label="Mapa da orla">
          <h2 className="mapa-painel__titulo">Orla de Jaboatão dos Guararapes</h2>
          <div className="mapa">
            <svg className="mapa__fundo" viewBox="0 0 804 510" preserveAspectRatio="none" aria-hidden="true">
              <rect width="804" height="510" fill="#7cc8de" />
              <path d="M0 0 H286 C300 45 262 85 276 135 C290 185 248 225 262 275 C276 325 242 365 254 415 C264 455 246 485 252 510 H0 Z" fill="#f2dfa8" />
              <path d="M292 0 C306 45 268 85 282 135 C296 185 254 225 268 275 C282 325 248 365 260 415 C270 455 252 485 258 510" fill="none" stroke="#fff4d8" strokeWidth="16" strokeLinecap="round" />
              <g fill="none" stroke="#b9e2ef" strokeWidth="4" strokeLinecap="round">
                <path d="M405 82 Q502 44 600 78" />
                <path d="M411 178 Q525 140 640 176" />
                <path d="M429 328 Q545 290 658 326" />
              </g>
            </svg>
            {PINS.map((p) => <Pin key={p.nome} {...p} />)}
          </div>
        </section>

        <aside className="legenda" aria-label="Legenda e alertas">
          <h2 className="legenda__titulo">Legenda</h2>
          <Pill cor="seguro">● Seguro</Pill>
          <Pill cor="atencao" textoEscuro>● Atenção</Pill>
          <Pill cor="alto">● Alto risco</Pill>

          <h2 className="legenda__titulo">Alertas recentes</h2>
          {ALERTAS_RECENTES.map((a) => (
            <p key={a.praia} className="legenda__alerta">{a.praia}<br />{a.texto}</p>
          ))}

          <a className="cta cta--azul" href="#/praias">VER DETALHES DE PIEDADE →</a>
        </aside>
      </div>

      <Nota />
    </>
  );
}

// 03 · Detalhes da Praia (menu "Praias")
function DetalhesPraia() {
  return (
    <>
      <Pill cor="claro">PIEDADE</Pill>
      <h1 className="titulo-pagina">Condições atuais da praia</h1>
      <p className="sub-pagina">
        Informações consolidadas para ajudar o frequentador a decidir como aproveitar a orla.
      </p>

      <section className="stats" aria-label="Indicadores de Piedade">
        {STATS.map((s) => (
          <div key={s.rotulo} className="card card--stat">
            <p className="stat__rotulo">{s.rotulo}</p>
            <p className={`stat__valor stat__valor--${s.cor}`}>{s.valor}</p>
          </div>
        ))}
      </section>

      <div className="detalhes">
        <section className="card card--orientacoes">
          <h2 className="detalhes__titulo">Orientações para agora</h2>
          {ORIENTACOES.map((o) => <p key={o} className="orientacao">{`✓  ${o}`}</p>)}
          <div className="acoes">
            <Cta href="#/mapa" variante="azul">VER MAPA →</Cta>
            <Cta href="#/emergencia" variante="vermelho">EMERGÊNCIA</Cta>
          </div>
        </section>

        <a className="card card--alertas" href="#/mapa">
          <h2 className="detalhes__titulo detalhes__titulo--menor">Últimos alertas</h2>
          {ULTIMOS_ALERTAS.map((a) => (
            <p key={a.hora} className="ultimo-alerta">{`${a.hora}  ·  ${a.situacao}`}<br />{a.texto}</p>
          ))}
          <Pill cor="seguro">SEM ALERTAS ATIVOS</Pill>
        </a>
      </div>

      <Nota />
    </>
  );
}

// 04 · Emergência
function Emergencia() {
  const dialogo = useRef(null);

  return (
    <>
      <section className="emergencia" aria-labelledby="emergencia-titulo">
        <Pill cor="alto">EMERGÊNCIA</Pill>
        <h1 id="emergencia-titulo" className="emergencia__titulo">Precisa de ajuda agora?</h1>
        <p className="emergencia__texto">
          Acione um canal de emergência e siga as instruções abaixo enquanto aguarda atendimento.
        </p>
        <button type="button" className="botao-ajuda" onClick={() => dialogo.current?.showModal()}>
          {"☎  PEDIR AJUDA"}
        </button>

        <svg className="escudo" viewBox="0 0 190 190" aria-hidden="true">
          <path d="M95 10 L165 36 V104 C165 142 135 172 95 184 C55 172 25 142 25 104 V36 Z" fill="#fbd1d4" />
          <rect x="86" y="50" width="18" height="72" rx="9" fill="#dc2626" />
          <circle cx="95" cy="147" r="9" fill="#dc2626" />
        </svg>
      </section>

      <section className="passos" aria-label="O que fazer">
        {PASSOS.map((p, i) => (
          <article key={p.titulo} className="card card--passo">
            <Pill cor="escuro">{i + 1}</Pill>
            <h2 className="passo__titulo">{p.titulo}</h2>
            <p className="passo__texto">{p.texto}</p>
          </article>
        ))}
      </section>

      <section className="contatos" aria-label="Contatos úteis">
        <p className="contatos__rotulo">Contatos úteis:</p>
        {CONTATOS.map((c) => (
          <a key={c.nome} className="contato" href={`tel:${c.numero}`}>
            <Pill cor={c.cor}>{c.nome} · {c.numero}</Pill>
          </a>
        ))}
        <Cta href="#/dicas">VER DICAS DE PREVENÇÃO →</Cta>
      </section>

      <Nota />

      {/* Extra além do protótipo: "Pedir ajuda" abre os telefones para ligar */}
      <dialog ref={dialogo} className="dialogo" aria-labelledby="dialogo-titulo">
        <h2 id="dialogo-titulo" className="dialogo__titulo">Ligue agora</h2>
        <p className="dialogo__texto">Escolha o serviço e diga a praia, o trecho e um ponto de referência.</p>
        <div className="dialogo__lista">
          {CONTATOS.map((c) => (
            <a key={c.nome} className={`cta cta--${c.cor} cta--grande`} href={`tel:${c.numero}`}>
              {c.nome} · {c.numero}
            </a>
          ))}
        </div>
        <button type="button" className="cta cta--claro" onClick={() => dialogo.current?.close()}>Fechar</button>
      </dialog>
    </>
  );
}

// 05 · Dicas
function Dicas() {
  return (
    <>
      <Pill cor="claro">PREVENÇÃO</Pill>
      <h1 className="titulo-pagina">Dicas rápidas para curtir a praia com segurança</h1>
      <p className="sub-pagina">
        Conteúdo simples e visual para orientar frequentadores antes e durante a permanência na orla.
      </p>

      <section className="dicas" aria-label="Dicas de segurança">
        {DICAS.map((d, i) => {
          const conteudo = (
            <>
              <Pill cor={d.perigo ? "alto" : "azul"}>{String(i + 1).padStart(2, "0")}</Pill>
              <h2 className="dica__titulo">{d.titulo}</h2>
              <p className="dica__texto">{d.texto}</p>
            </>
          );
          // só as dicas 1, 3 e 6 são clicáveis no protótipo
          return d.destino ? (
            <a key={d.titulo} className="card card--dica card--link" href={`#/${d.destino}`}>{conteudo}</a>
          ) : (
            <article key={d.titulo} className="card card--dica">{conteudo}</article>
          );
        })}
      </section>

      <Nota />

      <div className="acoes acoes--rodape">
        <Cta href="#/mapa" variante="azul">ABRIR MAPA DE RISCO →</Cta>
        <Cta href="#/emergencia" variante="vermelho">IR PARA EMERGÊNCIA</Cta>
      </div>
    </>
  );
}

/* ---------- 4) APP: navegação por hash (#/mapa, #/dicas...) ---------- */

const TELAS = { inicio: Inicio, mapa: Mapa, praias: DetalhesPraia, emergencia: Emergencia, dicas: Dicas };

const lerRota = () => {
  const rota = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return rota in TELAS ? rota : "inicio";
};

export default function App() {
  const [rota, setRota] = useState(lerRota);

  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota());
      window.scrollTo({ top: 0 }); // o protótipo volta ao topo a cada navegação
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  const Tela = TELAS[rota];

  return (
    // key={rota} reinicia o "dissolve" de 0,2 s a cada troca de tela
    <div className="tela" key={rota}>
      <Header rotaAtual={rota} />
      <Tela />
    </div>
  );
}
