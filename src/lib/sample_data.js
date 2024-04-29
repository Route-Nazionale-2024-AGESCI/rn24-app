const events = [
  {
    uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f", // required
    created_at: "2019-08-24T14:15:22Z", // required
    name: "Essere felici oggi", // required
    location: "9c73e1ae-f8fb-4d06-a835-dfd7518cc8a4", // required
    is_registration_required: true,
    registration_limit: 2147483647,
    registration_limit_from_same_scout_group: 2147483647,
    starts_at: "2019-08-24T14:15:22Z", // required
    ends_at: "2019-08-24T14:15:22Z", // required
    registrations_open_at: "2019-08-24T14:15:22Z",
    registrations_close_at: "2019-08-24T14:15:22Z",
    kind: "SGUARDI", // required
  },
  {
    uuid: "e781a2e9-5c08-4925-b39e-29517894fb8a",
    created_at: "2024-04-19T10:00:00Z",
    name: "Camminata al chiaro di luna",
    location: "23afda6f-56ef-4c12-9612-7ee2a104a73a",
    is_registration_required: true,
    registration_limit: 30,
    registration_limit_from_same_scout_group: 5,
    starts_at: "2024-08-23T20:00:00Z",
    ends_at: "2024-08-24T02:00:00Z",
    registrations_open_at: "2024-07-23T08:00:00Z",
    registrations_close_at: "2024-08-20T23:59:59Z",
    kind: "INCONTRI",
  },
  {
    uuid: "bc0ae1a2-9c14-4b32-8b07-89ad62e90a76",
    created_at: "2024-04-19T11:15:00Z",
    name: "Esplorazione dei sentieri",
    location: "23afda6f-56ef-4c12-9612-7ee2a104a73a",
    is_registration_required: false,
    registration_limit: null,
    registration_limit_from_same_scout_group: null,
    starts_at: "2024-08-24T10:00:00Z",
    ends_at: "2024-08-24T16:00:00Z",
    registrations_open_at: null,
    registrations_close_at: null,
    kind: "TRACCE",
  },
  {
    uuid: "10a33e45-2b7f-4d4a-8ee0-5c2f1fe2a49b",
    created_at: "2024-04-19T12:30:00Z",
    name: "Giornata di sfide",
    location: "cf13c07d-38c8-415b-b3ef-c786d8ec5ff5",
    is_registration_required: true,
    registration_limit: 50,
    registration_limit_from_same_scout_group: 10,
    starts_at: "2024-08-25T09:00:00Z",
    ends_at: "2024-08-25T17:00:00Z",
    registrations_open_at: "2024-07-25T08:00:00Z",
    registrations_close_at: "2024-08-22T23:59:59Z",
    kind: "CONFRONTI",
  },

  {
    uuid: "9e9a10e6-bd94-493a-b36e-8af0cbfd4a94",
    created_at: "2024-04-19T13:45:00Z",
    name: "Esplorazione delle rovine antiche",
    location: "2aeb2a9d-4e8e-47d1-ba55-7a1de6368483",
    is_registration_required: true,
    registration_limit: 20,
    registration_limit_from_same_scout_group: 3,
    starts_at: "2024-08-22T10:00:00Z",
    ends_at: "2024-08-22T14:00:00Z",
    registrations_open_at: "2024-07-22T08:00:00Z",
    registrations_close_at: "2024-08-20T23:59:59Z",
    kind: "SGUARDI",
  },
  {
    uuid: "cb94a8cc-9e4a-4a5a-8f4f-97b7e8c3fc52",
    created_at: "2024-04-19T15:00:00Z",
    name: "Caccia al tesoro notturna",
    location: "cf13c07d-38c8-415b-b3ef-c786d8ec5ff5",
    is_registration_required: false,
    registration_limit: null,
    registration_limit_from_same_scout_group: null,
    starts_at: "2024-08-23T21:00:00Z",
    ends_at: "2024-08-24T01:00:00Z",
    registrations_open_at: null,
    registrations_close_at: null,
    kind: "INCONTRI",
  },
  {
    uuid: "84d46a1d-5ad8-4b2d-a2e7-0c6cbb0dcd09",
    created_at: "2024-04-19T16:15:00Z",
    name: "Concorso di abilità scout",
    location: "7e9141e2-3b91-4d0f-bcf7-2f6bb7319149",
    is_registration_required: true,
    registration_limit: 40,
    registration_limit_from_same_scout_group: 8,
    starts_at: "2024-08-25T08:00:00Z",
    ends_at: "2024-08-25T12:00:00Z",
    registrations_open_at: "2024-07-25T08:00:00Z",
    registrations_close_at: "2024-08-22T23:59:59Z",
    kind: "TRACCE",
  },
  {
    uuid: "dab87521-4f76-4155-9a76-3542b1bf99a6",
    created_at: "2024-04-19T17:30:00Z",
    name: "Festa finale dell'estate",
    location: "9c73e1ae-f8fb-4d06-a835-dfd7518cc8a4",
    is_registration_required: false,
    registration_limit: null,
    registration_limit_from_same_scout_group: null,
    starts_at: "2024-08-25T18:00:00Z",
    ends_at: "2024-08-25T22:00:00Z",
    registrations_open_at: null,
    registrations_close_at: null,
    kind: "CONFRONTI",
  },
];

