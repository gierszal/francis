import { pool, prisma } from "../src/prisma";

async function main() {
  await prisma.role.upsert({
    where: { id: 1 },
    update: { role: "ADMIN" },
    create: {
      id: 1,
      role: "ADMIN",
      createdAt: new Date("2026-07-11T16:28:39.40339+00:00"),
      updatedAt: new Date("2026-07-11T16:28:39.40339+00:00"),
    },
  });

  await prisma.role.upsert({
    where: { id: 2 },
    update: { role: "USER" },
    create: {
      id: 2,
      role: "USER",
      createdAt: new Date("2026-07-11T16:28:42.579073+00:00"),
      updatedAt: new Date("2026-07-11T16:28:42.579073+00:00"),
    },
  });

  await prisma.$executeRawUnsafe(
    `SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));`,
  );

  const games = [
    {
      id: "dd6fb679-323d-4808-b9d0-be5f90f86672",
      name: "Kingdom Come: Deliverance",
      picture: "image/754c9440-3318-48d4-b8c1-a1aea471bc0c.jpg",
      createdAt: new Date("2026-07-11T16:51:56.912+00:00"),
      updatedAt: new Date("2026-07-11T16:51:56.912+00:00"),
    },
    {
      id: "83b54abe-d681-42cd-a2e8-788e27c8ba0c",
      name: "Kingdom Come: Deliverance II",
      picture: "image/5cc376e0-7b87-4268-98c4-99b6f193c24c.jpg",
      createdAt: new Date("2026-07-11T16:52:34.989+00:00"),
      updatedAt: new Date("2026-07-11T16:52:34.989+00:00"),
    },
    {
      id: "23798ec3-3d66-4216-9f5a-69f0c3721cef",
      name: "The Witcher 3: Wild Hunt",
      picture: "image/c9c026de-1158-4f57-9c75-ad6b9c59cf7b.jpg",
      createdAt: new Date("2026-07-11T16:53:07.289+00:00"),
      updatedAt: new Date("2026-07-11T16:53:07.289+00:00"),
    },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: game,
      create: game,
    });
  }

  const albums = [
    {
      id: "822ff773-5a4a-4741-b527-082255ced11b",
      name: "Original Soundtrack Essentials",
      picture: "image/f847cba2-09e5-4105-83db-a1705006977f.jpg",
      description:
        "Kingdom Come: Deliverance II (Original Soundtrack Essentials) features the core musical highlights, blending historically inspired melodies with cinematic orchestration.",
      gameId: "83b54abe-d681-42cd-a2e8-788e27c8ba0c",
      createdAt: new Date("2026-07-11T16:56:46.746+00:00"),
      updatedAt: new Date("2026-07-11T16:56:46.746+00:00"),
    },
    {
      id: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      name: "Music of Nature I",
      picture: "image/fa8fd813-337e-4df0-8e8c-2363a1cc5740.jpg",
      description:
        "Music of Nature I (Kingdom Come: Deliverance II OST) captures the serene and untamed beauty of the Bohemian wilderness through a peaceful blend of acoustic folk and ambient orchestration.",
      gameId: "83b54abe-d681-42cd-a2e8-788e27c8ba0c",
      createdAt: new Date("2026-07-11T17:10:50.093+00:00"),
      updatedAt: new Date("2026-07-11T17:10:50.093+00:00"),
    },
    {
      id: "c932239b-519d-4fcf-bd54-ce93c93a4c11",
      name: "Music of Towns",
      picture: "image/5de87313-deed-4cdd-91ea-3390e65e2d56.jpg",
      description:
        "Music of Towns from Kingdom Come: Deliverance captures the vibrant essence of medieval urban life, blending traditional acoustic folk melodies with authentic historical instrumentation.",
      gameId: "dd6fb679-323d-4808-b9d0-be5f90f86672",
      createdAt: new Date("2026-07-11T17:20:34.276+00:00"),
      updatedAt: new Date("2026-07-11T17:20:34.276+00:00"),
    },
    {
      id: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      name: "Music of The Land",
      picture: "image/86f8545a-d3bb-425b-bee7-23ef8d617b9b.jpg",
      description:
        "Music of The Land from Kingdom Come: Deliverance is a sweeping and melancholic ambient masterpiece that perfectly captures the untamed beauty and historical weight of the Bohemian countryside.",
      gameId: "dd6fb679-323d-4808-b9d0-be5f90f86672",
      createdAt: new Date("2026-07-11T17:24:53.323+00:00"),
      updatedAt: new Date("2026-07-11T17:24:53.323+00:00"),
    },
    {
      id: "f2867cff-bbc7-47cd-8b31-a6b9c1253e0a",
      name: "The Complete Soundtrack",
      picture: "image/76e51742-0de2-4554-8c72-7c9589ee3d15.jpg",
      description:
        "The Witcher 3: Wild Hunt (The Complete Soundtrack) is a dark fantasy masterpiece, blending visceral Slavic folk music, haunting vocal harmonies, and cinematic orchestration into an unforgettable sonic journey.",
      gameId: "23798ec3-3d66-4216-9f5a-69f0c3721cef",
      createdAt: new Date("2026-07-11T17:31:01.478+00:00"),
      updatedAt: new Date("2026-07-11T17:31:01.478+00:00"),
    },
  ];

  for (const album of albums) {
    await prisma.album.upsert({
      where: { id: album.id },
      update: album,
      create: album,
    });
  }

  const collections = [
    {
      id: "4bb5aca5-924c-4673-bfc1-1d9025ce251d",
      name: "The Bohemian Chronicles",
      createdAt: new Date("2026-07-11T17:37:38.36+00:00"),
      updatedAt: new Date("2026-07-11T17:37:38.36+00:00"),
    },
    {
      id: "9b8ed12e-fe9f-4a4f-8184-05eaf941361e",
      name: "Wilderness & Soundscapes",
      createdAt: new Date("2026-07-11T17:37:59.289+00:00"),
      updatedAt: new Date("2026-07-11T17:37:59.289+00:00"),
    },
    {
      id: "f7a18d48-9622-4e0e-9def-db6a75a2674d",
      name: "Epic Fantasy & Grim Lore",
      createdAt: new Date("2026-07-11T17:38:10.866+00:00"),
      updatedAt: new Date("2026-07-11T17:38:10.866+00:00"),
    },
  ];

  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { id: collection.id },
      update: collection,
      create: collection,
    });
  }

  const albumCollections = [
    {
      id: "cdceaf20-97a9-4c8f-82e4-f71a5653a373",
      albumId: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      collectionId: "4bb5aca5-924c-4673-bfc1-1d9025ce251d",
    },
    {
      id: "cf374726-8bc6-47b1-a057-8cc4ada3df1c",
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      collectionId: "4bb5aca5-924c-4673-bfc1-1d9025ce251d",
    },
    {
      id: "0c935eba-c591-4a2c-bdb1-ab98254dae75",
      albumId: "c932239b-519d-4fcf-bd54-ce93c93a4c11",
      collectionId: "4bb5aca5-924c-4673-bfc1-1d9025ce251d",
    },
    {
      id: "aa36f16f-68de-4142-88e5-ac51c64e6932",
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      collectionId: "4bb5aca5-924c-4673-bfc1-1d9025ce251d",
    },
    {
      id: "6f216ee3-bc04-48ad-a5e7-60cc6f563a9a",
      albumId: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      collectionId: "9b8ed12e-fe9f-4a4f-8184-05eaf941361e",
    },
    {
      id: "063ebdd3-13d8-4bf7-8714-4ee2258d0558",
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      collectionId: "9b8ed12e-fe9f-4a4f-8184-05eaf941361e",
    },
    {
      id: "0130d04e-73ca-4d36-b229-776d0b81f6da",
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      collectionId: "f7a18d48-9622-4e0e-9def-db6a75a2674d",
    },
    {
      id: "375df3fa-e5e2-48a1-b9f4-82c0792aa4c6",
      albumId: "f2867cff-bbc7-47cd-8b31-a6b9c1253e0a",
      collectionId: "f7a18d48-9622-4e0e-9def-db6a75a2674d",
    },
  ];

  for (const ac of albumCollections) {
    await prisma.albumCollection.upsert({
      where: { id: ac.id },
      update: ac,
      create: ac,
    });
  }

  const tracks = [
    {
      id: "3f705b9f-c515-44ba-ac4c-d355a8f6c4c8",
      name: "Fistcuffs",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/7cc94a28-509b-4478-aa9a-42ae3efeb20e.mp3",
      tags: ["KCD2", "TavernMusic", "BrawlMusic"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:00:05.658+00:00"),
      updatedAt: new Date("2026-07-11T17:00:05.658+00:00"),
    },
    {
      id: "c1f71456-4960-4b4c-9cd5-bd0a76353cfc",
      name: "Apollonia Theme",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/2fcb372c-57c4-4444-8de8-bc1ede3ce617.mp3",
      tags: ["MedievalAtmosphere", "ExplorationMusic", "OrchestralMusic"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:02:27.416+00:00"),
      updatedAt: new Date("2026-07-11T17:02:27.416+00:00"),
    },
    {
      id: "2388803d-ba82-4609-a862-be2ce98eb23f",
      name: "Gallop!",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/95f38600-a12f-436e-9d2f-0191178b96bc.mp3",
      tags: ["ChaseMusic", "AdventureScore", "DynamicOrchestral"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:03:49.122+00:00"),
      updatedAt: new Date("2026-07-11T17:03:49.122+00:00"),
    },
    {
      id: "0e677c01-024d-4565-8a88-c6366ab1f1ce",
      name: "The Gathering Foe",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/848b544f-8c82-4d75-b59b-0fb242f2a7e5.mp3",
      tags: ["DarkMedieval", "TenseAtmosphere", "DarkOrchestral"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:04:52.579+00:00"),
      updatedAt: new Date("2026-07-11T17:04:52.579+00:00"),
    },
    {
      id: "4b29c178-1cc4-498f-885c-912769a636ef",
      name: "Giardini Estivi",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/c6563101-c81e-4a8e-9dfa-d88e6d981320.mp3",
      tags: ["PeacefulMusic", "RelaxingAmbient", "SummerGardens"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:06:29.377+00:00"),
      updatedAt: new Date("2026-07-11T17:06:29.377+00:00"),
    },
    {
      id: "4908f3c3-6703-4171-9442-8db40ac036f0",
      name: "Flee!",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/0416d560-983c-42c5-a585-82679f760bef.mp3",
      tags: ["ActionTheme", "FastOrchestral", "ActionSoundtrack"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:07:38.096+00:00"),
      updatedAt: new Date("2026-07-11T17:07:38.096+00:00"),
    },
    {
      id: "ae63b598-a204-44d7-958a-7fd39cad2324",
      name: "Church Affairs",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/f71f2104-fc13-4c86-88d9-f56aaf61b9db.mp3",
      tags: ["DarkClassical", "CinematicMusic", "OrchestralMusic"],
      albumId: "822ff773-5a4a-4741-b527-082255ced11b",
      listens: 0,
      createdAt: new Date("2026-07-11T17:08:33.668+00:00"),
      updatedAt: new Date("2026-07-11T17:08:33.668+00:00"),
    },
    {
      id: "3fe06b8c-e90d-4a9c-a183-afeb866f8d3c",
      name: "The White Wolf",
      artist: "Marcin Przybyłowicz, Mikolai Stroinski",
      audio: "audio/b294c8ad-eeb9-4569-9a3b-4aebc5e94dc0.mp3",
      tags: ["HauntingVocals", "EpicOrchestral", "TribalDrums"],
      albumId: "f2867cff-bbc7-47cd-8b31-a6b9c1253e0a",
      listens: 0,
      createdAt: new Date("2026-07-11T17:32:47.114+00:00"),
      updatedAt: new Date("2026-07-11T17:32:47.114+00:00"),
    },
    {
      id: "f6a1f21f-8077-449a-a10f-23d4a835c7cd",
      name: "Atmosphere Lakes and Ponds",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/19b7be1c-1463-4347-82dd-a42fc02a9a5d.mp3",
      tags: ["AmbientMusic", "BackgroundMusic", "ChillMusic"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:13:29.971+00:00"),
      updatedAt: new Date("2026-07-11T17:13:29.971+00:00"),
    },
    {
      id: "d29064a7-2215-4ad2-81cc-51335b72247e",
      name: "The Trail",
      artist: "Marcin Przybyłowicz, Mikolai Stroinski",
      audio: "audio/c1751420-d415-4397-bd10-d3c81f943af9.mp3",
      tags: ["EpicChase", "BattleMusic", "IntenseMusic"],
      albumId: "f2867cff-bbc7-47cd-8b31-a6b9c1253e0a",
      listens: 0,
      createdAt: new Date("2026-07-11T17:34:16.561+00:00"),
      updatedAt: new Date("2026-07-11T17:34:16.561+00:00"),
    },
    {
      id: "ab20fcaf-3ea8-4e7b-a83d-415bc9dd2d10",
      name: "Nibble Lakes and Ponds 1",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/196c8973-e282-404e-8d59-da16d2b9a08e.mp3",
      tags: ["MedievalNature", "BohemianWilderness", "NatureDetails"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:14:45.952+00:00"),
      updatedAt: new Date("2026-07-11T17:14:45.952+00:00"),
    },
    {
      id: "0cb24988-3f31-4b11-a6de-0eb690f47aab",
      name: "Atmosphere Lakes and Ponds 2",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/a5d352cd-5c54-434e-9d92-b7687dbdb188.mp3",
      tags: ["MedievalAmbient", "MusicOfNature", "CinematicAmbient"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:15:42.12+00:00"),
      updatedAt: new Date("2026-07-11T17:15:42.12+00:00"),
    },
    {
      id: "10955c7c-d879-40bc-b192-546547d3481e",
      name: "The Fortress of Memory",
      artist: "Marcin Przybyłowicz, Mikolai Stroinski",
      audio: "audio/b18ed7dc-c5e0-434b-b6ef-5adae24b6483.mp3",
      tags: ["HauntingAtmosphere", "WitcherMysteries", "Instrumental"],
      albumId: "f2867cff-bbc7-47cd-8b31-a6b9c1253e0a",
      listens: 1,
      createdAt: new Date("2026-07-11T17:35:16.179+00:00"),
      updatedAt: new Date("2026-07-11T17:35:30.676+00:00"),
    },
    {
      id: "e8b9a798-8ca8-4927-af6a-4639cfddd5d8",
      name: "Nibble Lakes and Ponds 2",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/9e375b7c-3d93-4fdb-ba42-2efeff0c109e.mp3",
      tags: ["Instrumental", "BackgroundMusic", "OrganicSoundscape"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:16:41.117+00:00"),
      updatedAt: new Date("2026-07-11T17:16:41.117+00:00"),
    },
    {
      id: "b4e9b3ba-16f6-429a-9d61-8c859ee347c7",
      name: "Lakes and Ponds Theme",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/fa53afa6-dae6-45ff-8560-3324919e8059.mp3",
      tags: ["PeacefulNature", "AmbientMusic", "Instrumental"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 5,
      createdAt: new Date("2026-07-11T17:12:13.679+00:00"),
      updatedAt: new Date("2026-07-11T17:16:41.452+00:00"),
    },
    {
      id: "6fbaf370-228d-4b8c-a3da-4f4d38834702",
      name: "Atmosphere Field 1",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/a34fe71d-638d-4517-8c65-10e2b98f5cc3.mp3",
      tags: ["SummerVibes", "PeacefulMind", "BohemianMeadows"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:17:46.814+00:00"),
      updatedAt: new Date("2026-07-11T17:17:46.814+00:00"),
    },
    {
      id: "27303fcf-ef30-4b81-84c1-03b1ecb522e7",
      name: "Nibble Field 1",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/46556e33-b800-421d-b3df-c7798dc95120.mp3",
      tags: ["MeadowVibes", "NatureSketch", "Instrumental"],
      albumId: "b1b69a5f-ef7a-4a48-952f-a71fe5226a0e",
      listens: 0,
      createdAt: new Date("2026-07-11T17:18:35.45+00:00"),
      updatedAt: new Date("2026-07-11T17:18:35.45+00:00"),
    },
    {
      id: "cfa71ae5-2dee-4ebc-8c5b-6fd672035456",
      name: "Talmberg Atmosphere 5",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/d8fc2bd8-7a09-492e-94e0-5e4121f2761a.mp3",
      tags: ["TavernVibes", "MedievalTown", "FolkMusic"],
      albumId: "c932239b-519d-4fcf-bd54-ce93c93a4c11",
      listens: 0,
      createdAt: new Date("2026-07-11T17:21:18.743+00:00"),
      updatedAt: new Date("2026-07-11T17:21:18.743+00:00"),
    },
    {
      id: "ce04443e-1ea6-4f85-957e-f872cb855d27",
      name: "Talmberg Nibble 8",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/14274059-56f6-4339-9b50-756631fd5e9f.mp3",
      tags: ["TalmbergNibble", "BohemianTowns", "FortressVibes"],
      albumId: "c932239b-519d-4fcf-bd54-ce93c93a4c11",
      listens: 0,
      createdAt: new Date("2026-07-11T17:23:03.513+00:00"),
      updatedAt: new Date("2026-07-11T17:23:03.513+00:00"),
    },
    {
      id: "70ca6737-2de2-40c5-948b-d9cb2a653249",
      name: "Talmberg Nibble 9",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/8dcfa3d3-34f5-43bb-857f-eacefaee34bf.mp3",
      tags: ["BohemianTowns", "VillageVibes", "MedievalCastle"],
      albumId: "c932239b-519d-4fcf-bd54-ce93c93a4c11",
      listens: 0,
      createdAt: new Date("2026-07-11T17:23:53.664+00:00"),
      updatedAt: new Date("2026-07-11T17:23:53.664+00:00"),
    },
    {
      id: "94355962-4454-4af0-ba5c-c607ab617e27",
      name: "Landscape Atmosphere 20",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/53600910-9652-48e9-917b-a9b00f9e7fba.mp3",
      tags: ["HistoricalAura", "ScenicAmbient", "CalmNature"],
      albumId: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      listens: 0,
      createdAt: new Date("2026-07-11T17:26:00.093+00:00"),
      updatedAt: new Date("2026-07-11T17:26:00.093+00:00"),
    },
    {
      id: "da0f85a7-ad72-4577-ad53-976d3f4f14f6",
      name: "Landscape Nibble 28",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/e6174c11-8f0d-4130-a1ff-a7ec45d4093a.mp3",
      tags: ["MedievalNature", "LandscapeNibble", "WildernessVibes"],
      albumId: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      listens: 0,
      createdAt: new Date("2026-07-11T17:27:01.399+00:00"),
      updatedAt: new Date("2026-07-11T17:27:01.399+00:00"),
    },
    {
      id: "618b5f07-85ed-4099-a99d-6dee8087ff03",
      name: "Landscape Atmosphere 21",
      artist: "Jan Valta, Adam Sporka",
      audio: "audio/e1666e67-734a-46ed-9464-5c11acef6956.mp3",
      tags: ["BackgroundMusic", "OrganicSoundscape", "MedievalNature"],
      albumId: "cab1c257-d6d8-46b0-a721-2db88abbac0c",
      listens: 0,
      createdAt: new Date("2026-07-11T17:27:52.779+00:00"),
      updatedAt: new Date("2026-07-11T17:27:52.779+00:00"),
    },
  ];

  for (const track of tracks) {
    await prisma.track.upsert({
      where: { id: track.id },
      update: track,
      create: track,
    });
  }

  console.log("✅ Seed завершён:", {
    roles: 2,
    games: games.length,
    albums: albums.length,
    collections: collections.length,
    albumCollections: albumCollections.length,
    tracks: tracks.length,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
