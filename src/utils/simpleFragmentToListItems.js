export default (simpleFragments) => {
  return Object.keys(simpleFragments).map(key => (
    { 
      title: simpleFragments[key].itemTitle, 
      url: simpleFragments[key].itemLink,
      hasLink: !!simpleFragments[key].itemLink
    }
  ));
}