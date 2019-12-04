import ContentfulClient from 'lib/ContentfulClient';
import ContainerBase from 'lib/ContainerBase';
import ContentfulData from 'lib/ContentfulData';

class CaseStudyContainer extends ContainerBase {
  view = import('views/CaseStudyView');

  beforeModel = () => {
    const contentful = ContentfulClient();
    return ContentfulData.setRef(contentful);
  }

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'caseStudy',
      'fields.slug': window.location.pathname,
      include: 4,
    }).then(res => res.items[0]);
  };
}

export default CaseStudyContainer;



