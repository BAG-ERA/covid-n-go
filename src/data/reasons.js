/* eslint-disable no-multi-str */
const reasons = [
  {
    icon: 'work.svg',
    name: 'travail',
    description: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnele ou un \
    établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, \
    déplacements pour un concours ou un examen.',
    shortdescription: '1. Travail ou formation. Déplacements pour un concours ou un examen.',
  }, {
    icon: 'shop.svg',
    name: 'achats',
    description: 'Déplacements pour effectuer des achats de fournitures nécessaires à l\'activité professionnelle,\
     des achats de première nécessité dans des établissements dont les activités demeurent autorisées, \
     le retrait de commande et les livraisons à domicile.',
    shortdescription: '2. Effectuer des achats nécessaires à l\'activité professionnelle ou de première nécessité. ',
  }, {
    icon: 'child.svg',
    name: 'enfants',
    description: 'Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires',
    shortdescription: '3. Chercher les enfants à l’école.',
  }, {
    icon: 'hangout.svg',
    name: 'sport_animaux',
    description: 'Déplacements brefs, dans la limite d\'une heure quotidienne et dans un rayon maximal \
    d\'un kilomètre autour du domicile, liés soit à l\'activité physique individuelle des personnes, à l\'\
    exclusion de toute pratique sportive collective et de toute proximité avec d\'autres personnes, soit à \
    la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux \
    de compagnie.',
    shortdescription: '4. Activité physique individuelle et besoins des animaux de compagnie, dans la limite de \
    3h et et dans un rayon maximal de 20Km',
  }, {
    icon: 'family.svg',
    name: 'famille',
    description: 'Déplacements pour motif familial impérieux, pour l\'assistance aux personnes \
    vulnérables et précaires ou la garde d\'enfants.',
    shortdescription: '5. Motif familial impérieux, pour l\'assistance aux personnes \
    vulnérables et précaires ou la garde d\'enfants.',
  }, {
    icon: 'handicap.svg',
    name: 'handicap',
    description: 'Déplacement des personnes en situation de handicap et leur accompagnant.',
    shortdescription: '6. Déplacement des personnes en situation de handicap et leur accompagnant.',
  }, {
    icon: 'doctor.svg',
    name: 'sante',
    description: 'Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.',
    shortdescription: '7. Consultations, examens, soins,  et l’achat de médicaments.',
  }, {
    icon: 'legal.svg',
    name: 'convocation',
    description: 'Convocation judiciaire ou administrative et pour se rendre dans un service public',
    shortdescription: '8. Convocation judiciaire ou administrative.',
  }, {
    icon: 'tig.svg',
    name: 'missions',
    description: 'Participation à des missions d\'intérêt général sur demande de l\'autorité administrative',
    shortdescription: '9. Participation à des missions d\'intérêt général.',
  },
];

export default reasons;
