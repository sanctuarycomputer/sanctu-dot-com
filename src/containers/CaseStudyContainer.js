import ContentfulClient from 'lib/ContentfulClient';
import ContainerBase from 'lib/ContainerBase';
import ContentfulData from 'lib/ContentfulData';

class CaseStudyContainer extends ContainerBase {
  view = import('views/CaseStudyView');

  beforeModel = () => {
    const contentful = ContentfulClient();
    return ContentfulData.setRef(contentful);
  };

  model = () => {
    return Promise.all([
      ContentfulData.getEntries({
        content_type: 'caseStudy',
        'fields.slug': window.location.pathname,
        include: 4
      }).then(res => res.items[0]),
      ContentfulData.getEntries({
        content_type: 'sanctuary',
        include: 4
      }).then(res => res.items[0])
    ]).then(res => {
      return { caseStudy: res[0], global: res[1] };
    });
  };
}

export default CaseStudyContainer;
