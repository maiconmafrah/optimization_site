import { Language } from './types';

export interface PolicySection {
  title: string;
  elements: string[];
}

export const PRIVACY_POLICY: Record<Language, { title: string; subtitle: string; lastUpdated: string; sections: PolicySection[] }> = {
  pt: {
    title: 'Política de Privacidade — Optimization Boost',
    subtitle: 'Esta Política de Privacidade descreve como o aplicativo "Optimization Boost" (doravante denominado "Aplicativo"), desenvolvido por maiconmafra04@gmail.com, gerencia informações e dados dos usuários no sistema operacional Android.',
    lastUpdated: 'Atualizado em: 02 de Junho de 2026',
    sections: [
      {
        title: '1. Coleta de Dados e Processamento Local',
        elements: [
          'Nosso compromisso principal é com a privacidade do usuário. As principais funções do Aplicativo operam de forma estritamente local no dispositivo:',
          '• Métricas do Sistema (RAM, CPU, Armazenamento e Temperatura): Esses dados de hardware são processados exclusivamente na memória RAM volátil do seu próprio aparelho em tempo real, sem armazenamento externo.',
          '• Histórico de Uso de Jogos (Playtime): Para exibir o tempo de tela dos seus jogos no painel, o aplicativo lê estatísticas de uso locais através da permissão PACKAGE_USAGE_STATS. Esse processamento ocorre 100% de forma off-line no dispositivo.',
          '• Gravador de Tela e Áudio: Sob comando manual do usuário, o Aplicativo captura o vídeo da tela e o áudio do microfone (utilizando MediaProjection e RECORD_AUDIO). Os arquivos resultantes (MP4) são gravados diretamente no diretório escolhido pelo próprio usuário em seu aparelho, sem qualquer cópia ou transmissão externa.'
        ]
      },
      {
        title: '2. Uso do Serviço de VPN (VpnService)',
        elements: [
          'O recurso "Ping Booster" utiliza a API nativa VpnService do sistema Android para estabelecer uma conexão de rede local e configurar os servidores DNS públicos da Cloudflare (1.1.1.1 e 1.0.0.1).',
          '• Sem Intercepção de Tráfego: O serviço cria apenas um redirecionamento local para consultas DNS. O tráfego de dados e navegação em geral do usuário não passa por servidores externos nossos e não é interceptado, descriptografado ou modificado.',
          '• Privacidade Absoluta da Conexão: Não coletamos, monitoramos, armazenamos ou compartilhamos histórico de navegação, endereços IP externos ou dados transmitidos durante o uso deste recurso.'
        ]
      },
      {
        title: '3. Serviços de Terceiros e Anúncios (Google AdMob)',
        elements: [
          'Para fins de monetização e liberação de recursos adicionais, o Aplicativo integra o SDK do Google Mobile Ads (AdMob).',
          '• Identificadores Coletados: O SDK da Google pode ler o Identificador de Publicidade do Google (AD_ID), dados de rede (como IP) e telemetria de funcionamento para exibir anúncios (inclusive anúncios premiados).',
          '• Políticas da Google: O processamento dessas informações está sujeito à Política de Privacidade do Google Partners.'
        ]
      },
      {
        title: '4. Compartilhamento e Transferência de Dados',
        elements: [
          'O desenvolvedor não vende, não aluga e não compartilha dados pessoais ou de telemetria local dos usuários com terceiros. A transferência de metadados operacionais ocorre unicamente para o Google Mobile Ads, conforme descrito no item 3.'
        ]
      },
      {
        title: '5. Direitos do Usuário (LGPD / GDPR)',
        elements: [
          'Garantimos ao usuário o controle total sobre seus dados locais:',
          '• Exclusão de Gravações: Você pode apagar suas gravações de tela a qualquer momento na galeria de mídia do app ou pelo gerenciador de arquivos do celular.',
          '• Revogação de Permissões: Você pode revogar as permissões de gravação de áudio, monitoramento de aplicativos ou acesso à VPN nas configurações do sistema Android.',
          '• Suporte: Para dúvidas ou para solicitar a exclusão de qualquer e-mail enviado ao suporte, entre em contato via maiconmafra04@gmail.com.'
        ]
      },
      {
        title: '6. Privacidade Infantil',
        elements: [
          'O Aplicativo não coleta intencionalmente dados de identificação de crianças menores de 13 anos e está em total conformidade com as diretrizes da Google Play e a legislação de proteção infantil aplicável.'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'Our privacy terms explain how we protect your information.',
    lastUpdated: 'Last Updated: June 2, 2026',
    sections: [
      {
        title: '1. General Information and Google Play Store Compliance',
        elements: [
          'The "Optimization Boost" application (hereinafter referred to as the "App") was developed to optimize the user gaming experience and monitor the Android device system status.',
          'This Privacy Policy describes the guidelines regarding user privacy and data protection when using our service.',
          'Our absolute and fundamental commitment is respect for your privacy. We designed the App to work in complete alignment with the official Google Play Store guidelines and developer policies.'
        ]
      },
      {
        title: '2. User Data Collected',
        elements: [
          'Personal Information (Name and Email): On standard app functions, we do NOT ask, collect, or store any personally identifiable information from you.',
          'Contact / Support Data: If you choose to contact us or send a ticket using our embedded contact form or directly via support email, we collect your contact details (Name and Email) and the message you send. This data is voluntarily provided by you.',
          'Device Performance Metrics: The App processes real-time device metrics locally, such as active RAM consumption, battery temperature, device storage metrics, and active CPU usage. All processing occurs short-term in local memory.'
        ]
      },
      {
        title: '3. How Your Data is Used',
        elements: [
          'Performance Improvement: Device hardware metrics (RAM, CPU, temperature) are queried solely to trigger the instant mechanical optimizations selected by the user.',
          'Ticket Support Assistance: The name and email gathered inside the contact form or direct support inbox are used exclusively for responding to inquiries, clarifying system doubts, and providing personalized help.',
          'Interface Customization: Configured preferences (brightness, volume, user language, or recording aspect output formats) exist strictly to mold the local client experience.'
        ]
      },
      {
        title: '4. Data Sharing with Third Parties',
        elements: [
          'Zero Sharing Policy: We do NOT sell, license, trade, publish, or share user personal data with third parties under any circumstances.',
          'As an offline utility, we do not bundle tracking SDKs, third-party behavioral networks, or background scrapers.'
        ]
      },
      {
        title: '5. User Rights Regarding Their Data',
        elements: [
          'We guarantee user legal rights over data protection in full accordance with GDPR and LGPD standards:',
          '• Right to Access and Confirm: Users can request details on whether their support correspondence is held, and inspect support history.',
          '• Right to Deletion/Erasure: You can request permanent erasure of your support conversation history by sending a delete inquiry to our email.',
          '• Right to Correction: Users can request rectification of inaccurate contact info or emails.',
          '• Right to Withdraw Consent: Uninstalling the app acts as an immediate withdrawal of consent for all local system processes.'
        ]
      },
      {
        title: '6. System Permissions Required and Justifications',
        elements: [
          'To fulfill its legitimate optimization and recording functions, the App requests native Android permissions. All are managed with complete respect for privacy:',
          '• Storage / File Access: Required to save screen recording videos locally on your device according to your demand.',
          '• Notifications / Performance Monitor: Used exclusively to head up background optimization services or display and manage the recording status bar.',
          '• Screen Recorder / Media Capture (MediaProjection): Used strictly when the user manually initiates screen recording to capture gameplay. The output files are saved locally on the user-designated directory.'
        ]
      },
      {
        title: '7. "Ping Booster" Feature (DNS Configuration)',
        elements: [
          'The Ping Booster feature allows the user to locally and quickly configure the public DNS server from Cloudflare (1.1.1.1).',
          'This optimization is performed at the system level or via local network settings provided by the Android OS.',
          'The App does not act as an intermediate proxy, does not intercept your internet traffic, does not inspect your browsing history, and does not route or share any user network data.',
          'The user acknowledges and agrees that they are solely and exclusively responsible for all activities occurring over their network connection.'
        ]
      },
      {
        title: '8. Child Privacy',
        elements: [
          'The App does not target advertising or features to children under 13 years old. By having zero collection of personally identifiable information, it fully complies with COPPA and other international data privacy structures.'
        ]
      },
      {
        title: '9. Contact and Support Channels',
        elements: [
          'If you have any questions, suggestions, or requests regarding our local privacy practices or app operation, feel free to contact us through our official support channel:',
          'Direct Support Email: maiconmafra04@gmail.com'
        ]
      }
    ]
  }
};

export const TERMS_OF_SERVICE: Record<Language, { title: string; subtitle: string; lastUpdated: string; sections: PolicySection[] }> = {
  pt: {
    title: 'Termos de Uso — Optimization Boost',
    subtitle: 'Seja bem-vindo ao "Optimization Boost". Ao instalar, acessar ou utilizar nosso aplicativo em seu dispositivo Android, você concorda de forma integral com estes Termos de Uso.',
    lastUpdated: 'Atualizado em: 02 de Junho de 2026',
    sections: [
      {
        title: '1. Descrição dos Serviços locais',
        elements: [
          'O Aplicativo disponibiliza recursos locais para otimização e entretenimento no Android:',
          '• Monitoramento e Limpeza (Boost): Liberação de processos inativos na RAM do aparelho para melhorar a performance.',
          '• Game Launcher: Organização e inicialização direta de jogos instalados.',
          '• Gravador de Tela: Gravação local de vídeos de gameplay e áudio de microfone.',
          '• Ping Booster: Atalho local de configuração de DNS público (Cloudflare 1.1.1.1) para melhoria de tempo de resposta.'
        ]
      },
      {
        title: '2. Responsabilidades do Usuário',
        elements: [
          'O usuário compromete-se a utilizar o aplicativo de forma lícita, sendo estritamente vedado:',
          '• Realizar engenharia reversa, desmontar ou tentar extrair o código-fonte do aplicativo.',
          '• Utilizar o Gravador de Tela para capturar conteúdo ilícito, protegido por direitos autorais sem autorização ou que viole a privacidade de terceiros.',
          '• Utilizar a ferramenta para fins maliciosos ou para tentar interferir no funcionamento de redes e aparelhos de terceiros.'
        ]
      },
      {
        title: '3. Configurações de DNS e Tráfego Externo',
        elements: [
          'Ao utilizar o recurso "Ping Booster", o usuário compreende que a otimização ocorre apenas mediante alteração local das rotas DNS para a Cloudflare. O desenvolvedor não possui controle sobre a qualidade, estabilidade ou segurança das conexões fornecidas por suas operadoras de internet e não assume qualquer responsabilidade pelas atividades executadas pelo usuário sob a conexão ativa.'
        ]
      },
      {
        title: '4. Limitação de Responsabilidade',
        elements: [
          'O Aplicativo é fornecido "no estado em que se encontra". O desenvolvedor não se responsabiliza por:',
          '• Limitações físicas de hardware de dispositivos incompatíveis (ex: sobreaquecimentos ou oscilações de performance causados por rodar jogos pesados).',
          '• Perda de gravações de tela resultantes de formatações do aparelho ou exclusões acidentais pelo próprio usuário no sistema local.'
        ]
      },
      {
        title: '5. Propriedade Intelectual',
        elements: [
          'Todos os direitos intelectuais, marca, código de programação e design visual do aplicativo pertencem de forma exclusiva ao desenvolvedor (maiconmafra04@gmail.com). É concedida ao usuário apenas uma licença de uso pessoal, gratuita, não exclusiva e temporária.'
        ]
      },
      {
        title: '6. Legislação e Foro',
        elements: [
          'Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro do domicílio do usuário para dirimir eventuais litígios.'
        ]
      }
    ]
  },
  en: {
    title: 'Terms of Use',
    subtitle: 'Our terms of use define the rights and responsibilities when using our app.',
    lastUpdated: 'Last Updated: June 2, 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        elements: [
          'By downloading, installing, and using the "Optimization Boost" application, you signify that you have fully read and explicitly, irrevocably, and completely agree to abide by these Terms of Use.',
          'If you disagree with any of the rules listed here, do not install or immediately uninstall the application from your device.'
        ]
      },
      {
        title: '2. Description of the Offered Service',
        elements: [
          '"Optimization Boost" is a utility companion application that offers the following offline capabilities to Android users:',
          '• Hardware Monitoring Panel: Real-time queries for CPU loads, system temperature, and total free local storage.',
          '• Intelligent RAM Booster: Instant release of inactive RAM caches on voluntary commands.',
          '• Integrated Game Launcher: An easily accessible widget for organizing and starting custom user gameplay shortcuts.',
          '• Screen Recorder: Captures video and audio gameplays in mp4 format locally with custom resolution toggles.',
          '• Ping Booster DNS: Direct shortcut to adjust network DNS settings locally to route queries to Cloudflare Public DNS (1.1.1.1) for game latency optimization.'
        ]
      },
      {
        title: '3. Application Restrictions of Use',
        elements: [
          'Users agree to behave in absolute compliance with local laws and these Terms. The following actions are strictly PROHIBITED:',
          '• Reverse Engineering: Users cannot decompile, disassemble, modify, extract, or reverse-engineer the source code.',
          '• Illegal Distribution: Users cannot resell, sublicense, rent, or redistribute the app or its compiled assets unlawfully.',
          '• Abuse and Interruption: Hijacking device connections or utilizing the app to compromise network systems.',
          '• Infringement of Rights: Using the screen recorder to save pirate materials, copyrighted media, or violate third-party privacy.'
        ]
      },
      {
        title: '4. Intellectual Property Rights',
        elements: [
          'All copyrights, design components, mockups, logo representations, and interactive components associated with the app are the exclusive property of the developer (maiconmafra04@gmail.com).',
          'These terms grant a free, revocable, non-exclusive, personal license to use the app, and transmit no proprietary intellectual property deeds.'
        ]
      },
      {
        title: '5. Account and License Termination',
        elements: [
          'Offline State: The app is entirely self-contained and offline. It does not carry online register files or centralized database accounts.',
          'Termination by User: Users can terminate agreements at any individual time by removing the application and deleting generated files from storage.',
          'Termination by Developer: The developer stores the authority to limit or suspend active license usage instantly if any of these restriction clauses are violated.'
        ]
      },
      {
        title: '6. Disclaimer of Warranties',
        elements: [
          'Device Limitations: RAM release effects, battery heat ranges, and FPS parameters depend fully on user Android hardware capabilities. We do not guarantee hardware output beyond active physical limits.',
          'Network Toggles: The Ping Booster only directs network routes to Cloudflare Free Public DNS (1.1.1.1). We exercise zero authority over local cellular carriers, data speeds, or route downtime.',
          'Damages Limitation: The developer is not liable for data losses, native device thermal wearing under heavy gaming loads, or improper sharing of screen recording files.'
        ]
      },
      {
        title: '7. Jurisdiction and Governing Law',
        elements: [
          'These Terms are governed and construed under customer protection legislation and local internet regulatory civil acts.',
          'Any litigation or claim arising out of these Terms shall be resolved in the amicable legal forum closest to the user.'
        ]
      }
    ]
  }
};

