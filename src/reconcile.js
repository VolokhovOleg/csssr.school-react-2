import instantiate from "./instantiate";
// eslint-disable-next-line import/no-cycle
import reconcileChildren from "./reconcile-children";
import updateDomProperties from "./update-dom-properties";

function reconcile(parentDom, instance, element) {
  let newInstance;

  if (instance === null) {
    // Создаём инстанс
    newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element === null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    newInstance = null;
    return newInstance;
  }
  if (
    (instance.element.type &&
      instance.element.type === element.type &&
      !instance.element.type.isClass) ||
    typeof element.type === `string`
  ) {
    // Обновляем инстанс DOM-элемента
    updateDomProperties(instance.dom, instance.element.props, element.props);
    newInstance = { ...instance };
    newInstance.childInstances = reconcileChildren(instance, element); // eslint-disable-line no-use-before-define
    newInstance.element = element;
    return newInstance;
  }

  // Обновляем инстанс компонента
  newInstance = { ...instance };
  newInstance.publicInstance.props = element.props;
  const childElement = newInstance.publicInstance.render();
  const oldChildInstance = newInstance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  newInstance.dom = childInstance.dom;
  newInstance.childInstance = childInstance;
  newInstance.element = element;

  return newInstance;
}

export default reconcile;
