let rootInstance = null;

class OwnReact {
  static createElement(...args) {
    return [...args];
  }

  static render(component, root) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(root, prevInstance, component);
    rootInstance = nextInstance;
    console.log(rootInstance, `rootInstance`);
  }
}

function updateDomProperties(instanceDom, instanceAttrs, componentAttrs) {
// Удаляем пропсы
  Object.keys(instanceAttrs).forEach(name => {
    instanceDom[name] = null;
  });

  // Задаём пропсы
  Object.keys(componentAttrs).forEach(name => {
    instanceDom[name] = componentAttrs[name];
  });
}

function reconcileChildren(instance, component) {
  const [name, attrs, ...childs] = component;
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = [...childs].flat();
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);

    newChildInstances.push(newChildInstance);
  }

  return newChildInstances.filter(instance => instance != null);
}

function reconcile(parentDom, instance, component) {
  const [name, attrs, ...childs] = component;

  if (instance == null) {
    // Создаём инстанс
    const newInstance = instantiate(component);
    parentDom.appendChild(newInstance.dom);

    return newInstance;
  } else if (component == null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.dom.tagName.toLowerCase() === name) {
    // Обновляем инстанс
    let [instanceDom, instanceAttrs, childInstances] = instance.element;

    if (instanceAttrs) {
      updateDomProperties(instanceDom, instanceAttrs, attrs);
    }

    instance.childInstances = reconcileChildren(instance, component);

    instance.element = component;

    return instance;
  } else {
    const newInstance = instantiate(component);

    parentDom.replaceChild(newInstance.dom, instance.dom);

    return newInstance;
  }
}

function instantiate(element) {
  const [name, attrs, ...childs] = element;

  const dom = myCreateElement(name, attrs, ...childs);
  const childElements = [...childs].flat();

  const childInstances = childElements
    .map(item => {
      if (typeof item !== `string`) {
        return instantiate(item);
      }
    })
    .filter(item => item !== undefined);
  const childDoms = childInstances.map(childInstance => childInstance.dom);
  childDoms.forEach(childDom => dom.appendChild(childDom));

  const instance = { dom, element, childInstances };

  return instance;
}

function myCreateElement(name, attrs, ...childs) {
  const el = document.createElement(name);

  if (attrs) {
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        el.setAttribute(key, attrs[key])
      }
    }
  }

  [...childs].forEach(item => {
    if (typeof item === `string`) {
      const text = document.createTextNode(item);

      return el.appendChild(text);
    }
  });

  return el;
}

export default OwnReact;
