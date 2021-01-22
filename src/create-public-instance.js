function createPublicInstance(element, internalInstance) {
  const { type, props } = element;
  const Type = type;
  const publicInstance = new Type(props);

  // eslint-disable-next-line no-underscore-dangle
  publicInstance.__internalInstance = internalInstance;

  return publicInstance;
}

export default createPublicInstance;
