// Translation system for Stavanger Twin
// Supporting English, Swedish, and Norwegian for maximum accessibility

export type Language = 'en' | 'sv' | 'no';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    vote: string;
    dossiers: string;
    simulations: string;
    profile: string;
    transparency: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    search: string;
    filter: string;
    sort: string;
    view: string;
    report: string;
    verify: string;
    blockchain: string;
    offline: string;
    online: string;
  };
  
  // Homepage
  home: {
    title: string;
    subtitle: string;
    description: string;
    mapTitle: string;
    mapDescription: string;
    policyTitle: string;
    policyDescription: string;
    gamificationTitle: string;
    gamificationDescription: string;
    callToAction: string;
    callToActionButton: string;
  };
  
  // Voting
  vote: {
    title: string;
    subtitle: string;
    description: string;
    currentProposal: string;
    proposalDescription: string;
    deadline: string;
    voteYes: string;
    voteNo: string;
    submitVote: string;
    voteSubmitted: string;
    voteDescription: string;
    blockchainVerified: string;
    captchaRequired: string;
  };
  
  // Dossiers
  dossiers: {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    filterCorrupt: string;
    sortBy: string;
    corruptionScore: string;
    transparencyScore: string;
    voteRecord: string;
    forPeople: string;
    againstPeople: string;
    abstained: string;
    scandals: string;
    financial: string;
    declaredIncome: string;
    assets: string;
    suspiciousTransactions: string;
    lastUpdated: string;
    reportCorruption: string;
    viewDossier: string;
  };
  
  // Simulations
  simulations: {
    title: string;
    subtitle: string;
    description: string;
    timeline: string;
    impact: string;
    stakeholders: string;
    keyInsights: string;
    riskAssessment: string;
    economic: string;
    environmental: string;
    social: string;
    political: string;
    publicSupport: string;
    totalCost: string;
    expectedBenefit: string;
    roi: string;
    exportData: string;
    viewAnalysis: string;
  };
  
  // Profile
  profile: {
    title: string;
    subtitle: string;
    description: string;
    editProfile: string;
    quickStats: string;
    votesCast: string;
    reports: string;
    transparency: string;
    streak: string;
    interests: string;
    recentActivity: string;
    accountSettings: string;
    emailNotifications: string;
    publicProfile: string;
    dataSharing: string;
  };
  
  // Transparency
  transparency: {
    title: string;
    subtitle: string;
    description: string;
    totalRecords: string;
    verifiedRecords: string;
    corruptionExposed: string;
    transparencyScore: string;
    blockchainHealth: string;
    uptime: string;
    network: string;
    avgBlockTime: string;
    searchPlaceholder: string;
    allTypes: string;
    votes: string;
    corruptionReports: string;
    policyAnalysis: string;
    transparencyUpdates: string;
    blockchainHash: string;
    recordData: string;
    peoplesOath: string;
    peoplesOathText: string;
    exportAllRecords: string;
    generateReport: string;
    publicApi: string;
  };
  
  // Gamification
  gamification: {
    title: string;
    level: string;
    totalPoints: string;
    votingStreak: string;
    transparencyScore: string;
    allBadges: string;
    voting: string;
    transparency: string;
    corruption: string;
    community: string;
    achievement: string;
    unlockedOnly: string;
    showAll: string;
    requirement: string;
    unlocked: string;
    locked: string;
    achievementProgress: string;
    corruptionHunter: string;
    weeklyWarrior: string;
    transparencyGuardian: string;
  };
  
  // Offline
  offline: {
    title: string;
    subtitle: string;
    description: string;
    connectionRestored: string;
    noConnection: string;
    reconnect: string;
    retryConnection: string;
    offlineFeatures: string;
    voteOffline: string;
    viewCachedData: string;
    readReports: string;
    reportCorruption: string;
    availableActions: string;
    castVote: string;
    reportCorruption: string;
    viewDossiers: string;
    syncStatus: string;
    pendingVotes: string;
    pendingReports: string;
    lastSync: string;
    readyToSync: string;
    peoplesOath: string;
  };
  
  // People's Pulse
  pulse: {
    title: string;
    messages: string[];
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      vote: 'Vote',
      dossiers: 'Dossiers',
      simulations: 'Simulations',
      profile: 'Profile',
      transparency: 'Transparency'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      view: 'View',
      report: 'Report',
      verify: 'Verify',
      blockchain: 'Blockchain',
      offline: 'Offline',
      online: 'Online'
    },
    home: {
      title: 'Stavanger Twin: The People\'s Dashboard',
      subtitle: 'Exposing the system, empowering citizens. For the honor, not the glory.',
      description: 'Revolutionize democracy by empowering citizens and shaming corrupt politicians.',
      mapTitle: 'Stavanger: Vote & Sentiment Map',
      mapDescription: 'See where the people actually stand, unlike official polls.',
      policyTitle: 'Policy Outcome Simulations',
      policyDescription: 'Real data, not the \'alternative facts\' from the city council.',
      gamificationTitle: 'Citizen Engagement & Gamification',
      gamificationDescription: 'Because making democracy fun is a threat to the establishment.',
      callToAction: 'Ready to make a difference?',
      callToActionButton: 'Cast Your Vote Now!'
    },
    vote: {
      title: 'PEOPLE\'S VOTE',
      subtitle: 'Your voice matters. Cast your vote on critical issues affecting Stavanger.',
      description: 'Every vote is blockchain-verified and immutable.',
      currentProposal: 'Current Policy Proposal',
      proposalDescription: 'The city council proposes a 15% increase in public transport fares to cover operational costs.',
      deadline: 'Deadline: 24 hours left to vote!',
      voteYes: 'Vote YES',
      voteNo: 'Vote NO',
      submitVote: 'Submit Vote',
      voteSubmitted: 'Vote Submitted!',
      voteDescription: 'Your vote has been recorded on the blockchain and is immutable.',
      blockchainVerified: 'Your vote is secured by Polygon blockchain and protected by hCaptcha.',
      captchaRequired: 'Please complete the hCaptcha verification.'
    },
    dossiers: {
      title: 'POLITICIAN DOSSIERS',
      subtitle: 'Expose corruption, track voting records, and hold politicians accountable.',
      description: 'Every scandal is blockchain-verified and immutable.',
      searchPlaceholder: 'Search politicians, positions, or districts...',
      filterCorrupt: 'Show only corrupt politicians',
      sortBy: 'Sort by',
      corruptionScore: 'Corruption Score',
      transparencyScore: 'Transparency Score',
      voteRecord: 'Vote Record',
      forPeople: 'For People',
      againstPeople: 'Against People',
      abstained: 'Abstained',
      scandals: 'Scandals',
      financial: 'Financial',
      declaredIncome: 'Declared Income',
      assets: 'Assets',
      suspiciousTransactions: 'Suspicious Transactions',
      lastUpdated: 'Last updated',
      reportCorruption: 'Report Corruption',
      viewDossier: 'View Full Dossier'
    },
    simulations: {
      title: 'POLICY SIMULATIONS',
      subtitle: 'Visualize policy outcomes, track public sentiment, and expose the real impact.',
      description: 'Data-driven democracy in action.',
      timeline: 'Timeline',
      impact: 'Impact',
      stakeholders: 'Stakeholders',
      keyInsights: 'Key Insights',
      riskAssessment: 'Risk Assessment',
      economic: 'Economic',
      environmental: 'Environmental',
      social: 'Social',
      political: 'Political',
      publicSupport: 'Public Support',
      totalCost: 'Total Cost',
      expectedBenefit: 'Expected Benefit',
      roi: 'ROI',
      exportData: 'Export Data',
      viewAnalysis: 'View Detailed Analysis'
    },
    profile: {
      title: 'CITIZEN PROFILE',
      subtitle: 'Your digital democracy journey. Track your impact, earn badges, and fight for transparency.',
      description: 'Track your impact, earn badges, and fight for transparency.',
      editProfile: 'Edit Profile',
      quickStats: 'Quick Stats',
      votesCast: 'Votes Cast',
      reports: 'Reports',
      transparency: 'Transparency',
      streak: 'Streak',
      interests: 'Interests',
      recentActivity: 'Recent Activity',
      accountSettings: 'Account Settings',
      emailNotifications: 'Email Notifications',
      publicProfile: 'Public Profile',
      dataSharing: 'Data Sharing'
    },
    transparency: {
      title: 'TRANSPARENCY REPORT',
      subtitle: 'Blockchain-verified transparency. Every vote, every report, every decision is immutable.',
      description: 'No more hidden corruption.',
      totalRecords: 'Total Records',
      verifiedRecords: 'Verified Records',
      corruptionExposed: 'Corruption Exposed',
      transparencyScore: 'Transparency Score',
      blockchainHealth: 'Blockchain Health',
      uptime: 'Uptime',
      network: 'Network',
      avgBlockTime: 'Avg Block Time',
      searchPlaceholder: 'Search records, hashes, or descriptions...',
      allTypes: 'All Types',
      votes: 'Votes',
      corruptionReports: 'Corruption Reports',
      policyAnalysis: 'Policy Analysis',
      transparencyUpdates: 'Transparency Updates',
      blockchainHash: 'Blockchain Hash',
      recordData: 'Record Data',
      peoplesOath: 'People\'s Oath',
      peoplesOathText: 'We fight for the people, not the system. For the honor, not the glory. Every record is immutable, every decision is transparent, every voice matters.',
      exportAllRecords: 'Export All Records',
      generateReport: 'Generate Report',
      publicApi: 'Public API'
    },
    gamification: {
      title: 'Your Democracy Journey',
      level: 'Level',
      totalPoints: 'Total Points',
      votingStreak: 'Voting Streak',
      transparencyScore: 'Transparency Score',
      allBadges: 'All Badges',
      voting: 'Voting',
      transparency: 'Transparency',
      corruption: 'Corruption',
      community: 'Community',
      achievement: 'Achievement',
      unlockedOnly: 'Unlocked Only',
      showAll: 'Show All',
      requirement: 'Requirement',
      unlocked: 'Unlocked',
      locked: 'Locked',
      achievementProgress: 'Achievement Progress',
      corruptionHunter: 'Corruption Hunter',
      weeklyWarrior: 'Weekly Warrior',
      transparencyGuardian: 'Transparency Guardian'
    },
    offline: {
      title: 'You\'re Offline',
      subtitle: 'Don\'t worry! The democracy revolution continues even without internet.',
      description: 'Your actions are saved locally and will sync when you\'re back online.',
      connectionRestored: 'Connection restored!',
      noConnection: 'No internet connection',
      reconnect: 'Reconnect to Democracy',
      retryConnection: 'Retry Connection',
      offlineFeatures: 'Available Offline Features',
      voteOffline: 'Vote Offline',
      viewCachedData: 'View Cached Data',
      readReports: 'Read Transparency Reports',
      reportCorruption: 'Report Corruption',
      availableActions: 'Available Offline Actions',
      castVote: 'Cast Vote',
      reportCorruption: 'Report Corruption',
      viewDossiers: 'View Dossiers',
      syncStatus: 'Sync Status',
      pendingVotes: 'Pending Votes',
      pendingReports: 'Pending Reports',
      lastSync: 'Last Sync',
      readyToSync: 'Ready to sync when you take action',
      peoplesOath: 'The revolution doesn\'t stop when the internet goes down. We fight for the people, not the system. For the honor, not the glory.'
    },
    pulse: {
      title: 'People\'s Pulse',
      messages: [
        '82% voted NO on fees—Councilor X ignored YOU!',
        'Transparency index: 94% - We\'re watching, politicians!',
        'Blockchain verified: 1,247 votes for change!',
        'People\'s sentiment: 78% demand accountability!',
        'New policy proposal: 65% against, will the council listen?',
        'Stavanger citizens unite: Your voice is power!',
        'Shame corrupt politicians with blockchain-verified data!'
      ]
    }
  },
  
  sv: {
    nav: {
      home: 'Hem',
      vote: 'Rösta',
      dossiers: 'Dossierer',
      simulations: 'Simuleringar',
      profile: 'Profil',
      transparency: 'Transparens'
    },
    common: {
      loading: 'Laddar...',
      error: 'Fel',
      success: 'Framgång',
      cancel: 'Avbryt',
      save: 'Spara',
      edit: 'Redigera',
      delete: 'Ta bort',
      search: 'Sök',
      filter: 'Filtrera',
      sort: 'Sortera',
      view: 'Visa',
      report: 'Rapportera',
      verify: 'Verifiera',
      blockchain: 'Blockchain',
      offline: 'Offline',
      online: 'Online'
    },
    home: {
      title: 'Stavanger Twin: Folkets Dashboard',
      subtitle: 'Exponerar systemet, stärker medborgare. För äran, inte äran.',
      description: 'Revolutionsera demokratin genom att stärka medborgare och skämma ut korrupta politiker.',
      mapTitle: 'Stavanger: Röstande & Sentimentkarta',
      mapDescription: 'Se var folket verkligen står, till skillnad från officiella opinionsundersökningar.',
      policyTitle: 'Policyutfallssimuleringar',
      policyDescription: 'Riktiga data, inte \'alternativa fakta\' från stadsfullmäktige.',
      gamificationTitle: 'Medborgarengagement & Gamifiering',
      gamificationDescription: 'Eftersom att göra demokrati roligt är ett hot mot etablissemanget.',
      callToAction: 'Redo att göra skillnad?',
      callToActionButton: 'Rösta Nu!'
    },
    vote: {
      title: 'FOLKETS RÖST',
      subtitle: 'Din röst räknas. Rösta på kritiska frågor som påverkar Stavanger.',
      description: 'Varje röst är blockchain-verifierad och oföränderlig.',
      currentProposal: 'Aktuell Policyförslag',
      proposalDescription: 'Stadsfullmäktige föreslår en 15% ökning av kollektivtrafikavgifter för att täcka driftskostnader.',
      deadline: 'Deadline: 24 timmar kvar att rösta!',
      voteYes: 'Rösta JA',
      voteNo: 'Rösta NEJ',
      submitVote: 'Skicka Rösta',
      voteSubmitted: 'Rösta Skickad!',
      voteDescription: 'Din röst har registrerats på blockchain och är oföränderlig.',
      blockchainVerified: 'Din röst är säkrad av Polygon blockchain och skyddad av hCaptcha.',
      captchaRequired: 'Vänligen slutför hCaptcha-verifieringen.'
    },
    dossiers: {
      title: 'POLITIKERDOSSIERER',
      subtitle: 'Exponera korruption, spåra röstningsrekord och håll politiker ansvariga.',
      description: 'Varje skandal är blockchain-verifierad och oföränderlig.',
      searchPlaceholder: 'Sök politiker, positioner eller distrikt...',
      filterCorrupt: 'Visa endast korrupta politiker',
      sortBy: 'Sortera efter',
      corruptionScore: 'Korruptionspoäng',
      transparencyScore: 'Transparenspoäng',
      voteRecord: 'Röstningsrekord',
      forPeople: 'För Folket',
      againstPeople: 'Mot Folket',
      abstained: 'Avstod',
      scandals: 'Skandaler',
      financial: 'Finansiell',
      declaredIncome: 'Deklarerad Inkomst',
      assets: 'Tillgångar',
      suspiciousTransactions: 'Misstänkta Transaktioner',
      lastUpdated: 'Senast uppdaterad',
      reportCorruption: 'Rapportera Korruption',
      viewDossier: 'Visa Fullständig Dossier'
    },
    simulations: {
      title: 'POLICYSIMULERINGAR',
      subtitle: 'Visualisera policyutfall, spåra allmän opinion och exponera den verkliga påverkan.',
      description: 'Datadriven demokrati i aktion.',
      timeline: 'Tidslinje',
      impact: 'Påverkan',
      stakeholders: 'Intressenter',
      keyInsights: 'Nyckelinsikter',
      riskAssessment: 'Riskanalys',
      economic: 'Ekonomisk',
      environmental: 'Miljömässig',
      social: 'Social',
      political: 'Politisk',
      publicSupport: 'Allmän Stöd',
      totalCost: 'Total Kostnad',
      expectedBenefit: 'Förväntad Förmån',
      roi: 'ROI',
      exportData: 'Exportera Data',
      viewAnalysis: 'Visa Detaljerad Analys'
    },
    profile: {
      title: 'MEDBORGARPROFIL',
      subtitle: 'Din digitala demokratiresa. Spåra din påverkan, tjäna märken och kämpa för transparens.',
      description: 'Spåra din påverkan, tjäna märken och kämpa för transparens.',
      editProfile: 'Redigera Profil',
      quickStats: 'Snabbstatistik',
      votesCast: 'Röster Avgivna',
      reports: 'Rapporter',
      transparency: 'Transparens',
      streak: 'Serie',
      interests: 'Intressen',
      recentActivity: 'Senaste Aktivitet',
      accountSettings: 'Kontoinställningar',
      emailNotifications: 'E-postnotifieringar',
      publicProfile: 'Offentlig Profil',
      dataSharing: 'Datadelning'
    },
    transparency: {
      title: 'TRANSPARENSRAPPORT',
      subtitle: 'Blockchain-verifierad transparens. Varje röst, varje rapport, varje beslut är oföränderligt.',
      description: 'Ingen mer dold korruption.',
      totalRecords: 'Totala Poster',
      verifiedRecords: 'Verifierade Poster',
      corruptionExposed: 'Korruption Exponerad',
      transparencyScore: 'Transparenspoäng',
      blockchainHealth: 'Blockchainhälsa',
      uptime: 'Upptid',
      network: 'Nätverk',
      avgBlockTime: 'Genomsnittlig Blocktid',
      searchPlaceholder: 'Sök poster, hashar eller beskrivningar...',
      allTypes: 'Alla Typer',
      votes: 'Röster',
      corruptionReports: 'Korruptionsrapporter',
      policyAnalysis: 'Policyanalys',
      transparencyUpdates: 'Transparensuppdateringar',
      blockchainHash: 'Blockchain Hash',
      recordData: 'Postdata',
      peoplesOath: 'Folkets Ed',
      peoplesOathText: 'Vi kämpar för folket, inte systemet. För äran, inte äran. Varje post är oföränderlig, varje beslut är transparent, varje röst räknas.',
      exportAllRecords: 'Exportera Alla Poster',
      generateReport: 'Generera Rapport',
      publicApi: 'Offentlig API'
    },
    gamification: {
      title: 'Din Demokratiresa',
      level: 'Nivå',
      totalPoints: 'Totala Poäng',
      votingStreak: 'Röstningsserie',
      transparencyScore: 'Transparenspoäng',
      allBadges: 'Alla Märken',
      voting: 'Röstning',
      transparency: 'Transparens',
      corruption: 'Korruption',
      community: 'Gemenskap',
      achievement: 'Prestation',
      unlockedOnly: 'Endast Upplåsta',
      showAll: 'Visa Alla',
      requirement: 'Krav',
      unlocked: 'Upplåst',
      locked: 'Låst',
      achievementProgress: 'Prestationsframsteg',
      corruptionHunter: 'Korruptionsjägare',
      weeklyWarrior: 'Veckokrigare',
      transparencyGuardian: 'Transparensväktare'
    },
    offline: {
      title: 'Du är Offline',
      subtitle: 'Oroa dig inte! Demokratirevolutionen fortsätter även utan internet.',
      description: 'Dina handlingar sparas lokalt och synkroniseras när du är tillbaka online.',
      connectionRestored: 'Anslutning återställd!',
      noConnection: 'Ingen internetanslutning',
      reconnect: 'Återanslut till Demokrati',
      retryConnection: 'Försök Anslutning',
      offlineFeatures: 'Tillgängliga Offlinefunktioner',
      voteOffline: 'Rösta Offline',
      viewCachedData: 'Visa Cachad Data',
      readReports: 'Läs Transparensrapporter',
      reportCorruption: 'Rapportera Korruption',
      availableActions: 'Tillgängliga Offlineåtgärder',
      castVote: 'Rösta',
      reportCorruption: 'Rapportera Korruption',
      viewDossiers: 'Visa Dossierer',
      syncStatus: 'Synkroniseringsstatus',
      pendingVotes: 'Väntande Röster',
      pendingReports: 'Väntande Rapporter',
      lastSync: 'Senaste Synkronisering',
      readyToSync: 'Redo att synkronisera när du vidtar åtgärd',
      peoplesOath: 'Revolutionen stannar inte när internet går ner. Vi kämpar för folket, inte systemet. För äran, inte äran.'
    },
    pulse: {
      title: 'Folkets Puls',
      messages: [
        '82% röstade NEJ på avgifter—Rådman X ignorerade ER!',
        'Transparensindex: 94% - Vi bevakar, politiker!',
        'Blockchain verifierat: 1,247 röster för förändring!',
        'Folkets sentiment: 78% kräver ansvar!',
        'Nytt policyförslag: 65% emot, kommer rådet att lyssna?',
        'Stavanger medborgare förenas: Er röst är makt!',
        'Skäm ut korrupta politiker med blockchain-verifierad data!'
      ]
    }
  },
  
  no: {
    nav: {
      home: 'Hjem',
      vote: 'Stem',
      dossiers: 'Dossierer',
      simulations: 'Simuleringer',
      profile: 'Profil',
      transparency: 'Transparens'
    },
    common: {
      loading: 'Laster...',
      error: 'Feil',
      success: 'Suksess',
      cancel: 'Avbryt',
      save: 'Lagre',
      edit: 'Rediger',
      delete: 'Slett',
      search: 'Søk',
      filter: 'Filtrer',
      sort: 'Sorter',
      view: 'Vis',
      report: 'Rapporter',
      verify: 'Verifiser',
      blockchain: 'Blockchain',
      offline: 'Offline',
      online: 'Online'
    },
    home: {
      title: 'Stavanger Twin: Folkets Dashboard',
      subtitle: 'Eksponerer systemet, styrker borgere. For æren, ikke æren.',
      description: 'Revolusjoner demokratiet ved å styrke borgere og skamme ut korrupte politikere.',
      mapTitle: 'Stavanger: Stemme- og Sentimentkart',
      mapDescription: 'Se hvor folket virkelig står, i motsetning til offisielle meningsmålinger.',
      policyTitle: 'Politikkutfallssimuleringer',
      policyDescription: 'Ekte data, ikke \'alternative fakta\' fra bystyret.',
      gamificationTitle: 'Borgerengasjement og Gamifisering',
      gamificationDescription: 'Fordi å gjøre demokrati morsomt er en trussel mot etablissementet.',
      callToAction: 'Klar til å gjøre en forskjell?',
      callToActionButton: 'Stem Nå!'
    },
    vote: {
      title: 'FOLKETS STEMME',
      subtitle: 'Din stemme teller. Stem på kritiske saker som påvirker Stavanger.',
      description: 'Hver stemme er blockchain-verifisert og uforanderlig.',
      currentProposal: 'Gjeldende Politikkforslag',
      proposalDescription: 'Bystyret foreslår en 15% økning i kollektivtransportavgifter for å dekke driftskostnader.',
      deadline: 'Frist: 24 timer igjen å stemme!',
      voteYes: 'Stem JA',
      voteNo: 'Stem NEI',
      submitVote: 'Send Stemme',
      voteSubmitted: 'Stemme Sendt!',
      voteDescription: 'Din stemme har blitt registrert på blockchain og er uforanderlig.',
      blockchainVerified: 'Din stemme er sikret av Polygon blockchain og beskyttet av hCaptcha.',
      captchaRequired: 'Vennligst fullfør hCaptcha-verifiseringen.'
    },
    dossiers: {
      title: 'POLITIKERDOSSIERER',
      subtitle: 'Eksponer korrupsjon, spor stemmerekord og hold politikere ansvarlige.',
      description: 'Hver skandale er blockchain-verifisert og uforanderlig.',
      searchPlaceholder: 'Søk politikere, stillinger eller distrikter...',
      filterCorrupt: 'Vis kun korrupte politikere',
      sortBy: 'Sorter etter',
      corruptionScore: 'Korrupsjonspoeng',
      transparencyScore: 'Transparenspoeng',
      voteRecord: 'Stemmerekord',
      forPeople: 'For Folket',
      againstPeople: 'Mot Folket',
      abstained: 'Avstod',
      scandals: 'Skandaler',
      financial: 'Finansiell',
      declaredIncome: 'Deklarert Inntekt',
      assets: 'Eiendeler',
      suspiciousTransactions: 'Mistenkelige Transaksjoner',
      lastUpdated: 'Sist oppdatert',
      reportCorruption: 'Rapporter Korrupsjon',
      viewDossier: 'Vis Fullstendig Dossier'
    },
    simulations: {
      title: 'POLITIKKSIMULERINGER',
      subtitle: 'Visualiser politikkutfall, spor offentlig opinion og eksponer den virkelige påvirkningen.',
      description: 'Datadrevet demokrati i aksjon.',
      timeline: 'Tidslinje',
      impact: 'Påvirkning',
      stakeholders: 'Interessenter',
      keyInsights: 'Nøkkelinnsikter',
      riskAssessment: 'Risikovurdering',
      economic: 'Økonomisk',
      environmental: 'Miljømessig',
      social: 'Sosial',
      political: 'Politisk',
      publicSupport: 'Offentlig Støtte',
      totalCost: 'Total Kostnad',
      expectedBenefit: 'Forventet Fordel',
      roi: 'ROI',
      exportData: 'Eksporter Data',
      viewAnalysis: 'Vis Detaljert Analyse'
    },
    profile: {
      title: 'BORGERPROFIL',
      subtitle: 'Din digitale demokratireise. Spor din påvirkning, tjen merker og kjemp for transparens.',
      description: 'Spor din påvirkning, tjen merker og kjemp for transparens.',
      editProfile: 'Rediger Profil',
      quickStats: 'Hurtigstatistikk',
      votesCast: 'Stemmer Avgitt',
      reports: 'Rapporter',
      transparency: 'Transparens',
      streak: 'Serie',
      interests: 'Interesser',
      recentActivity: 'Nylig Aktivitet',
      accountSettings: 'Kontoinnstillinger',
      emailNotifications: 'E-postvarsler',
      publicProfile: 'Offentlig Profil',
      dataSharing: 'Datadeling'
    },
    transparency: {
      title: 'TRANSPARENSRAPPORT',
      subtitle: 'Blockchain-verifisert transparens. Hver stemme, hver rapport, hver beslutning er uforanderlig.',
      description: 'Ikke mer skjult korrupsjon.',
      totalRecords: 'Totale Poster',
      verifiedRecords: 'Verifiserte Poster',
      corruptionExposed: 'Korrupsjon Eksponert',
      transparencyScore: 'Transparenspoeng',
      blockchainHealth: 'Blockchainhelse',
      uptime: 'Oppetid',
      network: 'Nettverk',
      avgBlockTime: 'Gjennomsnittlig Blokktid',
      searchPlaceholder: 'Søk poster, hasher eller beskrivelser...',
      allTypes: 'Alle Typer',
      votes: 'Stemmer',
      corruptionReports: 'Korrupsjonsrapporter',
      policyAnalysis: 'Politikkanalyse',
      transparencyUpdates: 'Transparensoppdateringer',
      blockchainHash: 'Blockchain Hash',
      recordData: 'Postdata',
      peoplesOath: 'Folkets Ed',
      peoplesOathText: 'Vi kjemper for folket, ikke systemet. For æren, ikke æren. Hver post er uforanderlig, hver beslutning er transparent, hver stemme teller.',
      exportAllRecords: 'Eksporter Alle Poster',
      generateReport: 'Generer Rapport',
      publicApi: 'Offentlig API'
    },
    gamification: {
      title: 'Din Demokratireise',
      level: 'Nivå',
      totalPoints: 'Totale Poeng',
      votingStreak: 'Stemmeserie',
      transparencyScore: 'Transparenspoeng',
      allBadges: 'Alle Merker',
      voting: 'Stemming',
      transparency: 'Transparens',
      corruption: 'Korrupsjon',
      community: 'Fellesskap',
      achievement: 'Prestasjon',
      unlockedOnly: 'Kun Opplåste',
      showAll: 'Vis Alle',
      requirement: 'Krav',
      unlocked: 'Opplåst',
      locked: 'Låst',
      achievementProgress: 'Prestasjonsframgang',
      corruptionHunter: 'Korrupsjonsjeger',
      weeklyWarrior: 'Ukekriger',
      transparencyGuardian: 'Transparensvokter'
    },
    offline: {
      title: 'Du er Offline',
      subtitle: 'Ikke bekymre deg! Demokratirevolusjonen fortsetter selv uten internett.',
      description: 'Dine handlinger lagres lokalt og synkroniseres når du er tilbake online.',
      connectionRestored: 'Tilkobling gjenopprettet!',
      noConnection: 'Ingen internettilkobling',
      reconnect: 'Koble til Demokrati igjen',
      retryConnection: 'Prøv Tilkobling',
      offlineFeatures: 'Tilgjengelige Offlinefunksjoner',
      voteOffline: 'Stem Offline',
      viewCachedData: 'Vis Hurtiglagret Data',
      readReports: 'Les Transparensrapporter',
      reportCorruption: 'Rapporter Korrupsjon',
      availableActions: 'Tilgjengelige Offlinehandlinger',
      castVote: 'Stem',
      reportCorruption: 'Rapporter Korrupsjon',
      viewDossiers: 'Vis Dossierer',
      syncStatus: 'Synkroniseringsstatus',
      pendingVotes: 'Ventende Stemmer',
      pendingReports: 'Ventende Rapporter',
      lastSync: 'Siste Synkronisering',
      readyToSync: 'Klar til å synkronisere når du handler',
      peoplesOath: 'Revolusjonen stopper ikke når internett går ned. Vi kjemper for folket, ikke systemet. For æren, ikke æren.'
    },
    pulse: {
      title: 'Folkets Puls',
      messages: [
        '82% stemte NEI på avgifter—Rådmann X ignorerte DERE!',
        'Transparensindeks: 94% - Vi overvåker, politikere!',
        'Blockchain verifisert: 1,247 stemmer for endring!',
        'Folkets sentiment: 78% krever ansvar!',
        'Nytt politikkforslag: 65% imot, vil bystyret høre?',
        'Stavanger borgere forenes: Deres stemme er makt!',
        'Skam ut korrupte politikere med blockchain-verifisert data!'
      ]
    }
  }
};

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem('stavanger-twin-language') as Language;
  const browserLang = navigator.language.split('-')[0] as Language;
  
  return stored || (['en', 'sv', 'no'].includes(browserLang) ? browserLang : 'en');
}

export function setLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stavanger-twin-language', language);
  }
}
