import React, { useState } from 'react';
import { TERMS_OF_SERVICE } from '../data';
import { Language } from '../types';
import { Copy, Check, FileCode, Search, HelpCircle } from 'lucide-react';

interface TermsOfServiceViewProps {
  lang: Language;
  onNotify: (msg: string) => void;
}

export default function TermsOfServiceView({ lang, onNotify }: TermsOfServiceViewProps) {
  const terms = TERMS_OF_SERVICE[lang];
  const [copiedType, setCopiedType] = useState<'md' | 'html' | 'none'>('none');
  const [searchTerm, setSearchTerm] = useState('');

  const generateMarkdown = () => {
    let md = `# ${terms.title}\n\n`;
    md += `*${terms.lastUpdated}*\n\n`;
    md += `${terms.subtitle}\n\n`;
    
    terms.sections.forEach(sec => {
      md += `## ${sec.title}\n\n`;
      sec.elements.forEach(el => {
        md += `${el}\n\n`;
      });
    });
    
    return md;
  };

  const generateHTML = () => {
    let html = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>${terms.title}</title>\n</head>\n<body>\n`;
    html += `  <h1>${terms.title}</h1>\n`;
    html += `  <p><em>${terms.lastUpdated}</em></p>\n`;
    html += `  <p><strong>${terms.subtitle}</strong></p>\n`;
    
    terms.sections.forEach(sec => {
      html += `  <h2>${sec.title}</h2>\n`;
      sec.elements.forEach(el => {
        html += `  <p>${el}</p>\n`;
      });
    });
    
    html += `</body>\n</html>`;
    return html;
  };

  const handleCopy = (type: 'md' | 'html') => {
    const text = type === 'md' ? generateMarkdown() : generateHTML();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onNotify(`Termos de Uso copiado em formato ${type.toUpperCase()}!`);
    setTimeout(() => setCopiedType('none'), 2000);
  };

  const filteredSections = terms.sections.filter(sec => 
    sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.elements.some(el => el.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-brand-card/70 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 scroll-smooth glow-purple/10">
      {/* Header and Quick copy tools */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-brand-purple mb-1.5">
            <FileCode className="h-5 w-5" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Documentação Legal</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white">{terms.title}</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">{terms.lastUpdated}</p>
        </div>
      </div>

      {/* Internal Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input 
          type="text"
          placeholder={lang === 'pt' ? 'Pesquisar cláusulas dos termos...' : 'Search terms clauses...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#030914] text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-brand-purple outline-none transition-all placeholder:text-slate-500"
        />
      </div>

      {/* Terms Text Display */}
      <div className="space-y-6 text-slate-300 text-xs md:text-sm leading-relaxed max-h-[480px] overflow-y-auto pr-2 scroll-hidden border border-white/5 bg-[#030a16] rounded-xl p-4 md:p-6 shadow-inner">
        {filteredSections.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-mono text-xs">
            {lang === 'pt' ? 'Nenhuma seção encontrada contendo o termo pesquisado.' : 'No clauses found matching your search term.'}
          </div>
        ) : (
          filteredSections.map((sec, i) => (
            <div key={i} className="space-y-2 border-b border-white/5 pb-4 last:border-b-0 last:pb-0 font-sans">
              <h3 className="text-sm font-bold text-white font-display flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                <span>{sec.title}</span>
              </h3>
              <div className="space-y-1.5 pl-3.5">
                {sec.elements.map((el, j) => (
                  <p key={j} className="text-slate-400">
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
        {lang === 'pt' ? 'Contato para dúvidas legais:' : 'Legal issues contact email:'} <span className="text-brand-purple">maiconmafra04@gmail.com</span>
      </div>
    </div>
  );
}
