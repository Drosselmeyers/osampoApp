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
      title: "かさ",
      src: "005",
      status: false,
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
    {
      title: "さかな",
      src: "010",
      status: false,
    },
    {
      title: "ねこ",
      src: "011",
      status: false,
    },
    {
      title: "いぬ",
      src: "012",
      status: false,
    },
    {
      title: "Bingo",
      src: "bingo",
      status: true,
    },
    {
      title: "うどん",
      src: "013",
      status: false,
    },
    {
      title: "ひこうき",
      src: "014",
      status: false,
    },
    {
      title: "つりびと",
      src: "015",
      status: false,
    },
    {
      title: "たんぽぽ",
      src: "016",
      status: false,
    },
    {
      title: "カフェ",
      src: "017",
      status: false,
    },
    {
      title: "がっこう",
      src: "018",
      status: false,
    },
    {
      title: "カマキリ",
      src: "019",
      status: false,
    },
    {
      title: "パトカー",
      src: "020",
      status: false,
    },
    {
      title: "こうえん",
      src: "021",
      status: false,
    },
    {
      title: "サッカーボール",
      src: "022",
      status: false,
    },
    {
      title: "コンビニ",
      src: "023",
      status: false,
    },
    {
      title: "マンホール",
      src: "024",
      status: false,
    },
  ]);
};
