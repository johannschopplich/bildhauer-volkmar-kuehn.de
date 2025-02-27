import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: false,
}).append({
  rules: {
    "node/prefer-global/buffer": "off",
    "node/prefer-global/process": "off",
  },
});
