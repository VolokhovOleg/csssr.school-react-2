import reconcile from "./reconcile";

let rootInstance = null;

class OwnReact {
  static createElement(type, props, ...childs) {
    let element = {
      type,
      props: {
        ...props,
        children: childs.flatMap(item =>
          typeof item === `string` || item === null
            ? {
                type: `TEXT ELEMENT`,
                props: {
                  nodeValue: item,
                  children: []
                }
              }
            : item
        )
      }
    };

    if (type instanceof Function && !type.isClass) {
      element = type(element.props);
    }

    return element;
  }

  static render(element, root) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(root, prevInstance, element);
    rootInstance = nextInstance;
  }

  static myCreateElement(name, props, childs) {
    const el = document.createElement(name);

    if (props) {
      Object.keys(props).forEach(key => el.setAttribute(key, props[key]));
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
}

export default OwnReact;
