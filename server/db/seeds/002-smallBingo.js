/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("small_bingo").del();
  await knex("small_bingo").insert([
    {
      title: "いし",
      src: "001",
      status: false,
    },
    {
      title: "はな",
      src: "002",
      status: false,
    },
    {
      title: "うま",
      src: "003",
      status: false,
    },
    {
      title: "はと",
      src: "004",
      status: false,
    },
    {
      title: "Bingo",
      src: "bingo",
      status: true,
    },
    {
      title: "いけ",
      src: "006",
      status: false,
    },
    {
      title: "かわ",
      src: "007",
      status: false,
    },
    {
      title: "うみ",
      src: "008",
      status: false,
    },
    {
      title: "にじ",
      src: "009",
      status: false,
    },
  ]);
};