export const DATA_SAFETY: Record<Language, { title: string; subtitle: string; tableHeaders: string[]; items: { type: string; purpose: string; status: string }[] }> = {
  pt: {
    title: 'Segurança dos Dados (Tabela de Requisitos Play Store)',
    subtitle: 'Detalhamento do comportamento do app conforme exigido no preenchimento do formulário de Segurança de Dados do Google Play Console.',
    tableHeaders: ['Tipo de Dado', 'Propósito da Coleta', 'Status de Envio/Transmissão'],
    items: [
      {
        type: 'Informações Pessoais (Nome, E-mail)',
        purpose: 'Nenhum',
        status: 'Não Coletado / Não Compartilhado'
      },
      {
        type: 'Uso do Aparelho (RAM, CPU, Temperatura)',
        purpose: 'Otimização e Monitoramento em tempo real',
        status: 'Processado LOCALMENTE (Nunca sai do dispositivo)'
      },
      {
        type: 'Vídeos de Gravação de Tela',
        purpose: 'Salvar gameplays sob demanda do usuário',
        status: 'Salvo em pasta local do usuário (Sem envio à nuvem)'
      },
      {
        type: 'Tráfego de Rede (DNS)',
        purpose: 'Melhorar latência de Ping Booster',
        status: 'Configuração estritamente local de IP 1.1.1.1 (Sem coleta)'
      },
      {
        type: 'Identificadores de Dispositivo',
        purpose: 'Nenhum',
        status: 'Não coletado'
      }
    ]
  },
  en: {
    title: 'Data Safety (Google Play Console Requirements Table)',
    subtitle: 'Breakdown of app behavior mapping directly to the Google Play Store Data Safety details.',
    tableHeaders: ['Data Type', 'Functional Purpose', 'Collection & Transmission Status'],
    items: [
      {
        type: 'Personal Information (Name, Email)',
        purpose: 'None',
        status: 'Not Collected / Not Shared'
      },
      {
        type: 'Metrics (RAM, CPU, Temperature)',
        purpose: 'Real-time monitoring and RAM clearing',
        status: 'Processed LOCALLY (Never leaves the device)'
      },
      {
        type: 'Screen Recording Videos',
        purpose: 'Save gameplays on user selection',
        status: 'Saved to local user directory (No cloud upload)'
      },
      {
        type: 'User Network Traffic (DNS)',
        purpose: 'Lower ping latencies globally',
        status: 'Zero network logs saved. Directly configures 1.1.1.1'
      },
      {
        type: 'Device IDs',
        purpose: 'None',
        status: 'Not Collected'
      }
    ]
  }
};
