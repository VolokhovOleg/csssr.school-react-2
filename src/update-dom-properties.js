function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => {
    return name.startsWith(`on`);
  };
  const isAttribute = name => !isEvent(name) && name !== `children`;
  const DOM = dom;

  // Удаляем прослушку событий
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      DOM.removeEventListener(eventType, prevProps[name]);
    });

  // Удаляем пропсы
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      DOM[name] = null;
    });

  // Задаём пропсы
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      DOM[name] = nextProps[name];
    });

  // Добавляем прослушку событий
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      DOM.addEventListener(eventType, nextProps[name]);
    });
}

export default updateDomProperties;
