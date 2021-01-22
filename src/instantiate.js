import createPublicInstance from "./create-public-instance";
import updateDomProperties from "./update-dom-properties";

function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === `string`;
  if (isDomElement) {
    // Создаём инстанс DOM-элемента
    const isTextElement = type === `TEXT ELEMENT`;
    const dom = isTextElement
      ? document.createTextNode(props.nodeValue)
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    const instance = { dom, element, childInstances };
    return instance;
  }
  // Создаём инстанс компонента
  const instance = {};
  const publicInstance = createPublicInstance(element, instance);
  const childElement = publicInstance.render();
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  Object.assign(instance, { dom, element, childInstance, publicInstance });
  return instance;
}

export default instantiate;
