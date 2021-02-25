import instantiate from "./instantiate";
// eslint-disable-next-line import/no-cycle
import reconcileChildren from "./reconcile-children";
import updateDomProperties from "./update-dom-properties";
import componentPerformance from "./component-perfomance";

componentPerformance.startTracking();

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // Создаём инстанс
    componentPerformance.start(`Создаём инстанс`);
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    componentPerformance.end(`Создаём инстанс`);
    componentPerformance.measure(`Создаём инстанс`);
    componentPerformance.print();
    return newInstance;
  }
  if (element === null) {
    // Убираем инстанс
    componentPerformance.start(`Убираем инстанс`);
    parentDom.removeChild(instance.dom);
    componentPerformance.end(`Убираем инстанс`);
    componentPerformance.measure(`Убираем инстанс`);
    componentPerformance.print();
    return null;
  }
  if (
    (instance.element.type &&
      instance.element.type === element.type &&
      !instance.element.type.isClass) ||
    typeof element.type === `string`
  ) {
    // Обновляем инстанс DOM-элемента
    componentPerformance.start(`Обновляем инстанс DOM-элемента`);
    updateDomProperties(instance.dom, instance.element.props, element.props);
    componentPerformance.end(`Обновляем инстанс DOM-элемента`);
    componentPerformance.measure(`Обновляем инстанс DOM-элемента`);
    componentPerformance.print();
    /* eslint-disable no-param-reassign */
    instance.childInstances = reconcileChildren(instance, element); // eslint-disable-line no-use-before-define
    instance.element = element;
    return instance;
  }
  // Обновляем инстанс компонента
  componentPerformance.start(`Обновляем инстанс компонента`);
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance.dom;
  instance.childInstance = childInstance;
  instance.element = element;
  componentPerformance.end(`Обновляем инстанс компонента`);
  componentPerformance.measure(`Обновляем инстанс компонента`);
  componentPerformance.print();
  return instance;
}

componentPerformance.print();
componentPerformance.stopTracking();

export default reconcile;