const invitations = [
  { uuid: events[0].uuid },
  { uuid: events[3].uuid },
  { uuid: events[4].uuid },
];

const registrations = [
  { uuid: events[1].uuid, is_personal: true },
  { uuid: events[2].uuid, is_personal: false },
  { uuid: events[4].uuid, is_personal: true },
];

const locations = [
  {
    uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
    created_at: "2019-08-24T14:15:22Z",
    name: "string",
    coords: {
      type: "Point",
      coordinates: [12.9721, 77.5933],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [0, 0],
          [0, 50],
          [50, 50],
          [50, 0],
          [0, 0],
        ],
      ],
    },
  },

  {
    uuid: "2aeb2a9d-4e8e-47d1-ba55-7a1de6368483",
    created_at: "2024-04-19T16:15:00Z",
    name: "Cascate Segrete",
    coords: {
      type: "Point",
      coordinates: [47.0517, 15.4521],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [47.051, 15.451],
          [47.051, 15.453],
          [47.053, 15.453],
          [47.053, 15.451],
          [47.051, 15.451],
        ],
      ],
    },
  },
  {
    uuid: "cf13c07d-38c8-415b-b3ef-c786d8ec5ff5",
    created_at: "2024-04-19T17:30:00Z",
    name: "Riserva Selvaggia",
    coords: {
      type: "Point",
      coordinates: [51.1657, 10.4515],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [51.165, 10.451],
          [51.165, 10.453],
          [51.167, 10.453],
          [51.167, 10.451],
          [51.165, 10.451],
        ],
      ],
    },
  },
  {
    uuid: "7e9141e2-3b91-4d0f-bcf7-2f6bb7319149",
    created_at: "2024-04-19T10:00:00Z",
    name: "Bosco dell'Avventura",
    coords: {
      type: "Point",
      coordinates: [45.4642, 9.19],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [45.463, 9.189],
          [45.463, 9.191],
          [45.465, 9.191],
          [45.465, 9.189],
          [45.463, 9.189],
        ],
      ],
    },
  },
  {
    uuid: "23afda6f-56ef-4c12-9612-7ee2a104a73a",
    created_at: "2024-04-19T13:45:00Z",
    name: "Monte Avventura",
    coords: {
      type: "Point",
      coordinates: [41.9028, 12.4964],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [41.902, 12.496],
          [41.902, 12.497],
          [41.903, 12.497],
          [41.903, 12.496],
          [41.902, 12.496],
        ],
      ],
    },
  },
  {
    uuid: "9c73e1ae-f8fb-4d06-a835-dfd7518cc8a4",
    created_at: "2024-04-19T08:00:00Z",
    name: "Piano del Tramonto",
    coords: {
      type: "Point",
      coordinates: [45.4467, 9.18],
    },
    polygon: {
      type: "Polygon",
      coordinates: [
        [
          [45.446, 9.179],
          [45.446, 9.181],
          [45.448, 9.181],
          [45.448, 9.179],
          [45.446, 9.179],
        ],
      ],
    },
  },
];

