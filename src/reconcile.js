import instantiate from "./instantiate";
// eslint-disable-next-line import/no-cycle
import reconcileChildren from "./reconcile-children";
import updateDomProperties from "./update-dom-properties";

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // Создаём инстанс
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element === null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    return null;
  }
  if (
    (instance.element.type &&
      instance.element.type === element.type &&
      !instance.element.type.isClass) ||
    typeof element.type === `string`
  ) {
    // Обновляем инстанс DOM-элемента
    updateDomProperties(instance.dom, instance.element.props, element.props);
    /* eslint-disable no-param-reassign */
    instance.childInstances = reconcileChildren(instance, element); // eslint-disable-line no-use-before-define
    instance.element = element;
    return instance;
  }
  // Обновляем инстанс компонента
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance.dom;
  instance.childInstance = childInstance;
  instance.element = element;

  return instance;
}

export default reconcile;
