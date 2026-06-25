// All dashboard data extracted from mini-projet-14-salim.tex

// ─── KPIs Globaux ───────────────────────────────────────────────
export const globalKPIs = [
  { id: 'trs',       label: 'TRS Global',            value: 78.5, unit: '%', color: 'blue',   trend: +2.1, context: 'Disponibilité × Performance × Qualité' },
  { id: 'otd',       label: 'OTD Livraison',          value: 95.7, unit: '%', color: 'blue',   trend: +0.8, context: 'Livraisons à la date promise' },
  { id: 'rebut',     label: 'Taux de Rebut',          value: 1.8,  unit: '%', color: 'orange', trend: -0.9, context: 'Production mise au rebut' },
  { id: 'fournisseur', label: 'Service Fournisseur',  value: 91.5, unit: '%', color: 'blue',   trend: +1.2, context: 'Livraisons fournisseurs à temps' },
  { id: 'pdp',       label: 'Adhérence PDP',          value: 94.2, unit: '%', color: 'blue',   trend: +0.3, context: 'Réalisation du plan directeur' },
  { id: 'productivite', label: 'Productivité',        value: 92.3, unit: '%', color: 'blue',   trend: +1.5, context: 'Production réelle / standard' },
]

// ─── Production mensuelle ──────────────────────────────────────
export const productionMensuelle = [
  { mois: 'Janv.',  planifie: 820, realise: 795, rebuts: 15 },
  { mois: 'Févr.',  planifie: 780, realise: 760, rebuts: 12 },
  { mois: 'Mars',   planifie: 900, realise: 885, rebuts: 18 },
  { mois: 'Avr.',   planifie: 850, realise: 830, rebuts: 14 },
  { mois: 'Mai',    planifie: 920, realise: 910, rebuts: 10 },
  { mois: 'Juin',   planifie: 880, realise: 870, rebuts:  8 },
]

// ─── TRS par machine ───────────────────────────────────────────
export const trsMachines = [
  { machine: 'Emballeuse #5',    trs: 91, seuil: 85 },
  { machine: 'Scie CNC #1',      trs: 85, seuil: 85 },
  { machine: 'Ponceuse #2',      trs: 78, seuil: 85 },
  { machine: 'Assembleuse #3',   trs: 72, seuil: 85 },
  { machine: 'Cabine Vernis #4', trs: 68, seuil: 85 },
]

// ─── Statut des OF ─────────────────────────────────────────────
export const statutOF = [
  { name: 'En cours',    value: 33.3, color: '#6366F1' },
  { name: 'Terminé',     value: 33.3, color: '#10B981' },
  { name: 'Planifié',    value: 16.7, color: '#9CA3AF' },
  { name: 'En attente',  value: 16.7, color: '#F59E0B' },
]

// ─── Charge vs Capacité ────────────────────────────────────────
export const chargeCapacite = [
  { semaine: 'S1', charge: 87, capacite: 100 },
  { semaine: 'S2', charge: 92, capacite: 100 },
  { semaine: 'S3', charge: 78, capacite: 100 },
  { semaine: 'S4', charge: 95, capacite: 100 },
  { semaine: 'S5', charge: 88, capacite: 100 },
  { semaine: 'S6', charge: 82, capacite: 100 },
]

// ─── KPIs par processus ────────────────────────────────────────
export const kpisPlanification = [
  { label: 'Adhérence PDP',         value: 94.2, unit: '%', color: 'blue'   },
  { label: 'Taux couverture',        value: 97.8, unit: '%', color: 'blue'   },
  { label: 'Taux utilisation mach.', value: 87.0, unit: '%', color: 'blue'   },
  { label: 'Msg exception/semaine',  value: 5,    unit: '',  color: 'orange' },
]

export const kpisAchats = [
  { label: 'OTD Fournisseur',   value: 91.5, unit: '%',  color: 'blue'   },
  { label: 'Délai moyen livr.', value: 4.2,  unit: 'j',  color: 'blue'   },
  { label: 'Économies réalisées', value: 8.3, unit: '%',  color: 'orange' },
  { label: 'Conformité livr.',  value: 97.9, unit: '%',  color: 'blue'   },
]

