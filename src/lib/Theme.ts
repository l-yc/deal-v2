export type Theme = string;

const themeDefault: Theme = `
slide {
  background-color: white;
  padding: 1rem;
}

h1 {
  font-size: 1.6rem;
}

li {
  list-style: disc inside;
}
`;

const themes = {
  default: themeDefault,
};

function generateScopedStyle(styles: string, scope: string): string {
  let doc = document.implementation.createHTMLDocument(""),
    styleElement = document.createElement("style");

  styleElement.textContent = styles;
  // the style will only be parsed once it is added to a document
  doc.body.appendChild(styleElement);

  let newStyle = "";
  for (let rule of styleElement.sheet.cssRules) {
    if (rule instanceof CSSStyleRule) {
      if (rule.selectorText == "slide") {
        rule.selectorText = `${scope}`;
      } else {
        rule.selectorText = `${scope} ${rule.selectorText}`;
      }
    }
    newStyle += rule.cssText;
  }

  console.log("loading theme", newStyle);
  // svelte-preprocess is trying to parse the style tag, so we split it up ???
  return `<st` + `yle data-theme>${newStyle}</st` + `yle>`;
}

export {
  themes,
  generateScopedStyle,
}