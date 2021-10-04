function color(node, params) {
  const apply = (hsl) => {
    const [hue = 0, sat = 0, lum = 0] = hsl.split(' ');
    node.style.setProperty('--hue', hue);
    node.style.setProperty('--sat', sat + '%');
    node.style.setProperty('--lum', lum + '%');
  };

  apply(params);

  return {
    update: apply,
  };
}

export default color;
