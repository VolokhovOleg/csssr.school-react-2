import reconcile from "./reconcile";

function updateInstance(internalInstance) {
  const { dom, element } = internalInstance;
  const parentDom = dom.parentNode;

  reconcile(parentDom, internalInstance, element);
}

export default updateInstance;
