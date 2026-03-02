/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("bingo").del();
  await knex("bingo").insert([
    {
      title: "いし",
      src: "dummy",
      status: false,
    },
    {
      title: "はな",
      src: "dummy",
      status: false,
    },
    {
      title: "うま",
      src: "dummy",
      status: false,
    },
    {
      title: "とり",
      src: "dummy",
      status: false,
    },
    {
      title: "かさ",
      src: "dummy",
      status: false,
    },
    {
      title: "いけ",
      src: "dummy",
      status: false,
    },
    {
      title: "かわ",
      src: "dummy",
      status: false,
    },
    {
      title: "うみ",
      src: "dummy",
      status: false,
    },
    {
      title: "にじ",
      src: "dummy",
      status: false,
    },
    {
      title: "さかな",
      src: "dummy",
      status: false,
    },
    {
      title: "ねこ",
      src: "dummy",
      status: false,
    },
    {
      title: "いぬ",
      src: "dummy",
      status: false,
    },
    {
      title: "Bingo",
      src: "bingo",
      status: true,
    },
    {
      title: "はな",
      src: "dummy",
      status: false,
    },
    {
      title: "うま",
      src: "dummy",
      status: false,
    },
    {
      title: "とり",
      src: "dummy",
      status: false,
    },
    {
      title: "かさ",
      src: "dummy",
      status: false,
    },
    {
      title: "いけ",
      src: "dummy",
      status: false,
    },
    {
      title: "かわ",
      src: "dummy",
      status: false,
    },
    {
      title: "うみ",
      src: "dummy",
      status: false,
    },
    {
      title: "にじ",
      src: "dummy",
      status: false,
    },
    {
      title: "さかな",
      src: "dummy",
      status: false,
    },
    {
      title: "ねこ",
      src: "dummy",
      status: false,
    },
    {
      title: "いぬ",
      src: "dummy",
      status: false,
    },
    {
      title: "いぬ",
      src: "dummy",
      status: false,
    },
  ]);
};
