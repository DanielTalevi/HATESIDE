/* ---------- LOGOUT ---------- */
document.getElementById('sair').addEventListener('click', function () {
    window.location.href = "../index.html";
});

/* ---------- DADOS FAKE (protótipo) ---------- */
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const vendas = [
    { id: '#1042', cliente: 'Marina Souza',   canal: 'Loja virtual', valor: 389.90, status: 'pago' },
    { id: '#1041', cliente: 'Lucas Prado',    canal: 'Instagram',    valor: 149.00, status: 'pendente' },
    { id: '#1040', cliente: 'Camila Ribeiro', canal: 'WhatsApp',     valor: 520.50, status: 'pago' },
    { id: '#1039', cliente: 'Rafael Costa',   canal: 'Loja virtual', valor: 89.90,  status: 'cancelado' },
    { id: '#1038', cliente: 'Bianca Lima',    canal: 'Instagram',    valor: 274.00, status: 'pago' },
    { id: '#1037', cliente: 'Pedro Alves',    canal: 'WhatsApp',     valor: 199.90, status: 'pago' },
    { id: '#1036', cliente: 'Julia Martins',  canal: 'Loja virtual', valor: 640.00, status: 'pendente' },
];

const canais = [
    { nome: 'Loja virtual', desc: 'Site próprio',         vendas: 128, receita: 18450, pct: 52 },
    { nome: 'Instagram',    desc: 'Direct e anúncios',    vendas: 74,  receita: 9820,  pct: 28 },
    { nome: 'WhatsApp',     desc: 'Atendimento direto',   vendas: 47,  receita: 6310,  pct: 20 },
];

const serie = {
    7:  [1200, 1850, 1500, 2300, 1900, 2700, 3100],
    30: [900, 1100, 1000, 1400, 1250, 1600, 1500, 1900, 1700, 2100, 1800, 2300, 2000, 2500,
         2200, 2600, 2400, 2900, 2700, 3000, 2800, 3300, 3100, 3400, 3200, 3600, 3500, 3900, 3700, 4100],
};

/* ---------- RENDER ---------- */
function linhas(lista) {
    return lista.map(v => `
        <tr>
            <td>${v.id}</td><td>${v.cliente}</td><td>${v.canal}</td>
            <td>${brl(v.valor)}</td>
            <td><span class="tag ${v.status}">${v.status}</span></td>
        </tr>`).join('');
}

function renderKpis() {
    const k = [
        { t: 'Faturamento',  v: brl(34580), d: '▲ 12,4%', c: 'up' },
        { t: 'Vendas',       v: '249',      d: '▲ 8,1%',  c: 'up' },
        { t: 'Ticket médio', v: brl(138.87), d: '▼ 2,3%', c: 'down' },
        { t: 'Canais ativos', v: '3',       d: 'sem alteração', c: 'up' },
    ];
    document.getElementById('kpis').innerHTML = k.map(i =>
        `<div class="kpi"><small>${i.t}</small><strong>${i.v}</strong><span class="${i.c}">${i.d}</span></div>`
    ).join('');
}

function renderChart(dias) {
    const d = serie[dias], W = 600, H = 200, max = Math.max(...d) * 1.1;
    const pts = d.map((v, i) => [i * (W / (d.length - 1)), H - (v / max) * H]);
    const linha = pts.map(p => p.join(',')).join(' ');
    document.getElementById('chart').innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
            <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#00a388" stop-opacity=".45"/>
                <stop offset="1" stop-color="#00a388" stop-opacity="0"/>
            </linearGradient></defs>
            <polygon points="0,${H} ${linha} ${W},${H}" fill="url(#g)"/>
            <polyline points="${linha}" fill="none" stroke="#00d9b8" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
        </svg>`;
}

function renderCanais() {
    document.getElementById('canais-bar').innerHTML = canais.map(c => `
        <div class="bar-row">
            <div><span>${c.nome}</span><span>${c.pct}%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:${c.pct}%"></div></div>
        </div>`).join('');

    document.getElementById('canais-cards').innerHTML = canais.map(c => `
        <div class="canal-card">
            <h4>${c.nome}</h4><p>${c.desc}</p>
            <div class="num">${brl(c.receita)}</div>
            <small>${c.vendas} vendas</small>
        </div>`).join('');
}

renderKpis();
renderChart(30);
renderCanais();
document.getElementById('tb-recentes').innerHTML = linhas(vendas.slice(0, 4));
document.getElementById('tb-vendas').innerHTML = linhas(vendas);

document.getElementById('periodo').addEventListener('change', e => renderChart(e.target.value));
document.getElementById('busca').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.getElementById('tb-vendas').innerHTML =
        linhas(vendas.filter(v => (v.cliente + v.id).toLowerCase().includes(q)));
});

/* ---------- NAVEGAÇÃO DA SIDEBAR ---------- */
document.querySelectorAll('.sidebar [data-view]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('selecionado'));
        link.parentElement.classList.add('selecionado');
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        document.getElementById(link.dataset.view).classList.remove('hidden');
    });
});
