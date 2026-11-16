import QR from 'qrcode';

/**
 * QR code gerado no build (SVG estático, sem JavaScript no navegador),
 * para projetar na sala e os alunos abrirem o link pelo celular.
 */
export default async function QRCode({ url, rotulo, tamanho = 132 }: { url: string; rotulo: string; tamanho?: number }) {
  const svg = await QR.toString(url, { type: 'svg', margin: 1, color: { dark: '#0f172a', light: '#ffffff' } });
  return (
    <figure className="inline-flex flex-col items-center gap-2">
      <span
        role="img"
        aria-label={`QR code: ${rotulo}`}
        className="block rounded-xl bg-white p-2"
        style={{ width: tamanho, height: tamanho }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="max-w-[10rem] text-center text-[11px] leading-snug text-slate-400">{rotulo}</figcaption>
    </figure>
  );
}
