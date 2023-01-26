export default (simpleFragments) => {
  return Object.keys(simpleFragments)
    .map((key) => ({
      uuid: simpleFragments[key].uuid,
      index: simpleFragments[key].index,
      title: simpleFragments[key].itemTitle,
      url: simpleFragments[key].itemLink,
      hasLink: !!simpleFragments[key].itemLink,
    }))
    .sort((a, b) => a.index - b.index);
};
