let rootInstance = null;

class OwnReact {
  static createElement(...args) {
    const [name, attrs, childs] = args;

    return {
      type: name,
      props: {
        attrs: attrs ? { ...attrs } : null,
        children: [...childs].flat()
      }
    };
  }

  static render(element, root) {
    const prevInstance = rootInstance;
    const nextInstance = this.reconcile(root, prevInstance, element);
    rootInstance = nextInstance;
  }

  static reconcile(parentDom, instance, element) {
    let result = null;

    if (instance === null) {
      // Создаём инстанс
      const newInstance = this.instantiate(element);

      parentDom.appendChild(newInstance.dom);

      result = newInstance;
    } else if (typeof element === `string`) {
      if (parentDom.textContent !== element) {
        const parentDomText = parentDom;
        parentDomText.textContent = element;
      }
    } else if (element == null) {
      // Убираем инстанс
      parentDom.removeChild(instance.dom);

      result = null;
    } else if (instance.dom.tagName.toLowerCase() === instance.element.type) {
      // Обновляем инстанс

      Object.defineProperties(instance, {
        childInstances: {
          value: this.reconcileChildren(instance, element)
        },
        element: {
          value: element
        }
      });

      result = instance;
    } else {
      const newInstance = this.instantiate(element);

      parentDom.replaceChild(newInstance.dom, instance.dom);

      result = newInstance;
    }

    return result;
  }

  static instantiate(element) {
    const { type, props } = element;
    const dom = this.myCreateElement(type, props.attrs, props.children);
    const childElements = props.children;
    const childInstances = childElements
      .map(item => {
        if (typeof item !== `string`) {
          return this.instantiate(item);
        }

        return item;
      })
      .filter(item => item !== undefined);
    const childDoms = childInstances.map(childInstance => childInstance.dom);

    childDoms.forEach(childDom => childDom && dom.appendChild(childDom));

    const instance = { dom, element, childInstances };

    return instance;
  }

  static myCreateElement(name, attrs, childs) {
    const el = document.createElement(name);

    if (attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    }

    childs.forEach(item => {
      if (typeof item === `string`) {
        const text = document.createTextNode(item);

        return el.appendChild(text);
      }

      return item;
    });

    return el;
  }

  static reconcileChildren(instance, element) {
    const { dom, childInstances } = instance;
    const nextChildElements = element.props.children;
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);

    for (let i = 0; i < count; i += 1) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
      const newChildInstance = this.reconcile(dom, childInstance, childElement);

      newChildInstances.push(newChildInstance);
    }

    return newChildInstances.filter(item => item != null);
  }
}

export default OwnReact;