const pages = [
  {
    uuid: "1dd5d7b5-7daa-44a4-a54c-e49560e6153c",
    created_at: "2024-04-21T00:43:04.716870+02:00",
    title: "RN24",
    slug: "",
    body: '\n\n<h1>RN24</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n\n\n<p>torna a: <a href="None">Root</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n    <li><a href="/pages/">Eventi</a></li>\n    \n\n</ul>\n\n',
    children: [
      {
        uuid: "7854e9fe-fa67-4b9a-b494-54cc955e5caf",
        created_at: "2024-04-21T00:43:04.726952+02:00",
        title: "Eventi",
        slug: "",
        body: '\n\n<h1>Eventi</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\neventi\n\n<p>torna a: <a href="/pages/">RN24</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n    <li><a href="/pages/tavola-rotonda/">Tavola rotonda</a></li>\n    \n    <li><a href="/pages/workshop-sui-nodi/">workshop sui nodi</a></li>\n    \n    <li><a href="/pages/piero-il-marinaio/">Piero il marinaio</a></li>\n    \n    <li><a href="/pages/avvertenze-nodi/">Avvertenze nodi</a></li>\n    \n\n</ul>\n\n',
        children: [
          {
            uuid: "3198cbd2-9c65-4365-b157-6e89cdf5c0ae",
            created_at: "2024-04-21T00:44:04.039798+02:00",
            title: "Tavola rotonda",
            slug: "tavola-rotonda",
            body: '\n\n<h1>Tavola rotonda</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n\n\n<p>torna a: <a href="/pages/">Eventi</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n\n</ul>\n\n',
            children: [],
          },
          {
            uuid: "d351b4b5-732d-4cc7-aaa7-dd54413f5e0a",
            created_at: "2024-04-22T18:59:56.147496+02:00",
            title: "workshop sui nodi",
            slug: "workshop-sui-nodi",
            body: '\n\n<h1>workshop sui nodi</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n<h3 data-block-key="m4o0d">asdlakjsdlkajsd</h3><ol><li data-block-key="dl545">123</li></ol><p data-block-key="194ca"></p><p data-block-key="apkso"></p><p data-block-key="cfgpu"></p><hr/><p data-block-key="3iapa"></p>\n\n<p>torna a: <a href="/pages/">Eventi</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n\n</ul>\n\n',
            children: [],
          },
          {
            uuid: "42cdfec7-1ede-4223-ad8c-51924cbee23a",
            created_at: "2024-04-29T11:06:32.347000+02:00",
            title: "Piero il marinaio",
            slug: "piero-il-marinaio",
            body: '\n\n<h1>Piero il marinaio</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n<h2 data-block-key="ua8u9">Come fare una gassa perfetta</h2><p data-block-key="34c9k">Piero il marinaio è un grande maestro nella conduzione di barche a vela e ci insegnerà tutti i segreti per maneggiare una cima. Parteciperà all\'evento <a href="/pages/workshop-sui-nodi/">workshop sui nodi</a>.</p><p data-block-key="36cj0"></p><hr/><h3 data-block-key="1m9n5">Contenuto</h3><p data-block-key="iidt">Piero ci insegnerà:</p><ol><li data-block-key="deuk5">gassa d\'amante</li><li data-block-key="9p7g8">nodo piano</li><li data-block-key="36csk">nodo scorsoio</li></ol><hr/><h4 data-block-key="f23qc">Materiale necessario</h4><p data-block-key="c34c3">A tutti i partecipanti è richiesto di portare</p><ul><li data-block-key="dssld">un cordino</li><li data-block-key="82da7">un altro cordino</li></ul><hr/><p data-block-key="857ha">Si prega di leggere prima le avvertenze.</p><p data-block-key="9ghf8">A presto!</p>\n\n<p>torna a: <a href="/pages/">Eventi</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n    <li><a href="/pages/piero-il-marinaio/la-biografia-di-piero/">La biografia di Piero</a></li>\n    \n\n</ul>\n\n',
            children: [
              {
                uuid: "bbd4d2b7-f481-44ca-9419-86f3d8820c3d",
                created_at: "2024-04-29T12:06:37.453276+02:00",
                title: "La biografia di Piero",
                slug: "la-biografia-di-piero",
                body: '\n\n<h1>La biografia di Piero</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n<h2 data-block-key="qrlir">Perché questa pagina</h2><p data-block-key="940qr">Vorremmo capire bene come vengono strutturate le pagine fornite dalle API.</p><p data-block-key="8vfhv">In particolare questa pagina dovrebbe essere figlia di <a href="/pages/piero-il-marinaio/">Piero il marinaio</a></p>\n\n<p>torna a: <a href="/pages/piero-il-marinaio/">Piero il marinaio</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n\n</ul>\n\n',
                children: [],
              },
            ],
          },
          {
            uuid: "5b2820b6-3eaf-4283-a7ae-bd06b568c2d0",
            created_at: "2024-04-29T11:11:20.265000+02:00",
            title: "Avvertenze nodi",
            slug: "avvertenze-nodi",
            body: '\n\n<h1>Avvertenze nodi</h1>\n<p class="meta"></p>\n\n<div class="intro"></div>\n\n<h2 data-block-key="v5m8i">Workshop nodi da marinaio</h2><p data-block-key="bacag">Prima di partecipare all\'evento di <a href="/pages/piero-il-marinaio/">Piero il marinaio</a> è necessario imparare ad allacciarsi le scarpe.</p><p data-block-key="booov"></p><p data-block-key="a9r03"><i>Un sentito ringraziamento.</i><br/><b>lo Staff</b></p>\n\n<p>torna a: <a href="/pages/">Eventi</a></p>\n\n<h2>Pagine figlie:</h2>\n<ul>\n    \n\n</ul>\n\n',
            children: [],
          },
        ],
      },
    ],
  },
];

