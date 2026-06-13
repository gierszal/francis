import { pool, prisma } from "@/prisma.js";
import { randomUUID } from "crypto";

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      role: "ADMIN",
    },
  });

  const userRole = await prisma.role.create({
    data: {
      role: "USER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Francis",
      email: "admin@francis.local",
      activationLink: randomUUID(),
      isActivated: true,
      roleId: adminRole.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      firstName: "Henry",
      lastName: "Player",
      email: "henry@francis.local",
      activationLink: randomUUID(),
      isActivated: true,
      roleId: userRole.id,
    },
  });

  const kcd = await prisma.game.create({
    data: {
      name: "Kingdom Come: Deliverance",
    },
  });

  const witcher = await prisma.game.create({
    data: {
      name: "The Witcher 3",
    },
  });

  const skyrim = await prisma.game.create({
    data: {
      name: "Skyrim",
    },
  });

  const kcdAlbum = await prisma.album.create({
    data: {
      name: "Original Soundtrack",
      description: "Kingdom Come Deliverance OST",
      picture: randomUUID(),
      gameId: kcd.id,
    },
  });

  const witcherAlbum = await prisma.album.create({
    data: {
      name: "Wild Hunt OST",
      description: "The Witcher 3 soundtrack",
      picture: randomUUID(),
      gameId: witcher.id,
    },
  });

  const skyrimAlbum = await prisma.album.create({
    data: {
      name: "Original Game Soundtrack",
      description: "Skyrim soundtrack",
      picture: randomUUID(),
      gameId: skyrim.id,
    },
  });

  const povertyAndFamine = await prisma.track.create({
    data: {
      name: "Poverty and Famine",
      artist: "Jan Valta",
      audio: "/audio/kcd/poverty-and-famine.mp3",
      tags: ["medieval", "village", "ambient", "sad"],
      albumId: kcdAlbum.id,
    },
  });

  const beerAndWomen = await prisma.track.create({
    data: {
      name: "Beer and Women",
      artist: "Jan Valta",
      audio: "/audio/kcd/beer-and-women.mp3",
      tags: ["tavern", "folk", "happy", "medieval"],
      albumId: kcdAlbum.id,
    },
  });

  const peopleOfTheLand = await prisma.track.create({
    data: {
      name: "People of the Land",
      artist: "Jan Valta",
      audio: "/audio/kcd/people-of-the-land.mp3",
      tags: ["folk", "peaceful", "village"],
      albumId: kcdAlbum.id,
    },
  });

  const kaerMorhen = await prisma.track.create({
    data: {
      name: "Kaer Morhen",
      artist: "Marcin Przybyłowicz",
      audio: "/audio/witcher/kaer-morhen.mp3",
      tags: ["fantasy", "castle", "ambient", "calm"],
      albumId: witcherAlbum.id,
    },
  });

  const steelForHumans = await prisma.track.create({
    data: {
      name: "Steel for Humans",
      artist: "Marcin Przybyłowicz",
      audio: "/audio/witcher/steel-for-humans.mp3",
      tags: ["battle", "combat", "epic"],
      albumId: witcherAlbum.id,
    },
  });

  const ladiesOfTheWoods = await prisma.track.create({
    data: {
      name: "Ladies of the Woods",
      artist: "Marcin Przybyłowicz",
      audio: "/audio/witcher/ladies-of-the-woods.mp3",
      tags: ["dark", "forest", "mystery"],
      albumId: witcherAlbum.id,
    },
  });

  const dragonborn = await prisma.track.create({
    data: {
      name: "Dragonborn",
      artist: "Jeremy Soule",
      audio: "/audio/skyrim/dragonborn.mp3",
      tags: ["epic", "heroic", "battle"],
      albumId: skyrimAlbum.id,
    },
  });

  const farHorizons = await prisma.track.create({
    data: {
      name: "Far Horizons",
      artist: "Jeremy Soule",
      audio: "/audio/skyrim/far-horizons.mp3",
      tags: ["exploration", "ambient", "mountains"],
      albumId: skyrimAlbum.id,
    },
  });

  const secunda = await prisma.track.create({
    data: {
      name: "Secunda",
      artist: "Jeremy Soule",
      audio: "/audio/skyrim/secunda.mp3",
      tags: ["night", "calm", "ambient"],
      albumId: skyrimAlbum.id,
    },
  });

  const medievalCollection = await prisma.collection.create({
    data: {
      name: "Medieval OST",
    },
  });

  const fantasyCollection = await prisma.collection.create({
    data: {
      name: "Fantasy Adventures",
    },
  });

  await prisma.albumCollection.createMany({
    data: [
      {
        albumId: kcdAlbum.id,
        collectionId: medievalCollection.id,
      },
      {
        albumId: witcherAlbum.id,
        collectionId: fantasyCollection.id,
      },
      {
        albumId: skyrimAlbum.id,
        collectionId: fantasyCollection.id,
      },
    ],
  });

  const playlist = await prisma.playlist.create({
    data: {
      name: "My Favourite OST",
      authorId: user.id,
    },
  });

  await prisma.playlistTrack.createMany({
    data: [
      {
        playlistId: playlist.id,
        trackId: povertyAndFamine.id,
      },
      {
        playlistId: playlist.id,
        trackId: kaerMorhen.id,
      },
      {
        playlistId: playlist.id,
        trackId: secunda.id,
      },
    ],
  });

  await prisma.favourite.createMany({
    data: [
      {
        userId: user.id,
        trackId: beerAndWomen.id,
      },
      {
        userId: user.id,
        trackId: dragonborn.id,
      },
    ],
  });

  await prisma.token.create({
    data: {
      refreshToken: randomUUID(),
      userId: user.id,
    },
  });

  console.log("Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
