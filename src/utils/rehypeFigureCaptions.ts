// A standalone Markdown image with a title becomes a semantic figure.
// Captions are text nodes, so caption text cannot inject HTML.
type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

export default function rehypeFigureCaptions() {
  return (tree: Node) => {
    function visit(node: Node) {
      for (const child of node.children ?? []) visit(child);
      if (node.tagName !== "p" || node.children?.length !== 1) return;
      const image = node.children[0];
      const caption = image.properties?.title;
      if (image.tagName !== "img" || typeof caption !== "string") return;
      delete image.properties!.title;
      node.tagName = "figure";
      node.children = [
        image,
        {
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: caption }],
        },
      ];
    }
    visit(tree);
  };
}
