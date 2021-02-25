import reconcile from "./reconcile";
import componentPerformance from "./component-perfomance";

componentPerformance.startTracking();

function updateInstance(internalInstance) {
  const { dom, element } = internalInstance;
  const parentDom = dom.parentNode;
  componentPerformance.start(`Update instance`);

  reconcile(parentDom, internalInstance, element);

  componentPerformance.end(`Update instance`);
  componentPerformance.measure(`Update instance`);
}

componentPerformance.print();
componentPerformance.stopTracking();

export default updateInstance;
