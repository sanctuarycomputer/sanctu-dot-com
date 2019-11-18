import ContentfulClient from 'lib/ContentfulClient';
import ContainerBase from 'lib/ContainerBase';
import ContentfulData from 'lib/ContentfulData';

class MainContainer extends ContainerBase {
  view = import('views/MainView');

  beforeModel = () => {
    const contentful = ContentfulClient();
    return ContentfulData.setRef(contentful);
  }

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'sanctuary',
      include: 4,
    }).then(res => res.items[0]);
  };
}

export default MainContainer;
