type Color = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): Color => {
  const hexCode = hex.replace("#", "");
  const r = parseInt(hexCode.substring(0, 2), 16);
  const g = parseInt(hexCode.substring(2, 4), 16);
  const b = parseInt(hexCode.substring(4, 6), 16);
  return { r, g, b };
};

export const rgbToHex = (rgb: Color): string => {
  const hex = [rgb.r, rgb.g, rgb.b]
    .map(x => {
      const ret = x.toString(16);
      return ret.length === 1 ? `0${ret}` : ret;
    })
    .join("");
  return `#${hex}`;
};

export const blend = (x: Color, y: Color, ratio: number): Color => {
  const r = Math.round(x.r * ratio + y.r * (1 - ratio));
  const g = Math.round(x.g * ratio + y.g * (1 - ratio));
  const b = Math.round(x.b * ratio + y.b * (1 - ratio));
  return { r, g, b };
};

export const majorBlend = (
  data: { weight: number; color: Color }[],
  base: Color = { r: 0xff, g: 0xff, b: 0xff },
) => {
  if (data.length === 1) {
    return data[0].color;
  }
  const major = data.reduce((a, b) => (a.weight > b.weight ? a : b), {
    weight: 0,
    color: { r: 0, g: 0, b: 0 },
  });
  const secondMajor = data.reduce(
    (a, b) => (a.weight > b.weight && a !== major ? a : b),
    {
      weight: 0,
      color: { r: 0, g: 0, b: 0 },
    },
  );
  const ratio = (major.weight / (major.weight + secondMajor.weight) - 0.5) * 2;
  return blend(major.color, base, ratio);
};