// const pages = [
//   {
//     uuid: "e691a912-4e6e-4319-a909-9b45cf157bd2",
//     created_at: "2024-04-19T10:00:00Z",
//     title: "Guida alle escursioni",
//     slug: "guida-escursioni",
//     body: "Benvenuti nella nostra guida alle escursioni! Qui troverete informazioni su sentieri, punti di interesse e consigli per vivere al meglio la natura.",
//     children: "sentieri, punti-di-interesse",
//   },
//   {
//     uuid: "b8f2da7b-81e1-4b0a-8a4b-7fd89006a220",
//     created_at: "2024-04-19T13:45:00Z",
//     title: "Eventi in arrivo",
//     slug: "eventi-arrivo",
//     body: "Scopri i prossimi eventi organizzati dalla nostra associazione! Non perderti avventure emozionanti e momenti indimenticabili con gli amici scout.",
//     children: "prossimi-eventi",
//   },
//   {
//     uuid: "fc92a2b7-2345-4b7c-b3c4-89f265b5bb6a",
//     created_at: "2024-04-19T16:15:00Z",
//     title: "Come partecipare",
//     slug: "come-partecipare",
//     body: "Vuoi unirti a noi nelle nostre avventure? Scopri come partecipare ai nostri eventi, iscriverti e vivere esperienze straordinarie insieme alla nostra comunità.",
//     children: "iscrizione, partecipazione",
//   },
//   {
//     uuid: "d803dd77-df64-4453-8f55-b55d1d3e39f2",
//     created_at: "2024-04-19T17:30:00Z",
//     title: "Regolamento del campeggio",
//     slug: "regolamento-campeggio",
//     body: "Per garantire una vacanza sicura e divertente per tutti, vi preghiamo di leggere attentamente il nostro regolamento del campeggio. Seguite le regole e godetevi al massimo la vostra esperienza in natura!",
//     children: "regole, comportamento",
//   },
//   {
//     uuid: "f8653c5d-7890-4e2b-9e15-3b28e3218715",
//     created_at: "2024-04-19T18:45:00Z",
//     title: "Contattaci",
//     slug: "contattaci",
//     body: "Hai domande o bisogno di assistenza? Non esitare a contattarci! Siamo qui per aiutarti e rispondere a tutte le tue richieste.",
//     children: "informazioni-di-contatto, assistenza",
//   },
// ];

const profile = {
  uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
  agesci_id: "1234567",
  first_name: "Gianfilippo",
  last_name: "Neri",
  email: "pincopallino@email.it",
  phone: "3332224441",
  city: "Ancona",
  scout_group: {
    uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
    name: "Ancona 1623",
    zone: "Ancona",
    region: "LAZIO",
    subdistrict: {
      uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      name: "subdistrict name",
      district: {
        uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
        name: "district name",
      },
    },
    happiness_path: "FELICI_DI_ACCOGLIERE",
  },
  squads: [
    {
      uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      name: "squad name",
    },
  ],
};
export { events, invitations, registrations, locations, pages, profile };
