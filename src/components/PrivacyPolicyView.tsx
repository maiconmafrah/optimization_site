import React, { useState } from 'react';
import { PRIVACY_POLICY } from '../data';
import { Language } from '../types';
import { Copy, Check, Download, ShieldCheck, FileText, Search } from 'lucide-react';

interface PrivacyPolicyViewProps {
  lang: Language;
  onNotify: (msg: string) => void;
}

export default function PrivacyPolicyView({ lang, onNotify }: PrivacyPolicyViewProps) {
  const policy = PRIVACY_POLICY[lang];
  const [copiedType, setCopiedType] = useState<'md' | 'html' | 'none'>('none');
  const [searchTerm, setSearchTerm] = useState('');

  // Generates Markdown for copying
  const generateMarkdown = () => {
    let md = `# ${policy.title}\n\n`;
    md += `*${policy.lastUpdated}*\n\n`;
    md += `${policy.subtitle}\n\n`;
    
    policy.sections.forEach(sec => {
      md += `## ${sec.title}\n\n`;
      sec.elements.forEach(el => {
        md += `${el}\n\n`;
      });
    });
    
    return md;
  };

  // Generates HTML for copying
  const generateHTML = () => {
    let html = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>${policy.title}</title>\n</head>\n<body>\n`;
    html += `  <h1>${policy.title}</h1>\n`;
    html += `  <p><em>${policy.lastUpdated}</em></p>\n`;
    html += `  <p><strong>${policy.subtitle}</strong></p>\n`;
    
    policy.sections.forEach(sec => {
      html += `  <h2>${sec.title}</h2>\n`;
      sec.elements.forEach(el => {
        if (el.startsWith('•')) {
          html += `  <p><strong>${el}</strong></p>\n`;
        } else {
          html += `  <p>${el}</p>\n`;
        }
      });
    });
    
    html += `</body>\n</html>`;
    return html;
  };

  const handleCopy = (type: 'md' | 'html') => {
    const text = type === 'md' ? generateMarkdown() : generateHTML();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onNotify(`Política de privacidade copiada em formato ${type.toUpperCase()}!`);
    setTimeout(() => setCopiedType('none'), 2000);
  };

  const handleDownload = () => {
    const text = generateMDFile();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `privacidade_optimization_boost_${lang}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify('Download do arquivo privacidade.md iniciado!');
  };

  const generateMDFile = () => generateMarkdown();

  // Filter sections by search term
  const filteredSections = policy.sections.filter(sec => 
    sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.elements.some(el => el.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-brand-card/70 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 scroll-smooth glow-cyan/10">
      {/* Header and Quick copy tools */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-brand-cyan mb-1.5">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Documentação Play Store</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white">{policy.title}</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">{policy.lastUpdated}</p>
        </div>
      </div>

      {/* Internal Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input 
          type="text"
          placeholder={lang === 'pt' ? 'Pesquisar cláusulas da política...' : 'Search policy clauses...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#030914] text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-brand-cyan outline-none transition-all placeholder:text-slate-500"
        />
      </div>

      {/* Policy Text Display */}
      <div className="space-y-6 text-slate-300 text-xs md:text-sm leading-relaxed max-h-[480px] overflow-y-auto pr-2 scroll-hidden border border-white/5 bg-[#030a16] rounded-xl p-4 md:p-6 shadow-inner">
        {filteredSections.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-mono text-xs">
            {lang === 'pt' ? 'Nenhuma seção encontrada contendo o termo pesquisado.' : 'No clauses found matching your search term.'}
          </div>
        ) : (
          filteredSections.map((sec, i) => (
            <div key={i} className="space-y-2 border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-sm font-bold text-white font-display flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                <span>{sec.title}</span>
              </h3>
              <div className="space-y-1.5 pl-3.5 font-sans">
                {sec.elements.map((el, j) => (
                  <p key={j} className={el.startsWith('•') ? 'text-cyan-300/90 font-mono font-semibold py-0.5' : 'text-slate-400'}>
                    {el}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer support prompt */}
      <div className="text-center text-[11px] text-slate-500 font-mono pt-2">
        {lang === 'pt' ? 'Responsável Legal pela publicação:' : 'Entity owner of publication:'} <span className="text-cyan-400">maiconmafra04@gmail.com</span>
      </div>
    </div>
  );
}
