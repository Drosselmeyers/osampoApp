/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('bingo').del();
  await knex('bingo').insert([
    {
      title: 'いし',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'はな',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'うま',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'とり',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'かさ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いけ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'かわ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'うみ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'にじ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'さかな',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'ねこ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いぬ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いし',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'はな',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'うま',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'とり',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'かさ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いけ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'かわ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'うみ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'にじ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'さかな',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'ねこ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いぬ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
    {
      title: 'いぬ',
      src: 'https://placehold.jp/130x130.png',
      status: false,
    },
  ]);
};
