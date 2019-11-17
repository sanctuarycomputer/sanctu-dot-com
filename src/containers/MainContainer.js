import ContainerBase from 'lib/ContainerBase';

class MainContainer extends ContainerBase {
  view = import('views/MainView');

  model = () => {};
}

export default MainContainer;
