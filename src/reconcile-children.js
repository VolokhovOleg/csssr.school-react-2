// eslint-disable-next-line import/no-cycle
import reconcile from "./reconcile";

function reconcileChildren(instance, element) {
  const { dom, childInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i += 1) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }

  return newChildInstances.filter(
    newChildInstance => newChildInstance !== null
  );
}

export default reconcileChildren;
