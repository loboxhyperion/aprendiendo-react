export const getImageFact = async ({ fact }) => {
  const firstWord = fact.split(" ")[0];
  // console.log(firstWord);

  const res = await fetch(
    `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
  );
  const data = await res.json();
  const { _id } = data;
  const url = `/cat/${_id}/says/${firstWord}?fontSize=50&fonColor=red`;
  return url;
};