export const kpisReception = [
  { label: 'Taux non-conformité', value: 2.1,  unit: '%', color: 'orange' },
  { label: 'Délai réception',     value: 1.8,  unit: 'h', color: 'blue'   },
  { label: 'Précision inventaire', value: 99.2, unit: '%', color: 'blue'  },
]

export const kpisOperations = [
  { label: 'TRS Global',       value: 78.5, unit: '%',  color: 'blue'   },
  { label: 'Taux de rebut',    value: 1.8,  unit: '%',  color: 'orange' },
  { label: 'Taux retouche',    value: 0.9,  unit: '%',  color: 'orange' },
  { label: 'Productivité',     value: 92.3, unit: '%',  color: 'blue'   },
  { label: 'Coût non-qualité', value: 3420, unit: '€/mois', color: 'orange' },
]

export const kpisLivraison = [
  { label: 'OTD Client',          value: 95.7, unit: '%', color: 'blue'   },
  { label: 'Erreur picking',      value: 0.3,  unit: '%', color: 'orange' },
  { label: 'Coût transport/unit', value: 12.5, unit: '€', color: 'blue'   },
  { label: 'Taux litiges client', value: 1.2,  unit: '%', color: 'orange' },
]

// ─── Tableau des processus (livrable principal) ────────────────
export const tableauProcessus = [
  // PLANIFICATION
  { processus: 'Planification', sous_processus: 'Élaboration PDP',       application: 'Module MPS (ERP)',             entrees: 'Prévisions ventes, commandes fermes, stocks', traitements: 'Agrégation demande, lissage charge',          sorties: 'Plan Directeur de Production validé',     kpi: 'Adhérence PDP: 94,2%', acteurs: 'Planificateur, Dir. Production' },
  { processus: 'Planification', sous_processus: 'Calcul Besoins (MRP)',   application: 'Module MRP (ERP)',             entrees: 'PDP, nomenclatures, stocks, délais',          traitements: 'Explosion BOM, calcul besoins bruts/nets',     sorties: 'OF suggérés, OA suggérés',                kpi: 'Couverture: 97,8%',    acteurs: 'Planificateur, ERP' },
  { processus: 'Planification', sous_processus: 'Ordonnancement',          application: 'Module APS / Ordonnancement', entrees: 'OF confirmés, disponibilité ressources',      traitements: 'Affectation postes, séquencement optimal',     sorties: 'Planning Gantt détaillé',                  kpi: 'Util. machines: 87%',  acteurs: 'Planificateur' },
  // ACHATS
  { processus: 'Achat',         sous_processus: 'Génération DA',           application: 'Module Achats (ERP)',          entrees: 'OA suggérés MRP, seuils réappro',             traitements: 'Création automatique/semi-auto DA',            sorties: 'Demandes d\'achat en attente validation',  kpi: 'Délai DA→BC: 1,2 j',   acteurs: 'Approvisionneur' },
  { processus: 'Achat',         sous_processus: 'Sélection fournisseur',   application: 'Module Achats + Référentiel',  entrees: 'Fichier fournisseurs, historique prix',        traitements: 'Appels d\'offres, scoring fournisseur',        sorties: 'Fournisseur sélectionné',                  kpi: 'Économies: 8,3%',      acteurs: 'Acheteur' },
  { processus: 'Achat',         sous_processus: 'Passation BC',            application: 'Module Achats (ERP)',          entrees: 'DA validée, fournisseur sélectionné',         traitements: 'Génération BC, envoi EDI, engagement',         sorties: 'BC signé, engagement comptable',           kpi: 'BC à temps: 96%',      acteurs: 'Acheteur, DAF' },
  { processus: 'Achat',         sous_processus: 'Suivi commandes',         application: 'Module Achats + Dashboard',    entrees: 'BC émis, accusés réception',                  traitements: 'Suivi avancement, alertes retards',            sorties: 'Tableau suivi, alertes',                   kpi: 'OTD fourn.: 91,5%',    acteurs: 'Approvisionneur' },
  // RÉCEPTION
  { processus: 'Réception',     sous_processus: 'Réception physique',      application: 'Module WMS (ERP)',             entrees: 'BC, avis expédition, BL fournisseur',         traitements: 'Scan code-barres, rapprochement BC',           sorties: 'Bon de réception, MAJ stocks',             kpi: 'Délai: 1,8 h',         acteurs: 'Magasinier' },
  { processus: 'Réception',     sous_processus: 'Contrôle Qualité entrant',application: 'Module QM',                    entrees: 'Bon réception, plan contrôle',                traitements: 'Saisie résultats, décision Accept/Refus',      sorties: 'Rapport QC, lot accepté/rebuté',           kpi: 'Taux NC: 2,1%',        acteurs: 'Responsable Qualité' },
  { processus: 'Réception',     sous_processus: 'Mise en stock',           application: 'Module WMS / Emplacements',    entrees: 'Articles acceptés, règles stockage',          traitements: 'Proposition emplacement (slotting)',           sorties: 'Mouvement stock enregistré',               kpi: 'Précision: 99,2%',     acteurs: 'Magasinier' },
  // OPÉRATIONS
  { processus: 'Opérations',    sous_processus: 'Lancement OF',            application: 'Module Production + MES',      entrees: 'OF confirmés, disponibilité matières',         traitements: 'Vérification ATP, libération OF',              sorties: 'OF lancé, fiche suiveuse',                 kpi: 'Lancement: 94%',       acteurs: 'Chef Atelier' },
  { processus: 'Opérations',    sous_processus: 'Suivi prod. temps réel',  application: 'MES (Manufacturing Exec.)',    entrees: 'Données machines IoT, déclarations opérat.', traitements: 'Collecte auto, calcul tps réel vs standard',   sorties: 'Dashboard production, rapport TRS',        kpi: 'TRS: 78,5%',           acteurs: 'MES, Opérateurs' },
  { processus: 'Opérations',    sous_processus: 'Contrôle Qualité en-cours',application: 'Module QM + MES',             entrees: 'Plans contrôle, tolérances',                  traitements: 'SPC, détection dérives, alertes',              sorties: 'Cartes contrôle, rapports NC',             kpi: 'Taux rebut: 1,8%',     acteurs: 'Resp. Qualité' },
  { processus: 'Opérations',    sous_processus: 'Clôture OF',              application: 'Module Production (ERP)',      entrees: 'Quantités produites, temps, matières',        traitements: 'Calcul coût réel vs standard',                 sorties: 'OF clôturé, entrée stock PF',              kpi: 'Écart coût: +2,1%',    acteurs: 'Planificateur, Comptable' },
  // LIVRAISON
  { processus: 'Livraison',     sous_processus: 'Préparation (Picking)',   application: 'Module WMS',                   entrees: 'Commande client, stock PF',                   traitements: 'Génération liste picking optimisée',           sorties: 'Articles prélevés par commande',           kpi: 'Erreur: 0,3%',         acteurs: 'Préparateur' },
  { processus: 'Livraison',     sous_processus: 'Emballage & Étiquetage',  application: 'Module WMS / Shipping',        entrees: 'Articles prélevés, instructions emballage',   traitements: 'Vérification, impression étiquettes',          sorties: 'Colis prêts, packing list',               kpi: 'Temps: 8 min/colis',   acteurs: 'Préparateur' },
  { processus: 'Livraison',     sous_processus: 'Expédition & Transport',  application: 'TMS + Module Ventes (ERP)',    entrees: 'Colis prêts, planning transporteurs',         traitements: 'Optimisation tournées, génération BL',         sorties: 'BL, facture, lettre de voiture',           kpi: 'OTD: 95,7%',           acteurs: 'Logisticien, Transporteur' },
  { processus: 'Livraison',     sous_processus: 'Traçabilité & POD',       application: 'TMS + Portail Client',         entrees: 'N° tracking, preuve livraison',               traitements: 'Suivi GPS temps réel, signature client',       sorties: 'POD signée, statut Livré',                kpi: 'Litiges: 1,2%',        acteurs: 'TMS, Client' },
]

// ─── Couleurs processus ────────────────────────────────────────
export const processColors: Record<string, string> = {
  'Planification': '#6366F1',
  'Achat':         '#F59E0B',
  'Réception':     '#14B8A6',
  'Opérations':    '#EC4899',
  'Livraison':     '#8B5CF6',
}

export const processLabels = ['Planification', 'Achat', 'Réception', 'Opérations', 'Livraison']
