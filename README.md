# Letramento Digital em Inteligência Artificial — Amazônia & Comunidade

Plataforma educacional completa do **Curso de Letramento Digital em Inteligência Artificial** para estudantes e comunidades de Belém do Pará, promovido por **PRODEPA**, **Instituto iSACI** e **IFPA**, com apoio do **Governo do Pará**. Material de autoria do **Prof. Dr. Bruno Duarte Gomes** (iSACI / SIMBIC – CCAD – UFPA), tutor do curso.

---

## 🚀 Estrutura da Landing Page & Design System

A interface e a landing page foram refinadas com base nas diretrizes da skill **`landing-page-design`**:

- **Arquitetura de Conversão & Valor:**
  - **Hero focado:** Proposta de valor clara (*"O futuro da inteligência artificial começa na Amazônia"*), sem distrações de CTAs concorrentes acima da dobra.
  - **Seção Manifesto / Tagline Reveal (B11):** Revelação progressiva palavra por palavra com curva física (`cubic-bezier(0.32,0.72,0,1)`).
  - **Problema & Solução:** 4 benefícios tangíveis orientados a resultados e números orgânicos.
  - **Passo a Passo Pedagógico:** Metodologia em 4 etapas (Desmistificar, Comandar com PACIF, Auditar Vieses e Construir Assistentes).
  - **Módulos do Curso:** Cards com raio aninhado (`inner radius = outer radius - gap`) e cores de fundo planas.
  - **Hub de Apostilas para Impressão:** 4 guias em páginas estáticas A4 prontas para salvar como PDF ou imprimir para estudo offline.
  - **Regras de Ouro:** as 4 regras de uso responsável repetidas em todas as apostilas (no lugar de depoimentos, que não constam do material oficial).
  - **FAQ em sanfona:** 8 perguntas abordando objeções reais (acesso pelo celular, gratuidade, ausência de código, etc.).
- **Regras Visuais Estritas:**
  - Tipografia: Família **Manrope** com **Geist Mono** para códigos e dados numéricos. Sem itálicos, sem pesos 900 ultra-negrito.
  - Escala de fontes estrita do Tailwind CSS.
  - Fundos planos em tons escuros regulados (`#181818`, `#1F1F1F`, `#272727`, `#131209`).
  - Gradiente linear da esquerda para a direita `#FFFFFF` → `#9B9B9B` aplicado exclusivamente no título do Hero.
  - Navbar fluida em ilha de vidro flutuante com animação fluida de menu hambúrguer para X.
  - Link de acessibilidade *"Pular para o conteúdo principal"* e página de erro 404 personalizada.

---

## 🌐 Publicação no GitHub Pages

O projeto foi totalmente adaptado para **Static Site Generation (SSG)** com Next.js 15:

- **Next.js Static Export:** Configurado com `output: 'export'` e `trailingSlash: true`.
- **Compatibilidade com Subcaminho:** Suporte automático a `basePath: '/letramento-digital-em-ia'` no GitHub Actions.
- **Prevenção de Erros Jekyll:** Arquivo `.nojekyll` configurado para permitir que os arquivos estáticos da pasta `_next/` sejam servidos sem restrições.
- **Apostilas 100% Estáticas:** Páginas dedicadas `/apostila/[id]` com diagramação de impressão A4 via CSS nativo (`window.print()`), eliminando qualquer necessidade de servidor Node.js ou rotas de API dinâmicas.
- **GitHub Actions CI/CD:** Fluxo automatizado em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) que compila e publica no GitHub Pages automaticamente a cada push nas branches `master` ou `main`.

### Como ativar o GitHub Pages no seu repositório:

1. Acesse o seu repositório no GitHub: `https://github.com/abner-lucas/letramento-digital-em-ia`
2. Vá em **Settings** > **Pages**.
3. Na seção **Build and deployment**, selecione **Source: GitHub Actions**.
4. Faça o `push` das alterações para o GitHub. A action executará o build e o deploy de forma 100% automatizada!

---

## 💻 Executando Localmente

### Pré-requisitos
- Node.js (versão 20+)
- npm

### Passos

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. Para gerar a build estática para o GitHub Pages:
   ```bash
   npm run build
   ```
   Os arquivos finais gerados estarão prontos na pasta `out/`.

---

## ✅ Conteúdo, testes e movimento

- **Fonte da verdade:** os textos seguem as apostilas oficiais em PDF, publicadas em [`public/apostilas/`](public/apostilas/) e oferecidas para download no site. Dados ainda não conferidos aparecem como `[conferir]`, como na apostila do Módulo 4.
- **Simulador "Guia Saúde Guamá":** as regras ficam em [`lib/guiaSaude.ts`](lib/guiaSaude.ts), na ordem da apostila (emergência → sofrimento/CVV 188 → violência 190/180 → dados pessoais → escopo → frase de recuo → base conferida). Rode `npm test` para validar os 4 testes obrigatórios.
- **Movimento:** entradas ao rolar, barra de progresso, cabeçalho que some ao descer, indicador lateral de seções e sumário que acompanha a leitura. Tudo respeita a preferência "reduzir movimento" do sistema.

